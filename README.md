# Travela Website

The public website for Travela, a travel app for exploring Kenya's 45 counties. It introduces the app, leads with hidden gems and popular destinations, offers county guides, and runs the Google Play launch waitlist alongside the contact form.

**Live website:** [https://travelaapp.co.ke](https://travelaapp.vercel.app)

<br />

## What the site includes

## Technology

## Run locally

Use Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. The website's source is under `src/`; edit `src/app/page.tsx` for the homepage. The development server may also load a workspace-level `.env` from the parent directory; keep all credentials out of Git.

Useful commands:

```bash
npm run lint
npm run build
npm run start
```

`npm run start` serves the production build, so run `npm run build` first.

## Environment variables

Create a local `.env` file in this project for development. In Vercel, add the same variables under **Project Settings → Environment Variables**. Never commit `.env` files or paste secret values into source code or documentation.

| Variable                         | Required                   | Purpose                                                                                                                                                                                                    |
| -------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BREVO_API_KEY`                  | Yes, for email forms       | Server-only Brevo API credential. Needs Contacts access as well as transactional email access, so the waitlist can be written.                                                                             |
| `BREVO_WAITLIST_LIST_ID`         | Yes, for the waitlist list | Numeric ID of the Brevo list that waitlist signups are added to. Without it the notification email still sends, but the signup is not saved to the list.                                                   |
| `BREVO_SENDER_EMAIL`             | Recommended                | Verified sender address in Brevo. Defaults to the site's support address.                                                                                                                                  |
| `BREVO_SENDER_NAME`              | Optional                   | Sender display name. Defaults to `Travela`.                                                                                                                                                                |
| `TURNSTILE_SECRET_KEY`           | Yes, for email forms       | Server-only Cloudflare Turnstile secret.                                                                                                                                                                   |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes, for email forms       | Public Turnstile site key used by the browser widget.                                                                                                                                                      |
| `NEXT_PUBLIC_SITE_URL`           | Recommended                | Canonical public origin used by metadata, sitemap and robots output. Set it to `https://travelaapp.vercel.app` until the custom domain is live, then change it to `https://travelaapp.co.ke` and redeploy. |

The `NEXT_PUBLIC_` prefix means a value can be included in browser code. Only the Turnstile **site key** is public; never prefix secret keys with `NEXT_PUBLIC_`. Vercel supplies its own deployment environment variables automatically.

If Turnstile or Brevo is not configured, the forms cannot send messages. The rest of the site remains available.

## Set up Brevo for the waitlist

Waitlist signups do two things: they are added to a Brevo contact list, and a notification email is sent to the support address. The contact form already proves the email path works, so most waitlist problems come down to the list ID or the API key's access.

### If the signup email does not arrive

## Deploy on Vercel

The production deployment is [travelaapp.vercel.app](https://travelaapp.vercel.app). To connect or redeploy it:

## Turnstile hostname troubleshooting

For this deployment, add these exact hostnames to the existing Turnstile widget:

```text
travelaapp.vercel.app
travelaapp.co.ke
www.travelaapp.co.ke
```

Add `travelaapp.vercel.app` while the site runs on the Vercel domain, and the two custom-domain entries before the DNS cutover so the forms keep working on the new host.

Enter a hostname only. Do not include `https://`, a path, a port, a trailing slash or a wildcard. For example, `https://travelaapp.vercel.app/` is a URL, not a valid hostname entry.

Cloudflare's Free plan permits up to 10 hostnames per widget, so three existing entries should leave room for this one. If the dashboard still rejects it:

Cloudflare allows a hostname and its subdomains when that hostname is added. Wildcards are not entered manually. Vercel preview deployments use changing hostnames, so test forms on the production domain or attach a stable preview domain and allow that hostname separately.

See Cloudflare's [Turnstile hostname management documentation](https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/) for the current format rules and limits.

## Forms and email delivery

The form endpoints are `POST /api/contact` and `POST /api/waitlist`. Both validate requests, check Turnstile tokens server-side, apply same-origin and rate-limit checks, and send notifications through Brevo to the support address configured by the site. The waitlist route also adds the address to the list named by `BREVO_WAITLIST_LIST_ID` and sends the person a branded confirmation email with the logo, a short welcome and the social links, both of which are best-effort: a failed list write or confirmation still counts as a signup, because the notification inbox is the source of truth. The Brevo API key stays on the server.

The confirmation email's logo is loaded from `${NEXT_PUBLIC_SITE_URL}/app-icon.png`, so that variable must point at a host that resolves for the image to appear.

If a challenge fails, first confirm that the browser hostname is allowed by the widget and that the public site key and server secret belong to that same widget. For delivery problems, check the Vercel function logs and Brevo sender configuration. Brevo's IP allow-list should remain disabled for changing serverless egress addresses.

## Project layout

```text
src/
  app/          Pages, layouts, metadata, and API routes
  components/   Shared website and form components
  data/         Bundled county, destination, and site content
  lib/          Email, security, URL, and form helpers
public/         Icons, partner assets, destination photos, and app screenshots
assets/         Source image assets, including the README homepage screenshot
```

## Useful references
