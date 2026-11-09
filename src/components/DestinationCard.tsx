import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Destination } from "@/data/destinations";
import { countyById } from "@/data/counties";

/**
 * A place, as a card.
 *
 * When the app has no convincing photograph of a place, the card falls back to its
 * category tint rather than borrowing a picture of somewhere else.
 */
export function DestinationCard({ destination }: { destination: Destination }) {
  const meta = CATEGORIES[destination.category];
  const county = countyById(destination.countyId);

  return (
    <Link
      href={`/destinations/${destination.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-30px_rgba(17,17,17,0.45)]"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {destination.photo ? (
          <Image
            src={destination.photo}
            alt={destination.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${meta.tint}26, ${meta.tint}0d)` }}
          >
            <span
              className="px-4 text-center text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: meta.tint }}
            >
              {meta.label}
            </span>
          </div>
        )}
        <span
          className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold shadow-sm"
          style={{ color: meta.tint }}
        >
          {meta.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug">{destination.name}</h3>
        <p className="mt-1 text-xs text-muted">
          {county ? `${county.name} in ${county.region}` : "Kenya"}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{destination.summary}</p>

        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-[11px] text-muted">
          {destination.best && <span>Best {destination.best}</span>}
          {destination.duration && <span>{destination.duration}</span>}
          {destination.difficulty && <span>{destination.difficulty}</span>}
          {destination.entry === "Free" && <span className="text-leaf">Free entry</span>}
        </div>
      </div>
    </Link>
  );
}
