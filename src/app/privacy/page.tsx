import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader } from "@/components/ui";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Travela stores and never collects plus how to have your account and its data deleted.",
};

const SECTIONS = [
  {
    icon: "users" as const,
    title: "Your account",
    body: [
      "To use Travela you sign in with an email address or with Google. We hold that email address on the account.",
      "If you add a display name or a profile picture those are stored too so they follow you to a new phone. If you never add them there is nothing to store.",
      "Your password is handled by our sign-in provider and is never visible to us.",
    ],
  },
  {
    icon: "stamp" as const,
    title: "Your progress",
    body: [
      "The counties you stamp and the trips you plan and everything you save along the way belong to your account. That is what makes progress survive a phone change.",
      "If you never sign in, this stays on the device and is not sent anywhere.",
    ],
  },
  {
    icon: "pin" as const,
    title: "Location",
    body: [
      "Travela reads your location only at the moment you ask it to show what is near you.",
      "There is no background location tracking. The app does not follow you and it does not keep a history of where you have been.",
    ],
  },
  {
    icon: "book" as const,
    title: "Photos and notes",
    body: [
      "Photographs and notes you attach to a trip are stored with your account so they come back when you sign in elsewhere.",
      "They are yours. We do not use them for anything else.",
    ],
  },
  {
    icon: "calendar" as const,
    title: "Events",
    body: [
      "Event listings are collected from public sources and sorted against the interests you choose.",
      "They are somebody else's listing. If an event has moved or been cancelled the organiser's own page is the final word. Following a link to it takes you off Travela.",
    ],
  },
  {
    icon: "external" as const,
    title: "Sharing trips",
    body: [
      "When you export a trip as a PDF that file goes wherever you send it. Sharing is something you do deliberately and it leaves the app at your request.",
    ],
  },
  {
    icon: "shield" as const,
    title: "What we do not do",
    body: [
      "No adverts. No ad networks. Nothing about you is sold or rented.",
      "No location history. No contact list upload. Nothing read from your phone that you did not put into the app.",
    ],
  },
  {
    icon: "check" as const,
    title: "Keeping it and deleting it",
    body: [
      "Your data is kept for as long as your account exists.",
      `To have your account and its data deleted, write to ${contact.email} from the email address on the account or call ${contact.phone}. We will delete it and confirm when it is done.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        icon="shield"
        title="What we store and what we do not"
        intro="The short version. Your trips are yours. Nothing is sold and you can have everything removed whenever you ask."
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
            <Icon name="mail" className="h-4 w-4" />
            Questions about your data
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Write to{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {contact.email}
            </a>{" "}
            or call {contact.phone} and we will answer in plain language.
          </p>
        </div>
      </section>

      <AppCta />
    </>
  );
}
