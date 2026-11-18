import { contact } from "@/data/site";
import { sendEmail, notificationsConfigured } from "@/lib/notify";
import {
  createRateLimiter,
  guardJsonRequest,
  isValidEmail,
  jsonResponse,
  readText,
  safeEmailSubjectPart,
  verifyTurnstile,
} from "@/lib/security";

const RATE_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT = 4;
const CHALLENGE_ACTION = "partners";
const consume = createRateLimiter({ windowMs: RATE_WINDOW_MS, limit: RATE_LIMIT });

const PARTNER_TYPES = ["travel", "car-hire", "other"] as const;
type PartnerType = (typeof PARTNER_TYPES)[number];

function isPartnerType(value: string): value is PartnerType {
  return (PARTNER_TYPES as readonly string[]).includes(value);
}

const TYPE_LABELS: Record<PartnerType, string> = {
  travel: "Travel / tours & guides",
  "car-hire": "Car hire",
  other: "Other",
};

export function GET() {
  return jsonResponse({ error: "Not found" }, 404);
}

export async function POST(request: Request) {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!notificationsConfigured() || !turnstileSecret) {
    return jsonResponse(
      { error: `The partner form is temporarily unavailable. Please write to ${contact.partnersEmail}.` },
      503,
    );
  }

  const guard = await guardJsonRequest(request, consume, { maxBytes: 8_192 });
  if (!guard.ok) return guard.response;

  const { data, address } = guard;

  if (typeof data.website === "string" && data.website.trim()) {
    return jsonResponse({ ok: true });
  }

  const company = readText(data.company, 120, { required: true });
  const name = readText(data.name, 80, { required: true });
  const email = (readText(data.email, 254, { required: true }) ?? "").toLowerCase();
  const partnerTypeRaw = readText(data.partnerType, 32, { required: true });
  const website = readText(data.websitePublic, 500);
  const message = readText(data.message, 2_000, { required: true });
  const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";

  if (
    !company ||
    company.length < 2 ||
    !name ||
    name.length < 2 ||
    !isValidEmail(email) ||
    !partnerTypeRaw ||
    !isPartnerType(partnerTypeRaw) ||
    website === null ||
    !message ||
    message.length < 20 ||
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

  const partnerLabel = TYPE_LABELS[partnerTypeRaw];
  const safeCompany = safeEmailSubjectPart(company, 80);

  const sent = await sendEmail({
    to: { email: contact.partnersEmail, name: "Travela partners" },
    subject: `[Partner] ${partnerLabel} — ${safeCompany}`,
    replyTo: { email, name },
    text: [
      "A partner enquiry was submitted from travelaapp.co.ke.",
      "",
      `Company: ${company}`,
      `Contact name: ${name}`,
      `Reply email: ${email}`,
      `Partner type: ${partnerLabel}`,
      `Website: ${website || "Not given"}`,
      "",
      message,
    ].join("\n"),
  });

  if (!sent) {
    return jsonResponse({ error: `We could not send the enquiry. Please write to ${contact.partnersEmail}.` }, 502);
  }

  return jsonResponse({ ok: true });
}