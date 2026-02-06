import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/src/stores/authStore";
import { useAppFonts } from "@/src/constants/fonts";
import { COLORS } from "@/src/constants/colors";

const index = () => {
  const { token, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const { fontsLoaded } = useAppFonts();

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace("/(user)/(tabs)/home");
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
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
