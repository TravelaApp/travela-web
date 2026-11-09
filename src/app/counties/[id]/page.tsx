import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { Icon } from "@/components/icons";
import { AppCta } from "@/components/ui";
import { COUNTIES, countiesInRegion, countyById } from "@/data/counties";
import { APP_DESTINATION_COUNT, destinationsInCounty } from "@/data/destinations";

export function generateStaticParams() {
  return COUNTIES.map((county) => ({ id: String(county.id) }));
}

export async function generateMetadata({ params }: PageProps<"/counties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const county = countyById(Number(id));

  if (!county) return { title: "County not found" };

  return {
    title: `${county.name} County`,
    description: `${county.name} in the ${county.region} region of Kenya, capital ${county.capital}. ${county.knownFor}.`,
  };
}

export default function CountyPage({ params }: PageProps<"/counties/[id]">) {
  return (
    <Suspense fallback={<DetailFallback />}>
      {params.then(({ id }) => (
        <CountyDetail id={id} />
      ))}
    </Suspense>
  );
}

/** Shown only for a URL that was not one of the prerendered counties. */
function DetailFallback() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16">
      <div className="h-72 animate-pulse rounded-4xl border border-line bg-sand-deep/60 sm:h-96" />
    </section>
  );
}

function CountyDetail({ id }: { id: string }) {
  const county = countyById(Number(id));

  if (!county) notFound();

  const places = destinationsInCounty(county.id);
  const neighbours = countiesInRegion(county.region).filter((item) => item.id !== county.id);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/counties" className="transition-colors hover:text-ink">
            Counties
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/counties" className="transition-colors hover:text-ink">
            {county.region}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{county.name}</span>
        </nav>
      </section>

      <header className="mx-auto max-w-6xl px-5 pt-6">
        <div className="relative aspect-16/9 overflow-hidden rounded-4xl border border-line bg-sand-deep sm:aspect-21/9">
          {county.photo ? (
            <Image
              src={county.photo}
              alt={county.name}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Icon name="globe" className="h-10 w-10 text-muted/60" />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold">
            County {String(county.id).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <Icon name="pin" className="h-3.5 w-3.5" />
            Capital {county.capital} in {county.region} region
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">{county.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">Known for {county.knownFor}.</p>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Places in {county.name}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {places.length > 0
              ? `${places.length} of the places Travela carries for this county are featured here. The app holds the rest.`
              : `The app carries ${APP_DESTINATION_COUNT} places across the country, including more for ${county.name}. Browse the full list inside Travela.`}
          </p>
        </div>

        {places.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <DestinationCard key={place.id} destination={place} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold">Nothing featured here yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {county.name} is in the app with its own passport entry. Open Travela to see everything it carries for
              this county.
            </p>
            <Link
              href="/destinations"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Browse all featured places
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {neighbours.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Elsewhere in {county.region}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {neighbours.map((item) => (
              <Link
                key={item.id}
                href={`/counties/${item.id}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <AppCta />
    </>
  );
}
