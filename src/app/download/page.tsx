import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { contact, download, earlyTesterGets, socials, waitlistFaqs, webVsApp } from "@/data/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Travela is in closed testing on Google Play. Join the waitlist for tester invites and the public launch. Free Android app with offline places, trips and a county passport.",
};

const STEPS = [
  {
    icon: "users" as const,
    title: "Join the waitlist",
    body: "Leave your email. We use it only for launch and tester news, not marketing lists.",
  },
  {
    icon: "mail" as const,
    title: "We email when it is your turn",
    body: "Tester slots go out as Play invites to the Gmail you use on your phone. Everyone else hears when the public listing is live.",
  },
  {
    icon: "download" as const,
    title: "Install from Google Play",
    body: "Accept the testing invite or open the public listing. No APK files and no side-loading.",
  },
  {
    icon: "stamp" as const,
    title: "Stamp in the app",
    body: "Mark a county visited, build a trip, and save places offline. The website never holds your passport.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Early access"
        icon="download"
        title="Closed testing on Android"
        intro="Travela is already on Google Play for testers while we finish the store listing. Join the waitlist for an invite or for the day the app opens to everyone. Free, offline-friendly, and built in Nairobi."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <WaitlistForm />

          <div className="space-y-4">
            <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">What early testers get</h2>
              <ul className="mt-5 space-y-3.5 text-sm">
                {earlyTesterGets.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-sand-deep/50 p-6">
                <h3 className="text-sm font-semibold">{webVsApp.siteTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{webVsApp.siteBody}</p>
              </div>
              <div className="rounded-3xl border border-line bg-surface p-6 ring-1 ring-gold/25">
                <h3 className="text-sm font-semibold">{webVsApp.appTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{webVsApp.appBody}</p>
              </div>
            </div>

            <div className="rounded-4xl border border-line bg-sand-deep/50 p-7 sm:p-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Launch facts</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Access today</dt>
                  <dd className="text-right font-medium">{download.accessLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Cost</dt>
                  <dd className="font-medium">{download.price}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Requires</dt>
                  <dd className="font-medium">{download.requirement}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Adverts</dt>
                  <dd className="font-medium">None</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                There is no public {download.store} link on this site yet. iPhone is not supported. Already testing?
                Sign in with the same Google account that received the invite. Follow{" "}
                {socials.map((social, index) => (
                  <span key={social.label}>
                    {index > 0 && " and "}
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {social.handle} on {social.label}
                    </a>
                  </span>
                ))}{" "}
                for updates.
              </p>
            </div>

            <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Need a hand?</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Call {contact.phone} or write to{" "}
                <a
                  href={`mailto:${contact.email}?subject=Travela%20waitlist`}
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {contact.email}
                </a>
                . Ask for a tester invite or help with a Play invite you already received.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="From waitlist to first stamp"
          body="Four steps. None of them need a laptop, and none of them install the app by themselves."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold-soft text-gold">
                  <Icon name={step.icon} />
                </span>
                <span className="font-display text-sm font-semibold text-muted">Step {index + 1}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-5 pb-8">
        <SectionHeading
          title="Waitlist and closed testing"
          body="Short answers about the website, the app, and why there is no install button here yet."
        />
        <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
          {waitlistFaqs.map((faq) => (
            <div key={faq.q} className="px-6 py-5">
              <dt className="text-base font-semibold">{faq.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          More on data and privacy in{" "}
          <Link href="/privacy#waitlist" className="underline decoration-line underline-offset-4 hover:decoration-ink">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/terms#waitlist" className="underline decoration-line underline-offset-4 hover:decoration-ink">
            Terms
          </Link>
          .
        </p>
      </section>

      <AppCta />
    </>
  );
}