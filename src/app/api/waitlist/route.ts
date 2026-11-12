import { contact } from "@/data/site";
import { addToWaitlist } from "@/lib/brevo";
import { notificationsConfigured, sendEmail, sendNotification } from "@/lib/notify";
import { waitlistWelcome } from "@/lib/waitlist-welcome";
import {
  createRateLimiter,
  guardJsonRequest,
  isValidEmail,
  jsonResponse,
  readText,
  verifyTurnstile,
} from "@/lib/security";

const RATE_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT = 5;
const CHALLENGE_ACTION = "waitlist";
const consume = createRateLimiter({ windowMs: RATE_WINDOW_MS, limit: RATE_LIMIT });

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

/** Adds a visitor to the launch waitlist, notifies support and sends the visitor their branded confirmation. */
export async function POST(request: Request) {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!notificationsConfigured() || !turnstileSecret) {
    return jsonResponse(
      { error: "The waitlist form is temporarily unavailable. Please email us directly." },
      503,
    );
  }

  const guard = await guardJsonRequest(request, consume, { maxBytes: 2_048 });
  if (!guard.ok) return guard.response;

  const { data, address } = guard;

  // Quietly accept decoy submissions without adding them to the list.
  if (typeof data.website === "string" && data.website.trim()) {
    return jsonResponse({ ok: true });
  }

  const name = readText(data.name, 80);
  const email = (readText(data.email, 254, { required: true }) ?? "").toLowerCase();
  const county = readText(data.county, 60);
  const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";

  if (
    name === null ||
    !isValidEmail(email) ||
    county === null ||
    token.length < 10 ||
    token.length > 2_048
  ) {
    return jsonResponse({ error: "Check your details and complete the verification." }, 400);
  }

  let challengePassed = false;
  try {
    challengePassed = await verifyTurnstile({
      token,
      secret: turnstileSecret,
      remoteIp: address,
      action: CHALLENGE_ACTION,
    });
  } catch {
    return jsonResponse({ error: "Verification is temporarily unavailable. Please try again shortly." }, 503);
  }

  if (!challengePassed) {
    return jsonResponse({ error: "Verification expired. Please complete it again." }, 400);
  }

  const safeName = escapeHtml(name || "Not provided");
  const safeEmail = escapeHtml(email);
  const safeCounty = escapeHtml(county || "Not provided");

  const sent = await sendNotification({
    subject: `Waitlist signup from ${name || email}`,
    replyTo: { email, name: name || undefined },
    text: [
      "A new waitlist signup came in from the website.",
      "",
      `Name: ${name || "Not provided"}`,
      `Reply email: ${email}`,
      `County: ${county || "Not provided"}`,
      "",
      "Reply to this email to follow up with the person.",
    ].join("\n"),
    html: `
      <div style="margin:0;padding:32px 16px;background:#fbf7ee;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3d9c3;border-radius:20px;overflow:hidden;">
          <div style="padding:22px 28px;background:#111111;border-bottom:4px solid #ff6b00;">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.02em;">Travela</p>
            <p style="margin:6px 0 0;color:#d8d8d8;font-size:13px;">Waitlist signup</p>
          </div>
          <div style="padding:28px;">
            <h1 style="margin:0 0 10px;font-size:23px;line-height:1.3;">A new waitlist signup is in</h1>
            <p style="margin:0 0 24px;color:#5e6b63;font-size:15px;line-height:1.6;">
              Someone wants to know the moment Travela is live on Google Play. Their details are below.
            </p>
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;color:#5e6b63;width:130px;">Name</td>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;font-weight:600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;color:#5e6b63;">Email address</td>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;">
                  <a href="mailto:${safeEmail}" style="color:#71320f;font-weight:600;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;color:#5e6b63;">County</td>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;">${safeCounty}</td>
              </tr>
            </table>
            <p style="margin:24px 0 0;">
              <a href="mailto:${safeEmail}?subject=Welcome%20to%20the%20Travela%20waitlist"
                style="display:inline-block;padding:12px 18px;border-radius:999px;background:#ff6b00;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
                Reply to ${safeName}
              </a>
            </p>
          </div>
          <div style="padding:16px 28px;background:#fbf7ee;color:#5e6b63;font-size:12px;line-height:1.5;">
            Sent from the waitlist form at travelaapp.co.ke.
          </div>
        </div>
      </div>
    `,
  });

  if (!sent) {
    return jsonResponse({ error: "We could not add you to the list just now. Please email us directly." }, 502);
  }

  // The inbox is the source of truth: a failed list write still counts as a signup.
  const added = await addToWaitlist({ email, name: name || undefined });
  if (!added) {
    console.error("Waitlist contact was not added to Brevo");
  }

  // The visitor gets a branded confirmation. The signup already stands, so a failure here is logged, not returned.
  const welcomed = await sendEmail({
    to: { email, name: name || undefined },
    replyTo: { email: contact.email, name: "Travela" },
    ...waitlistWelcome(name || undefined),
  });
  if (!welcomed) {
    console.error("Waitlist welcome email was not delivered");
  }

  return jsonResponse({ ok: true });
}
