/** Everything the site says about the product: one source for contact details, feature copy and marketing claims, so nothing drifts from the app. */

export const site = {
  name: "Travela",
  tagline: "Explore Kenya's 47 counties",
  description:
    "Travela is the travel app for Kenya. It covers all 47 counties and the places inside them and it keeps working when you lose signal.",
} as const;

export const contact = {
  email: "travelaapps@gmail.com",
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
    "Local tour guides for safaris and city tours. Trips are tailored to what you want to see, anywhere in the 47 counties.",
} as const;

/** The facts a person needs before installing, all of them true today. */
export const download = {
  platform: "Android",
  requirement: "Android 8.0 or newer",
  size: "around 100 MB",
  price: "Free",
  status: "Direct download while the Play Store listing is prepared",
} as const;

/** Plain-language privacy, for the person using the app rather than for a lawyer. */
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
    title: "All 47 counties",
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

/** The app's real levelling, so the site does not promise a different ladder. */
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
  { title: "Kenya Completer", desc: "Visit all 47 counties", icon: "badge" as const },
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

export const faqs: Faq[] = [
  {
    q: "Which counties does Travela cover?",
    a: "All 47. Every county gets its own page with what it is known for and the places inside it, plus the practical detail such as the best months to go, how long a visit takes and how hard the walk is.",
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
  { value: "47", label: "Counties covered" },
  { value: "188", label: "Places in the app" },
  { value: "6", label: "Levels to Kenya Completer" },
  { value: "0", label: "Places that need a signal" },
] as const;
