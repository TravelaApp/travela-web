// Hostnames this deployment is allowed to serve (blocks stray Host-header routing).

const STATIC_HOSTS = ["travelaapp.co.ke", "www.travelaapp.co.ke", "travela.app", "www.travela.app"] as const;

function hostFromUrl(raw: string | undefined) {
  if (!raw) return null;
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function isAllowedHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;

  const host = hostHeader.split(",")[0]?.trim().split(":")[0]?.toLowerCase();
  if (!host) return false;

  if (host === "localhost" || host === "127.0.0.1") {
    return process.env.NODE_ENV !== "production";
  }

  const dynamic = [hostFromUrl(process.env.NEXT_PUBLIC_SITE_URL), hostFromUrl(process.env.VERCEL_URL)].filter(
    (value): value is string => Boolean(value),
  );

  if (STATIC_HOSTS.includes(host as (typeof STATIC_HOSTS)[number]) || dynamic.includes(host)) {
    return true;
  }

  // Vercel preview deployments.
  if (host.endsWith(".vercel.app")) return true;

  return false;
}