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
    title: "જન્માષ્ટમી",
    date: "ઓગસ્ટ ૨૦૨૫",
    image:
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    title: "નવરાત્રી ગરબા",
    date: "ઓક્ટોબર ૨૦૨૫",
    image:
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    title: "દિવાળી પૂજન",
    date: "નવેમ્બર ૨૦૨૪",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    title: "વસંત પંચમી",
    date: "ફેબ્રુઆરી ૨૦૨૪",
    image:
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "5",
    title: "સામુદાયિક પિકનિક",
    date: "ડિસેમ્બર ૨૦૨૩",
    image:
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "6",
    title: "આરોગ્ય શિબિર",
    date: "નવેમ્બર ૨૦૨૩",
    image:
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
    ],
  },
];

export const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
];

export const ANNOUNCEMENT_SUMMARY = [
  {
    id: "1",
    title: "પર્યુષણ મહાપર્વ ૨૦૨૬",
    date: "૧૫ ઓગસ્ટ ૨૦૨૬",
    author: "એડમિન",
    description:
      "૮ દિવસની આધ્યાત્મિક શુદ્ધિકરણ ૧૫ ઓગસ્ટથી શરૂ થાય છે. દરરોજ પ્રતિક્રમણ અને પ્રવચન માટે અમારી સાથે જોડાઓ.",
  },
  {
    id: "2",
    title: "સામાન્ય સભા બેઠક",
    date: "૧૦ ઓક્ટોબર ૨૦૨૬",
    author: "સમિતિ",
    description:
      "આગામી કાર્યક્રમો અને બજેટની ચર્ચા કરવા માટે તમામ સભ્યો માટે વાર્ષિક સામાન્ય સભા.",
  },
  {
    id: "3",
    title: "તબીબી શિબિર",
    date: "૦૫ નવેમ્બર ૨૦૨૬",
    author: "આરોગ્ય ટીમ",
    description:
      "તમામ ભક્તો માટે મફત તબીબી તપાસ શિબિર. આંખની તપાસ અને સામાન્ય ચિકિત્સક ઉપલબ્ધ.",
  },
];

export const ALL_ANNOUNCEMENTS = [
  {
    id: "1",
    title: "પર્યુષણ મહાપર્વ ૨૦૨૬",
    contactNumber: "9876543210",
    description:
      "૮ દિવસની આધ્યાત્મિક શુદ્ધિકરણ ૧૫ ઓગસ્ટથી શરૂ થાય છે. દરરોજ સ્નાત્ર પૂજા અને પ્રવચન માટે અમારી સાથે જોડાઓ.",
  },
  {
    id: "2",
    title: "વાર્ષિક સામાન્ય સભા",
    date: "૧૦ સપ્ટેમ્બર ૨૦૨૬",
    author: "સચિવ",
    contactNumber: "9876543211",
    description:
      "તમામ સભ્યોને સવારે ૧૦ વાગ્યે સમુદાય હોલમાં AGM માં હાજર રહેવા વિનંતી છે. એજન્ડામાં વાર્ષિક હિસાબોનો સમાવેશ થાય છે.",
  },
  {
    id: "3",
    title: "તબીબી શિબિર નોંધણી",
    date: "૦૫ ઓક્ટોબર ૨૦૨૬",
    author: "આરોગ્ય સમિતિ",
    contactNumber: "9876543212",
    description:
      "વરિષ્ઠ નાગરિકો માટે મફત આંખની તપાસ શિબિર આયોજિત. કાર્યાલયમાં નોંધણી ખુલ્લી છે.",
  },
  {
    id: "4",
    title: "દિવાળી ઉજવણી યોજનાઓ",
    date: "૦૧ નવેમ્બર ૨૦૨૬",
    author: "ઇવેન્ટ ટીમ",
    contactNumber: "9876543213",
    description:
      "આ વર્ષની દિવાળી સજાવટ અને સાંસ્કૃતિક કાર્યક્રમો માટે તમારા વિચારો સૂચવો.",
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
