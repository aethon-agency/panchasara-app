import React from "react";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="event-details" />
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          title: "Details",
          headerTitleStyle: { color: "#431407", fontWeight: "900" },
          headerTintColor: "#EA580C",
        }}
      />
      <Stack.Screen name="accounts" />
      <Stack.Screen name="donations" />
      <Stack.Screen name="mandir-details" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="history" />
      <Stack.Screen name="gallery" />
      <Stack.Screen name="gallery/details" />
      <Stack.Screen name="announcements" />
      <Stack.Screen name="announcements/details" />
    </Stack>
  );
}
