import React from "react";
import { Stack } from "expo-router";
import { usePushRegistration } from "@/src/hooks/usePushRegistration";

export default function UserLayout() {
  usePushRegistration();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(others)" />
      <Stack.Screen name="(announcements)" />
      <Stack.Screen name="(gallery)" />
    </Stack>
  );
}
