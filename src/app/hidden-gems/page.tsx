import type { Metadata } from "next";
import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { destinationById, gems } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Hidden gems",
  description:
    "Quiet corners across Kenya that Travela highlights in the app, plus a Coast long-weekend line-up. Join the waitlist for early access on Android.",
};

// Coast gem ids for the long-weekend block below.
const COAST_WEEKEND_IDS = [
  "kilifi-mida-creek",
  "kilifi-the-cave-watamu",
  "kwale-tiwi-african-pool",
  "kwale-kongo-river",
  "mombasa-fort-jesus",
] as const;

const COAST_WEEKEND = COAST_WEEKEND_IDS.map((id) => destinationById(id)).filter(
  (place): place is NonNullable<ReturnType<typeof destinationById>> => Boolean(place),
);

export default function HiddenGemsPage() {
  const allGems = gems();

  return (
    <>
      <PageHeader
        eyebrow="Hidden gems"
        icon="compass"
        title="The places worth leaving the main road"
        intro="Quiet stops from the app's Hidden gems list. Read them here, then plan and stamp them in the Android app when you have early access."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="Coast long weekend"
          body="A loose three-day arc: creek and reef one day, a hidden pool the next, history and night markets in Mombasa. Open the full list offline in the app when you are on the road."
        />
        <ol className="mb-10 space-y-4 border-l-2 border-gold/40 pl-6 text-sm leading-relaxed text-muted">
          <li>
            <span className="font-medium text-ink">Day 1: Watamu and Mida Creek</span>. Paddle or walk the boardwalk,
            then duck into The Cave for lunch above the tide line.
          </li>
          <li>
            <span className="font-medium text-ink">Day 2: South coast</span>. The African Pool at Tiwi for a swim,
            then follow Kongo River where the forest meets the sand.
          </li>
          <li>
            <span className="font-medium text-ink">Day 3: Mombasa</span>. Fort Jesus for the history, then Nyali or
            Diani depending on how much beach you still want.
          </li>
        </ol>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COAST_WEEKEND.map((place) => (
            <DestinationCard key={place.id} destination={place} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          In the app you turn this into a trip with dates, checklists, and a PDF to send to whoever is driving.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="Every hidden gem in Travela"
          body="The same set as Hidden gems in the app. All of them work offline once installed."
          action={
            <Link
              href="/destinations"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              All destinations
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allGems.map((place) => (
            <DestinationCard key={place.id} destination={place} />
          ))}
        </div>
      </section>

      <AppCta
        title="Plan the detours in the app"
        body="Hidden gems are easiest when the list works without a signal and the trip lives in one place. Join the waitlist for closed testing on Android."
        secondaryHref="/features"
        secondaryLabel="What the app does"
      />
    </>
  );
}