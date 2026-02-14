import React from "react";
import { Stack } from "expo-router";

export default function OthersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="event-details" />
      <Stack.Screen name="accounts" />
      <Stack.Screen name="donations" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="history" />
      <Stack.Screen name="profile-details" />
      <Stack.Screen name="add-poonam" />
      <Stack.Screen name="add-announcement" />
      <Stack.Screen name="add-donation" />
      <Stack.Screen name="add-gallery" />
      <Stack.Screen name="guidelines" />
      <Stack.Screen name="nived-details" />
    </Stack>
  );
}
