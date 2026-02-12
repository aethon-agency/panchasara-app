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
export const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/4n01go3yTCp9baMymp5WRH?mode=wwt";

export const MANDIR_MAPS_LINK = "https://maps.app.goo.gl/fgebem7Y745vrR7v9";

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

export const EXPLORE_ITEMS = [
  {
    id: "guidelines",
    title: "guidelines.title",
    subtitle: "guidelines.subtitle",
    icon: (color: string) => (
      <Ionicons name="information-circle-outline" size={28} color={color} />
    ),
    route: "/guidelines",
  },
  {
    id: "contact",
    title: "contact.title",
    subtitle: "contact.subtitle",
    icon: (color: string) => (
      <Ionicons name="call-outline" size={28} color={color} />
    ),
    route: "/contact",
  },
  {
    id: "donations",
    title: "donations.title",
    subtitle: "donations.subtitle",
    icon: (color: string) => (
      <Ionicons name="heart-outline" size={28} color={color} />
    ),
    route: "/donations",
  },
  {
    id: "accounts",
    title: "accounts.title",
    subtitle: "accounts.subtitle",
    icon: (color: string) => (
      <Ionicons name="card-outline" size={28} color={color} />
    ),
    route: "/accounts",
  },
  {
    id: "history",
    title: "history.title",
    subtitle: "history.subtitle",
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
  { name: "Maheshbhai Panchasara", phone: "+919876543210" },
  { name: "Rameshbhai Panchasara", phone: "+919812345678" },
  { name: "Sureshbhai Panchasara", phone: "+919823456789" },
  { name: "Nareshbhai Panchasara", phone: "+919834567890" },
];

export const DONATIONS = [
  {
    id: "1",
    type: "cash",
    purpose: "Shree Kantilal Panchasara (Bhaduka)",
    donorName: "Rajesh, Mahesh & Suresh Panchasara (Bhaduka)",
    amount: "11,000",
    date: "12 Jan 2026",
  },

  {
    id: "2",
    type: "item",
    purpose: "Late Shree Ramanbhai Panchasara (Bhaduka)",
    donorName: "Panchasara Family",
    itemName: "Fans",
    itemQty: "8",
    date: "15 Jan 2026",
  },

  {
    id: "3",
    type: "item",
    purpose: "Panchasara Family",
    donorName: "પંચાસરા ફામીલી",
    itemName: "પંખા",
    itemQty: "8",
    date: "15 જન્યુઆરી 2026",
  },
];
