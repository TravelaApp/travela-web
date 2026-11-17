import { contact } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const SECURITY_CONTACT = contact.email;

export function GET() {
  const body = [
    "Contact: mailto:" + SECURITY_CONTACT,
    "Contact: " + contact.phoneHref,
    "Preferred-Languages: en",
    "Canonical: " + siteUrl + "/.well-known/security.txt",
    "Policy: " + siteUrl + "/privacy",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}