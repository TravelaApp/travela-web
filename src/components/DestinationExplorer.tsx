"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, DESTINATIONS, categoriesPresent, type Category } from "@/data/destinations";
import { COUNTIES, countyById } from "@/data/counties";
import { DestinationCard } from "@/components/DestinationCard";
import { Icon } from "@/components/icons";

type CategoryFilter = Category | "all";
type CountyFilter = number | "all";

/** The full list, filtered in the browser: instant, and it works offline. */
export function DestinationExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [county, setCounty] = useState<CountyFilter>("all");

  const availableCounties = useMemo(
    () => COUNTIES.filter((item) => DESTINATIONS.some((place) => place.countyId === item.id)),
    [],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return DESTINATIONS.filter((place) => {
      if (category !== "all" && place.category !== category) return false;
      if (county !== "all" && place.countyId !== county) return false;
      if (!needle) return true;

      const item = countyById(place.countyId);
      const haystack = [
        place.name,
        place.summary,
        CATEGORIES[place.category].label,
        item?.name ?? "",
        item?.region ?? "",
        item?.knownFor ?? "",
        ...(place.experiences ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [query, category, county]);

  const filtered = query.trim() !== "" || category !== "all" || county !== "all";

  return (
    <div>
      <div className="rounded-3xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search destinations</span>
            <Icon name="search" className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a place or county"
              className="w-full rounded-full border border-line bg-sand/60 py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted/80 focus:border-ink"
            />
          </label>

          <label className="relative sm:w-64">
            <span className="sr-only">Filter by county</span>
            <select
              value={String(county)}
              onChange={(event) =>
                setCounty(event.target.value === "all" ? "all" : Number(event.target.value))
              }
              className="w-full appearance-none rounded-full border border-line bg-sand/60 py-3 pl-4 pr-10 text-sm outline-none transition-colors focus:border-ink"
            >
              <option value="all">Every county</option>
              {availableCounties.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <Icon name="pin" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            All
          </Chip>
          {categoriesPresent().map((item) => (
            <Chip key={item} active={category === item} onClick={() => setCategory(item)}>
              {CATEGORIES[item].label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <p>
          {results.length} {results.length === 1 ? "place" : "places"}
          {filtered ? ` found, from the ${DESTINATIONS.length} on this site` : " on this site"}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setCounty("all");
            }}
            className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">Nothing matches that</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Try a county name or clear the filters. The app carries all 188 places so there may be more inside than are
            shown here.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
            <DestinationCard key={place.id} destination={place} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
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
