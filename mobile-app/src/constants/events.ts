export type EventType = "poonam" | "special" | "havan" | "meeting";

export interface MandirEvent {
  id: string;
  type: EventType;
  title: string;
  date: string;
  dayEnglish: string;
  dayGujarati: string;
  time: string;
  desc: string;
  location: string;
  gujaratiPoonamName?: string;
  gujaratiMonth?: string;
  organizerName?: string;
}

export const ALL_EVENTS: MandirEvent[] = [
  {
    id: "p1",
    type: "poonam",
    title: "Maha Poonam",
    gujaratiPoonamName: "પૂનમ",
    gujaratiMonth: "મહા",
    date: "12-2-2026",
    dayEnglish: "Thursday",
    dayGujarati: "ગુરુવાર",
    time: "06:00 AM - 08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ - જાલી",
    desc: "Monthly divine gathering with Aarti and Prasad in the Village Mandir.",
    location: "Main Village Mandir",
  },
  {
    id: "p2",
    type: "poonam",
    title: "Phalguna Poonam",
    gujaratiPoonamName: "પૂનમ",
    gujaratiMonth: "ફાગણ",
    date: "14-3-2026",
    dayEnglish: "Saturday",
    dayGujarati: "શનિવાર",
    time: "06:00 AM - 08:00 PM",
    organizerName: "શ્રી રમેશભાઈ પ્રભુભાઈ",
    desc: "Holi festival poonam celebration with special Bhakti Sangeet.",
    location: "Main Village Mandir",
  },
  {
    id: "s1",
    type: "special",
    title: "Shravan Mahotsav",
    date: "28-8-2026",
    dayEnglish: "Friday",
    dayGujarati: "શુક્રવાર",
    time: "05:00 AM - 10:00 PM",
    desc: "Grand Shravan Month culmination with traditional rituals.",
    location: "Mandir Ground",
  },
  {
    id: "h1",
    type: "havan",
    title: "Vishwakarma Mahayagya",
    date: "17-9-2026",
    dayEnglish: "Thursday",
    dayGujarati: "ગુરુવાર",
    time: "07:00 AM - 04:00 PM",
    desc: "Annual Havan for prosperity and well-being of the village community.",
    location: "Yagya Shala",
  },
  {
    id: "e1",
    type: "meeting",
    title: "Community Meeting",
    date: "20-10-2026",
    dayEnglish: "Tuesday",
    dayGujarati: "મંગળવાર",
    time: "08:00 PM - 09:30 PM",
    desc: "Monthly meeting to discuss mandir maintenance and upcoming festivals.",
    location: "Mandir Hall",
  },
];
