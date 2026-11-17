// Site copy and contact details (keep aligned with travela-app).

export const site = {
  name: "Travela",
  tagline: "Explore Kenya's 45 counties",
  description:
    "Travela is the travel app for Kenya. It covers 45 counties and the places inside them and it keeps working when you lose signal.",
} as const;

export const contact = {
  email: "info@travelaapp.co.ke",
  supportEmail: "support@travelaapp.co.ke",
  phone: "0714532213",
  phoneHref: "tel:+254714532213",
  location: "Nairobi, Kenya",
} as const;

export const socials = [
  { label: "X", handle: "@travelaapp", url: "https://x.com/travelaapp" },
  { label: "TikTok", handle: "@travelaapp", url: "https://www.tiktok.com/@travelaapp" },
] as const;

export const partner = {
  name: "Remax Safaris",
  logo: "/partners/remax-safaris.png",
  contact: "0795723450",
  location: "ACS Plaza, Kilimani",
  website: "https://remaxsafaris.com/",
  description:
    "Local tour guides for safaris and city tours. Trips are tailored to what you want to see, anywhere in the 45 counties.",
} as const;

/**
 * Install facts and launch mode. Flip `mode` to `play` and set `playUrl` when the public listing is live.
 * Until then the site must not show a store badge that pretends anyone can install from a public URL.
 */
export const download = {
  platform: "Android",
  requirement: "Android 8.0 or newer",
  size: "around 100 MB",
  price: "Free",
  store: "Google Play",
  mode: "waitlist" as "waitlist" | "play",
  playUrl: undefined as string | undefined,
  accessLabel: "Closed testing on Android",
} as const;

export const appCta = {
  eyebrow: "Early access",
  title: "The app is where the passport lives",
  body: "Use this site to discover places. On Android, Travela stamps counties, plans trips offline, and keeps your badges and memories. Join the waitlist for tester invites and the public launch.",
  primaryLabel: "Join the waitlist",
  secondaryHref: "/destinations",
  secondaryLabel: "Browse the places",
} as const;

export function appCtaForPlace(placeName: string, countyName: string) {
  return {
    title: `Save ${placeName} to a trip in the app`,
    body: `Add ${placeName} in ${countyName} County to an itinerary that still opens without a signal, then stamp the county when you arrive. Join the waitlist for early access on Android.`,
  };
}

export function appCtaForCounty(countyName: string) {
  return {
    title: `Stamp ${countyName} in the app`,
    body: `This page is a preview. In Travela you mark ${countyName} visited, see every place inside the county offline, and earn passport experience. Join the waitlist while we finish closed testing.`,
  };
}

export const earlyTesterGets = [
  "All 222 places and 45 counties stored on your phone",
  "Trips with checklists and PDF export to share",
  "Live events matched to your interests",
  "Stamps, badges and trip memories tied to your account",
  "A direct line to the team while we polish the listing",
] as const;

export const webVsApp = {
  siteTitle: "This website",
  siteBody:
    "Read counties and places, compare options, and join the waitlist. Good for planning at a desk or on Wi-Fi.",
  appTitle: "The Travela app",
  appBody:
    "The full experience: offline lists, stamping, trips, events, search, and sync when you sign in. That is what we are shipping on Android.",
} as const;

export const privacy = [
  {
    icon: "shield" as const,
    title: "No adverts at all",
    body: "Nothing is sold, rented or shared with advertisers. There is no ad network in the app.",
  },
  {
    icon: "pin" as const,
    title: "Location only when you ask",
    body: "Travela reads where you are at the moment you ask what is nearby. It never tracks you in the background.",
  },
  {
    icon: "book" as const,
    title: "Your trips stay yours",
    body: "Your stamps, trips, memories and photos belong to your account and nowhere else.",
  },
  {
    icon: "check" as const,
    title: "Delete it whenever you want",
    body: "Ask us to remove your account and everything in it. We confirm once it is done.",
  },
] as const;

export interface Feature {
  title: string;
  body: string;
  icon: "map" | "offline" | "stamp" | "badge" | "route" | "calendar" | "search" | "book";
}

export const features: Feature[] = [
  {
    title: "All 45 counties",
    body: "A passport of the whole country with the reason each county is worth the trip.",
    icon: "map",
  },
  {
    title: "Works without a signal",
    body: "Everything about a place is stored on your phone, so the lists open instantly wherever you are.",
    icon: "offline",
  },
  {
    title: "Stamp your counties",
    body: "Mark a county visited and it joins your passport, so you can see how much of Kenya you have covered.",
    icon: "stamp",
  },
  {
    title: "Badges as you go",
    body: "Ten badges mark the milestones, from your first county all the way to Kenya Completer.",
    icon: "badge",
  },
  {
    title: "Trips you can share",
    body: "Plan a trip and add your stops. Export the whole itinerary as a PDF to send to whoever you are travelling with.",
    icon: "route",
  },
  {
    title: "Events near you",
    body: "Markets, concerts and festivals chosen by the interests you set rather than by whatever is loudest.",
    icon: "calendar",
  },
  {
    title: "Search the country",
    body: "Search a name, county, sub-county or category at once. Results never hide behind wherever you happen to be standing.",
    icon: "search",
  },
  {
    title: "A diary of the visits",
    body: "Attach photos and notes to the places you have been, so the memory stays with the place instead of in your camera roll.",
    icon: "book",
  },
];

// XP thresholds match the app.
export const levels = [
  { level: 1, title: "Newcomer", min: 0 },
  { level: 2, title: "Msafiri", min: 200 },
  { level: 3, title: "Trailblazer", min: 600 },
  { level: 4, title: "Safari Veteran", min: 1400 },
  { level: 5, title: "County Champion", min: 2600 },
  { level: 6, title: "Kenya Completer", min: 4700 },
] as const;

export const badges = [
  { title: "First stamp", desc: "Visit your first county", icon: "stamp" as const },
  { title: "High five", desc: "Visit 5 counties", icon: "stamp" as const },
  { title: "Double digits", desc: "Visit 10 counties", icon: "stamp" as const },
  { title: "Halfway there", desc: "Visit 25 counties", icon: "stamp" as const },
  { title: "Kenya Completer", desc: "Visit all 45 counties", icon: "badge" as const },
  { title: "Event goer", desc: "Attend 5 events", icon: "ticket" as const },
  { title: "Planner", desc: "Create 3 trips", icon: "route" as const },
  { title: "Trip complete", desc: "Finish your first trip", icon: "check" as const },
  { title: "Memory keeper", desc: "Save 10 trip memories", icon: "book" as const },
  { title: "Week streak", desc: "Open Travela 7 days in a row", icon: "star" as const },
];

export interface Faq {
  q: string;
  a: string;
}

export const waitlistFaqs: Faq[] = [
  {
    q: "What is the difference between this website and the app?",
    a: "The website helps you explore counties and places before you travel. The Android app is the real product: offline lists, stamping counties, trips, events, badges and memories. Both draw on the same place data; only the app tracks your passport.",
  },
  {
    q: "Why is there no Google Play install button?",
    a: "Travela is in closed testing on Google Play while we finish the store listing. Join the waitlist and we will email you when you can install, either with a tester invite or when the public listing goes live.",
  },
  {
    q: "How do I become a closed tester?",
    a: `Join the waitlist or email ${contact.email} from the Gmail address you use on Google Play. When we have tester slots, Google sends a Play invite to that address. There is no public store link yet.`,
  },
  {
    q: "Does joining the waitlist install the app?",
    a: "No. The waitlist only holds your email for launch and tester news. Installing still happens through Google Play once you receive an invite or the listing is public.",
  },
];

export const faqs: Faq[] = [
  ...waitlistFaqs,
  {
    q: "Which counties does Travela cover?",
    a: "All 45. Every county gets its own page with what it is known for and the places inside it, plus the practical detail such as the best months to go, how long a visit takes and how hard the walk is.",
  },
  {
    q: "Does it work without internet?",
    a: "The destination content does. Places and their notes are stored on your phone, so the lists and the county pages open at full speed with no signal. Events are live, so those need a connection.",
  },
  {
    q: "Do I need an account?",
    a: "You do, because your visits, trips, favourites and badges are yours and they follow you to a new phone. Sign up with an email address or continue with Google.",
  },
  {
    q: "How do the badges work?",
    a: "You earn experience for visiting counties, attending events, planning trips and saving memories. It moves you from Newcomer up to Kenya Completer and unlocks badges along the way, starting with First stamp for your first county.",
  },
  {
    q: "Can I share my itinerary?",
    a: "Yes. Any trip can be exported as a PDF with its stops and details, which is easier to send on than a screenshot.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Travela is free to download and free to use with no adverts and no paid tiers.",
  },
  {
    q: "Something is wrong or I want to suggest a place.",
    a: `Write to ${contact.email} or call ${contact.phone}. Tell us the county and the place and we will look at it.`,
  },
];

export const stats = [
  { value: "45", label: "Counties covered" },
  { value: "222", label: "Places in the app" },
  { value: "6", label: "Levels to Kenya Completer" },
  { value: "0", label: "Places that need a signal" },
] as const;
