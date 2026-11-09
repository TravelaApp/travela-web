import { notificationsConfigured, sendNotification } from "@/lib/notify";
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
const CHALLENGE_ACTION = "apk_request";
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

/** Forwards a request for the Android build to support, with the requester as the reply address. */
export async function POST(request: Request) {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!notificationsConfigured() || !turnstileSecret) {
    return jsonResponse(
      { error: "The request form is temporarily unavailable. Please email us directly." },
      503,
    );
  }

  const guard = await guardJsonRequest(request, consume, { maxBytes: 2_048 });
  if (!guard.ok) return guard.response;

  const { data, address } = guard;

  // Quietly accept decoy submissions without forwarding them to the mailbox.
  if (typeof data.website === "string" && data.website.trim()) {
    return jsonResponse({ ok: true });
  }

  const name = readText(data.name, 80, { required: true });
  const email = (readText(data.email, 254, { required: true }) ?? "").toLowerCase();
  const device = readText(data.device, 120);
  const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";

  if (
    !name ||
    name.length < 2 ||
    !isValidEmail(email) ||
    device === null ||
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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDevice = escapeHtml(device || "Not provided");

  const sent = await sendNotification({
    subject: `Android app request from ${name}`,
    replyTo: { email, name },
    text: [
      "A Travela Android build request was submitted from the website.",
      "",
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Device: ${device || "Not provided"}`,
      "",
      "Reply to this email to follow up with the requester.",
    ].join("\n"),
    html: `
      <div style="margin:0;padding:32px 16px;background:#fbf7ee;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3d9c3;border-radius:20px;overflow:hidden;">
          <div style="padding:22px 28px;background:#111111;border-bottom:4px solid #ff6b00;">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.02em;">Travela</p>
            <p style="margin:6px 0 0;color:#d8d8d8;font-size:13px;">Android app request</p>
          </div>
          <div style="padding:28px;">
            <h1 style="margin:0 0 10px;font-size:23px;line-height:1.3;">A new app request is in</h1>
            <p style="margin:0 0 24px;color:#5e6b63;font-size:15px;line-height:1.6;">
              Someone is ready to explore Kenya with Travela. Their details are below.
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
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;color:#5e6b63;">Device</td>
                <td style="padding:12px 0;border-top:1px solid #e3d9c3;">${safeDevice}</td>
              </tr>
            </table>
            <p style="margin:24px 0 0;">
              <a href="mailto:${safeEmail}?subject=Your%20Travela%20Android%20app"
                style="display:inline-block;padding:12px 18px;border-radius:999px;background:#ff6b00;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
                Reply to ${safeName}
              </a>
            </p>
          </div>
          <div style="padding:16px 28px;background:#fbf7ee;color:#5e6b63;font-size:12px;line-height:1.5;">
            Sent from the app request form at travela.app.
          </div>
        </div>
      </div>
    `,
  });

  if (!sent) {
    return jsonResponse({ error: "We could not send the request just now. Please email us directly." }, 502);
  }

  return jsonResponse({ ok: true });
}
