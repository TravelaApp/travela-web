import type { Metadata } from "next";
import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { DestinationExplorer } from "@/components/DestinationExplorer";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading } from "@/components/ui";
import { gems, popular } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A curated look at the places Travela features across Kenya, from hidden gems to the famous parks, with a full searchable list to browse.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        icon="map"
        title="Find somewhere worth the drive"
        intro="A selection of the places Travela features, from quiet corners to the famous names. The app carries all 222 places and keeps working without a signal."
      />

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <SectionHeading
          title="Hidden gems"
          body="The quieter, less-visited places worth a detour."
          action={
            <Link
              href="/hidden-gems"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              Coast long weekend
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gems().map((place) => (
            <DestinationCard key={place.id} destination={place} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4 pt-14">
        <SectionHeading title="Popular" body="The places most travellers start with." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular().map((place) => (
            <DestinationCard key={place.id} destination={place} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4 pt-14">
        <SectionHeading
          title="Browse everything"
          body="Search and filter the places on this site by name, county or category."
        />
        <DestinationExplorer />
      </section>

      <AppCta />
    </>
  );
}
