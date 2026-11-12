import { contact } from "@/data/site";

/**
 * Outbound mail for the site's own forms, sent through Brevo's HTTP API so the key stays on the server.
 *
 * Brevo's "Authorised IPs" must stay off: the outbound address changes (serverless egress or a home
 * connection), so a fixed allow-list would break the forms. Every route using this is behind the
 * Turnstile, same-origin and rate-limit checks in src/lib/security.ts.
 */

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

/** The low-level Brevo send. Callers decide the recipient; the API key never leaves the server. */
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

/** Delivers a notification to the support inbox, which acts as the source of truth for every signup. */
export async function sendNotification(message: Notification) {
  return sendEmail({ ...message, to: { email: contact.email } });
}
