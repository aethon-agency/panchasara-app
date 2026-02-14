import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "../src/constants/colors";
import { useAppFonts } from "../src/constants/fonts";
import { ToastProvider } from "../src/contexts/ToastProvider";
import { useAuthStore } from "../src/stores/authStore";
import "../src/i18n";

export default function RootLayout() {
  const { authLoading, token } = useAuthStore();
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded || authLoading) return null;

  if (authLoading || !fontsLoaded) {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName={token ? "(user)" : "(auth)"}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
