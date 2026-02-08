import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, useRouter } from "expo-router";
import { useAuthStore } from "@/src/stores/authStore";
import { useAppFonts } from "@/src/constants/fonts";
import { COLORS } from "@/src/constants/colors";

const index = () => {
  const { token, authLoading } = useAuthStore();
  const router = useRouter();
  const { fontsLoaded } = useAppFonts();

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoading]);

  useEffect(() => {
    if (authLoading || !fontsLoaded) return;

    if (token) {
      router.replace("/(user)/(tabs)/home");
    } else {
      router.replace("/(auth)/login");
    }
  }, [token, authLoading, fontsLoaded]);

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
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
