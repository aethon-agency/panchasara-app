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
    </Stack>
  );
}
