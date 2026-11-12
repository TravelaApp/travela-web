import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader } from "@/components/ui";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to ask Travela to delete your account and its data, what is removed, what is kept and how long it takes.",
};

const DELETED = [
  "Your account and the email address on it.",
  "Your display name and profile picture, if you added them.",
  "Your progress: visits and stamps, trips and their stops, favourites, badges and experience.",
  "The photos and notes you attached to your trips.",
  "Your waitlist details, if you joined the waitlist.",
];

const KEPT = [
  "A copy may briefly remain in an encrypted backup before it is overwritten on our normal cycle.",
  "We keep a minimal record of the request itself, such as the email address and the date, so we can show the deletion was carried out.",
  "Anything the law requires us to keep.",
];

export default function AccountDeletionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        icon="users"
        title="Delete your account"
        intro="How to close your Travela account, what gets removed, what we keep and how long it takes."
      />

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold">How to ask</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              There is no self-service delete button in the app today. In the app you can sign out and reset your
              progress on the device from the settings screen, which clears what is stored on that phone. That does not
              delete your account or the copy we hold. For that, contact us and ask us to delete the account.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sand-deep"
              >
                <Icon name="mail" className="h-4 w-4 text-gold" />
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sand-deep"
              >
                <Icon name="phone" className="h-4 w-4 text-gold" />
                {contact.phone}
              </a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Write from the email address on the account where you can, and tell us you want the account deleted. We
              may ask a question or two so we know it is you before we go ahead.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold">What is deleted</h2>
            <ul className="mt-4 space-y-2">
              {DELETED.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold">What we keep</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Very little, and only for a short time.</p>
            <ul className="mt-4 space-y-2">
              {KEPT.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">Nothing else is kept, and we never sell your data.</p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold">How long it takes</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We aim to complete a deletion within 30 days of confirming it is you, and it is often much sooner. We
              email you when it is done.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold">More detail</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              For the full picture of what we store and for how long, see our{" "}
              <Link
                href="/privacy"
                className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <AppCta />
    </>
  );
}
