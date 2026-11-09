import type { SVGProps } from "react";

/** One small stroke icon set, drawn inline so there is no icon dependency and glyphs inherit the text colour. */
export type IconName =
  | "map"
  | "offline"
  | "stamp"
  | "badge"
  | "route"
  | "calendar"
  | "search"
  | "book"
  | "mail"
  | "phone"
  | "pin"
  | "clock"
  | "arrow"
  | "check"
  | "compass"
  | "users"
  | "shield"
  | "star"
  | "mountain"
  | "ticket"
  | "leaf"
  | "globe"
  | "download"
  | "menu"
  | "close"
  | "external";

const ICONS: Record<IconName, React.ReactNode> = {
  map: (
    <>
      <path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </>
  ),
  offline: (
    <>
      <path d="M3 3l18 18" />
      <path d="M6.6 18h10.2a3.6 3.6 0 0 0 .7-7.15A5.6 5.6 0 0 0 7.5 9.7" />
      <path d="M6 18a3.6 3.6 0 0 1-.4-7.2" />
    </>
  ),
  stamp: (
    <>
      <path d="M4 21h16" />
      <path d="M6 21v-5.5h12V21" />
      <path d="M9 15.5V9a3 3 0 1 1 6 0v6.5" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.6 7 21l5-2.5 5 2.5-1.5-7.4" />
    </>
  ),
  route: (
    <>
      <path d="M12 3v18" />
      <path d="M5 7h11l3 3-3 3H5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  book: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h13v14H6a2 2 0 0 0-2 2Z" />
      <path d="M4 19a2 2 0 0 0 2 2h13v-4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5.3-5.3 2.2 2.2-5.3z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M17 14.6a6 6 0 0 1 4 5.4" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6Z" />,
  star: <path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9Z" />,
  mountain: <path d="m3 19 6.5-10 4.2 6.2 2.3-3.2L21 19Z" />,
  ticket: (
    <>
      <path d="M3 9V7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5V9a3 3 0 0 0 0 6v1.5A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5V15a3 3 0 0 0 0-6Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8.5 6-14 16-14 0 10-6 15.5-16 14Z" />
      <path d="M4 20c2.5-6.5 7-11 13-13.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" />
      <path d="m8 10.5 4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
  ...rest
}: { name: IconName; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {ICONS[name]}
    </svg>
  );
}
