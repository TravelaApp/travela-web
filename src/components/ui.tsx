import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

/** A tinted call to action used at the end of most pages. */
export function AppCta({
  title = "Take the whole country with you",
  body = "Travela is free to download and built to keep working when the signal does not.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-12 text-white sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,107,0,0.55), rgba(255,107,0,0) 70%)" }}
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e86000]"
            >
              Get the app
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse the places
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The heading block every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  icon,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  icon?: IconName;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:pt-20">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        {icon && <Icon name={icon} className="h-4 w-4" />}
        {eyebrow}
      </div>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
    </header>
  );
}

export function SectionHeading({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        {body && <p className="mt-3 text-base leading-relaxed text-muted">{body}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-line bg-surface px-5 py-6">
      <div className="font-display text-3xl font-semibold text-ink sm:text-4xl">{value}</div>
      <div className="mt-1.5 text-sm text-muted">{label}</div>
    </div>
  );
}
