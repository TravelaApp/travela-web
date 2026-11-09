import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gold-soft text-gold">
        <Icon name="compass" className="h-6 w-6" />
      </span>

      <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">This one is off the map</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you were after does not exist. The counties and the places are all still where you left them.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
        >
          Back to the start
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Browse the places
        </Link>
      </div>
    </section>
  );
}
