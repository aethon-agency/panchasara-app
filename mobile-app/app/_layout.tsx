import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../src/constants/colors";
import { useAppFonts } from "../src/constants/fonts";
import { ToastProvider } from "../src/contexts/ToastProvider";
import { useAuthStore } from "../src/stores/authStore";

export default function RootLayout() {
  const { token, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const { fontsLoaded } = useAppFonts();

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace("/(user)/home");
    }
  }, [token, isLoading, segments, fontsLoaded]);

  if (isLoading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.backgroundPrimary,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}
