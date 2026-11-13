import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { EmailButton } from "@/components/EmailButton";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader } from "@/components/ui";
import { contact, partner, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach the Travela team in ${contact.location} by email or phone for support, corrections and place suggestions.`,
};

const USEFUL = [
  "The county and the name of the place",
  "What looks wrong or what you would add",
  "A screenshot if it is a problem in the app",
  "The make of phone you are on",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        icon="mail"
        title="Tell us what to fix"
        intro="A wrong opening time. A road that is now tarmac. A county with nothing written about it yet. Corrections are the most useful thing you can send."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold">
              <Icon name="mail" />
            </span>
            <h2 className="mt-4 text-base font-semibold">Email</h2>
            <p className="mt-1.5 break-all text-sm text-muted">{contact.email}</p>
            <div className="mt-4">
              <EmailButton
                label="Copy address"
                showAddress={false}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-ink"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf-soft text-leaf">
              <Icon name="phone" />
            </span>
            <h2 className="mt-4 text-base font-semibold">Customer service</h2>
            <a
              href={`mailto:${contact.supportEmail}`}
              className="mt-1.5 block break-all text-sm text-muted transition-colors hover:text-ink"
            >
              {contact.supportEmail}
            </a>
            <a
              href={contact.phoneHref}
              className="mt-1 block text-sm text-muted transition-colors hover:text-ink"
            >
              {contact.phone}
            </a>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sand text-ink">
              <Icon name="pin" />
            </span>
            <h2 className="mt-4 text-base font-semibold">Where we are</h2>
            <p className="mt-1.5 text-sm text-muted">{contact.location}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:border-ink"
                >
                  {social.label}
                  <span className="text-muted">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <div className="rounded-4xl border border-line bg-sand-deep/50 p-7 sm:p-9">
            <h2 className="text-xl font-semibold">What to include</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The more specific the report, the faster it can be checked.
            </p>
            <ul className="mt-6 space-y-3">
              {USEFUL.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-line bg-surface px-5 py-4 text-sm text-muted"
                >
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid items-center gap-8 rounded-4xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <Icon name="users" className="h-4 w-4" />
              Looking for a guide instead
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl object-contain ring-1 ring-line"
              />
              <h2 className="text-2xl font-semibold">{partner.name}</h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{partner.description}</p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              More about Travela
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Phone</dt>
              <dd>
                <a href="tel:+254795723450" className="transition-colors hover:text-ink">
                  {partner.contact}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Location</dt>
              <dd>{partner.location}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="external" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Website</dt>
              <dd>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  remaxsafaris.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <AppCta />
    </>
  );
}
