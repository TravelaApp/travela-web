import { contact } from "@/data/site";

// Outbound mail via Brevo (server-only). Keep Brevo authorised IPs off for serverless egress.

export function notificationsConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

export interface EmailMessage {
  to: { email: string; name?: string };
  subject: string;
  text: string;
  html?: string;
  replyTo?: { email: string; name?: string };
}

export async function sendEmail({ to, subject, text, html, replyTo }: EmailMessage) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return false;

  const senderEmail = process.env.BREVO_SENDER_EMAIL || contact.email;
  const senderName = process.env.BREVO_SENDER_NAME || "Travela";

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [to],
        ...(replyTo ? { replyTo } : {}),
        subject,
        textContent: text,
        ...(html ? { htmlContent: html } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Brevo rejected an email", { status: response.status });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Brevo email request failed", {
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    return false;
  }
}

export interface Notification {
  subject: string;
  text: string;
  html?: string;
  replyTo?: { email: string; name?: string };
}

export async function sendNotification(message: Notification) {
  return sendEmail({ ...message, to: { email: contact.email } });
}
