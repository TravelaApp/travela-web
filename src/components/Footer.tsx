import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { contact, site, socials } from "@/data/site";

const EXPLORE = [
  { href: "/destinations", label: "Destinations" },
  { href: "/counties", label: "The 47 counties" },
  { href: "/features", label: "What is inside" },
  { href: "/download", label: "Get the app" },
] as const;

const COMPANY = [
  { href: "/about", label: "About Travela" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

/**
 * Read once when this module loads rather than on every render. The copyright year only
 * changes when the site is rebuilt, and reading the clock during a render is not allowed
 * while pages are being prerendered.
 */
const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand-deep/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/app-icon.png"
              alt=""
              width={34}
              height={34}
              className="h-8.5 w-8.5 rounded-[10px] ring-1 ring-line"
            />
            <span className="font-display text-xl font-semibold">Travela</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}. Places and events with a passport that fills up as you go.</p>
          <div className="mt-5 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-ink"
              >
                {social.label}
                <Icon name="external" className="h-3.5 w-3.5 text-muted" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {COMPANY.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Customer service</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-2 transition-colors hover:text-ink">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                <Icon name="phone" className="h-4 w-4 shrink-0" />
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="pin" className="h-4 w-4 shrink-0" />
              {contact.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} Travela. Built in {contact.location}.
          </p>
          <p>Made for Kenya&rsquo;s 47 counties.</p>
        </div>
      </div>
    </footer>
  );
}
