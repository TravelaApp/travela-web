import type { Metadata } from "next";
import Link from "next/link";
import { PartnerCard } from "@/components/PartnerCard";
import { PartnerForm } from "@/components/PartnerForm";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader } from "@/components/ui";
import { carHirePartners, contact, partnersPage, travelPartners } from "@/data/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Travela partners with tour operators and car hire providers across Kenya. Meet Remax Safaris and apply to join as a travel or car hire partner.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        icon="users"
        title="Operators we trust"
        intro={partnersPage.intro}
      />

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          <Icon name="route" className="h-4 w-4" />
          Travel partners
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Safaris, guides and curated experiences recommended inside Travela and on this site.
        </p>
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {travelPartners.map((p) => (
            <li key={p.name}>
              <PartnerCard partner={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
          <Icon name="map" className="h-4 w-4" />
          Car hire partners
        </div>
        {carHirePartners.length > 0 ? (
          <ul className="mt-6 grid gap-4 lg:grid-cols-2">
            {carHirePartners.map((p) => (
              <li key={p.name}>
                <PartnerCard partner={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-4xl border border-dashed border-line bg-sand-deep/40 px-6 py-10 sm:px-10">
            <h2 className="text-lg font-semibold">Partners coming soon</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{partnersPage.carHireEmpty}</p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl font-semibold">{partnersPage.onboardTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{partnersPage.onboardBody}</p>
        <a
          href={`mailto:${contact.partnersEmail}?subject=Travela%20partner%20enquiry`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
        >
          <Icon name="mail" className="h-4 w-4" />
          {contact.partnersEmail}
        </a>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <PartnerForm />
          <div className="rounded-4xl border border-line bg-sand-deep/50 p-7 sm:p-9">
            <h3 className="text-lg font-semibold">What we look for</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                Licensed operators with clear pricing and support contacts
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                Coverage in one or more of Kenya&apos;s 45 counties
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                Car hire: roadworthy fleet, insurance and pickup options travellers can trust
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                Willingness to honour bookings referred from Travela travellers
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              General support stays at{" "}
              <Link href="/contact" className="underline decoration-line underline-offset-2 hover:text-ink">
                {contact.email}
              </Link>
              . Partner onboarding only uses {contact.partnersEmail}.
            </p>
          </div>
        </div>
      </section>

      <AppCta />
    </>
  );
}