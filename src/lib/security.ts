/**
 * The checks every public write endpoint runs before it does anything else.
 *
 * Both the app request and the contact form accept text from strangers, so the
 * order is fixed: confirm the call came from this site, confirm the body is the
 * shape and size we expect, confirm the caller is not flooding us, and only then
 * look at the content.
 */

const DEFAULT_MAX_BYTES = 4_096;

export function jsonResponse(body: object, status = 200, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

/** Behind a proxy the real caller is the first hop, not the socket we see. */
export function requestAddress(request: Request) {
  const address =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0];

  return address?.trim().slice(0, 64) || "unknown";
}

export interface RateLimit {
  windowMs: number;
  limit: number;
}

/**
 * A fixed-window counter held in memory. Enough to stop a script hammering a
 * form from one address; a shared store is only worth adding once more than one
 * instance is handling traffic.
 */
export function createRateLimiter({ windowMs, limit }: RateLimit) {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  return function consume(address: string) {
    const now = Date.now();
    const current = buckets.get(address);

    if (!current || current.resetAt <= now) {
      buckets.set(address, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfter: 0 };
    }

    if (current.count >= limit) {
      return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)) };
    }

    current.count += 1;

    if (buckets.size > 2_000) {
      for (const [key, value] of buckets) {
        if (value.resetAt <= now) buckets.delete(key);
      }
    }

    return { allowed: true, retryAfter: 0 };
  };
}

/** Rejects anything a page on another origin sent, and anything downgraded to plain http. */
function sameOrigin(request: Request) {
  const originHeader = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ?? request.headers.get("host");

  if (!originHeader || !host) return false;

  try {
    const origin = new URL(originHeader);
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;
    if (origin.host.toLowerCase() !== host.toLowerCase()) return false;
    if (process.env.NODE_ENV === "production" && origin.protocol !== "https:") return false;
    return true;
  } catch {
    return false;
  }
}

type BodyResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; response: Response };

async function readJsonBody(request: Request, maxBytes: number): Promise<BodyResult> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxBytes) {
    return { ok: false, response: jsonResponse({ error: "The message is too long." }, 413) };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, response: jsonResponse({ error: "The message could not be read." }, 400) };
  }

  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    return { ok: false, response: jsonResponse({ error: "The message is too long." }, 413) };
  }

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return { ok: false, response: jsonResponse({ error: "The message could not be read." }, 400) };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, response: jsonResponse({ error: "The message could not be read." }, 400) };
  }
}

type GuardResult =
  | { ok: true; data: Record<string, unknown>; address: string }
  | { ok: false; response: Response };

/**
 * Runs the shared front-door checks and hands back a parsed body, or the
 * response to send instead. Callers never touch the raw request themselves.
 */
export async function guardJsonRequest(
  request: Request,
  consume: ReturnType<typeof createRateLimiter>,
  { maxBytes = DEFAULT_MAX_BYTES }: { maxBytes?: number } = {},
): Promise<GuardResult> {
  if (!sameOrigin(request)) {
    return {
      ok: false,
      response: jsonResponse(
        { error: "This request could not be verified. Reload the page and try again." },
        403,
      ),
    };
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return { ok: false, response: jsonResponse({ error: "Unsupported request format." }, 415) };
  }

  const address = requestAddress(request);
  const rate = consume(address);

  if (!rate.allowed) {
    return {
      ok: false,
      response: jsonResponse({ error: "Too many messages. Please wait a little and try again." }, 429, {
        "Retry-After": String(rate.retryAfter),
      }),
    };
  }

  const body = await readJsonBody(request, maxBytes);
  if (!body.ok) return body;

  return { ok: true, data: body.data, address };
}

/** Cloudflare's challenge, checked server-side so a script cannot simply skip it. */
export async function verifyTurnstile(input: {
  token: string;
  secret: string;
  remoteIp: string;
  action: string;
}) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: input.secret,
      response: input.token,
      remoteip: input.remoteIp,
    }),
    signal: AbortSignal.timeout(6_000),
    cache: "no-store",
  });

  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean; action?: string };
  return result.success === true && result.action === input.action;
}

export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

/**
 * Returns the trimmed value only when it is a single line within the limit.
 * An empty optional field comes back as an empty string; a required one comes
 * back as null so the caller can reject it.
 */
export function readText(value: unknown, maxLength: number, { required = false } = {}) {
  if (typeof value !== "string") return required ? null : "";

  const trimmed = value.trim();
  if (!trimmed) return required ? null : "";
  if (trimmed.length > maxLength) return null;
  if (/[\r\n]/.test(trimmed)) return null;

  return trimmed;
}
