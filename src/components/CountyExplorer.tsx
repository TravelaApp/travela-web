"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COUNTIES, REGION_ORDER, type Region } from "@/data/counties";
import { DESTINATIONS } from "@/data/destinations";
import { Icon } from "@/components/icons";

type RegionFilter = Region | "all";

export function CountyExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");

  const placesByCounty = useMemo(() => {
    const counts = new Map<number, number>();
    for (const place of DESTINATIONS) {
      counts.set(place.countyId, (counts.get(place.countyId) ?? 0) + 1);
    }
    return counts;
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return COUNTIES.filter((county) => {
      if (region !== "all" && county.region !== region) return false;
      if (!needle) return true;
      return [county.name, county.capital, county.region, county.knownFor]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, region]);

  return (
    <div>
      <div className="rounded-3xl border border-line bg-surface p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search counties</span>
          <Icon name="search" className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a county or its capital town"
            className="w-full rounded-full border border-line bg-sand/60 py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted/80 focus:border-ink"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <RegionChip active={region === "all"} onClick={() => setRegion("all")}>
            All regions
          </RegionChip>
          {REGION_ORDER.map((item) => (
            <RegionChip key={item} active={region === item} onClick={() => setRegion(item)}>
              {item}
            </RegionChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "county" : "counties"}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">No county by that name</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Check the spelling or pick a region above.</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((county) => {
            const count = placesByCounty.get(county.id) ?? 0;
            return (
              <Link
                key={county.id}
                href={`/counties/${county.id}`}
                className="group overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-30px_rgba(17,17,17,0.45)]"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-sand-deep">
                  {county.photo ? (
                    <Image
                      src={county.photo}
                      alt={county.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-sand-deep">
                      <Icon name="globe" className="h-7 w-7 text-muted/70" />
                    </div>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
                    {String(county.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold">{county.name}</h3>
                  <p className="mt-1 text-xs text-muted">
                    Capital {county.capital} in {county.region} region
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{county.knownFor}</p>
                  <p className="mt-4 text-xs font-medium text-leaf">
                    {count > 0
                      ? `${count} featured ${count === 1 ? "place" : "places"}`
                      : "Full list inside the app"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RegionChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
        active ? "border-ink bg-ink text-white" : "border-line bg-sand/60 text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
