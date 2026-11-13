import { contact, site, socials } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

/**
 * The branded email a person receives the moment they join the waitlist: logo, a short welcome,
 * what the app carries, the social links and how to reach us.
 *
 * Written with tables and inline styles because mail clients strip stylesheets, and the palette
 * matches the site: sand paper, ink card, orange accent.
 */

const SAND = "#fbf7ee";
const INK = "#111111";
const ORANGE = "#ff6b00";
const LINE = "#e3d9c3";
const MUTED = "#5e6b63";

const FONT = "Arial,Helvetica,sans-serif";

/** Names arrive from a form, so escape before they reach the markup. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One pill per network, built from the same list the footer uses so nothing drifts. */
function socialLinks() {
  return socials
    .map(
      (social) =>
        `<a href="${social.url}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;border:1px solid ${LINE};border-radius:999px;font-family:${FONT};font-size:13px;font-weight:bold;color:${INK};text-decoration:none;">${escapeHtml(social.label)}</a>`,
    )
    .join("");
}

const WAITING_FOR = [
  "All 47 counties and 209 places",
  "Lists that open without a signal",
  "A passport, badges and shareable trip PDFs",
];

export function waitlistWelcome(name?: string) {
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const subject = "You are on the Travela waitlist";

  const text = [
    greeting,
    "",
    "You are on the Travela waitlist. Thank you for joining. We will email you the moment Travela is live on Google Play, free to download and built to keep working when the signal drops.",
    "",
    "Waiting for you:",
    ...WAITING_FOR.map((line) => `- ${line}`),
    "",
    "Follow the journey and be first to see the launch:",
    ...socials.map((social) => `${social.label}: ${social.url}`),
    "",
    `Questions? Write to ${contact.email} or call ${contact.phone}.`,
    "",
    `You are getting this because you joined the waitlist at travelaapp.co.ke. We will only email you about the launch. Read our privacy policy: ${siteUrl}/privacy#waitlist`,
    "",
    `${site.name} · ${contact.location}`,
  ].join("\n");

  const bullet = WAITING_FOR.map(
    (line) =>
      `<div style="margin:2px 0;"><span style="color:${ORANGE};font-weight:bold;">&#8226;</span>&nbsp; ${escapeHtml(line)}</div>`,
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${SAND};">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">You are on the Travela waitlist. We will email you the moment the app is live on Google Play.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};">
<tr>
<td align="center" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:20px;overflow:hidden;">

<tr>
<td style="padding:22px 28px;background:${INK};border-bottom:4px solid ${ORANGE};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right:12px;">
<img src="${siteUrl}/app-icon.png" width="40" height="40" alt="${escapeHtml(site.name)}" style="display:block;border:0;border-radius:10px;" />
</td>
<td style="font-family:${FONT};font-size:20px;font-weight:bold;color:#ffffff;letter-spacing:0.02em;">${escapeHtml(site.name)}</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:32px 28px 0;">
<p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:${ORANGE};">You are on the list</p>
<h1 style="margin:0;font-family:${FONT};font-size:26px;line-height:1.25;color:${INK};">Welcome to the Travela waitlist</h1>
</td>
</tr>

<tr>
<td style="padding:18px 28px 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${MUTED};">
<p style="margin:0 0 14px;">${escapeHtml(greeting)}</p>
<p style="margin:0;">Thank you for joining. You are among the first to know when Travela arrives on Google Play. We will email you the moment it is live, free to download and built to keep working when the signal drops.</p>
</td>
</tr>

<tr>
<td style="padding:22px 28px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};border:1px solid ${LINE};border-radius:16px;">
<tr>
<td style="padding:18px 20px;font-family:${FONT};font-size:14px;line-height:1.9;color:${INK};">
<p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};">Waiting for you</p>
${bullet}
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:26px 28px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="border-radius:999px;background:${ORANGE};">
<a href="${siteUrl}/download" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;">See what is coming</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:30px 28px 0;font-family:${FONT};font-size:14px;line-height:1.6;color:${MUTED};">
<p style="margin:0 0 12px;">Follow the journey and be first to see the launch:</p>
${socialLinks()}
</td>
</tr>

<tr>
<td style="padding:26px 28px 30px;border-top:1px solid ${LINE};font-family:${FONT};font-size:14px;line-height:1.7;color:${MUTED};">
<p style="margin:0;">Questions? Write to <a href="mailto:${contact.email}" style="color:${ORANGE};text-decoration:none;">${contact.email}</a> or call <a href="${contact.phoneHref}" style="color:${ORANGE};text-decoration:none;">${contact.phone}</a>.</p>
</td>
</tr>

</table>

<p style="max-width:600px;margin:18px auto 0;font-family:${FONT};font-size:12px;line-height:1.7;color:${MUTED};text-align:center;">
You are receiving this because you joined the waitlist at travelaapp.co.ke. We will only email you about the launch.
Read our <a href="${siteUrl}/privacy#waitlist" style="color:${MUTED};text-decoration:underline;">privacy policy</a>.
</p>
<p style="max-width:600px;margin:10px auto 0;font-family:${FONT};font-size:12px;line-height:1.7;color:${MUTED};text-align:center;">
${escapeHtml(site.name)} &middot; ${escapeHtml(contact.location)}
</p>

</td>
</tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
