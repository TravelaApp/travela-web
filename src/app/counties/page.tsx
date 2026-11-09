import type { Metadata } from "next";
import { CountyExplorer } from "@/components/CountyExplorer";
import { AppCta, PageHeader } from "@/components/ui";
import { COUNTIES, REGION_ORDER } from "@/data/counties";

export const metadata: Metadata = {
  title: "The 47 counties",
  description:
    "Every county in Kenya with what it is known for plus its capital town and the places Travela carries inside it.",
};

export default function CountiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Counties"
        icon="compass"
        title="All 47 in one passport"
        intro={`${COUNTIES.length} counties across ${REGION_ORDER.length} regions. Search by name or capital town. You can also start from the part of the country you are heading to.`}
      />

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <CountyExplorer />
      </section>

      <AppCta />
    </>
  );
}
