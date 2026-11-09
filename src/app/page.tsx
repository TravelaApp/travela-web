import Image from "next/image";
import Link from "next/link";
import { AppScreens } from "@/components/AppScreens";
import { DestinationCard } from "@/components/DestinationCard";
import { Icon } from "@/components/icons";
import { SectionHeading, Stat } from "@/components/ui";
import { COUNTIES, REGION_ORDER, countiesInRegion, regionCount } from "@/data/counties";
import { APP_DESTINATION_COUNT, DESTINATIONS, destinationById } from "@/data/destinations";
import { badges, contact, download, features, levels, partner, site, stats } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

/** Tells a search engine this page is the home of a free Android app. */
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: site.name,
  description: site.description,
  applicationCategory: "TravelApplication",
  operatingSystem: download.platform,
  url: `${siteUrl}/download`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "KES" },
  publisher: { "@id": `${siteUrl}/#organization` },
};

/** A short line-up of the places travellers ask for most: two parks, a beach and a hike. */
const FEATURED = [
  "narok-maasai-mara",
  "kajiado-amboseli",
  "kwale-diani-beach",
  "samburu-ololokwe",
]
  .map((id) => destinationById(id))
  .filter((destination) => destination !== undefined);

/** The homepage shows the shape of the app; the rest live on the features page. */
const HIGHLIGHTS = features.slice(0, 6);
const PHOTO_HIGHLIGHTS = FEATURED.filter((destination) => destination.photo).slice(0, 3);

const INSTALL_FACTS = [
  { label: "Cost", value: download.price },
  { label: "Requires", value: download.requirement },
  { label: "Download size", value: download.size },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] max-w-full -translate-x-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,107,0,0.14), rgba(255,107,0,0) 70%)" }}
        />

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            <Icon name="compass" className="h-3.5 w-3.5" />
            {site.tagline}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Every county.
            <br />
            One passport.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Travela is the travel app for Kenya. All {COUNTIES.length} counties and {APP_DESTINATION_COUNT} places
            worth the detour live in your pocket and still open when the signal drops.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
            >
              <Icon name="download" className="h-4 w-4" />
              Get the app
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Explore the places
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-leaf" />
              Free on Android
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-leaf" />
              No adverts
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-leaf" />
              Built in {contact.location}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_40px_80px_-55px_rgba(17,17,17,0.55)]">
            {PHOTO_HIGHLIGHTS[0]?.photo && (
              <Link href={`/destinations/${PHOTO_HIGHLIGHTS[0].id}`} className="group relative block aspect-[1.12] overflow-hidden">
                <Image
                  src={PHOTO_HIGHLIGHTS[0].photo}
                  alt={PHOTO_HIGHLIGHTS[0].name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent px-6 pb-6 pt-20 text-white">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    A place to begin
                  </span>
                  <span className="mt-1 block font-display text-2xl font-semibold">{PHOTO_HIGHLIGHTS[0].name}</span>
                </span>
              </Link>
            )}

            <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4">
              {PHOTO_HIGHLIGHTS.slice(1).map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.id}`}
                  className="group relative aspect-[1.35] overflow-hidden rounded-2xl bg-sand-deep"
                >
                  {destination.photo && (
                    <Image
                      src={destination.photo}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 640px) 45vw, 250px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-sm font-semibold text-white">
                    {destination.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-3xl border border-line bg-surface p-4">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-leaf/12 text-leaf">
              <Icon name="offline" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Works off the grid</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                Destination content ships with the app so the lists open at full speed in a park or on a dirt road.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <AppScreens />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          title="Why people keep it open"
          body="A pocket guide to the whole country built to be useful on the road rather than only in the planning."
          action={
            <Link
              href="/features"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              See all features
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-line bg-surface p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold">
                <Icon name={feature.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          title="Places travellers love"
          body={`A handful of favourites from the Mara to the reef. The app carries all ${APP_DESTINATION_COUNT}.`}
          action={
            <Link
              href="/destinations"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              All {DESTINATIONS.length} featured places
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          title="Eight regions and 47 counties"
          body="Browse by the part of the country you are heading to or search a county by name and capital town."
          action={
            <Link
              href="/counties"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink"
            >
              See the counties
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGION_ORDER.map((region) => (
            <Link
              key={region}
              href="/counties"
              className="group rounded-3xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-30px_rgba(17,17,17,0.45)]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-semibold">{region}</h3>
                <span className="font-display text-2xl font-semibold text-sand-deep transition-colors group-hover:text-gold">
                  {String(regionCount(region)).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {countiesInRegion(region)
                  .slice(0, 4)
                  .map((county) => county.name)
                  .join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <Icon name="badge" className="h-4 w-4" />
              Progress
            </div>
            <h2 className="mt-4 text-2xl font-semibold">From Newcomer to Kenya Completer</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Visiting counties, attending events and planning trips earn experience that moves you up the ladder.
            </p>

            <ol className="mt-6 space-y-2.5">
              {levels.map((step) => (
                <li
                  key={step.title}
                  className="flex items-center justify-between rounded-2xl border border-line bg-sand/50 px-4 py-3"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                      {step.level}
                    </span>
                    <span className="font-medium">{step.title}</span>
                  </span>
                  <span className="text-xs text-muted">{step.min} XP</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
              <Icon name="star" className="h-4 w-4" />
              Badges
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Ten things worth collecting</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Start with First stamp for your first county, then work your way toward Kenya Completer.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {badges.map((item) => (
                <li key={item.title} className="rounded-2xl border border-line bg-sand/50 px-4 py-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-8 rounded-4xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <Icon name="users" className="h-4 w-4" />
              Travel partner
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl object-contain ring-1 ring-line"
              />
              <h2 className="text-2xl font-semibold">{partner.name}</h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{partner.description}</p>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Phone</dt>
              <dd>
                <a href="tel:+254795723450" className="transition-colors hover:text-ink">
                  {partner.contact}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Location</dt>
              <dd>{partner.location}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="external" className="h-4 w-4 shrink-0 text-muted" />
              <dt className="sr-only">Website</dt>
              <dd>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  remaxsafaris.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-12 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,107,0,0.55), rgba(255,107,0,0) 70%)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                <Icon name="download" className="h-4 w-4" />
                Free on {download.platform}
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Take the whole country with you</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Leave your email and we send the current build with the two steps to install it. It takes a minute and
                it keeps working where the signal stops.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e86000]"
                >
                  Get the app
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <dl className="space-y-3 rounded-3xl border border-white/12 bg-white/5 p-6 text-sm">
              {INSTALL_FACTS.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-4">
                  <dt className="text-white/60">{fact.label}</dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
