import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { badges, features, levels } from "@/data/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "What Travela does. All 47 counties with offline destination content. A stamp passport and badges. Shareable trip PDFs and events near you.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        icon="offline"
        title="What is actually inside"
        intro="Everything Travela does from the passport you fill in to the lists that keep working when the signal does not."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-line bg-surface p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold">
                <Icon name={feature.icon} />
              </span>
              <h2 className="mt-4 text-base font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="Offline on purpose"
          body="Travelling in Kenya often means leaving the signal behind so the parts you need in the middle of nowhere are the parts stored on the phone."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
              <Icon name="check" className="h-4 w-4" />
              Works with no connection
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>Every county page and its known-for note</li>
              <li>Place descriptions, tips and practical detail</li>
              <li>Your stamps, trips, favourites and badges</li>
              <li>Your saved memories and their notes</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <Icon name="offline" className="h-4 w-4" />
              Needs a connection
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>Event listings which are live</li>
              <li>Photographs which are fetched when you are online</li>
              <li>Signing in and syncing across phones</li>
              <li>Exporting a trip as a PDF to send on</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              <Icon name="shield" className="h-4 w-4" />
              Kept private
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>No adverts and nothing about you is ever sold</li>
              <li>Location is only read when you ask to find what is near you</li>
              <li>Your trips, memories and photos are yours alone</li>
              <li>Delete your account and its data whenever you ask</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="The passport and the ladder"
          body="Every county you stamp earns experience. Six levels carry you from Newcomer to Kenya Completer and badges mark the milestones along the way."
          action={
            <Link
              href="/counties"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              Start stamping
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="overflow-hidden rounded-3xl border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/60 text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Level</th>
                <th scope="col" className="px-5 py-3 font-medium">Title</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Experience</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((step) => (
                <tr key={step.title} className="border-t border-line">
                  <td className="px-5 py-3.5 text-muted">{step.level}</td>
                  <td className="px-5 py-3.5 font-medium">{step.title}</td>
                  <td className="px-5 py-3.5 text-right text-muted">{step.min} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface px-4 py-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <AppCta />
    </>
  );
}
