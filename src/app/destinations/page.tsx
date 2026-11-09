import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/DestinationExplorer";
import { AppCta, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Search and filter the places Travela features across Kenya by name, county or category from national parks to markets.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        icon="map"
        title="Find somewhere worth the drive"
        intro="Filter by county or by the kind of day you want. Everything here is in the app too where the full list works without a signal."
      />

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <DestinationExplorer />
      </section>

      <AppCta />
    </>
  );
}
