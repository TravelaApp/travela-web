/**
 * The app's own destination content, so the copy and photos match what a user sees in Travela.
 * The app carries the full list (188 places); the site carries highlights, so lists here are selections, not totals.
 */

export type Category =
  | "park"
  | "beach"
  | "museum"
  | "viewpoint"
  | "cultural"
  | "market"
  | "hike"
  | "wildlife"
  | "historic"
  | "lake"
  | "forest"
  | "island"
  | "town"
  | "adventure";

export const CATEGORIES: Record<Category, { label: string; tint: string }> = {
  park: { label: "National park", tint: "#2E7D4F" },
  beach: { label: "Beach", tint: "#0E7490" },
  museum: { label: "Museum", tint: "#6D28D9" },
  viewpoint: { label: "Viewpoint", tint: "#B45309" },
  cultural: { label: "Cultural site", tint: "#B3261E" },
  market: { label: "Market", tint: "#0369A1" },
  hike: { label: "Hike", tint: "#4D7C0F" },
  wildlife: { label: "Wildlife", tint: "#92400E" },
  historic: { label: "Historic site", tint: "#57534E" },
  lake: { label: "Lake", tint: "#0891B2" },
  forest: { label: "Forest", tint: "#15803D" },
  island: { label: "Island", tint: "#0D9488" },
  town: { label: "Town", tint: "#334155" },
  adventure: { label: "Adventure", tint: "#C2410C" },
};

export interface Destination {
  id: string;
  name: string;
  countyId: number;
  category: Category;
  summary: string;
  photo?: string;
  best?: string;
  duration?: string;
  difficulty?: "Easy" | "Moderate" | "Challenging";
  /** Only stated where entry is genuinely free. Park fees change every year. */
  entry?: string;
  experiences?: string[];
  whatToExpect?: string;
  tips?: string[];
  access?: string;
}

const t = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

const d = (
  countyId: number,
  id: string,
  name: string,
  category: Category,
  summary: string,
  extra: Omit<Destination, "countyId" | "id" | "name" | "category" | "summary"> = {},
): Destination => ({ countyId, id, name, category, summary, ...extra });

export const DESTINATIONS: Destination[] = [
  // ---------------------------------------------------------------- Coast ----
  d(1, "mombasa-fort-jesus", "Fort Jesus", "historic", "A 16th-century Portuguese fort on the harbour with coral walls and cannons.", {
    photo: `${t}/d/d4/Fort_Jesus%2C_2025_%2828%29.jpg/1280px-Fort_Jesus%2C_2025_%2828%29.jpg`,
    duration: "2 to 3 hrs",
    difficulty: "Easy",
    access: "Walkable from Old Town",
    experiences: ["Old Town walk", "Museum inside the fort", "Sunset photos over the harbour"],
    whatToExpect: "A massive Portuguese fortification with high coral walls and cannons. Inside sits a museum of finds from shipwrecks and coastal history. The walls look out over the whole harbour.",
    tips: ["Go early or late afternoon to avoid the heat", "Hire an official guide at the entrance for better context", "The sound and light show in the evening is worth it"],
  }),
  d(1, "mombasa-old-town", "Old Town & Spice Market", "market", "Carved doors, balconies and spice stalls in the Swahili quarter beside the fort.", {
    duration: "1 to 2 hrs",
    difficulty: "Easy",
    access: "Walkable",
    experiences: ["Spice shopping", "Swahili door spotting", "Street food"],
  }),
  d(1, "mombasa-nyali-beach", "Nyali Beach", "beach", "The city's easiest beach. White sand and warm water within walking distance of town.", {
    entry: "Free",
    experiences: ["Swimming", "Sunset walk", "Dhow ride"],
  }),
  d(1, "mombasa-haller-park", "Haller Park", "wildlife", "A reclaimed quarry that became a wildlife sanctuary for giraffes, hippos and giant tortoises.", {
    duration: "2 hrs",
    experiences: ["Giraffe feeding", "Hippo pools", "Nature trail"],
  }),
  d(2, "kwale-diani-beach", "Diani Beach", "beach", "Repeatedly voted the best beach in Africa for its powder sand and warm shallows.", {
    photo: `${t}/2/2d/Diani_Beach_Ukunda.jpg/1280px-Diani_Beach_Ukunda.jpg`,
    best: "Dec to Mar",
    difficulty: "Easy",
    access: "Accessible by taxi or tuk-tuk from Ukunda",
    experiences: ["Swimming", "Kitesurfing", "Snorkelling", "Beach walks at low tide"],
    whatToExpect: "White sand that stays cool even in the midday sun and turquoise water held back by a coral reef. Palms line the whole beach and colobus monkeys often pass through.",
    tips: ["The low tide is perfect for walking out to the sandbanks", "Visit the Colobus Conservation nearby", "Try a seafood platter at one of the beach bars"],
  }),
  d(2, "kwale-shimba-hills", "Shimba Hills National Reserve", "park", "Green coastal hills holding Kenya's only population of sable antelope.", {
    difficulty: "Moderate",
    access: "4x4 recommended",
    experiences: ["Game drive", "Sheldrick Falls walk", "Birdwatching"],
    whatToExpect: "A unique blend of tropical rainforest and open grasslands. It is much cooler than the coast and offers views all the way to the ocean on clear days.",
    tips: ["Wear sturdy shoes for the hike to Sheldrick Falls", "Bring a jacket as it can get misty", "Keep an eye out for the rare sable antelope"],
  }),
  d(2, "kwale-kisite-mpunguti", "Kisite-Mpunguti Marine Park", "wildlife", "Reef and sandbank off Shimoni where you can snorkel straight off a dhow.", {
    experiences: ["Snorkelling", "Dolphin spotting", "Dhow sail"],
  }),
  d(3, "kilifi-watamu-marine-park", "Watamu Marine National Park", "wildlife", "Coral gardens and turtle bays protected since 1968, minutes from the shore.", {
    photo: `${t}/0/09/Watamu_Beach%2C_Kenya_08.jpg/1280px-Watamu_Beach%2C_Kenya_08.jpg`,
    experiences: ["Snorkelling", "Glass-bottom boat", "Turtle watching"],
  }),
  d(3, "kilifi-gede-ruins", "Gede Ruins", "historic", "A 12th-century Swahili town swallowed by forest, with a mosque and palace still standing.", {
    duration: "1 to 2 hrs",
    experiences: ["Guided ruin tour", "Forest walk", "Museum"],
  }),
  d(3, "kilifi-arabuko-sokoke", "Arabuko-Sokoke Forest", "forest", "The largest coastal forest in East Africa: home to the golden-rumped elephant shrew.", {
    experiences: ["Birdwatching", "Night walk", "Cycling trails"],
  }),
  d(5, "lamu-old-town", "Lamu Old Town", "cultural", "The oldest living Swahili settlement in East Africa where the only traffic is donkeys and dhows.", {
    photo: `${t}/6/6a/Above_view_of_the_town_of_Lamu.jpg/1280px-Above_view_of_the_town_of_Lamu.jpg`,
    best: "Jun to Oct",
    experiences: ["Donkey town walk", "Dhow sunset sail", "Swahili cooking"],
  }),
  d(5, "lamu-shela", "Shela Village & Beach", "beach", "The quiet end of the island, with a long empty beach and rooftop guesthouses.", {
    entry: "Free",
    experiences: ["Beach walk", "Dhow racing", "Rooftop sunsets"],
  }),
  d(5, "lamu-takwa-ruins", "Takwa Ruins", "historic", "A ruined Swahili town on Manda Island, reachable only by boat.", {
    experiences: ["Boat trip", "Ruins walk", "Picnic on the beach"],
  }),
  d(6, "taita-tsavo-east", "Tsavo East National Park", "park", "The great red-elephant country where the land runs vast and wild.", {
    best: "Jun to Oct",
    experiences: ["Game drive", "Lugard Falls", "Elephant herds at the waterholes"],
  }),
  d(6, "taita-tsavo-west", "Tsavo West National Park", "park", "Volcanic hills, black rhino and the spring-fed pools at Mzima.", {
    best: "Jun to Oct",
    experiences: ["Game drive", "Mzima Springs walk", "Shetani lava flow"],
  }),
  d(6, "taita-mzima-springs", "Mzima Springs", "lake", "Crystal water welling up from below the lava, clear enough to watch hippos walk.", {
    duration: "1 hr",
    experiences: ["Underwater observatory", "Hippo and crocodile viewing"],
  }),
  d(6, "taita-lake-chala", "Lake Chala", "lake", "A deep crater lake on the Tanzania border with steep forested walls.", {
    experiences: ["Crater rim hike", "Kayaking", "Camping"],
  }),
  d(4, "tana-river-kora-np", "Kora National Park", "park", "Remote acacia wilderness on the Tana where George Adamson lived among lions.", {
    best: "Jun to Oct",
    duration: "Half day",
    experiences: ["Game drive", "Adamson's Falls", "River camping"],
  }),
  d(4, "tana-river-delta", "Tana River Delta", "lake", "Vast delta wetlands where the Tana meets the sea and thousands of waterbirds gather.", {
    duration: "Half day",
    experiences: ["Birdwatching", "Boat trip", "Mangrove creeks"],
  }),

  // ------------------------------------------------------- North Eastern ----
  d(7, "garissa-giraffe-sanctuary", "Garissa Community Giraffe Sanctuary", "wildlife", "Community sanctuary by the Tana that keeps reticulated giraffes safe outside the parks.", {
    duration: "2 to 3 hrs",
    experiences: ["Giraffe viewing", "Nature walk"],
  }),
  d(7, "garissa-livestock-market", "Garissa Livestock Market", "market", "One of the biggest livestock markets in East Africa with cattle, camels and goats by the thousand.", {
    entry: "Free",
    duration: "1 to 2 hrs",
    experiences: ["Watch the trading", "Camel viewing"],
  }),
  d(8, "wajir-museum", "Wajir Museum", "museum", "A National Museums site showing the culture and poetry of Wajir's Somali pastoralists.", {
    duration: "1 to 2 hrs",
    experiences: ["Cultural exhibits", "Nomadic heritage"],
  }),
  d(9, "mandera-malka-mari-np", "Malka Mari National Park", "park", "Remote park on the Dawa river at the Ethiopian border, rich in dry-country wildlife.", {
    best: "Jun to Oct",
    duration: "Full day",
    experiences: ["Game drive", "River views", "Birdwatching"],
  }),

  // ------------------------------------------------------------- Eastern ----
  d(10, "marsabit-national-park", "Marsabit National Park", "park", "A misty forested mountain in the desert, with elephants and crater lakes.", {
    experiences: ["Game drive", "Crater lakes", "Forest walk", "Camping"],
  }),
  d(10, "marsabit-lake-paradise", "Lake Paradise", "lake", "A crater lake inside the forest, once called the most beautiful place in Africa.", {
    photo: `${t}/6/6c/Lake_Paradise.jpg/1280px-Lake_Paradise.jpg`,
    experiences: ["Crater rim walk", "Birdwatching", "Photography"],
  }),
  d(10, "marsabit-chalbi", "Chalbi Desert", "viewpoint", "A flat, stony desert that looks like another planet.", {
    experiences: ["Desert drive", "Kalacha oasis stop", "Mirage photography"],
  }),
  d(11, "isiolo-buffalo-springs", "Buffalo Springs National Reserve", "park", "Across the river from Samburu, with a clear spring that draws elephants.", {
    best: "Jun to Oct",
    experiences: ["Game drive", "Elephant at the springs", "River views"],
  }),
  d(11, "isiolo-shaba", "Shaba National Reserve", "park", "Leopard country that is rocky and far quieter than Samburu.", {
    best: "Jun to Oct",
    experiences: ["Game drive", "Leopard spotting", "Doum palm forests"],
  }),
  d(12, "meru-national-park", "Meru National Park", "park", "Where Elsa the lioness was raised and the park stays green and quiet all year.", {
    best: "Jun to Oct",
    experiences: ["Game drive", "River walks", "Birdwatching"],
  }),
  d(12, "meru-lewa", "Lewa Wildlife Conservancy", "park", "A UNESCO site and the world's stronghold for Grevy's zebra and black rhino.", {
    photo: `${t}/e/e8/Road_to_Lewa_%28Kenya%29.jpg/1280px-Road_to_Lewa_%28Kenya%29.jpg`,
    experiences: ["Game drive", "Rhino tracking", "Camel ride", "Conservation tour"],
  }),
  d(12, "meru-ngare-ndare", "Ngare Ndare Forest", "forest", "An indigenous forest with a 450 m canopy walkway and blue pools below.", {
    experiences: ["Canopy walkway", "Swim in the pools", "Forest hike"],
  }),
  d(13, "tharaka-nithi-mount-kenya-chogoria", "Mount Kenya, Chogoria Route", "hike", "The most scenic approach to Point Lenana, starting from Chogoria on the eastern slopes.", {
    best: "Jan to Mar and Aug to Oct",
    duration: "Multi-day",
    experiences: ["Multi-day trek", "Gorges Valley", "Lake Michaelson"],
  }),
  d(14, "embu-camp-ndunda-falls", "Camp Ndunda Falls", "viewpoint", "A waterfall in Njukiri Forest near Embu town, with climbing and zip lines beside it.", {
    experiences: ["Waterfall visit", "Rock climbing", "Zip lining"],
  }),
  d(15, "kitui-nzambani-rock", "Nzambani Rock", "viewpoint", "A towering granite outcrop near Chuluni that legend says grows if you walk around it.", {
    photo: `${t}/6/64/Dry_river%2C_Kitui_County%2C_Kenya.jpg/1280px-Dry_river%2C_Kitui_County%2C_Kenya.jpg`,
    experiences: ["Hiking", "Rock climbing", "Views"],
  }),
  d(15, "kitui-south-kitui-national-reserve", "South Kitui National Reserve", "wildlife", "A remote eastern reserve of dry bush and rocky kopjes, with elephant and lion.", {
    duration: "Half day",
    experiences: ["Game viewing", "Birdwatching"],
  }),
  d(16, "machakos-ol-donyo-sabuk", "Ol Donyo Sabuk National Park", "hike", "A single forested mountain rising out of the plains, with buffalo on its slopes.", {
    duration: "Half day",
    experiences: ["Summit hike", "Game viewing", "Views to Kilimambogo"],
  }),
  d(16, "machakos-kituluni", "Kituluni Hill", "viewpoint", "The odd \"anti-gravity\" stretch of road where water appears to run uphill.", {
    entry: "Free",
    experiences: ["Roadside experiment", "Photo stop", "Local stories"],
  }),
  d(17, "makueni-chyulu-hills-national-park", "Chyulu Hills National Park", "park", "Rolling green volcanic hills and black lava fields between Amboseli and Tsavo West.", {
    photo: `${t}/2/2b/Chyulu_Hills%2C_Kenya_%28Unsplash%29.jpg/1280px-Chyulu_Hills%2C_Kenya_%28Unsplash%29.jpg`,
    duration: "Full day",
    experiences: ["Game viewing", "Hiking", "Cave visits"],
  }),
  d(17, "makueni-leviathan-cave", "Leviathan Cave", "adventure", "One of the world's longest lava tubes, walked underground in the Chyulu Hills.", {
    duration: "2 to 3 hrs",
    experiences: ["Caving", "Guided tour"],
  }),

  // ------------------------------------------------------------- Central ----
  d(18, "nyandarua-lake-ol-bolossat", "Lake Ol Bolossat", "lake", "The only lake in the Aberdare highlands, ringed by reed beds and grazed by hippos.", {
    experiences: ["Birdwatching", "Lakeside walk"],
  }),
  d(19, "nyeri-mount-kenya-naromoru", "Mount Kenya, Naromoru Route", "hike", "The shortest route to Point Lenana, Africa's second-highest trek.", {
    best: "Jan to Mar and Aug to Oct",
    experiences: ["Multi-day trek", "Glacier views", "Alpine moorland"],
  }),
  d(19, "nyeri-aberdare", "Aberdare National Park", "park", "Misty moorland and waterfalls where elephants dig for salt in the bamboo.", {
    experiences: ["Game drive", "Karuru Falls", "Night game viewing"],
  }),
  d(20, "kirinyaga-mwea", "Mwea National Reserve", "park", "A small reserve on the Thiba river with elephants and over 200 bird species.", {
    experiences: ["Game drive", "Birdwatching", "Boat on the reservoir"],
  }),
  d(20, "kirinyaga-sagana", "Sagana Rapids", "adventure", "White-water stretches of the Tana where rafting and kayaking trips start.", {
    experiences: ["White-water rafting", "Kayaking", "Camping", "River camping BBQ"],
  }),
  d(21, "muranga-ndakaini-dam", "Ndakaini Dam", "lake", "The reservoir that supplies most of Nairobi's water, set among tea farms in Gatanga.", {
    experiences: ["Dam viewpoint", "Scenic drive"],
  }),
  d(21, "muranga-kanunga-falls", "Kanunga Falls", "viewpoint", "A hidden waterfall near Ndakaini in Gatanga, on an easy trail through the farms.", {
    duration: "2 to 3 hrs",
    experiences: ["Waterfall hike", "Freshwater pools"],
  }),
  d(22, "kiambu-fourteen-falls", "Fourteen Falls", "viewpoint", "Fourteen cascades on the Chania river that run strongest after the long rains.", {
    photo: `${t}/c/c6/Fourteen_Falls.jpg/1280px-Fourteen_Falls.jpg`,
    experiences: ["Falls viewpoint", "Boat ride to the base", "Picnic"],
  }),
  d(22, "kiambu-paradise-lost", "Paradise Lost", "park", "A green gully with caves, a waterfall and boats on the dam.", {
    photo: `${t}/a/ae/Paradise_Lost_waterfall.jpg/1280px-Paradise_Lost_waterfall.jpg`,
    duration: "Half day",
    experiences: ["Cave walk", "Boat ride", "Picnic and barbecue"],
  }),

  // -------------------------------------------------------- Rift Valley ----
  d(23, "turkana-lake-turkana", "Lake Turkana", "lake", "The Jade Sea and the world's largest desert lake.", {
    photo: `${t}/d/db/Lake_Turkana_in_Kenya_01.jpg/1280px-Lake_Turkana_in_Kenya_01.jpg`,
    best: "Jun to Sep",
    experiences: ["Boat on the lake", "Central Island crater lakes", "Stargazing", "Fishing"],
  }),
  d(23, "turkana-sibiloi", "Sibiloi National Park", "park", "The Cradle of Mankind where the fossil beds rewrote human history.", {
    experiences: ["Fossil sites", "Koobi Fora museum", "Game viewing", "Desert camping"],
  }),
  d(24, "west-pokot-cherangani-hills", "Cherangani Hills", "hike", "A rugged forested highland of peaks and valleys, walked on multi-day treks.", {
    duration: "Multi-day",
    experiences: ["Trekking", "Camping", "Nature walk"],
  }),
  d(24, "west-pokot-mount-mtelo", "Mount Mtelo (Sekerr)", "hike", "The highest point in West Pokot, a demanding climb with views over the Kerio Valley.", {
    duration: "Full day",
    experiences: ["Mountain hiking", "Summit views"],
  }),
  d(24, "west-pokot-nasolot-national-reserve", "Nasolot National Reserve", "wildlife", "A quiet reserve on the Turkwel River with elephant, buffalo and open-plain game.", {
    duration: "Half day",
    experiences: ["Game viewing", "Birdwatching"],
  }),
  d(25, "samburu-national-reserve", "Samburu National Reserve", "park", "Dry-country wildlife along the Ewaso Nyiro and the home of the Samburu Special Five.", {
    photo: `${t}/8/8f/Mt._Ololokwe_Samburu.jpg/1280px-Mt._Ololokwe_Samburu.jpg`,
    best: "Jun to Oct",
    experiences: ["Game drive", "Special Five spotting", "Samburu cultural visit", "River picnics"],
  }),
  d(25, "samburu-ololokwe", "Mount Ololokwe", "hike", "A flat-topped sacred mountain rising straight out of the plains.", {
    photo: "/destinations/mount-ololokwe.jpg",
    duration: "Full day",
    experiences: ["Summit hike", "Cliff-top views", "Camping"],
  }),
  d(26, "transnzoia-mount-elgon", "Mount Elgon National Park", "park", "A vast extinct volcano with caves, hot springs and the Koitoboss peak.", {
    photo: `${t}/e/ee/ELGON_-_Forest_landscape_in_Mount_Elgon_National_Park%2C_Kenya%2C_2012.jpg/1280px-ELGON_-_Forest_landscape_in_Mount_Elgon_National_Park%2C_Kenya%2C_2012.jpg`,
    best: "Dec to Mar",
    experiences: ["Cave visits (Kitum)", "Multi-day trek", "Hot springs", "Waterfalls"],
  }),
  d(26, "transnzoia-saiwa-swamp", "Saiwa Swamp National Park", "park", "Kenya's smallest park, a papyrus swamp with boardwalks and sitatunga antelope.", {
    experiences: ["Boardwalk walk", "Sitatunga and otter spotting", "Birdwatching"],
  }),
  d(27, "uasin-gishu-kesses-dam", "Kesses Dam", "lake", "A quiet reservoir south of Eldoret, fed by the Tarakwa and Nderugut rivers.", {
    duration: "1 to 2 hrs",
    experiences: ["Lakeside walk", "Birdwatching", "Fishing spots"],
  }),
  d(28, "marakwet-kerio-valley", "Kerio Valley", "viewpoint", "The great rift escarpment dropping 1,500 m to the bush and river below.", {
    experiences: ["Escarpment viewpoints", "Scenic drive", "Photography"],
  }),
  d(28, "marakwet-rimoi", "Rimoi National Reserve", "park", "Kenya's smallest reserve, created for the elephants that cross the Kerio Valley.", {
    experiences: ["Elephant watching", "Game drive", "Escarpment picnic"],
  }),
  d(28, "marakwet-iten", "Iten, Home of Champions", "town", "The high-altitude town where most of Kenya's distance runners train.", {
    entry: "Free",
    experiences: ["Morning run with athletes", "Track sessions", "Athletics museum"],
  }),
  d(30, "baringo-lake-baringo", "Lake Baringo", "lake", "Freshwater lake with hippos, crocodiles and a boat ride to the island villages.", {
    photo: `${t}/4/40/LakeBaringo.jpg/1280px-LakeBaringo.jpg`,
    experiences: ["Boat safari", "Birdwatching", "Island village visit", "Fishing"],
  }),
  d(30, "baringo-lake-bogoria", "Lake Bogoria", "lake", "Steaming geysers and hot springs on the shore of a flamingo-filled soda lake.", {
    photo: `${t}/5/57/Lake_Bogoria_2011.jpg/1920px-Lake_Bogoria_2011.jpg`,
    experiences: ["Geyser and hot springs", "Flamingo viewing", "Lakeside walk"],
  }),
  d(30, "baringo-kamnarok", "Lake Kamnarok National Reserve", "park", "A papyrus lake in the Kerio Valley, once thick with crocodiles.", {
    experiences: ["Game drive", "Boating", "Escarpment views"],
  }),
  d(31, "laikipia-ol-pejeta", "Ol Pejeta Conservancy", "park", "Home of the last two northern white rhinos with chimps and the Big Five on the plains.", {
    photo: `${t}/1/14/OL_PEJETA_conservancy_%C3%A0_Nanyuki_au_Kenya_31.jpg/1280px-OL_PEJETA_conservancy_%C3%A0_Nanyuki_au_Kenya_31.jpg`,
    experiences: ["Rhino sanctuary", "Chimpanzee sanctuary", "Night game drive", "Lion tracking"],
  }),
  d(31, "laikipia-thomsons-falls", "Thomson's Falls", "viewpoint", "A 74 m waterfall dropping into the Rift Valley at Nyahururu.", {
    duration: "1 hr",
    experiences: ["Waterfall viewpoint", "Forest walk", "Craft stalls"],
  }),
  d(32, "nakuru-lake-nakuru", "Lake Nakuru National Park", "park", "A soda lake ringed by fever trees with rhino and the famous flamingo flocks.", {
    photo: `${t}/9/9b/Lake-Nakuru-Baboon-Hill-View.JPG/1280px-Lake-Nakuru-Baboon-Hill-View.JPG`,
    best: "Jun to Oct",
    experiences: ["Game drive", "Rhino tracking", "Flamingo viewpoints", "Baboon Cliff"],
  }),
  d(32, "nakuru-hells-gate", "Hell's Gate National Park", "park", "The only Kenyan park you can walk and cycle through with a gorge to descend.", {
    photo: `${t}/8/87/Hell%27s_Gate%2C_Kenya.jpg/1280px-Hell%27s_Gate%2C_Kenya.jpg`,
    experiences: ["Cycling among wildlife", "Ol Njorowa gorge walk", "Natural hot showers"],
  }),
  d(32, "nakuru-longonot", "Mount Longonot", "hike", "A dormant volcano with a crater forest and a steady three-hour climb.", {
    duration: "Half day",
    experiences: ["Crater rim hike", "Rift Valley views", "Steam vents"],
  }),
  d(32, "nakuru-menengai", "Menengai Crater", "viewpoint", "One of the largest craters in the world, looking down into a forested floor.", {
    experiences: ["Crater viewpoint", "Horse riding", "Sunset drive"],
  }),
  d(32, "nakuru-crescent-island", "Crescent Island, Lake Naivasha", "wildlife", "A walking safari island where giraffe and zebra share the path with you.", {
    experiences: ["Walking safari", "Boat ride across", "Birdwatching"],
  }),
  d(33, "narok-maasai-mara", "Maasai Mara National Reserve", "park", "Kenya's greatest wildlife theatre and the stage for the great migration.", {
    photo: `${t}/1/17/Masai_Mara_at_Sunset.jpg/1280px-Masai_Mara_at_Sunset.jpg`,
    best: "Jul to Oct",
    difficulty: "Easy",
    access: "Fly-in or 4x4 drive from Nairobi (5 to 6 hours)",
    experiences: ["Game drive", "Hot-air balloon safari", "Big Five", "Maasai village visit"],
    whatToExpect: "Endless rolling plains dotted with acacia trees and the highest concentration of lions in Kenya. Between July and October the great migration fills the plains with over a million wildebeest and zebra.",
    tips: ["Book a hot-air balloon safari for a unique perspective", "Stay in one of the community conservancies for a more private experience", "Bring binoculars and a good camera"],
  }),
  d(33, "narok-naboisho", "Naboisho Conservancy", "park", "Community-run conservancy bordering the Mara with far fewer vehicles.", {
    photo: `${t}/9/9c/Hyena_zebras_foreground.jpg/1280px-Hyena_zebras_foreground.jpg`,
    experiences: ["Night game drive", "Walking safari", "Maasai-guided tracking"],
  }),
  d(33, "narok-loita-hills", "Loita Hills", "hike", "Forested highlands and open ridges, walked with Maasai guides.", {
    experiences: ["Multi-day hike", "Maasai homestay", "Waterfall walks"],
  }),
  d(34, "kajiado-amboseli", "Amboseli National Park", "park", "Big-tusker elephants walking against the backdrop of Kilimanjaro.", {
    photo: `${t}/e/e1/Amboseli_National_Park_and_Mt._Kilimanjaro.jpg/1280px-Amboseli_National_Park_and_Mt._Kilimanjaro.jpg`,
    best: "Jun to Oct",
    experiences: ["Elephant viewing", "Kilimanjaro viewpoints", "Maasai cultural visit", "Birdwatching"],
  }),
  d(34, "kajiado-ngong-hills", "Ngong Hills", "hike", "A line of green knuckles above Nairobi with wind turbines on the ridge.", {
    photo: `${t}/f/f2/Ngong%27_Hills%2C_Nairobi%2C_Kenya.jpg/1280px-Ngong%27_Hills%2C_Nairobi%2C_Kenya.jpg`,
    duration: "Half day",
    experiences: ["Ridge hike", "Picnic at the windmills", "Views over the Rift"],
  }),
  d(34, "kajiado-lake-magadi", "Lake Magadi", "lake", "A salt lake that turns pink and white with hot springs along the shore.", {
    photo: `${t}/6/60/Lake_Magadi_2014.jpg/1280px-Lake_Magadi_2014.jpg`,
    experiences: ["Salt flats walk", "Hot springs", "Flamingo and pelican viewing"],
  }),

  // ------------------------------------------------------------- Western ----
  d(37, "kakamega-forest", "Kakamega Forest National Reserve", "forest", "Kenya's last slice of Congo rainforest, 400 butterfly species and blue turacos.", {
    photo: `${t}/3/3f/KAKA_-_General_view_of_Kakamega_Forest_National_Reserve%2C_Kenya%2C_2012.jpg/1280px-KAKA_-_General_view_of_Kakamega_Forest_National_Reserve%2C_Kenya%2C_2012.jpg`,
    experiences: ["Guided forest walk", "Butterfly and bird watching", "Night walk", "Canopy viewing"],
  }),
  d(37, "kakamega-crying-stone", "Crying Stone of Ilesi", "cultural", "A rock formation that appears to weep and has been a Luhya landmark for generations.", {
    photo: `${t}/c/c3/The_crying_stone_in_Ilesi_Kakamega%2C_Western_Kenya.jpg/1280px-The_crying_stone_in_Ilesi_Kakamega%2C_Western_Kenya.jpg`,
    entry: "Free",
    experiences: ["Cultural story", "Photo stop", "Village walk"],
  }),
  d(37, "kakamega-isecheno", "Isecheno Nature Reserve", "forest", "The quieter, southern half of the forest with research trails.", {
    experiences: ["Forest trails", "Primate spotting", "Camping"],
  }),
  d(39, "bungoma-nabuyole", "Nabuyole Falls", "viewpoint", "The Nzoia river dropping over a wide ledge near Webuye.", {
    experiences: ["Falls viewpoint", "Riverside walk", "Photography"],
  }),

  // ------------------------------------------------------------- Nyanza ----
  d(42, "kisumu-dunga-beach", "Dunga Beach", "beach", "The fishing beach on Lake Victoria where the boats come in at dawn.", {
    photo: `${t}/a/af/KISU_-_Boats_and_landing_sites_on_Lake_Victoria_at_Kisumu%2C_Kenya%2C_2012.jpg/1280px-KISU_-_Boats_and_landing_sites_on_Lake_Victoria_at_Kisumu%2C_Kenya%2C_2012.jpg`,
    entry: "Free",
    experiences: ["Fish market", "Boat ride to the hippo point", "Fried tilapia"],
  }),
  d(42, "kisumu-kit-mikayi", "Kit-Mikayi", "cultural", "A towering rock stack with a Luo legend attached to it.", {
    photo: `${t}/5/58/Kit-Mikayi.JPG/1280px-Kit-Mikayi.JPG`,
    experiences: ["Rock climb up", "Legend storytelling", "Sunset views"],
  }),
  d(42, "kisumu-ndere-island", "Ndere Island National Park", "park", "An island park in Lake Victoria reached by boat and home to hippos and crocodiles.", {
    photo: `${t}/6/6f/Ndere_Island.jpg/1280px-Ndere_Island.jpg`,
    experiences: ["Boat crossing", "Island hike", "Hippo and bird watching"],
  }),
  d(43, "homabay-ruma", "Ruma National Park", "park", "Kenya's only home of the roan antelope on the rolling Lambwe valley grassland.", {
    photo: `${t}/6/6e/Ruma_National_Park.jpg/1280px-Ruma_National_Park.jpg`,
    experiences: ["Game drive", "Roan antelope", "Birdwatching"],
  }),
  d(43, "homabay-rusinga", "Rusinga Island", "island", "A causeway-linked island with fossil sites and quiet lake shores.", {
    photo: `${t}/0/08/Rusinga_Island_-_Lake_Victoria_-_Kenya.jpg/1920px-Rusinga_Island_-_Lake_Victoria_-_Kenya.jpg`,
    experiences: ["Fossil site visit", "Fishing village walk", "Lake sunsets"],
  }),
  d(44, "migori-thimlich-ohinga", "Thimlich Ohinga", "historic", "A dry-stone walled settlement older than Great Zimbabwe and a UNESCO site.", {
    duration: "1 to 2 hrs",
    experiences: ["Guided ruins tour", "Archaeology talk", "Cultural visit"],
  }),
  d(44, "migori-muhuru-bay", "Lake Victoria Shoreline, Muhuru Bay", "beach", "Quiet fishing bays and papyrus on the lake's eastern shore.", {
    entry: "Free",
    experiences: ["Fishing with locals", "Birdwatching", "Boat ride"],
  }),

  // ------------------------------------------------------------ Nairobi ----
  d(47, "nairobi-national-park", "Nairobi National Park", "park", "The only national park inside a capital city where lions walk against the skyline.", {
    photo: `${t}/b/b9/Nairobi_National_Park_%28August_2025%29%2C_Zebra_and_city_skyline.jpg/1280px-Nairobi_National_Park_%28August_2025%29%2C_Zebra_and_city_skyline.jpg`,
    difficulty: "Easy",
    access: "Accessible by car or taxi from the city center (20 mins)",
    experiences: ["Game drive", "Picnic sites", "Nairobi Animal Orphanage"],
    whatToExpect: "Wide open grass plains with the city skyline behind them and scattered acacia bush across the park. It holds black rhino, lion, leopard, cheetah, hyena, buffalo and giraffe, and over 400 species of bird.",
    tips: ["The best time to see lions is early morning (6:30am)", "Check the KWS website for current entry fees", "The Ivory Burning Site Monument is a must-visit for history"],
  }),
  d(47, "nairobi-sheldrick", "Sheldrick Wildlife Trust", "wildlife", "The elephant orphanage where you watch hand-reared calves feed at 11am.", {
    duration: "1 hr",
    experiences: ["Elephant feeding", "Adopt an orphan", "Rhino viewing"],
  }),
  d(47, "nairobi-giraffe-centre", "Giraffe Centre", "wildlife", "Feed endangered Rothschild giraffes from a raised platform.", {
    duration: "1 hr",
    experiences: ["Hand-feed giraffes", "Nature trail", "Education centre"],
  }),
  d(47, "nairobi-karen-blixen", "Karen Blixen Museum", "museum", "The farmhouse from Out of Africa, kept as it was in the 1920s.", {
    duration: "1 to 2 hrs",
    experiences: ["House tour", "Gardens", "Coffee at the terrace"],
  }),
  d(47, "nairobi-karura-forest", "Karura Forest", "forest", "Fifty minutes of trails and waterfalls inside the city. Bring a bike.", {
    experiences: ["Cycling", "Forest walk", "Waterfall and caves", "Picnic"],
  }),
  d(47, "nairobi-maasai-market", "Maasai Market", "market", "Beadwork and carvings that move to a different spot each day of the week.", {
    entry: "Free",
    experiences: ["Souvenir shopping", "Bargaining practice", "Beadwork"],
  }),
];

export const destinationById = (id: string): Destination | undefined =>
  DESTINATIONS.find((destination) => destination.id === id);

export const destinationsInCounty = (countyId: number): Destination[] =>
  DESTINATIONS.filter((destination) => destination.countyId === countyId);

/** The order categories appear in on the filters, most-used first. */
export const CATEGORY_ORDER: Category[] = [
  "park",
  "wildlife",
  "beach",
  "lake",
  "hike",
  "forest",
  "viewpoint",
  "historic",
  "cultural",
  "museum",
  "market",
  "island",
  "town",
  "adventure",
];

export const categoriesPresent = (): Category[] =>
  CATEGORY_ORDER.filter((category) => DESTINATIONS.some((destination) => destination.category === category));

/** How many places the app itself carries, for the honest "and more in the app" lines. */
export const APP_DESTINATION_COUNT = 188;

/** The quieter, less-visited places the site leads with. */
export const GEM_IDS: string[] = [
  "kilifi-arabuko-sokoke",
  "lamu-takwa-ruins",
  "taita-lake-chala",
  "kitui-south-kitui-national-reserve",
  "nyandarua-lake-ol-bolossat",
  "muranga-kanunga-falls",
  "makueni-leviathan-cave",
  "west-pokot-mount-mtelo",
  "west-pokot-nasolot-national-reserve",
  "marakwet-rimoi",
  "baringo-kamnarok",
  "narok-loita-hills",
  "kakamega-isecheno",
  "migori-muhuru-bay",
  "uasin-gishu-kesses-dam",
];

/** The famous places most travellers start with. */
export const POPULAR_IDS: string[] = [
  "narok-maasai-mara",
  "kajiado-amboseli",
  "kwale-diani-beach",
  "mombasa-fort-jesus",
  "nakuru-hells-gate",
  "nakuru-longonot",
  "nakuru-lake-nakuru",
  "laikipia-ol-pejeta",
  "taita-tsavo-east",
  "taita-tsavo-west",
  "lamu-old-town",
  "nyeri-mount-kenya-naromoru",
  "mombasa-nyali-beach",
  "nairobi-giraffe-centre",
  "nakuru-crescent-island",
  "laikipia-thomsons-falls",
];

export const gems = (): Destination[] =>
  GEM_IDS.map((id) => destinationById(id)).filter((destination): destination is Destination => Boolean(destination));

export const popular = (): Destination[] =>
  POPULAR_IDS.map((id) => destinationById(id)).filter((destination): destination is Destination => Boolean(destination));

export const gemsInCounty = (countyId: number): Destination[] =>
  gems().filter((destination) => destination.countyId === countyId);
