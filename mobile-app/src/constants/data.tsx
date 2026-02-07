import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

// --- TYPES & INTERFACES ---

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

// --- STATIC CONSTANTS ---

export const HERO_IMAGES = [
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
];

export const GALLERY_DATA = [
  {
    id: "1",
    title: "Janmashtami 2025",
    date: "August 2025",
    image:
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Navratri Garba 2025",
    date: "October 2025",
    image:
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Diwali Pujan 2024",
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Vasant Panchami",
    date: "February 2024",
    image:
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Community Picnic",
    date: "December 2023",
    image:
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Health Camp",
    date: "November 2023",
    image:
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
  },
];

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

// --- TRANSLATED DATA HELPERS ---

export const getGallerySummary = (t: any) => [
  {
    id: "1",
    title: t("home.events.janmashtami.title"),
    date: t("home.events.janmashtami.date"),
    image:
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: t("home.events.navratri.title"),
    date: t("home.events.navratri.date"),
    image:
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: t("home.events.diwali.title"),
    date: t("home.events.diwali.date"),
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
  },
];

export const getAnnouncementSummary = (t: any) => [
  {
    id: "1",
    title: t("home.announcements.paryushan.title"),
    date: t("home.announcements.paryushan.date"),
    author: t("home.announcements.paryushan.author"),
    description: t("home.announcements.paryushan.description"),
  },
  {
    id: "2",
    title: t("home.announcements.assembly.title"),
    date: t("home.announcements.assembly.date"),
    author: t("home.announcements.assembly.author"),
    description: t("home.announcements.assembly.description"),
  },
  {
    id: "3",
    title: t("home.announcements.medicalCamp.title"),
    date: t("home.announcements.medicalCamp.date"),
    author: t("home.announcements.medicalCamp.author"),
    description: t("home.announcements.medicalCamp.description"),
  },
];

export const getAnnouncements = (t: any) => [
  {
    id: "1",
    title: t("announcements.list.paryushan.title"),
    date: t("announcements.list.paryushan.date"),
    author: t("announcements.list.paryushan.author"),
    desc: t("announcements.list.paryushan.desc"),
  },
  {
    id: "2",
    title: t("announcements.list.agm.title"),
    date: t("announcements.list.agm.date"),
    author: t("announcements.list.agm.author"),
    desc: t("announcements.list.agm.desc"),
  },
  {
    id: "3",
    title: t("announcements.list.medicalCamp.title"),
    date: t("announcements.list.medicalCamp.date"),
    author: t("announcements.list.medicalCamp.author"),
    desc: t("announcements.list.medicalCamp.desc"),
  },
  {
    id: "4",
    title: t("announcements.list.diwali.title"),
    date: t("announcements.list.diwali.date"),
    author: t("announcements.list.diwali.author"),
    desc: t("announcements.list.diwali.desc"),
  },
];

export const getExploreItems = (t: any) => [
  {
    id: "accounts",
    title: t("explore.accounts.title"),
    subtitle: t("explore.accounts.subtitle"),
    icon: (color: string) => (
      <Ionicons name="card-outline" size={28} color={color} />
    ),
    route: "/accounts",
  },
  {
    id: "donations",
    title: t("explore.donations.title"),
    subtitle: t("explore.donations.subtitle"),
    icon: (color: string) => (
      <Ionicons name="heart-outline" size={28} color={color} />
    ),
    route: "/donations",
  },
  {
    id: "mandir",
    title: t("explore.mandir.title"),
    subtitle: t("explore.mandir.subtitle"),
    icon: (color: string) => (
      <MaterialCommunityIcons name="temple-buddhist" size={28} color={color} />
    ),
    route: "/mandir-details",
  },
  {
    id: "contact",
    title: t("explore.contact.title"),
    subtitle: t("explore.contact.subtitle"),
    icon: (color: string) => (
      <Ionicons name="call-outline" size={28} color={color} />
    ),
    route: "/contact",
  },
  {
    id: "history",
    title: t("explore.history.title"),
    subtitle: t("explore.history.subtitle"),
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="book-open-variant"
        size={28}
        color={color}
      />
    ),
    route: "/history",
  },
];
