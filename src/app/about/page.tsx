import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { AppCta, PageHeader, SectionHeading, Stat } from "@/components/ui";
import { COUNTIES, REGION_ORDER } from "@/data/counties";
import { contact, faqs, site, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        icon="compass"
        title="A travel app for the whole country"
        intro="Travela began with a simple annoyance. Most Kenyan travel lists stop at the same handful of parks while the country is 47 counties wide and most of it is worth a weekend."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              Travela is built around a passport. Each of the {COUNTIES.length} counties has its own entry that tells
              you the reason to go, what the county is known for, the places inside it, the best months, how long a
              visit takes and how hard the walk is. Mark a county visited and it joins your passport.
            </p>
            <p>
              The country is treated as a whole. Coast, Rift Valley, Western, Nyanza, Central, Eastern, North Eastern
              and Nairobi are all first-class, so a trip to Turkana or Mandera gets the same care as a weekend in
              Naivasha.
            </p>
            <p>
              Kenya also has a lot of places with no signal at all, which shapes how the app is built. Destination
              content is bundled with the app rather than fetched, so the lists and the county pages open at full speed
              in a park, in the valley or on a murram road.
            </p>
            <p>
              Travela is a destination-first app. It is not an animal encyclopedia and it does not try to be one. Events
              sit alongside the places as a second and smaller focus. Useful when you are around, never the reason the
              app exists.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">The country by region</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {REGION_ORDER.map((region) => (
                  <li key={region} className="flex items-center justify-between">
                    <span className="text-muted">{region}</span>
                    <span className="font-medium">
                      {COUNTIES.filter((county) => county.region === region).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Built in</h2>
              <p className="mt-3 flex items-center gap-2 text-sm">
                <Icon name="pin" className="h-4 w-4 text-muted" />
                {contact.location}
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Talk to us
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeading
          title="Questions people actually ask"
          body={`Still unsure about something? Write to ${contact.email} or call ${contact.phone}.`}
        />

        <div className="grid gap-3 lg:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl border border-line bg-surface px-5 py-4 open:bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="text-muted transition-transform group-open:rotate-45"
                >
                  <Icon name="close" className="h-4 w-4 rotate-45" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AppCta />
    </>
  );
}
