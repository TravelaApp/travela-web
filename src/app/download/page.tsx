import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { contact, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Travela is coming to Google Play. Join the waitlist and we will email you the moment the Android app is live, free and built to keep working without a signal.",
};

const STEPS = [
  {
    icon: "users" as const,
    title: "Join the waitlist",
    body: "Leave your email above. That is all we need to hold your place for launch.",
  },
  {
    icon: "mail" as const,
    title: "We email you at launch",
    body: "The moment Travela goes live on Google Play, we send you the listing so you can install it in one tap.",
  },
  {
    icon: "download" as const,
    title: "Install from Google Play",
    body: "No files to copy and no settings to change. Tap install and Android handles the rest.",
  },
  {
    icon: "stamp" as const,
    title: "Start stamping",
    body: "Open a county and mark it visited. Your passport, experience and first badge all move at once.",
  },
];

const GETS = [
  "All 47 counties with the reason to go",
  "209 places with tips, timing and effort",
  "Lists that open without a signal",
  "A passport, badges and shareable trip PDFs",
];

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the waitlist"
        icon="download"
        title="Travela is coming to Google Play"
        intro="Leave your email and we will tell you the moment the Android app is live on Google Play. It is free, quick to install and it keeps working where the signal stops."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <WaitlistForm />

          <div className="space-y-4">
            <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">What you get</h2>
              <ul className="mt-5 space-y-3.5 text-sm">
                {GETS.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl border border-line bg-sand-deep/50 p-7 sm:p-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Launch facts</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Cost</dt>
                  <dd className="font-medium">Free</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Requires</dt>
                  <dd className="font-medium">Android 8.0 or newer</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Adverts</dt>
                  <dd className="font-medium">None</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                The Google Play listing is being prepared, so there is no link to share yet. iPhone is not supported.
                Follow{" "}
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
                for the announcement.
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
                . We will answer personally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="From the waitlist to your first stamp"
          body="Four steps and none of them need a laptop."
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

      <AppCta />
    </>
  );
}
