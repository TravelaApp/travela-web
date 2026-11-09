import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader } from "@/components/ui";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using the Travela app and this website covering your account and what we ask of you.",
};

const SECTIONS = [
  {
    icon: "compass" as const,
    title: "What these terms cover",
    body: [
      "These terms are between you and Travela. They cover the Travela Android app and this website.",
      "By downloading the app or using the site you accept them. If you do not agree with them please do not use either.",
    ],
  },
  {
    icon: "users" as const,
    title: "Your account",
    body: [
      "You sign in with an email address or with Google. One account is allowed per email address.",
      "Keep your password to yourself and tell us straight away if you think someone else has got into your account. What happens under your sign-in is treated as yours.",
    ],
  },
  {
    icon: "shield" as const,
    title: "Using the app fairly",
    body: [
      "Use Travela for your own travel. Do not copy or resell its content and do not try to break or work around the app's security.",
      "Do not use the app to upload or share anything unlawful or anything that belongs to someone else without their permission.",
    ],
  },
  {
    icon: "check" as const,
    title: "What it costs",
    body: [
      "Travela is free to download and free to use. There are no adverts and no in-app purchases.",
      "Data costs from your mobile network are yours and so is anything you buy from a travel partner.",
    ],
  },
  {
    icon: "external" as const,
    title: "Places and events",
    body: [
      "Destinations and events are put together in good faith but they change. Opening hours and fees can move without notice so treat the organiser's or operator's own page as the final word.",
      "When you follow a link to a partner or an event you are dealing with them directly and on their terms rather than these.",
    ],
  },
  {
    icon: "offline" as const,
    title: "Availability",
    body: [
      "Most of the app's content lives on your phone and keeps working without a signal. The online parts such as signing in and syncing your progress need a connection.",
      "We work to keep everything running but we cannot promise that the app or the site will never be interrupted. We may also change or retire features as the app grows.",
    ],
  },
  {
    icon: "calendar" as const,
    title: "Changes to these terms",
    body: [
      "We may update these terms as the app changes. The date below always shows the current version and continuing to use Travela after a change means you accept it.",
    ],
  },
  {
    icon: "mail" as const,
    title: "Getting in touch",
    body: [
      `Questions about these terms can go to ${contact.email} or by phone on ${contact.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        icon="book"
        title="The terms in plain language"
        intro="Short, readable and honest. What you can expect from Travela and what we ask of you in return."
      />

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">Last updated November 2026</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.title} className="rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand text-ink">
                  <Icon name={section.icon} />
                </span>
                <h2 className="text-base font-semibold">{section.title}</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            <Icon name="shield" className="h-4 w-4" />
            Read alongside our privacy page
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            How your data is handled is set out separately, so these terms stay about using the app itself. Write to{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {contact.email}
            </a>{" "}
            or call {contact.phone} if anything here is unclear.
          </p>
        </div>
      </section>

      <AppCta />
    </>
  );
}
