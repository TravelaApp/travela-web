import type { Metadata } from "next";
import { ApkRequestForm } from "@/components/ApkRequestForm";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { contact, download, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Get the app",
  description:
    "Get Travela for Android. Free to download and built to keep working without a signal with all 47 counties inside. Request the build and start stamping.",
};

const STEPS = [
  {
    icon: "download" as const,
    title: "Ask for the build",
    body: "Leave your email above. We send the current Android file and the two steps to install it.",
  },
  {
    icon: "check" as const,
    title: "Install it",
    body: "Open the file on your phone. Android asks once for permission to install from this source which is normal outside the Play Store.",
  },
  {
    icon: "users" as const,
    title: "Sign in once",
    body: "Your account is what carries your stamps, trips and badges to a new phone.",
  },
  {
    icon: "stamp" as const,
    title: "Start stamping",
    body: "Open a county and mark it visited. Your passport, experience and first badge all move at once.",
  },
];

const GETS = [
  "All 47 counties with the reason to go",
  "188 places with tips, timing and effort",
  "Lists that open without a signal",
  "A passport, badges and shareable trip PDFs",
];

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get the app"
        icon="download"
        title="Travela, free on Android"
        intro="Leave your email and we will send the current build with instructions. It takes a minute to install and it keeps working where the signal stops."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <ApkRequestForm />

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
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Before you install</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Cost</dt>
                  <dd className="font-medium">{download.price}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Requires</dt>
                  <dd className="font-medium">{download.requirement}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Download size</dt>
                  <dd className="font-medium">{download.size}</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                iPhone is not supported yet. Follow{" "}
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
                  href={`mailto:${contact.email}?subject=Travela%20Android%20build`}
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {contact.email}
                </a>
                . We are in {contact.location}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading title="From request to first stamp" body="Four steps and none of them need a laptop." />

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
