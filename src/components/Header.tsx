"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";

const NAV = [
  { href: "/destinations", label: "Destinations" },
  { href: "/counties", label: "Counties" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-sand/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-18">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/app-icon.png"
            alt=""
            width={34}
            height={34}
            className="h-8.5 w-8.5 rounded-[10px] ring-1 ring-line"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight">Travela</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isCurrent(item.href)
                  ? "bg-ink text-white"
                  : "text-muted hover:bg-sand-deep hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/download"
            className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e86000] sm:inline-flex"
          >
            Get the app
            <Icon name="arrow" className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-sand px-5 pb-5 md:hidden">
          <nav className="flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-3 text-base text-ink last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-white"
          >
            Get the app
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
