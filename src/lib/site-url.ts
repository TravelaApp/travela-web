// Production URL; override with NEXT_PUBLIC_SITE_URL on previews.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelaapp.co.ke").replace(/\/+$/, "");
