import { NextResponse, type NextRequest } from "next/server";
import { isAllowedHost } from "@/lib/allowed-hosts";

const PROBE_PATH =
  /^\/(?:\.env|\.git|wp-admin|wp-login\.php|xmlrpc\.php|phpmyadmin|cgi-bin|\.aws|\.svn|vendor\/phpunit)(?:\/|$)/i;

const SENSITIVE_EXTENSIONS = /\.(?:php|asp|aspx|jsp|cgi)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("\\") || pathname.includes("..") || PROBE_PATH.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (SENSITIVE_EXTENSIONS.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (process.env.NODE_ENV === "production" && !isAllowedHost(request.headers.get("host"))) {
    return new NextResponse("Unknown host", { status: 421 });
  }

  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};