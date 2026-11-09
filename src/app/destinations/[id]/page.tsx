import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { Icon } from "@/components/icons";
import { AppCta } from "@/components/ui";
import { countyById } from "@/data/counties";
import { CATEGORIES, DESTINATIONS, destinationById, destinationsInCounty } from "@/data/destinations";

export function generateStaticParams() {
  return DESTINATIONS.map((destination) => ({ id: destination.id }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[id]">): Promise<Metadata> {
  const { id } = await params;
  const destination = destinationById(id);

  if (!destination) return { title: "Place not found" };

  return { title: destination.name, description: destination.summary };
}

export default function DestinationPage({ params }: PageProps<"/destinations/[id]">) {
  return (
    <Suspense fallback={<DetailFallback />}>
      {params.then(({ id }) => (
        <DestinationDetail id={id} />
      ))}
    </Suspense>
  );
}

/** Shown only for a URL that was not one of the prerendered places. */
function DetailFallback() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16">
      <div className="h-72 animate-pulse rounded-4xl border border-line bg-sand-deep/60 sm:h-96" />
    </section>
  );
}

function DestinationDetail({ id }: { id: string }) {
  const destination = destinationById(id);

  if (!destination) notFound();

  const category = CATEGORIES[destination.category];
  const county = countyById(destination.countyId);
  const nearby = destinationsInCounty(destination.countyId).filter((place) => place.id !== destination.id);

  const facts = [
    { icon: "calendar" as const, label: "Best time", value: destination.best },
    { icon: "clock" as const, label: "Time needed", value: destination.duration },
    { icon: "mountain" as const, label: "Effort", value: destination.difficulty },
    { icon: "ticket" as const, label: "Entry", value: destination.entry },
    { icon: "route" as const, label: "Getting there", value: destination.access },
  ].filter((fact) => fact.value);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/destinations" className="transition-colors hover:text-ink">
            Destinations
          </Link>
          <span aria-hidden="true">/</span>
          {county && (
            <>
              <Link href={`/counties/${county.id}`} className="transition-colors hover:text-ink">
                {county.name}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-ink">{destination.name}</span>
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-6">
        <div className="relative aspect-16/9 overflow-hidden rounded-4xl border border-line bg-sand-deep sm:aspect-21/9">
          {destination.photo ? (
            <Image
              src={destination.photo}
              alt={destination.name}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: `linear-gradient(140deg, ${category.tint}26, ${category.tint}0d)` }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: category.tint }}
              >
                {category.label}
              </span>
            </div>
          )}
        </div>
      </section>

      <header className="mx-auto max-w-6xl px-5 pt-9">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${category.tint}1a`, color: category.tint }}
          >
            {category.label}
          </span>
          {county && (
            <Link
              href={`/counties/${county.id}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
            >
              <Icon name="pin" className="h-3.5 w-3.5" />
              {county.name} in {county.region}
            </Link>
          )}
        </div>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">{destination.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{destination.summary}</p>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            {destination.whatToExpect && (
              <>
                <h2 className="text-xl font-semibold">What to expect</h2>
                <p className="mt-3 leading-relaxed text-muted">{destination.whatToExpect}</p>
              </>
            )}

            {destination.experiences && destination.experiences.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-semibold">Things to do here</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {destination.experiences.map((experience) => (
                    <li
                      key={experience}
                      className="rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-muted"
                    >
                      {experience}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {destination.tips && destination.tips.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-semibold">Good to know</h2>
                <ul className="mt-4 space-y-3">
                  {destination.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">The practical bit</h2>
              <dl className="mt-5 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex gap-3">
                    <Icon name={fact.icon} className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                      <dd className="mt-0.5 text-sm text-ink">{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-4 px-1 text-xs leading-relaxed text-muted">
              Opening times and park fees change. The app carries the same notes and the park&rsquo;s own page is
              always the final word.
            </p>
          </aside>
        </div>
      </section>

      {nearby.length > 0 && county && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Also in {county.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">{county.knownFor}.</p>
            </div>
            <Link
              href={`/counties/${county.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              All of {county.name}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((place) => (
              <DestinationCard key={place.id} destination={place} />
            ))}
          </div>
        </section>
      )}

      <AppCta />
    </>
  );
}
