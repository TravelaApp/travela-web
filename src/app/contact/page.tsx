import type { Metadata } from "next";
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
        <div className="flex flex-col gap-6 rounded-4xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <Icon name="users" className="h-4 w-4" />
              Partners
            </div>
            <h2 className="mt-3 text-2xl font-semibold">Guides and car hire</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Need a safari operator? See {partner.name} and other travel partners. Want to list your company? That goes through{" "}
              {contact.partnersEmail}.
            </p>
          </div>
          <Link
            href="/partners"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-ink"
          >
            Partners page
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AppCta />
    </>
  );
}
