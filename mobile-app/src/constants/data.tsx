import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export interface MandirEvent {
  id: string;
  type: "poonam" | "havan";
  title: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  organizerName?: string;
}

export const HERO_IMAGES = [
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
];

export const GALLERY_DATA = [
  {
    id: "1",
    title: "મહા પૂનમ",
    date: "ફેબ્રુઆરી ૨૦૨૬",
    images: [
      "https://images.pexels.com/photos/20793879/pexels-photo-20793879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/14834183/pexels-photo-14834183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/16397388/pexels-photo-16397388.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32962421/pexels-photo-32962421.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32058915/pexels-photo-32058915.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/19576757/pexels-photo-19576757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/5971975/pexels-photo-5971975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
  },
  {
    id: "2",
    title: "ફાગણ પૂનમ (હોળી)",
    date: "માર્ચ ૨૦૨૬",
    images: [
      "https://images.pexels.com/photos/32058915/pexels-photo-32058915.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/5971975/pexels-photo-5971975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/14834183/pexels-photo-14834183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/20793879/pexels-photo-20793879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32962421/pexels-photo-32962421.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
  },
  {
    id: "3",
    title: "કાર્તક પૂનમ",
    date: "નવેમ્બર ૨૦૨૫",
    images: [
      "https://images.pexels.com/photos/19576757/pexels-photo-19576757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/20793879/pexels-photo-20793879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/14834183/pexels-photo-14834183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/5971975/pexels-photo-5971975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
  },
  {
    id: "4",
    title: "દિવાળી હવન",
    date: "નવેમ્બર ૨૦૨૫",
    images: [
      "https://images.pexels.com/photos/16397388/pexels-photo-16397388.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32058915/pexels-photo-32058915.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32962421/pexels-photo-32962421.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/19576757/pexels-photo-19576757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/5971975/pexels-photo-5971975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
  },
  {
    id: "5",
    title: "ચૈત્રી પૂનમ",
    date: "એપ્રિલ ૨૦૨૬",
    images: [
      "https://images.pexels.com/photos/32058915/pexels-photo-32058915.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/20793879/pexels-photo-20793879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/16397388/pexels-photo-16397388.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32962421/pexels-photo-32962421.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/19576757/pexels-photo-19576757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
  },
  {
    id: "6",
    title: "અષાઢી પૂનમ (ગુરુ પૂનમ)",
    date: "જુલાઈ ૨૦૨૬",
    images: [
      "https://images.pexels.com/photos/14834183/pexels-photo-14834183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/18362038/pexels-photo-18362038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/8818658/pexels-photo-8818658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/16397388/pexels-photo-16397388.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/32962421/pexels-photo-32962421.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/20793879/pexels-photo-20793879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/5971975/pexels-photo-5971975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    ],
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
    id: "1",
    type: "poonam",
    title: "મહા પૂનમ",
    date: "12-2-2026",
    day: "thursday",
    startTime: "06:00 AM",
    endTime: "08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ પંચાસરા",
    description:
      "Monthly divine gathering with Aarti and Prasad in the Village Mandir.",
    location: "ભવાની માં મઢ - ભાડુકા",
  },
  {
    id: "2",
    type: "poonam",
    title: "ફાગણ પૂનમ",
    date: "14-3-2026",
    day: "saturday",
    startTime: "06:00 AM",
    endTime: "08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ પંચાસરા",
    description:
      "Holi festival poonam celebration with special Bhakti Sangeet.",
    location: "ભવાની માં મઢ - ભાડુકા",
  },
  {
    id: "3",
    type: "poonam",
    title: "ફાગણ પૂનમ",
    date: "14-3-2026",
    day: "saturday",
    startTime: "06:00 AM",
    endTime: "08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ પંચાસરા",
    description:
      "Holi festival poonam celebration with special Bhakti Sangeet.",
    location: "ભવાની માં મઢ - ભાડુકા",
  },
  {
    id: "4",
    type: "havan",
    title: "નવા વર્ષ હવન",
    date: "14-3-2026",
    day: "saturday",
    startTime: "06:00 AM",
    endTime: "08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ પંચાસરા",
    description:
      "Holi festival poonam celebration with special Bhakti Sangeet.",
    location: "ભવાની માં મઢ - ભાડુકા",
  },
];

export const EXPLORE_ITEMS = [
  {
    id: "guidelines",
    title: "explore.guidelines.title",
    subtitle: "explore.guidelines.subtitle",
    icon: (color: string) => (
      <Ionicons name="information-circle-outline" size={28} color={color} />
    ),
    route: "/guidelines",
  },
  {
    id: "contact",
    title: "explore.contact.title",
    subtitle: "explore.contact.subtitle",
    icon: (color: string) => (
      <Ionicons name="call-outline" size={28} color={color} />
    ),
    route: "/contact",
  },
  {
    id: "donations",
    title: "explore.donations.title",
    subtitle: "explore.donations.subtitle",
    icon: (color: string) => (
      <Ionicons name="heart-outline" size={28} color={color} />
    ),
    route: "/donations",
  },
  {
    id: "accounts",
    title: "explore.accounts.title",
    subtitle: "explore.accounts.subtitle",
    icon: (color: string) => (
      <Ionicons name="card-outline" size={28} color={color} />
    ),
    route: "/accounts",
  },
  {
    id: "mandir",
    title: "explore.mandir.title",
    subtitle: "explore.mandir.subtitle",
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="temple-hindu-outline"
        size={28}
        color={color}
      />
    ),
    route: "/mandir-details",
  },
  {
    id: "history",
    title: "explore.history.title",
    subtitle: "explore.history.subtitle",
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

export const COMMITTEE_MEMBERS = [
  { name: "Maheshbhai Patel", phone: "+919876543210" },
  { name: "Rameshbhai Patel", phone: "+919812345678" },
  { name: "Sureshbhai Patel", phone: "+919823456789" },
  { name: "Nareshbhai Patel", phone: "+919834567890" },
];

export const DONATIONS = [
  {
    id: "1",
    amount: "₹5,001",
    date: "12 Mar 2026",
    purpose: "Poonam Bhojan Prasad",
    receiptNo: "RCP-2026-045",
    type: "Online",
    transactionId: "UPI-8979328472",
    donorName: "Gajjar Family",
  },
  {
    id: "2",
    amount: "₹1,100",
    date: "20 Feb 2026",
    purpose: "General Donation",
    receiptNo: "RCP-2026-012",
    type: "Cash",
    transactionId: "-",
    donorName: "Gajjar Family",
  },
  {
    id: "3",
    amount: "₹501",
    date: "01 Jan 2026",
    purpose: "Aarti Seva",
    receiptNo: "RCP-2026-003",
    type: "Online",
    transactionId: "UPI-2384723984",
    donorName: "Gajjar Family",
  },
];

export const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/4n01go3yTCp9baMymp5WRH?mode=wwt";
