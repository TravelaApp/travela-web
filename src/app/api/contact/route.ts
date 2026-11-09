import { contact } from "@/data/site";
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
const RATE_LIMIT = 4;
const CHALLENGE_ACTION = "contact";
const consume = createRateLimiter({ windowMs: RATE_WINDOW_MS, limit: RATE_LIMIT });

/** Delivers a message from the contact page, with the sender as the reply address. */
export async function POST(request: Request) {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!notificationsConfigured() || !turnstileSecret) {
    return jsonResponse(
      { error: `The message form is temporarily unavailable. Please write to ${contact.email}.` },
      503,
    );
  }

  const guard = await guardJsonRequest(request, consume, { maxBytes: 8_192 });
  if (!guard.ok) return guard.response;

  const { data, address } = guard;

  // Quietly accept decoy submissions without forwarding them to the mailbox.
  if (typeof data.website === "string" && data.website.trim()) {
    return jsonResponse({ ok: true });
  }

  const name = readText(data.name, 80, { required: true });
  const email = (readText(data.email, 254, { required: true }) ?? "").toLowerCase();
  const topic = readText(data.topic, 120);
  const message = readText(data.message, 2_000, { required: true });
  const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";

  if (
    !name ||
    name.length < 2 ||
    !isValidEmail(email) ||
    topic === null ||
    !message ||
    message.length < 10 ||
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

  const sent = await sendNotification({
    subject: `${topic ? `[${topic}] ` : ""}Message from ${name}`,
    replyTo: { email, name },
    text: [
      "A message was submitted from the Travela website contact form.",
      "",
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Topic: ${topic || "Not given"}`,
      "",
      message,
    ].join("\n"),
  });

  if (!sent) {
    return jsonResponse({ error: `We could not send the message. Please write to ${contact.email}.` }, 502);
  }

  return jsonResponse({ ok: true });
}
