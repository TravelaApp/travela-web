/** The site's public origin. Set NEXT_PUBLIC_SITE_URL to override it (e.g. on a preview deploy); otherwise the production domain. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://travela.app").replace(/\/+$/, "");
