import { contact } from "@/data/site";

/**
 * Outbound mail for the site's own forms, sent through Brevo's HTTP API so the
 * site never needs an SMTP connection and the key stays on the server.
 *
 * Brevo's "Authorised IPs" setting must stay off. The site runs where the outbound
 * address changes (serverless egress, or a home connection during testing), so any
 * fixed allow-list will fail the day the address changes and take the forms with it.
 * The key is protected by living only on the server and never reaching the browser,
 * and every route that uses it is behind the Turnstile check, a same-origin check
 * and a rate limit in src/lib/security.ts.
 */

export function notificationsConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

export interface Notification {
  subject: string;
  text: string;
  html?: string;
  replyTo?: { email: string; name?: string };
}

export async function sendNotification({ subject, text, html, replyTo }: Notification) {
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
        to: [{ email: contact.email }],
        ...(replyTo ? { replyTo } : {}),
        subject,
        textContent: text,
        ...(html ? { htmlContent: html } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}
