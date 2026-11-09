/**
 * The one place the site's public origin is decided.
 *
 * Set NEXT_PUBLIC_SITE_URL to override it (for example on a preview deployment);
 * otherwise it falls back to the production domain the app already links to.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://travela.app").replace(/\/+$/, "");
