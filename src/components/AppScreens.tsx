import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SectionHeading } from "@/components/ui";

/** The app captured on a phone. Screens are pre-sized to 640x1391; the row is laid out twice and slides one copy for a seamless loop (movement lives in globals.css). */
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 1391;

const SCREENS = Array.from({ length: 8 }, (_, index) => ({
  src: `/screenshots/screenshot-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `The Travela app on Android screen ${index + 1} of 8`,
}));

function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mr-5 w-[190px] shrink-0 sm:w-[220px] lg:w-[240px]">
      <div className="rounded-[2.25rem] border border-line bg-surface p-2 shadow-[0_30px_60px_-45px_rgba(17,17,17,0.55)]">
        <Image
          src={src}
          alt={alt}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          sizes="(max-width: 640px) 190px, 240px"
          className="h-auto w-full rounded-[1.75rem]"
        />
      </div>
    </div>
  );
}

export function AppScreens() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        title="A look inside the app"
        body="Eight screens captured on a phone. Your passport, the counties and the places you can plan around."
        action={
          <Link
            href="/download"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
          >
            Join the waitlist
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        }
      />

      <div className="marquee -mx-5 mt-10 overflow-hidden px-5 sm:mx-0 sm:px-0">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {SCREENS.map((screen) => (
                <Screen key={`${copy}-${screen.src}`} {...screen} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
