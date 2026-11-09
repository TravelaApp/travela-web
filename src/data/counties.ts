/**
 * The 47 counties of Kenya, in the same shape the app uses: `id` is the official
 * county code, which is also the open-data code and the id used inside the app.
 *
 * `knownFor` is copied from the app's county passport so a visitor sees the same
 * reason to travel that a user of the app sees.
 */

export type Region =
  | "Coast"
  | "North Eastern"
  | "Eastern"
  | "Central"
  | "Rift Valley"
  | "Western"
  | "Nyanza"
  | "Nairobi";

export interface County {
  id: number;
  name: string;
  capital: string;
  region: Region;
  knownFor: string;
  /** A county cover photograph, where the app has a convincing one. */
  photo?: string;
}

export const REGION_ORDER: Region[] = [
  "Nairobi",
  "Central",
  "Rift Valley",
  "Eastern",
  "Coast",
  "Western",
  "Nyanza",
  "North Eastern",
];

const w = "https://upload.wikimedia.org/wikipedia/commons";
const t = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

export const COUNTIES: County[] = [
  { id: 1, name: "Mombasa", capital: "Mombasa", region: "Coast", knownFor: "Fort Jesus and the Nyali beaches", photo: `${t}/6/6c/Fort_Jesus%2C_2025_%2801%29.jpg/1280px-Fort_Jesus%2C_2025_%2801%29.jpg` },
  { id: 2, name: "Kwale", capital: "Kwale", region: "Coast", knownFor: "Diani Beach and the Shimba Hills", photo: `${t}/2/2d/Diani_Beach_Ukunda.jpg/1280px-Diani_Beach_Ukunda.jpg` },
  { id: 3, name: "Kilifi", capital: "Kilifi", region: "Coast", knownFor: "Watamu Marine Park and Gede ruins", photo: `${t}/0/09/Watamu_Beach%2C_Kenya_08.jpg/1280px-Watamu_Beach%2C_Kenya_08.jpg` },
  { id: 4, name: "Tana River", capital: "Hola", region: "Coast", knownFor: "Tana Delta wetlands and river safaris", photo: `${t}/5/5f/Tana_River_County%2C_Kenya_-_panoramio_%282%29.jpg/1280px-Tana_River_County%2C_Kenya_-_panoramio_%282%29.jpg` },
  { id: 5, name: "Lamu", capital: "Lamu", region: "Coast", knownFor: "Lamu Old Town and its dhows", photo: `${t}/6/6a/Above_view_of_the_town_of_Lamu.jpg/1280px-Above_view_of_the_town_of_Lamu.jpg` },
  { id: 6, name: "Taita-Taveta", capital: "Wundanyi", region: "Coast", knownFor: "The Tsavo parks and the Taita Hills", photo: `${t}/5/58/Mudanda_Rock_in_Tsavo_East_National_Park.jpg/1280px-Mudanda_Rock_in_Tsavo_East_National_Park.jpg` },
  { id: 7, name: "Garissa", capital: "Garissa", region: "North Eastern", knownFor: "Camel country and the Boni Forest", photo: `${t}/f/f9/Garissa_Mosque_-_panoramio.jpg/1280px-Garissa_Mosque_-_panoramio.jpg` },
  { id: 8, name: "Wajir", capital: "Wajir", region: "North Eastern", knownFor: "Desert wells and Somali heritage", photo: `${t}/f/f3/Giraffes_of_Wajir_town.jpg/1280px-Giraffes_of_Wajir_town.jpg` },
  { id: 9, name: "Mandera", capital: "Mandera", region: "North Eastern", knownFor: "Kenya's far north-east frontier" },
  { id: 10, name: "Marsabit", capital: "Marsabit", region: "Eastern", knownFor: "Lake Turkana shores and the Chalbi Desert", photo: `${t}/6/6c/Lake_Paradise.jpg/1280px-Lake_Paradise.jpg` },
  { id: 11, name: "Isiolo", capital: "Isiolo", region: "Eastern", knownFor: "Gateway to Samburu and Shaba reserves", photo: `${t}/d/d3/Shaba_National_Reserve%2C_Kenya.jpg/1280px-Shaba_National_Reserve%2C_Kenya.jpg` },
  { id: 12, name: "Meru", capital: "Meru", region: "Eastern", knownFor: "Mount Kenya slopes and miraa farms", photo: `${t}/c/c4/Meru_National_Park%2C_Kenya.jpg/1280px-Meru_National_Park%2C_Kenya.jpg` },
  { id: 13, name: "Tharaka-Nithi", capital: "Kathwana", region: "Eastern", knownFor: "Mount Kenya forest and Seven Forks dams", photo: `${t}/a/ac/River_Tungi_Waterfall_in_Nithi%2C_Tharaka_Nithi_County.jpg/1280px-River_Tungi_Waterfall_in_Nithi%2C_Tharaka_Nithi_County.jpg` },
  { id: 14, name: "Embu", capital: "Embu", region: "Eastern", knownFor: "Mount Kenya foothills and coffee farms", photo: `${w}/f/f5/Kanyuambora%2C_Embu%2C_Kenya%2C_an_aerial_view._Photo_by_BMJ_Muriithi.jpg` },
  { id: 15, name: "Kitui", capital: "Kitui", region: "Eastern", knownFor: "Kamba woodcarving and Tsavo East gateway", photo: `${t}/6/64/Dry_river%2C_Kitui_County%2C_Kenya.jpg/1280px-Dry_river%2C_Kitui_County%2C_Kenya.jpg` },
  { id: 16, name: "Machakos", capital: "Machakos", region: "Eastern", knownFor: "Ol Donyo Sabuk and hilltop city views", photo: `${t}/e/e4/Mt_Kilimambogo.jpg/1280px-Mt_Kilimambogo.jpg` },
  { id: 17, name: "Makueni", capital: "Wote", region: "Eastern", knownFor: "Chyulu Hills and acacia honey", photo: `${t}/2/2b/Chyulu_Hills%2C_Kenya_%28Unsplash%29.jpg/1280px-Chyulu_Hills%2C_Kenya_%28Unsplash%29.jpg` },
  { id: 18, name: "Nyandarua", capital: "Ol Kalou", region: "Central", knownFor: "Aberdare Ranges and highland potato farms", photo: `${t}/1/10/Lake_ol-Bolossat.jpg/1280px-Lake_ol-Bolossat.jpg` },
  { id: 19, name: "Nyeri", capital: "Nyeri", region: "Central", knownFor: "The Aberdares and coffee country", photo: `${t}/d/da/View_from_Aberdare_Country_Club%2C_Kenya.jpg/1280px-View_from_Aberdare_Country_Club%2C_Kenya.jpg` },
  { id: 20, name: "Kirinyaga", capital: "Kerugoya", region: "Central", knownFor: "Mount Kenya and the Mwea rice fields", photo: `${t}/8/83/Thiba_falls_Kirinyaga_County_01.jpg/1280px-Thiba_falls_Kirinyaga_County_01.jpg` },
  { id: 21, name: "Murang'a", capital: "Murang'a", region: "Central", knownFor: "Fourteen Falls and coffee estates", photo: `${t}/d/dd/River_Maragua_Railway_Bridge_from_afar-Murang%27a_Kenya.jpg/1280px-River_Maragua_Railway_Bridge_from_afar-Murang%27a_Kenya.jpg` },
  { id: 22, name: "Kiambu", capital: "Kiambu", region: "Central", knownFor: "Coffee farms and Nairobi's green escape", photo: `${t}/c/c6/Fourteen_Falls.jpg/1280px-Fourteen_Falls.jpg` },
  { id: 23, name: "Turkana", capital: "Lodwar", region: "Rift Valley", knownFor: "Lake Turkana and the cradle of mankind", photo: `${t}/5/5c/Lake_Turkana_sunset.jpg/1280px-Lake_Turkana_sunset.jpg` },
  { id: 24, name: "West Pokot", capital: "Kapenguria", region: "Rift Valley", knownFor: "Cherangani Hills and Kapenguria museum" },
  { id: 25, name: "Samburu", capital: "Maralal", region: "Rift Valley", knownFor: "Samburu Reserve and the Special Five", photo: "/destinations/mount-ololokwe.jpg" },
  { id: 26, name: "Trans-Nzoia", capital: "Kitale", region: "Rift Valley", knownFor: "Kenya's maize basket and Saiwa Swamp", photo: `${t}/e/ee/ELGON_-_Forest_landscape_in_Mount_Elgon_National_Park%2C_Kenya%2C_2012.jpg/1280px-ELGON_-_Forest_landscape_in_Mount_Elgon_National_Park%2C_Kenya%2C_2012.jpg` },
  { id: 27, name: "Uasin Gishu", capital: "Eldoret", region: "Rift Valley", knownFor: "Eldoret and the home of champions", photo: `${t}/8/8e/Monument_of_Champions_Eldoret_near_Poa_Place.jpg/1280px-Monument_of_Champions_Eldoret_near_Poa_Place.jpg` },
  { id: 28, name: "Elgeyo-Marakwet", capital: "Iten", region: "Rift Valley", knownFor: "Kerio Valley and the runners of Iten", photo: `${t}/7/70/Keiyo_escarpment.jpg/1280px-Keiyo_escarpment.jpg` },
  { id: 29, name: "Nandi", capital: "Kapsabet", region: "Rift Valley", knownFor: "Nandi Hills tea and athletics legends", photo: `${t}/2/2c/Kaptumo_Nandi_County_Kenya.jpg/1280px-Kaptumo_Nandi_County_Kenya.jpg` },
  { id: 30, name: "Baringo", capital: "Kabarnet", region: "Rift Valley", knownFor: "Lake Baringo and Bogoria's flamingos", photo: `${t}/1/1b/Facing_kerio_valley_from_anin.jpg/1280px-Facing_kerio_valley_from_anin.jpg` },
  { id: 31, name: "Laikipia", capital: "Rumuruti", region: "Rift Valley", knownFor: "Wildlife conservancies and Mount Kenya", photo: `${t}/2/2b/Reticulated_giraffes.jpg/1280px-Reticulated_giraffes.jpg` },
  { id: 32, name: "Nakuru", capital: "Nakuru", region: "Rift Valley", knownFor: "Lake Nakuru flamingos and Menengai crater", photo: `${t}/9/9b/Lake-Nakuru-Baboon-Hill-View.JPG/1280px-Lake-Nakuru-Baboon-Hill-View.JPG` },
  { id: 33, name: "Narok", capital: "Narok", region: "Rift Valley", knownFor: "Maasai Mara and the Great Migration", photo: `${t}/1/17/Masai_Mara_at_Sunset.jpg/1280px-Masai_Mara_at_Sunset.jpg` },
  { id: 34, name: "Kajiado", capital: "Kajiado", region: "Rift Valley", knownFor: "Amboseli elephants and Kilimanjaro views", photo: `${t}/2/21/Amboseli_National_Park_Kenya_02.jpg/1280px-Amboseli_National_Park_Kenya_02.jpg` },
  { id: 35, name: "Kericho", capital: "Kericho", region: "Rift Valley", knownFor: "Endless green tea estates", photo: `${t}/d/d8/Kenya-Tealand-Near-Kericho-2012.JPG/1280px-Kenya-Tealand-Near-Kericho-2012.JPG` },
  { id: 36, name: "Bomet", capital: "Bomet", region: "Rift Valley", knownFor: "Tea highlands and long-distance champions", photo: `${t}/5/50/Bomet-Tea.jpg/1280px-Bomet-Tea.jpg` },
  { id: 37, name: "Kakamega", capital: "Kakamega", region: "Western", knownFor: "Kakamega rainforest and rare birds", photo: `${t}/3/3f/KAKA_-_General_view_of_Kakamega_Forest_National_Reserve%2C_Kenya%2C_2012.jpg/1280px-KAKA_-_General_view_of_Kakamega_Forest_National_Reserve%2C_Kenya%2C_2012.jpg` },
  { id: 38, name: "Vihiga", capital: "Mbale", region: "Western", knownFor: "Maragoli Hills and lush farms" },
  { id: 39, name: "Bungoma", capital: "Bungoma", region: "Western", knownFor: "Mount Elgon and Nabuyole Falls", photo: `${t}/d/db/River_Nzoia.jpg/1280px-River_Nzoia.jpg` },
  { id: 40, name: "Busia", capital: "Busia", region: "Western", knownFor: "Lake Victoria fishing and border trade", photo: `${t}/e/e1/Yala_Swamp-1.jpg/1280px-Yala_Swamp-1.jpg` },
  { id: 41, name: "Siaya", capital: "Siaya", region: "Nyanza", knownFor: "Lake Victoria shores and Got Ramogi", photo: `${t}/f/f4/Yala_Swamp-2.jpg/1280px-Yala_Swamp-2.jpg` },
  { id: 42, name: "Kisumu", capital: "Kisumu", region: "Nyanza", knownFor: "Lake Victoria port and Dunga beach", photo: `${t}/0/0a/Lake_Victoria_as_visible_from_Kisumu_City.jpg/1280px-Lake_Victoria_as_visible_from_Kisumu_City.jpg` },
  { id: 43, name: "Homa Bay", capital: "Homa Bay", region: "Nyanza", knownFor: "Ruma National Park and Lake Victoria", photo: `${t}/c/c9/Baoban_tree.jpg/1280px-Baoban_tree.jpg` },
  { id: 44, name: "Migori", capital: "Migori", region: "Nyanza", knownFor: "Gold mines and Kuria culture", photo: `${t}/d/df/River_Migori-Kehancha.jpg/1280px-River_Migori-Kehancha.jpg` },
  { id: 45, name: "Kisii", capital: "Kisii", region: "Nyanza", knownFor: "Soapstone carvings and banana farms", photo: `${w}/a/a0/Nyamataro_view.jpg` },
  { id: 46, name: "Nyamira", capital: "Nyamira", region: "Nyanza", knownFor: "Tea highlands of the Gusii", photo: `${t}/b/b4/Manga_Hills_landscape.jpg/1280px-Manga_Hills_landscape.jpg` },
  { id: 47, name: "Nairobi", capital: "Nairobi", region: "Nairobi", knownFor: "Capital city and Nairobi National Park", photo: `${t}/b/b9/Nairobi_National_Park_%28August_2025%29%2C_Zebra_and_city_skyline.jpg/1280px-Nairobi_National_Park_%28August_2025%29%2C_Zebra_and_city_skyline.jpg` },
];

export const countyById = (id: number): County | undefined =>
  COUNTIES.find((county) => county.id === id);

export const countyName = (id: number): string => countyById(id)?.name ?? "Kenya";

export const countiesInRegion = (region: Region): County[] =>
  COUNTIES.filter((county) => county.region === region);

export const regionCount = (region: Region): number => countiesInRegion(region).length;
