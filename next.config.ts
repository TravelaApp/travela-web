import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import { resolve } from "node:path";

// Load the workspace .env in development only; production secrets belong in the host.
if (process.env.NODE_ENV === "development") {
  loadEnvConfig(resolve(process.cwd(), ".."), true);
}

// React's dev build needs eval() for call stacks; production never gets it.
const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' mailto:",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  "frame-src https://challenges.cloudflare.com",
  `connect-src 'self'${isDevelopment ? " ws:" : ""} https://challenges.cloudflare.com`,
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Do not advertise the framework on every response.
  poweredByHeader: false,
  // Let phones on a private LAN reach the dev server.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // The full URL of a fetch makes a stale cache or a wrong endpoint obvious in development.
  logging: {
    fetches: { fullUrl: true },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Reuse the app's Wikimedia-hosted photos rather than shipping copies.
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "thumb.wikimedia.org" },
    ],
  },
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";
    const csp = isProduction
      ? `${contentSecurityPolicy}; upgrade-insecure-requests`
      : contentSecurityPolicy;

    const headers = [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      // Stops other sites embedding our images and assets as their own.
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
    ];

    if (isProduction) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      });
    }

    // public assets: a day fresh with a long stale-while-revalidate window.
    const cachedAssetHeaders = [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ];

    return [
      { source: "/:path*", headers },
      ...(isProduction
        ? [
            { source: "/destinations/:path*", headers: cachedAssetHeaders },
            { source: "/screenshots/:path*", headers: cachedAssetHeaders },
            { source: "/partners/:path*", headers: cachedAssetHeaders },
          ]
        : []),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
