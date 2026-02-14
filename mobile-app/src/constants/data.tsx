import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/4n01go3yTCp9baMymp5WRH?mode=wwt";
export const MANDIR_MAPS_LINK = "https://maps.app.goo.gl/fgebem7Y745vrR7v9";
export const COMMITTEE_MEMBERS = [
  { name: "મહેશભાઈ પંચાસરા", phone: "+919876543210" },
  { name: "રમેશભાઈ પંચાસરા", phone: "+919812345678" },
  { name: "સુરેશભાઈ પંચાસરા", phone: "+919823456789" },
  { name: "નરેશભાઈ પંચાસરા", phone: "+919834567890" },
];

export const HERO_IMAGES = [
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
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
    id: "nived",
    title: "nived.title",
    subtitle: "nived.subtitle",
    icon: (color: string) => (
      <MaterialCommunityIcons name="brightness-7" size={28} color={color} />
    ),
    route: "/nived-details",
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
