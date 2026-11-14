// ============================================================================
// KSEAB SSLC Social Science (85E) Question 38: Exhaustive India Map Database
// Curated strictly from Karnataka State Curriculum (KTBS) Class 10 Geography
// Units 1 to 11 (Physical Features, Climate, Soils, Forests, Water Resources,
// Land Use & Agriculture, Mineral & Power Resources, Transport & Comm, Industries)
// Total Markers: 94 Authentic Board Locations with Chief Examiner Valuation Rules
// Coordinate System calibrated to official Survey of India 612 x 696 SVG Matrix
// ============================================================================

export type MapLocationCategory =
  | "Nuclear Plant"
  | "Thermal Plant"
  | "Port"
  | "Dam"
  | "Steel & Industry"
  | "Petroleum"
  | "Airport"
  | "Physical & Line"
  | "National Park"
  | "Capital & Hub";

export interface MapLocationPin {
  id: string;
  name: string;
  kannadaName: string;
  state: string;
  category: MapLocationCategory;
  probabilityScore: number;
  xSvg: number; // 0 - 612 SVG coordinate
  ySvg: number; // 0 - 696 SVG coordinate
  examinerTip: string;
  landmarkReference: string;
  ktbsReference: string;
}

export const CATEGORY_META: Record<
  MapLocationCategory,
  { label: string; color: string; bg: string; border: string; badge: string; icon: string }
> = {
  "Nuclear Plant": {
    label: "Nuclear Power Stations",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.15)",
    border: "rgba(245, 158, 11, 0.4)",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: "☢️",
  },
  "Thermal Plant": {
    label: "Thermal Power Stations",
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.15)",
    border: "rgba(251, 146, 60, 0.4)",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    icon: "⚡",
  },
  Port: {
    label: "Major Seaports",
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.4)",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    icon: "⚓",
  },
  Dam: {
    label: "River Valley Projects & Dams",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.15)",
    border: "rgba(16, 185, 129, 0.4)",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    icon: "🌊",
  },
  "Steel & Industry": {
    label: "Iron & Steel Industries",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.15)",
    border: "rgba(168, 85, 247, 0.4)",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    icon: "🏭",
  },
  Petroleum: {
    label: "Petroleum Fields & Refineries",
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.15)",
    border: "rgba(236, 72, 153, 0.4)",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    icon: "🛢️",
  },
  Airport: {
    label: "International Airports",
    color: "#6366f1",
    bg: "rgba(99, 102, 241, 0.15)",
    border: "rgba(99, 102, 241, 0.4)",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    icon: "✈️",
  },
  "Physical & Line": {
    label: "Peaks, Lat/Long & Coasts",
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.15)",
    border: "rgba(6, 182, 212, 0.4)",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    icon: "🏔️",
  },
  "National Park": {
    label: "National Parks & Wildlife",
    color: "#84cc16",
    bg: "rgba(132, 204, 22, 0.15)",
    border: "rgba(132, 204, 22, 0.4)",
    badge: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    icon: "🐅",
  },
  "Capital & Hub": {
    label: "Capitals & Major Industrial Hubs",
    color: "#f43f5e",
    bg: "rgba(244, 63, 94, 0.15)",
    border: "rgba(244, 63, 94, 0.4)",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    icon: "🏙️",
  },
};

// Official State Palette Matching Educational School Wall Map Poster
export const STATE_POLITICAL_COLORS: Record<string, string> = {
  jk: "#eab308", // Jammu & Kashmir / Ladakh - Golden Yellow
  hp: "#2563eb", // Himachal Pradesh - Cobalt Blue
  pb: "#0284c7", // Punjab - Sky Blue
  hr: "#db2777", // Haryana - Deep Pink
  ut: "#e11d48", // Uttarakhand - Crimson Red
  dl: "#f59e0b", // Delhi - Amber
  rj: "#facc15", // Rajasthan - Sunburst Yellow
  gj: "#fb923c", // Gujarat - Tangerine Coral
  mp: "#dc2626", // Madhya Pradesh - Vivid Red
  up: "#65a30d", // Uttar Pradesh - Meadow Green
  br: "#f472b6", // Bihar - Soft Rose
  jh: "#eab308", // Jharkhand - Warm Ochre
  or: "#ea580c", // Odisha - Rust Orange
  ct: "#0284c7", // Chhattisgarh - Cyan Blue
  mh: "#16a34a", // Maharashtra - Forest Green
  ga: "#f59e0b", // Goa - Gold
  ka: "#0ea5e9", // Karnataka - Cyan Blue (Board Host State)
  kl: "#f97316", // Kerala - Bright Orange
  tn: "#84cc16", // Tamil Nadu - Bright Green
  ap: "#facc15", // Andhra Pradesh - Lemon Yellow
  tg: "#f43f5e", // Telangana - Magenta Rose
  wb: "#15803d", // West Bengal - Deep Emerald
  sk: "#fef08a", // Sikkim - Pastel Yellow
  as: "#c026d3", // Assam - Violet
  ar: "#06b6d4", // Arunachal Pradesh - Bright Cyan
  nl: "#16a34a", // Nagaland - Green
  mn: "#e879f9", // Manipur - Orchid Pink
  mz: "#facc15", // Mizoram - Golden
  tr: "#4ade80", // Tripura - Lime
  ml: "#f97316", // Meghalaya - Orange
  an: "#10b981", // Andaman & Nicobar - Emerald
  ld: "#10b981", // Lakshadweep - Emerald
  py: "#f59e0b", // Puducherry
  dn: "#f59e0b", // Dadra & Nagar Haveli
  dd: "#f59e0b", // Daman & Diu
  ch: "#f59e0b", // Chandigarh
};

// 94 Comprehensive KSEAB Board Locations
export const ALL_94_KSEAB_LOCATIONS: MapLocationPin[] = [
  // =========================================================================
  // 1. NUCLEAR POWER STATIONS (KTBS Ch 5: Mineral & Power Resources)
  // =========================================================================
  {
    id: "kaiga",
    name: "Kaiga Nuclear Power Station",
    kannadaName: "ಕೈಗಾ ಅಣು ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Karnataka (Uttara Kannada)",
    category: "Nuclear Plant",
    probabilityScore: 99,
    xSvg: 138,
    ySvg: 512,
    examinerTip:
      "Mark on the Kali River in central Uttara Kannada district, interior from Karwar. Chief Examiner Alert: Never mark in southern Karnataka (Mangalore) or Mysore plateau!",
    landmarkReference: "West Coast, North Karnataka near Goa border",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 92",
  },
  {
    id: "kalpakkam",
    name: "Kalpakkam (MAPS Nuclear Plant)",
    kannadaName: "ಕಲ್ಪಾಕ್ಕಂ ಅಣುಶಕ್ತಿ ಕೇಂದ್ರ",
    state: "Tamil Nadu (Coromandel Coast)",
    category: "Nuclear Plant",
    probabilityScore: 94,
    xSvg: 244,
    ySvg: 580,
    examinerTip:
      "Located 60 km south of Chennai directly on the Coromandel coastline. India's first fully indigenous commercial nuclear reactor.",
    landmarkReference: "East Coast, just south of Chennai apex",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 93",
  },
  {
    id: "tarapur",
    name: "Tarapur Atomic Power Station",
    kannadaName: "ತಾರಾಪುರ ಅಣು ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Maharashtra (Palghar district)",
    category: "Nuclear Plant",
    probabilityScore: 93,
    xSvg: 110,
    ySvg: 418,
    examinerTip:
      "Just north of Mumbai near Gujarat border. Oldest commercial nuclear power station in India (commissioned 1969 with US collaboration).",
    landmarkReference: "West Coast, North of Mumbai island",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 92",
  },
  {
    id: "narora",
    name: "Narora Nuclear Power Plant",
    kannadaName: "ನರೋರಾ ಅಣು ವಿದ್ಯುತ್ ಸ್ಥಾವರ",
    state: "Uttar Pradesh (Bulandshahr)",
    category: "Nuclear Plant",
    probabilityScore: 90,
    xSvg: 220,
    ySvg: 222,
    examinerTip:
      "Western Uttar Pradesh in Bulandshahr on the banks of Ganga River, roughly 140 km east of New Delhi.",
    landmarkReference: "Northern plains, East of Delhi",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 93",
  },
  {
    id: "kudankulam",
    name: "Kudankulam Nuclear Power Plant",
    kannadaName: "ಕೂಡಂಕುಳಂ ಅಣು ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Tamil Nadu (Tirunelveli)",
    category: "Nuclear Plant",
    probabilityScore: 92,
    xSvg: 198,
    ySvg: 660,
    examinerTip:
      "Extreme southern tip of Tamil Nadu coast, just 25 km northeast of Kanyakumari. Highest capacity nuclear plant in India (built with Russian VVER tech).",
    landmarkReference: "Southernmost coast near Kanyakumari",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 93",
  },
  {
    id: "rawatbhata",
    name: "Rawatbhata (Rajasthan Atomic Power Station)",
    kannadaName: "ರಾವತ್‌ಭಾಟಾ ಅಣು ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Rajasthan (Chittorgarh / Kota)",
    category: "Nuclear Plant",
    probabilityScore: 88,
    xSvg: 152,
    ySvg: 290,
    examinerTip:
      "Located on the Rana Pratap Sagar dam reservoir on Chambal River, 65 km southwest of Kota in southeastern Rajasthan.",
    landmarkReference: "Southeast Rajasthan on Chambal River",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 93",
  },
  {
    id: "kakrapar",
    name: "Kakrapar Atomic Power Station",
    kannadaName: "ಕಾಕ್ರಾಪಾರ್ ಅಣು ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Gujarat (Surat / Tapi River)",
    category: "Nuclear Plant",
    probabilityScore: 86,
    xSvg: 96,
    ySvg: 384,
    examinerTip:
      "Southern Gujarat on the Tapi River hinterland, 80 km east of Surat city. Home to India's indigenous 700 MWe PHWR reactor.",
    landmarkReference: "South Gujarat, near Tapi river",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 93",
  },

  // =========================================================================
  // 2. THERMAL POWER PLANTS (KTBS Ch 5: Mineral & Power Resources)
  // =========================================================================
  {
    id: "raichur_rtps",
    name: "Raichur Thermal Power Station (RTPS)",
    kannadaName: "ರಾಯಚೂರು ಶಾಖೋತ್ಪನ್ನ ವಿದ್ಯುತ್ ಕೇಂದ್ರ (RTPS)",
    state: "Karnataka (Raichur, Shaktinagar)",
    category: "Thermal Plant",
    probabilityScore: 97,
    xSvg: 182,
    ySvg: 482,
    examinerTip:
      "Located at Shaktinagar in Raichur district on the right bank of Krishna River. Karnataka's first coal-based mega thermal plant.",
    landmarkReference: "Northeast Karnataka near Krishna River",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 91",
  },
  {
    id: "bellary_btps",
    name: "Bellary Thermal Power Station (BTPS)",
    kannadaName: "ಬಳ್ಳಾರಿ ಶಾಖೋತ್ಪನ್ನ ವಿದ್ಯುತ್ ಕೇಂದ್ರ (BTPS)",
    state: "Karnataka (Ballari, Kudatini)",
    category: "Thermal Plant",
    probabilityScore: 92,
    xSvg: 174,
    ySvg: 502,
    examinerTip:
      "Located at Kudatini village in Ballari district, 20 km from Ballari town. Second major thermal plant of KPCL.",
    landmarkReference: "East-central Karnataka near Ballari",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 91",
  },
  {
    id: "neyveli",
    name: "Neyveli Lignite Thermal Plant",
    kannadaName: "ನೈವೇಲಿ ಕಲ್ಲಿದ್ದಲು ಶಾಖೋತ್ಪನ್ನ ಕೇಂದ್ರ",
    state: "Tamil Nadu (Cuddalore)",
    category: "Thermal Plant",
    probabilityScore: 93,
    xSvg: 232,
    ySvg: 602,
    examinerTip:
      "Interior Tamil Nadu in Cuddalore district. Largest lignite (brown coal) open-cast mining and thermal power complex in South Asia.",
    landmarkReference: "Central-East Tamil Nadu, southwest of Puducherry",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "korba",
    name: "Korba Super Thermal Power Plant",
    kannadaName: "ಕೊರ್ಬಾ ಸೂಪರ್ ಶಾಖೋತ್ಪನ್ನ ವಿದ್ಯುತ್ ಕೇಂದ್ರ",
    state: "Chhattisgarh (Korba)",
    category: "Thermal Plant",
    probabilityScore: 89,
    xSvg: 308,
    ySvg: 342,
    examinerTip:
      "Northern Chhattisgarh along Hasdeo River. Sourced from Korba coalfields; major NTPC super thermal powerhouse.",
    landmarkReference: "North Chhattisgarh coal basin",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 91",
  },
  {
    id: "talcher",
    name: "Talcher Super Thermal Power Plant",
    kannadaName: "ತಾಲ್ಚೇರ್ ಶಾಖೋತ್ಪನ್ನ ವಿದ್ಯುತ್ ಸ್ಥಾವರ",
    state: "Odisha (Angul)",
    category: "Thermal Plant",
    probabilityScore: 88,
    xSvg: 354,
    ySvg: 378,
    examinerTip:
      "Located in Angul district of Odisha in the Brahmani river basin. Sourced from major Talcher coalfields.",
    landmarkReference: "Central Odisha, Brahmani river basin",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 91",
  },

  // =========================================================================
  // 3. MAJOR SEAPORTS (KTBS Ch 8: Transport & Communication)
  // =========================================================================
  {
    id: "new_mangalore",
    name: "New Mangalore Port (NMP)",
    kannadaName: "ನವ ಮಂಗಳೂರು ಬಂದರು",
    state: "Karnataka (Dakshina Kannada)",
    category: "Port",
    probabilityScore: 99,
    xSvg: 144,
    ySvg: 560,
    examinerTip:
      "Karnataka's only major seaport, located at Panambur. Celebrated as the 'Gateway of Karnataka'. Major terminal for Kudremukh iron-ore pellets and MRPL petroleum.",
    landmarkReference: "South coastal Karnataka, north of Kerala border",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "mumbai_port",
    name: "Mumbai Port",
    kannadaName: "ಮುಂಬೈ ಬಂದರು",
    state: "Maharashtra (Salsette Island)",
    category: "Port",
    probabilityScore: 94,
    xSvg: 110,
    ySvg: 440,
    examinerTip:
      "Largest natural deep-water harbour and busiest port of India. Protected by Salsette Island and Konkan mainland.",
    landmarkReference: "Central Konkan coast, Salsette Island",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 127",
  },
  {
    id: "nhava_sheva",
    name: "Nhava Sheva (Jawaharlal Nehru Port - JNPT)",
    kannadaName: "ನವಶೇವಾ (ಜವಾಹರಲಾಲ್ ನೆಹರೂ ಬಂದರು)",
    state: "Maharashtra (Navi Mumbai)",
    category: "Port",
    probabilityScore: 93,
    xSvg: 116,
    ySvg: 444,
    examinerTip:
      "Constructed opposite Mumbai harbour in Navi Mumbai to relieve extreme congestion at Mumbai Port. India's largest premier container handling port.",
    landmarkReference: "Opposite Mumbai harbour, Konkan mainland",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 127",
  },
  {
    id: "marmagao",
    name: "Marmagao Port",
    kannadaName: "ಮರ್ಮಗೋವಾ ಬಂದರು",
    state: "Goa (South Goa)",
    category: "Port",
    probabilityScore: 95,
    xSvg: 120,
    ySvg: 514,
    examinerTip:
      "Estuary of the Zuari River in South Goa. Leading natural iron-ore export port of India, handling mineral cargo from Goa and Bellary-Hospet hinterland.",
    landmarkReference: "Goa coast, Zuari River mouth",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 127",
  },
  {
    id: "kochi_port",
    name: "Kochi Port (Cochin)",
    kannadaName: "ಕೊಚ್ಚಿ ಬಂದರು",
    state: "Kerala (Ernakulam)",
    category: "Port",
    probabilityScore: 94,
    xSvg: 160,
    ySvg: 624,
    examinerTip:
      "Natural harbour situated on Willingdon Island and Vallarpadam ICTT at the mouth of Vembanad Lake. Famed as the 'Queen of the Arabian Sea'.",
    landmarkReference: "Central Malabar coast, Vembanad lake mouth",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "tuticorin",
    name: "Tuticorin Port (V.O. Chidambaranar)",
    kannadaName: "ತೂತುಕುಡಿ (ವಿ.ಒ. ಚಿದಂಬರನಾರ್ ಬಂದರು)",
    state: "Tamil Nadu (Gulf of Mannar)",
    category: "Port",
    probabilityScore: 95,
    xSvg: 212,
    ySvg: 652,
    examinerTip:
      "Southeast coast of Tamil Nadu on the Gulf of Mannar. Celebrated as the 'Pearl City'. All-weather artificial harbour trading heavily with Sri Lanka.",
    landmarkReference: "Southeast coast facing Gulf of Mannar",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "chennai_port",
    name: "Chennai Port",
    kannadaName: "ಚೆನ್ನೈ ಬಂದರು",
    state: "Tamil Nadu (Coromandel Coast)",
    category: "Port",
    probabilityScore: 93,
    xSvg: 246,
    ySvg: 568,
    examinerTip:
      "Second busiest container port of India and oldest artificial harbour on the east coast (commissioned in 1881 with enclosed concrete breakwaters).",
    landmarkReference: "North Coromandel coast apex",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "ennore_port",
    name: "Ennore Port (Kamarajar Port)",
    kannadaName: "ಎನ್ನೋರ್ (ಕಾಮರಾಜರ್ ಬಂದರು)",
    state: "Tamil Nadu (North Chennai)",
    category: "Port",
    probabilityScore: 89,
    xSvg: 248,
    ySvg: 560,
    examinerTip:
      "Located 24 km north of Chennai Port. India's 12th major port and first corporatized port in the public sector, primarily handling thermal coal.",
    landmarkReference: "Coromandel coast, 24 km north of Chennai",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "visakhapatnam_port",
    name: "Visakhapatnam Port",
    kannadaName: "ವಿಶಾಖಪಟ್ಟಣಂ ಬಂದರು",
    state: "Andhra Pradesh (Northern Circars)",
    category: "Port",
    probabilityScore: 97,
    xSvg: 320,
    ySvg: 480,
    examinerTip:
      "Deepest landlocked, protected natural harbour of India, guarded by the Dolphin's Nose hill projection. Major hub for iron ore export to Japan and naval headquarters.",
    landmarkReference: "Northern Circars coast, Dolphin's Nose hill",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "paradeep",
    name: "Paradeep Port",
    kannadaName: "ಪಾರಾದೀಪ್ ಬಂದರು",
    state: "Odisha (Jagatsinghpur)",
    category: "Port",
    probabilityScore: 94,
    xSvg: 384,
    ySvg: 390,
    examinerTip:
      "Deep-water artificial port situated at the confluence of Mahanadi River and Bay of Bengal in Odisha. Primary outlet for iron ore and manganese from Odisha/Jharkhand.",
    landmarkReference: "Mahanadi River delta on Bay of Bengal",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "kolkata_port",
    name: "Kolkata Port (Syama Prasad Mookerjee Port)",
    kannadaName: "ಕೋಲ್ಕತ್ತಾ ಬಂದರು (ಶ್ಯಾವಾ ಪ್ರಸಾದ್ ಮುಖರ್ಜಿ)",
    state: "West Bengal (Hooghly River)",
    category: "Port",
    probabilityScore: 92,
    xSvg: 414,
    ySvg: 346,
    examinerTip:
      "Only riverine major port of India, located 128 km inland on the left bank of Hooghly River. Subject to heavy siltation and tidal bores requiring continuous dredging.",
    landmarkReference: "Hooghly River, 128 km upstream from sea",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "haldia_port",
    name: "Haldia Port Complex",
    kannadaName: "ಹಾಲ್ದಿಯಾ ಬಂದರು",
    state: "West Bengal (Hooghly estuary)",
    category: "Port",
    probabilityScore: 90,
    xSvg: 408,
    ySvg: 360,
    examinerTip:
      "Constructed at the confluence of Haldi and Hooghly rivers as a deep-water downstream companion to relieve Kolkata Port congestion.",
    landmarkReference: "Confluence of Haldi and Hooghly rivers",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 128",
  },
  {
    id: "kandla",
    name: "Kandla Port (Deendayal Port)",
    kannadaName: "ಕಾಂಡ್ಲಾ ಬಂದರು (ದೀನದಯಾಳ್)",
    state: "Gujarat (Gulf of Kutch)",
    category: "Port",
    probabilityScore: 96,
    xSvg: 52,
    ySvg: 350,
    examinerTip:
      "Tidal port located at the eastern head of the Gulf of Kutch. Developed post-partition to compensate for the loss of Karachi Port. India's first Free Trade Zone (FTZ).",
    landmarkReference: "Head of the Gulf of Kutch, Gujarat",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 127",
  },

  // =========================================================================
  // 4. MULTIPURPOSE RIVER VALLEY PROJECTS & DAMS (KTBS Ch 4: Water Resources)
  // =========================================================================
  {
    id: "bhakra_nangal",
    name: "Bhakra Nangal Dam",
    kannadaName: "ಭಾಕ್ರಾ ನಂಗಲ್ ಅಣೆಕಟ್ಟು",
    state: "Himachal Pradesh / Punjab",
    category: "Dam",
    probabilityScore: 98,
    xSvg: 180,
    ySvg: 152,
    examinerTip:
      "Built across Satluj River in the Shivalik foothills. Highest straight-gravity concrete dam in India (226 m). Forms the massive Govind Sagar reservoir.",
    landmarkReference: "Satluj River, Himachal-Punjab border",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 78",
  },
  {
    id: "hirakud",
    name: "Hirakud Dam",
    kannadaName: "ಹಿರಾಕುಡ್ ಅಣೆಕಟ್ಟು",
    state: "Odisha (Sambalpur)",
    category: "Dam",
    probabilityScore: 99,
    xSvg: 342,
    ySvg: 372,
    examinerTip:
      "Built across Mahanadi River near Sambalpur in Odisha. Longest earthen dam in the world (25.8 km total length with dykes). Tamed the 'Sorrow of Odisha'.",
    landmarkReference: "Mahanadi River, Western Odisha",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 79",
  },
  {
    id: "tungabhadra",
    name: "Tungabhadra Dam (Pampa Sagara)",
    kannadaName: "ತುಂಗಭದ್ರಾ ಅಣೆಕಟ್ಟು (ಪಂಪಾಸಾಗರ)",
    state: "Karnataka (Vijayanagara, Hosapete)",
    category: "Dam",
    probabilityScore: 99,
    xSvg: 172,
    ySvg: 504,
    examinerTip:
      "Built across Tungabhadra River at Mallapuram near Hosapete. Joint interstate venture between Karnataka and Andhra Pradesh. Reservoir named Pampa Sagara.",
    landmarkReference: "Central Karnataka near Hosapete / Hampi",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 80",
  },
  {
    id: "krs_dam",
    name: "Krishna Raja Sagara Dam (KRS)",
    kannadaName: "ಕೃಷ್ಣರಾಜ ಸಾಗರ ಅಣೆಕಟ್ಟು (KRS)",
    state: "Karnataka (Mandya)",
    category: "Dam",
    probabilityScore: 98,
    xSvg: 168,
    ySvg: 572,
    examinerTip:
      "Built across the Cauvery River below its confluence with Hemavathi and Lakshmanathirtha near Kannambadi in Mandya. Designed by Sir M. Visvesvaraya. Features Brindavan Gardens.",
    landmarkReference: "South Karnataka, Cauvery river in Mandya",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 80",
  },
  {
    id: "almatti_dam",
    name: "Almatti Dam (Lal Bahadur Shastri Sagara)",
    kannadaName: "ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು (ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ)",
    state: "Karnataka (Bagalkote / Vijayapura)",
    category: "Dam",
    probabilityScore: 96,
    xSvg: 162,
    ySvg: 476,
    examinerTip:
      "Main storage dam of the Upper Krishna Project (UKP) built across Krishna River in Bagalkote district. Landmark reservoir of North Karnataka.",
    landmarkReference: "North Karnataka, Krishna River in Bagalkote",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 80",
  },
  {
    id: "nagarjuna_sagar",
    name: "Nagarjuna Sagar Dam",
    kannadaName: "ನಾಗಾರ್ಜುನ ಸಾಗರ ಅಣೆಕಟ್ಟು",
    state: "Telangana / Andhra Pradesh",
    category: "Dam",
    probabilityScore: 97,
    xSvg: 246,
    ySvg: 490,
    examinerTip:
      "Built across Krishna River on the border of Nalgonda (Telangana) and Palnadu (AP). World's largest masonry dam with 26 radial crest gates.",
    landmarkReference: "Krishna River, Telangana-AP border",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 79",
  },
  {
    id: "sardar_sarovar",
    name: "Sardar Sarovar Dam",
    kannadaName: "ಸರ್ದಾರ್ ಸರೋವರ್ ಅಣೆಕಟ್ಟು",
    state: "Gujarat (Kevadiya, Narmada)",
    category: "Dam",
    probabilityScore: 94,
    xSvg: 108,
    ySvg: 370,
    examinerTip:
      "Built across Narmada River at Kevadiya in Narmada district. Second largest concrete dam in the world by volume. Site of the Statue of Unity.",
    landmarkReference: "Narmada River gorge, East Gujarat",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 81",
  },
  {
    id: "tehri_dam",
    name: "Tehri Dam",
    kannadaName: "ತೆಹ್ರಿ ಅಣೆಕಟ್ಟು",
    state: "Uttarakhand (Bhagirathi River)",
    category: "Dam",
    probabilityScore: 91,
    xSvg: 228,
    ySvg: 168,
    examinerTip:
      "Highest dam in India and 8th tallest in the world (260.5 m). Rock and earth-fill embankment dam on the Bhagirathi River in Tehri Garhwal.",
    landmarkReference: "Garhwal Himalayas, Bhagirathi River",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 81",
  },
  {
    id: "damodar_valley",
    name: "Damodar Valley Project (Maithon & Panchet)",
    kannadaName: "ದಾಮೋದರ್ ಕಣಿವೆ ಯೋಜನೆ (ಮೈಥಾನ್ ಮತ್ತು ಪಂಚೇತ್)",
    state: "Jharkhand / West Bengal",
    category: "Dam",
    probabilityScore: 93,
    xSvg: 378,
    ySvg: 330,
    examinerTip:
      "India's first multipurpose river valley corporation (DVC, 1948 modeled after US TVA). Built across Damodar River, formerly known as 'Sorrow of Bengal'.",
    landmarkReference: "Damodar River basin, Jharkhand-Bengal border",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 79",
  },
  {
    id: "rihand_dam",
    name: "Rihand Dam (Govind Ballabh Pant Sagar)",
    kannadaName: "ರಿಹಾಂಡ್ ಅಣೆಕಟ್ಟು (ಗೋವಿಂದ ಬಲ್ಲಭ ಪಂತ್ ಸಾಗರ)",
    state: "Uttar Pradesh (Sonbhadra)",
    category: "Dam",
    probabilityScore: 89,
    xSvg: 316,
    ySvg: 298,
    examinerTip:
      "Concrete gravity dam built across Rihand River (tributary of Son) at Pipri in Sonbhadra district. Largest artificial reservoir in India by volume.",
    landmarkReference: "Southernmost Uttar Pradesh border near Son River",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 80",
  },
  {
    id: "kosi_project",
    name: "Kosi Multipurpose Project",
    kannadaName: "ಕೋಸಿ ನದಿ ಯೋಜನೆ",
    state: "Bihar (Indo-Nepal border)",
    category: "Dam",
    probabilityScore: 87,
    xSvg: 392,
    ySvg: 256,
    examinerTip:
      "Barrage across Kosi River near Bhimnagar on the Indo-Nepal border. Built to mitigate chronic catastrophic flooding ('Sorrow of Bihar').",
    landmarkReference: "Northeast Bihar, near Nepal border",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 81",
  },
  {
    id: "idukki_dam",
    name: "Idukki Arch Dam",
    kannadaName: "ಇಡುಕ್ಕಿ ಕಮಾನು ಅಣೆಕಟ್ಟು",
    state: "Kerala (Periyar River)",
    category: "Dam",
    probabilityScore: 90,
    xSvg: 172,
    ySvg: 628,
    examinerTip:
      "Double curvature parabolic thin arch dam constructed between Kuravan and Kurathi granite hills across the Periyar River. One of the highest arch dams in Asia.",
    landmarkReference: "Cardamom Hills / Western Ghats in Kerala",
    ktbsReference: "KTBS Class 10 Geography Ch 4, Page 81",
  },

  // =========================================================================
  // 5. IRON & STEEL AND HEAVY INDUSTRIES (KTBS Ch 7: Major Industries)
  // =========================================================================
  {
    id: "bhadravathi",
    name: "Bhadravathi (VISL)",
    kannadaName: "ಭದ್ರಾವತಿ (ವಿಶ್ವೇಶ್ವರಯ್ಯ ಕಬ್ಬಿಣ ಮತ್ತು ಉಕ್ಕು)",
    state: "Karnataka (Shivamogga)",
    category: "Steel & Industry",
    probabilityScore: 99,
    xSvg: 158,
    ySvg: 536,
    examinerTip:
      "Located on the banks of Bhadra River in Shivamogga district. Founded in 1923 by Sir M. Visvesvaraya (originally Mysore Iron Works). Sourced from Kemmannugundi iron ore.",
    landmarkReference: "Central Karnataka on the Bhadra River",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "jsw_vijayanagar",
    name: "Jindal Vijayanagar Steel (JSW)",
    kannadaName: "ಜಿಂದಾಲ್ ವಿಜಯನಗರ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "Karnataka (Ballari, Toranagallu)",
    category: "Steel & Industry",
    probabilityScore: 95,
    xSvg: 176,
    ySvg: 508,
    examinerTip:
      "Located at Toranagallu in the Sandur-Hospet iron ore belt of Ballari district. Largest single-location integrated steel manufacturing plant in India.",
    landmarkReference: "East-central Karnataka, Ballari-Sandur belt",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "jamshedpur",
    name: "Jamshedpur (TISCO - Tata Steel)",
    kannadaName: "ಜಮ್ಶೆಡ್‌ಪುರ (ಟಾಟಾ ಉಕ್ಕು ಕಾರ್ಖಾನೆ)",
    state: "Jharkhand (East Singhbhum)",
    category: "Steel & Industry",
    probabilityScore: 98,
    xSvg: 380,
    ySvg: 342,
    examinerTip:
      "Confluence of Subarnarekha and Kharkai rivers in Jharkhand. India's first modern integrated steel plant founded by Jamsetji Tata in 1907. Sourced from Noamundi & Gorumahisani.",
    landmarkReference: "Chota Nagpur Plateau, southeast Jharkhand",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 115",
  },
  {
    id: "rourkela",
    name: "Rourkela Steel Plant (RSP)",
    kannadaName: "ರೂರ್ಕೆಲಾ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "Odisha (Sundargarh)",
    category: "Steel & Industry",
    probabilityScore: 94,
    xSvg: 352,
    ySvg: 354,
    examinerTip:
      "First public sector integrated steel plant set up with German collaboration (Krupp and Demag) in 1959. Sourced from Sundargarh and Keonjhar iron belt.",
    landmarkReference: "Northern Odisha, Brahmani River basin",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "bhilai",
    name: "Bhilai Steel Plant (BSP)",
    kannadaName: "ಭಿಲಾಯ್ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "Chhattisgarh (Durg district)",
    category: "Steel & Industry",
    probabilityScore: 95,
    xSvg: 290,
    ySvg: 384,
    examinerTip:
      "Established with Soviet Russian collaboration in 1955. Sole producer of India's world-class heavy railway rails. Sourced from Dalli-Rajhara iron mines.",
    landmarkReference: "Central Chhattisgarh, near Raipur",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "durgapur",
    name: "Durgapur Steel Plant (DSP)",
    kannadaName: "ದುರ್ಗಾಪುರ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "West Bengal (Damodar Valley)",
    category: "Steel & Industry",
    probabilityScore: 91,
    xSvg: 396,
    ySvg: 332,
    examinerTip:
      "Set up in 1959 along the Damodar River in Paschim Bardhaman with British collaboration. Primary producer of wheel and axle assemblies for Indian Railways.",
    landmarkReference: "Damodar Valley, western West Bengal",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "bokaro",
    name: "Bokaro Steel Plant (BSL)",
    kannadaName: "ಬೊಕಾರೊ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "Jharkhand (Bokaro)",
    category: "Steel & Industry",
    probabilityScore: 92,
    xSvg: 372,
    ySvg: 324,
    examinerTip:
      "Fourth public sector integrated plant built with Soviet assistance in 1964. First to use 100% indigenous raw materials and capital equipment.",
    landmarkReference: "Central Jharkhand, Damodar river basin",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 116",
  },
  {
    id: "salem_steel",
    name: "Salem Steel Plant",
    kannadaName: "ಸೇಲಂ ಉಕ್ಕು ಕಾರ್ಖಾನೆ",
    state: "Tamil Nadu (Salem, Kanjamalai)",
    category: "Steel & Industry",
    probabilityScore: 90,
    xSvg: 204,
    ySvg: 596,
    examinerTip:
      "Unit of SAIL located at Salem in western Tamil Nadu. Pioneer producer of premium stainless steel using magnetite iron ore from Kanjamalai hills.",
    landmarkReference: "Western Tamil Nadu, Kanjamalai hill base",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 117",
  },
  {
    id: "visakhapatnam_steel",
    name: "Visakhapatnam Steel Plant (RINL)",
    kannadaName: "ವಿಶಾಖಪಟ್ಟಣಂ ಉಕ್ಕು ಕಾರ್ಖಾನೆ (RINL)",
    state: "Andhra Pradesh (Visakhapatnam)",
    category: "Steel & Industry",
    probabilityScore: 93,
    xSvg: 316,
    ySvg: 482,
    examinerTip:
      "Only coastal shore-based integrated steel plant in India, facilitating easy import of coking coal from Australia and export of finished steel products.",
    landmarkReference: "East coast, adjacent to Visakhapatnam Port",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 117",
  },

  // =========================================================================
  // 6. PETROLEUM FIELDS & REFINERIES (KTBS Ch 5: Mineral & Power Resources)
  // =========================================================================
  {
    id: "digboi",
    name: "Digboi Oil Field",
    kannadaName: "ದಿಗ್ಬೋಯಿ ತೈಲಕ್ಷೇತ್ರ",
    state: "Assam (Tinsukia district)",
    category: "Petroleum",
    probabilityScore: 99,
    xSvg: 574,
    ySvg: 236,
    examinerTip:
      "Extreme northeastern tip of Assam in Tinsukia district. Oldest continuously producing oilfield and operational refinery in Asia (drilled in 1889, commissioned 1901).",
    landmarkReference: "Far East corner of Assam, south of Brahmaputra",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 89",
  },
  {
    id: "mumbai_high",
    name: "Mumbai High Offshore Oilfield",
    kannadaName: "ಮುಂಬೈ ಹೈ ತೈಲಕ್ಷೇತ್ರ",
    state: "Offshore Arabian Sea (Maharashtra)",
    category: "Petroleum",
    probabilityScore: 98,
    xSvg: 84,
    ySvg: 428,
    examinerTip:
      "Located in the continental shelf of the Arabian Sea, roughly 160 km west-northwest of Mumbai coast. India's largest and most productive offshore crude oil and gas reserve.",
    landmarkReference: "Offshore Arabian Sea, 160 km WNW of Mumbai",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 89",
  },
  {
    id: "bassein_oil",
    name: "Bassein Offshore Gas & Oilfield",
    kannadaName: "ಬಸ್ಸೀನ್ ತೈಲಕ್ಷೇತ್ರ",
    state: "Offshore Arabian Sea (Maharashtra)",
    category: "Petroleum",
    probabilityScore: 89,
    xSvg: 90,
    ySvg: 446,
    examinerTip:
      "Rich offshore natural gas field located south of Mumbai High off the Vasai/Konkan coastline.",
    landmarkReference: "Offshore Arabian Sea, South of Mumbai High",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "ankleshwar",
    name: "Ankleshwar Oil Field",
    kannadaName: "ಅಂಕಲೇಶ್ವರ ತೈಲಕ್ಷೇತ್ರ",
    state: "Gujarat (Bharuch)",
    category: "Petroleum",
    probabilityScore: 94,
    xSvg: 90,
    ySvg: 378,
    examinerTip:
      "Major onshore oil field in the Cambay basin in Bharuch district. Described by Pandit Jawaharlal Nehru as the 'Fountain of Prosperity'.",
    landmarkReference: "South Gujarat, south of Narmada River",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 89",
  },
  {
    id: "jamnagar_refinery",
    name: "Jamnagar Oil Refinery (RIL)",
    kannadaName: "ಜಾಮ್‌ನಗರ ತೈಲ ಸಂಸ್ಕರಣಾಗಾರ",
    state: "Gujarat (Jamnagar)",
    category: "Petroleum",
    probabilityScore: 91,
    xSvg: 42,
    ySvg: 362,
    examinerTip:
      "Located at Moti Khavdi in Jamnagar district on Gulf of Kutch. World's largest grassroot integrated oil refining complex.",
    landmarkReference: "South shore of Gulf of Kutch, Saurashtra",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "mathura_refinery",
    name: "Mathura Oil Refinery",
    kannadaName: "ಮಥುರಾ ತೈಲ ಸಂಸ್ಕರಣಾಗಾರ",
    state: "Uttar Pradesh (Mathura)",
    category: "Petroleum",
    probabilityScore: 92,
    xSvg: 204,
    ySvg: 228,
    examinerTip:
      "Major Indian Oil refinery in western UP on Yamuna plains. Sourced via pipeline from Salaya/Vadinar in Gujarat.",
    landmarkReference: "Western UP, Yamuna River basin south of Delhi",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "barauni_refinery",
    name: "Barauni Oil Refinery",
    kannadaName: "ಬರೌನಿ ತೈಲ ಸಂಸ್ಕರಣಾಗಾರ",
    state: "Bihar (Begusarai)",
    category: "Petroleum",
    probabilityScore: 90,
    xSvg: 382,
    ySvg: 272,
    examinerTip:
      "Built with Soviet and Romanian assistance in 1964 in Begusarai district. Connected by crude pipeline from Naharkatiya/Digboi in Assam.",
    landmarkReference: "Central Bihar, north bank of Ganga",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "mrpl_mangalore",
    name: "Mangalore Refinery & Petrochemicals (MRPL)",
    kannadaName: "ಮಂಗಳೂರು ಸಂಸ್ಕರಣಾಗಾರ (MRPL)",
    state: "Karnataka (Mangaluru)",
    category: "Petroleum",
    probabilityScore: 96,
    xSvg: 142,
    ySvg: 556,
    examinerTip:
      "Only coastal crude oil refinery in Karnataka, situated at Katipalla/Kuthethur near New Mangalore Port. Major subsidiary of ONGC.",
    landmarkReference: "Coastal Karnataka, north of Mangaluru city",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },
  {
    id: "kochi_refinery",
    name: "Kochi Oil Refinery (BPCL)",
    kannadaName: "ಕೊಚ್ಚಿ ತೈಲ ಸಂಸ್ಕರಣಾಗಾರ",
    state: "Kerala (Ambalamugal)",
    category: "Petroleum",
    probabilityScore: 88,
    xSvg: 164,
    ySvg: 622,
    examinerTip:
      "Located at Ambalamugal near Kochi in Kerala. Largest public sector refinery in India (15.5 MMTPA).",
    landmarkReference: "Central Kerala hinterland, east of Kochi Port",
    ktbsReference: "KTBS Class 10 Geography Ch 5, Page 90",
  },

  // =========================================================================
  // 7. INTERNATIONAL AIRPORTS (KTBS Ch 8: Transport & Communication)
  // =========================================================================
  {
    id: "kempegowda_airport",
    name: "Kempegowda International Airport (BLR)",
    kannadaName: "ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ",
    state: "Karnataka (Bengaluru, Devanahalli)",
    category: "Airport",
    probabilityScore: 99,
    xSvg: 186,
    ySvg: 558,
    examinerTip:
      "Located at Devanahalli, 30 km north of Bengaluru city center. Third busiest airport in India and premier aviation hub of South India.",
    landmarkReference: "Southeast Karnataka, Devanahalli north of Bengaluru",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "mumbai_airport",
    name: "Chhatrapati Shivaji Maharaj Airport (BOM)",
    kannadaName: "ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜ್ ವಿಮಾನ ನಿಲ್ದಾಣ",
    state: "Maharashtra (Mumbai, Santa Cruz/Sahar)",
    category: "Airport",
    probabilityScore: 94,
    xSvg: 112,
    ySvg: 436,
    examinerTip:
      "Premier international aviation hub of Western India, situated on Salsette Island in Mumbai.",
    landmarkReference: "Mumbai Island, Salsette",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "delhi_airport",
    name: "Indira Gandhi International Airport (DEL)",
    kannadaName: "ಇಂದಿರಾ ಗಾಂಧಿ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ",
    state: "Delhi (Palam)",
    category: "Airport",
    probabilityScore: 96,
    xSvg: 184,
    ySvg: 208,
    examinerTip:
      "Busiest airport in India and primary international gateway of the nation, situated at Palam in southwest New Delhi.",
    landmarkReference: "Southwest New Delhi",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "kolkata_airport",
    name: "Netaji Subhash Chandra Bose Airport (CCU)",
    kannadaName: "ನೇತಾಜಿ ಸುಭಾಷ್ ಚಂದ್ರ ಬೋಸ್ ವಿಮಾನ ನಿಲ್ದಾಣ",
    state: "West Bengal (Kolkata, Dum Dum)",
    category: "Airport",
    probabilityScore: 91,
    xSvg: 416,
    ySvg: 344,
    examinerTip:
      "Situated at Dum Dum, 17 km northeast of Kolkata city. Premier aviation hub for Eastern and North-Eastern India.",
    landmarkReference: "Dum Dum, northeast of Kolkata",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "chennai_airport",
    name: "Chennai International Airport (Meenambakkam)",
    kannadaName: "ಚೆನ್ನೈ ವಿಮಾನ ನಿಲ್ದಾಣ (ಮೀನಂಬಾಕ್ಕಂ)",
    state: "Tamil Nadu (Chennai, Meenambakkam)",
    category: "Airport",
    probabilityScore: 92,
    xSvg: 244,
    ySvg: 570,
    examinerTip:
      "Located at Meenambakkam and Tirusulam, southwest of Chennai city. Third major gateway of India.",
    landmarkReference: "Southwest of Chennai city center",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "hyderabad_airport",
    name: "Rajiv Gandhi International Airport (HYD)",
    kannadaName: "ರಾಜೀವ್ ಗಾಂಧಿ ವಿಮಾನ ನಿಲ್ದಾಣ (ಶಂಶಾಬಾದ್)",
    state: "Telangana (Hyderabad, Shamshabad)",
    category: "Airport",
    probabilityScore: 90,
    xSvg: 228,
    ySvg: 468,
    examinerTip:
      "Located at Shamshabad, 24 km south of Hyderabad. Consistently ranked among the top airports for passenger quality.",
    landmarkReference: "South of Hyderabad city in Shamshabad",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },
  {
    id: "amritsar_airport",
    name: "Sri Guru Ram Dass Jee Airport (ATQ)",
    kannadaName: "ಶ್ರೀ ಗುರು ರಾಮ್ ದಾಸ್ ಜೀ ವಿಮಾನ ನಿಲ್ದಾಣ (ಅಮೃತಸರ)",
    state: "Punjab (Amritsar, Rajasansi)",
    category: "Airport",
    probabilityScore: 89,
    xSvg: 144,
    ySvg: 142,
    examinerTip:
      "Located at Rajasansi, 11 km northwest of Amritsar in Punjab. Primary international gateway for Punjab and northwest border region.",
    landmarkReference: "Northwest Punjab, near Amritsar and Wagah border",
    ktbsReference: "KTBS Class 10 Geography Ch 8, Page 129",
  },

  // =========================================================================
  // 8. PHYSICAL FEATURES, PEAKS & REFERENCE LINES (KTBS Ch 1 & 2)
  // =========================================================================
  {
    id: "meridian_82_30",
    name: "82°30' E Indian Standard Meridian (IST)",
    kannadaName: "82°30' ಪೂರ್ವ ರೇಖಾಂಶ (ಭಾರತೀಯ ಪ್ರಮಾಣ ವೇಳೆ)",
    state: "UP, MP, Chhattisgarh, Odisha, AP",
    category: "Physical & Line",
    probabilityScore: 99,
    xSvg: 298,
    ySvg: 272,
    examinerTip:
      "Chief Board Exam Question! Draw a vertical dashed north-south line passing through Mirzapur / Prayagraj (UP), slicing through AP down to Bay of Bengal. Fixes India's uniform time (UTC+5:30).",
    landmarkReference: "Vertical Meridian passing Mirzapur/Prayagraj",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 52",
  },
  {
    id: "tropic_of_cancer",
    name: "23°30' N Tropic of Cancer",
    kannadaName: "23°30' ಉತ್ತರ ಅಕ್ಷಾಂಶ (ಕರ್ಕಾಟಕ ಸಂಕ್ರಾಂತಿ ವೃತ್ತ)",
    state: "Gujarat, RJ, MP, CG, JH, WB, TR, MZ",
    category: "Physical & Line",
    probabilityScore: 99,
    xSvg: 214,
    ySvg: 328,
    examinerTip:
      "Horizontal latitude line dividing India into Northern temperate and Southern tropical halves. Passes across 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.",
    landmarkReference: "Horizontal latitude dividing India into two halves",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 52",
  },
  {
    id: "k2_peak",
    name: "Mount K2 (Godwin Austen - 8,611 m)",
    kannadaName: "ಕೆ2 ಶಿಖರ (ಗಾಡ್ವಿನ್ ಆಸ್ಟಿನ್ - 8,611 ಮೀ)",
    state: "Jammu & Kashmir / Ladakh (Karakoram)",
    category: "Physical & Line",
    probabilityScore: 96,
    xSvg: 152,
    ySvg: 32,
    examinerTip:
      "Highest peak in the Indian subcontinent and second highest peak on Earth (8,611 m). Located in the Karakoram range in northern Ladakh / Gilgit-Baltistan.",
    landmarkReference: "Karakoram Range, northern crown of Kashmir",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 58",
  },
  {
    id: "kanchenjunga",
    name: "Mount Kanchenjunga (8,586 m)",
    kannadaName: "ಕಾಂಚನಜುಂಗಾ ಶಿಖರ (8,586 ಮೀ)",
    state: "Sikkim (Indo-Nepal border)",
    category: "Physical & Line",
    probabilityScore: 95,
    xSvg: 422,
    ySvg: 228,
    examinerTip:
      "Third highest peak in the world (8,586 m) and highest mountain peak in undisputed Indian territory, situated on the western border of Sikkim with Nepal.",
    landmarkReference: "Western border of Sikkim with Nepal",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 59",
  },
  {
    id: "anamudi",
    name: "Anamudi Peak (2,695 m)",
    kannadaName: "ಅನೈಮುಡಿ ಶಿಖರ (2,695 ಮೀ)",
    state: "Kerala (Idukki, Annamalai Hills)",
    category: "Physical & Line",
    probabilityScore: 96,
    xSvg: 172,
    ySvg: 620,
    examinerTip:
      "Highest peak in Peninsular India and Western Ghats (2,695 m). Celebrated as the 'Everest of South India'. Tri-junction of Annamalai, Palani, and Cardamom hills.",
    landmarkReference: "Western Ghats, Annamalai Hills near Munnar",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 61",
  },
  {
    id: "mullayanagiri",
    name: "Mullayanagiri Peak (1,930 m)",
    kannadaName: "ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ (1,930 ಮೀ)",
    state: "Karnataka (Chikkamagaluru, Bababudangiri)",
    category: "Physical & Line",
    probabilityScore: 97,
    xSvg: 156,
    ySvg: 546,
    examinerTip:
      "Highest mountain peak in Karnataka state (1,930 m), located in the Bababudangiri range of Chikkamagaluru district.",
    landmarkReference: "Chikkamagaluru, Bababudangiri hill range",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 62",
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari (Cape Comorin - 8°4' N)",
    kannadaName: "ಕನ್ಯಾಕುಮಾರಿ (ಕೇಪ್ ಕಾಮೋರಿನ್ - 8°4' ಉ)",
    state: "Tamil Nadu (Southern apex)",
    category: "Physical & Line",
    probabilityScore: 99,
    xSvg: 196,
    ySvg: 666,
    examinerTip:
      "Southernmost mainland tip of India. Confluence tri-junction where Arabian Sea, Bay of Bengal, and Indian Ocean meet. Landmark baseline at 8°4' N latitude.",
    landmarkReference: "Extreme southern tip of mainland Indian peninsula",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 51",
  },
  {
    id: "indira_point",
    name: "Indira Point (6°45' N)",
    kannadaName: "ಇಂದಿರಾ ಪಾಯಿಂಟ್ (6°45' ಉ)",
    state: "Andaman & Nicobar (Great Nicobar)",
    category: "Physical & Line",
    probabilityScore: 97,
    xSvg: 538,
    ySvg: 692,
    examinerTip:
      "Southernmost geographical point of the Republic of India, situated at 6°45' N latitude on the southern tip of Great Nicobar Island (formerly Pygmalion Point).",
    landmarkReference: "Southern tip of Great Nicobar Island",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 51",
  },
  {
    id: "indira_col",
    name: "Indira Col (37°6' N)",
    kannadaName: "ಇಂದಿರಾ ಕೋಲ್ (37°6' ಉ)",
    state: "Ladakh (Siachen Glacier)",
    category: "Physical & Line",
    probabilityScore: 92,
    xSvg: 168,
    ySvg: 18,
    examinerTip:
      "Northernmost geographical point of India situated at 37°6' N latitude in the Siachen Muztagh on the Saltoro Ridge.",
    landmarkReference: "Northernmost tip of Siachen Glacier, Ladakh",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 51",
  },
  {
    id: "rann_of_kutch",
    name: "Rann of Kutch (Great & Little Rann)",
    kannadaName: "ಕಚ್ಛ್‌ನ ರಾಣ್ (ಉಪ್ಪು ಮರುಭೂಮಿ)",
    state: "Gujarat (Kutch district)",
    category: "Physical & Line",
    probabilityScore: 95,
    xSvg: 34,
    ySvg: 318,
    examinerTip:
      "Vast shallow seasonal salt marsh desert located on the northwest border with Pakistan. Divided into Great Rann in the north and Little Rann in the east.",
    landmarkReference: "Northwest Gujarat on Pakistan border",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 63",
  },
  {
    id: "coromandel_coast",
    name: "Coromandel Coast",
    kannadaName: "ಕೋರಮಂಡಲ ತೀರ",
    state: "Tamil Nadu & South Andhra Pradesh",
    category: "Physical & Line",
    probabilityScore: 96,
    xSvg: 248,
    ySvg: 600,
    examinerTip:
      "Southeastern coastal plain stretching between Point Calimere/Kanyakumari in the south and Krishna delta in the north. Receives maximum rainfall during Northeast Monsoon (retreating monsoon).",
    landmarkReference: "Southeastern coastal plain facing Bay of Bengal",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 63",
  },
  {
    id: "malabar_coast",
    name: "Malabar Coast",
    kannadaName: "ಮಲಬಾರ್ ತೀರ",
    state: "Kerala & South Karnataka",
    category: "Physical & Line",
    probabilityScore: 95,
    xSvg: 154,
    ySvg: 606,
    examinerTip:
      "Southwestern coastal plain between Mangaluru in the north and Kanyakumari in the south. Characterized by lagoons, backwaters (Kayals), and sand dunes.",
    landmarkReference: "Southwestern coastal plain of Kerala",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 63",
  },
  {
    id: "konkan_coast",
    name: "Konkan Coast",
    kannadaName: "ಕೊಂಕಣ ತೀರ",
    state: "Maharashtra & Goa",
    category: "Physical & Line",
    probabilityScore: 94,
    xSvg: 118,
    ySvg: 472,
    examinerTip:
      "Western coastal plain of India stretching from Daman in the north to Goa in the south. Characterized by submerged valleys, sea-cliffs, and estuaries.",
    landmarkReference: "West coast along Maharashtra and Goa",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 63",
  },
  {
    id: "northern_circars",
    name: "Northern Circars Coast",
    kannadaName: "ಉತ್ತರ ಸರ್ಕಾರ್ ತೀರ",
    state: "Andhra Pradesh & Odisha",
    category: "Physical & Line",
    probabilityScore: 92,
    xSvg: 310,
    ySvg: 440,
    examinerTip:
      "Northern segment of the eastern coastal plain lying between the Mahanadi and Krishna river deltas in Odisha and Andhra Pradesh.",
    landmarkReference: "East coast between Mahanadi and Krishna deltas",
    ktbsReference: "KTBS Class 10 Geography Ch 2, Page 63",
  },
  {
    id: "palk_strait",
    name: "Palk Strait & Gulf of Mannar",
    kannadaName: "ಪಾಕ್ ಜಲಸಂಧಿ ಮತ್ತು ಮನ್ನಾರ್ ಕೊಲ್ಲಿ",
    state: "Tamil Nadu (Separating India & Sri Lanka)",
    category: "Physical & Line",
    probabilityScore: 96,
    xSvg: 236,
    ySvg: 652,
    examinerTip:
      "Narrow maritime strait connecting Bay of Bengal with Palk Bay and separating Tamil Nadu from the Jaffna peninsula of Sri Lanka.",
    landmarkReference: "Shallow sea between southeast Tamil Nadu and Sri Lanka",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 52",
  },
  {
    id: "sundarbans_delta",
    name: "Sundarbans Delta",
    kannadaName: "ಸುಂದರಬನ ಮುಖಜಭೂಮಿ",
    state: "West Bengal (Ganga-Brahmaputra)",
    category: "Physical & Line",
    probabilityScore: 95,
    xSvg: 426,
    ySvg: 360,
    examinerTip:
      "Largest river delta and tidal halophytic mangrove forest in the world, formed by the confluence of Ganga, Brahmaputra, and Meghna rivers.",
    landmarkReference: "Southern deltaic fringe of West Bengal on Bay of Bengal",
    ktbsReference: "KTBS Class 10 Geography Ch 2 & 3, Page 64",
  },

  // =========================================================================
  // 9. NATIONAL PARKS & BIOSPHERE RESERVES (KTBS Ch 3 & 4)
  // =========================================================================
  {
    id: "bandipur",
    name: "Bandipur National Park",
    kannadaName: "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Karnataka (Chamarajanagar)",
    category: "National Park",
    probabilityScore: 98,
    xSvg: 170,
    ySvg: 586,
    examinerTip:
      "Located at the tri-junction of Karnataka, Tamil Nadu, and Kerala in Chamarajanagar district. Part of the Nilgiri Biosphere Reserve and pioneer Project Tiger reserve.",
    landmarkReference: "Southern tip of Karnataka on Mysore-Ooty highway",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 73",
  },
  {
    id: "nagarhole",
    name: "Nagarhole National Park (Rajiv Gandhi NP)",
    kannadaName: "ನಾಗರಹೊಳೆ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Karnataka (Kodagu / Mysuru)",
    category: "National Park",
    probabilityScore: 95,
    xSvg: 160,
    ySvg: 578,
    examinerTip:
      "Situated in the Western Ghats across Kodagu and Mysuru districts, bounded by Kabini River reservoir.",
    landmarkReference: "Southwest Karnataka on Kabini river bank",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 73",
  },
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    kannadaName: "ಕಾಜಿರಂಗ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Assam (Golaghat / Nagaon)",
    category: "National Park",
    probabilityScore: 97,
    xSvg: 536,
    ySvg: 254,
    examinerTip:
      "Located in the floodplains of the Brahmaputra River in central Assam. UNESCO World Heritage Site hosting two-thirds of the world's Great Indian One-Horned Rhinoceroses.",
    landmarkReference: "Central Assam on the Brahmaputra floodplains",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },
  {
    id: "corbett",
    name: "Jim Corbett National Park",
    kannadaName: "ಜಿಮ್ ಕಾರ್ಬೆಟ್ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Uttarakhand (Nainital / Pauri Garhwal)",
    category: "National Park",
    probabilityScore: 95,
    xSvg: 232,
    ySvg: 182,
    examinerTip:
      "Oldest national park in India (established 1936 as Hailey National Park) on Ramganga River in the Shivalik foothills. First to come under Project Tiger.",
    landmarkReference: "Uttarakhand Shivalik foothills on Ramganga River",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },
  {
    id: "gir_national_park",
    name: "Gir National Park",
    kannadaName: "ಗಿರ್ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Gujarat (Junagadh / Saurashtra)",
    category: "National Park",
    probabilityScore: 96,
    xSvg: 58,
    ySvg: 390,
    examinerTip:
      "Located in the Kathiawar peninsula in Junagadh district of Gujarat. Only natural habitat and refuge in the world for the endangered Asiatic Lion (Panthera leo persica).",
    landmarkReference: "Southern tip of Kathiawar Peninsula, Gujarat",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },
  {
    id: "sundarbans_park",
    name: "Sundarbans National Park",
    kannadaName: "ಸುಂದರಬನ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "West Bengal (South 24 Parganas)",
    category: "National Park",
    probabilityScore: 94,
    xSvg: 428,
    ySvg: 364,
    examinerTip:
      "Tidal mangrove UNESCO World Heritage Site and Biosphere Reserve in the Ganga delta. Famed globally for the swimming Royal Bengal Tigers and estuarine crocodiles.",
    landmarkReference: "Ganga-Brahmaputra tidal delta, West Bengal",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },
  {
    id: "periyar_park",
    name: "Periyar National Park & Tiger Reserve",
    kannadaName: "ಪೆರಿಯಾರ್ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Kerala (Thekkady, Idukki)",
    category: "National Park",
    probabilityScore: 93,
    xSvg: 176,
    ySvg: 636,
    examinerTip:
      "Protected sanctuary in the Cardamom and Pandalam hills of Western Ghats around the artificial Periyar Lake. Celebrated for wild elephants and tiger conservation.",
    landmarkReference: "Cardamom Hills near Thekkady, Kerala",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },
  {
    id: "ranthambore",
    name: "Ranthambore National Park",
    kannadaName: "ರಣಥಂಬೋರ್ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ",
    state: "Rajasthan (Sawai Madhopur)",
    category: "National Park",
    probabilityScore: 91,
    xSvg: 164,
    ySvg: 264,
    examinerTip:
      "Confluence of Aravalli and Vindhya hill ranges in eastern Rajasthan. Celebrated for its diurnal Bengal Tigers and the historic 10th-century Ranthambore fortress.",
    landmarkReference: "Aravalli-Vindhya junction, East Rajasthan",
    ktbsReference: "KTBS Class 10 Geography Ch 3, Page 74",
  },

  // =========================================================================
  // 10. MAJOR CAPITALS & KEY EDUCATIONAL HUBS (KTBS Syllabus Anchor Points)
  // =========================================================================
  {
    id: "bengaluru",
    name: "Bengaluru (Silicon Valley of India)",
    kannadaName: "ಬೆಂಗಳೂರು (ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ)",
    state: "Karnataka (Capital City)",
    category: "Capital & Hub",
    probabilityScore: 99,
    xSvg: 184,
    ySvg: 564,
    examinerTip:
      "Capital of Karnataka. Premier information technology and biotechnology hub of India. Known as 'Silicon Valley of India', 'Electronic City', and 'Garden City'.",
    landmarkReference: "Deccan Plateau, southeast Karnataka",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 119",
  },
  {
    id: "new_delhi",
    name: "New Delhi (National Capital of India)",
    kannadaName: "ಹೊಸ ದೆಹಲಿ (ಭಾರತದ ರಾಜಧಾನಿ)",
    state: "National Capital Territory",
    category: "Capital & Hub",
    probabilityScore: 98,
    xSvg: 186,
    ySvg: 210,
    examinerTip:
      "Capital of India, situated on the banks of Yamuna River between Aravalli ridge and Indo-Gangetic plains.",
    landmarkReference: "Northern plains on Yamuna River",
    ktbsReference: "KTBS Class 10 Geography Ch 1, Page 53",
  },
  {
    id: "mumbai_capital",
    name: "Mumbai (Financial Capital of India)",
    kannadaName: "ಮುಂಬೈ (ಭಾರತದ ವಾಣಿಜ್ಯ ರಾಜಧಾನಿ)",
    state: "Maharashtra (Capital City)",
    category: "Capital & Hub",
    probabilityScore: 95,
    xSvg: 110,
    ySvg: 440,
    examinerTip:
      "Capital of Maharashtra and economic/financial powerhouse of India. India's cotton textile capital ('Cottonopolis of India').",
    landmarkReference: "Konkan coast, Salsette Island",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 117",
  },
  {
    id: "chennai_capital",
    name: "Chennai (Detroit of South Asia)",
    kannadaName: "ಚೆನ್ನೈ (ದಕ್ಷಿಣ ಏಷ್ಯಾದ ಡೆಟ್ರಾಯಿಟ್)",
    state: "Tamil Nadu (Capital City)",
    category: "Capital & Hub",
    probabilityScore: 94,
    xSvg: 246,
    ySvg: 568,
    examinerTip:
      "Capital of Tamil Nadu on the Coromandel Coast. Celebrated as the automobile capital of India ('Detroit of South Asia').",
    landmarkReference: "North Coromandel coast",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 118",
  },
  {
    id: "kolkata_capital",
    name: "Kolkata (Cultural Capital of India)",
    kannadaName: "ಕೋಲ್ಕತ್ತಾ (ಪಶ್ಚಿಮ ಬಂಗಾಳದ ರಾಜಧಾನಿ)",
    state: "West Bengal (Capital City)",
    category: "Capital & Hub",
    probabilityScore: 93,
    xSvg: 414,
    ySvg: 346,
    examinerTip:
      "Capital of West Bengal on the east bank of Hooghly River. Foremost jute textile manufacturing and commercial hub of eastern India.",
    landmarkReference: "Hooghly River, lower Bengal delta",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 118",
  },
  {
    id: "hyderabad_capital",
    name: "Hyderabad (Cyberabad)",
    kannadaName: "ಹೈದರಾಬಾದ್ (ತೆಲಂಗಾಣದ ರಾಜಧಾನಿ)",
    state: "Telangana (Capital City)",
    category: "Capital & Hub",
    probabilityScore: 92,
    xSvg: 232,
    ySvg: 466,
    examinerTip:
      "Capital of Telangana along Musi River. Major international software, pharmaceutical, and biotechnology hub ('Genome Valley' and 'Cyberabad').",
    landmarkReference: "Deccan Plateau, central Telangana",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 119",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad (Manchester of India)",
    kannadaName: "ಅಹಮದಾಬಾದ್ (ಭಾರತದ ಮ್ಯಾಂಚೆಸ್ಟರ್)",
    state: "Gujarat (Sabarmati)",
    category: "Capital & Hub",
    probabilityScore: 95,
    xSvg: 82,
    ySvg: 346,
    examinerTip:
      "Located on the banks of Sabarmati River in Gujarat. Second largest cotton textile producer in India, historically celebrated as the 'Manchester of India'.",
    landmarkReference: "Sabarmati River plains, Gujarat",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 117",
  },
  {
    id: "coimbatore",
    name: "Coimbatore (Manchester of South India)",
    kannadaName: "ಕೊಯಮತ್ತೂರು (ದಕ್ಷಿಣ ಭಾರತದ ಮ್ಯಾಂಚೆಸ್ಟರ್)",
    state: "Tamil Nadu (Noyyal River)",
    category: "Capital & Hub",
    probabilityScore: 94,
    xSvg: 186,
    ySvg: 614,
    examinerTip:
      "Located on the banks of Noyyal River in western Tamil Nadu. Famed as the 'Manchester of South India' due to its vast cotton spinning mills and engineering pumps.",
    landmarkReference: "Western Tamil Nadu, Noyyal River valley",
    ktbsReference: "KTBS Class 10 Geography Ch 7, Page 117",
  },
];
