import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  Roboto_100Thin,
  Roboto_200ExtraLight,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  Roboto_800ExtraBold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export const useAppFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    Inter100: Inter_100Thin,
    Inter200: Inter_200ExtraLight,
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    Inter500: Inter_500Medium,
    Inter600: Inter_600SemiBold,
    Inter700: Inter_700Bold,
    Inter800: Inter_800ExtraBold,
    Inter900: Inter_900Black,
    Roboto100: Roboto_100Thin,
    Roboto200: Roboto_200ExtraLight,
    Roboto300: Roboto_300Light,
    Roboto400: Roboto_400Regular,
    Roboto500: Roboto_500Medium,
    Roboto600: Roboto_600SemiBold,
    Roboto700: Roboto_700Bold,
    Roboto800: Roboto_800ExtraBold,
    Roboto900: Roboto_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError };
};

export const FONTS = {
  INTER_100: "Inter100",
  INTER_200: "Inter200",
  INTER_300: "Inter300",
  INTER_400: "Inter400",
  INTER_500: "Inter500",
  INTER_600: "Inter600",
  INTER_700: "Inter700",
  INTER_800: "Inter800",
  INTER_900: "Inter900",
  ROBOTO_100: "Roboto100",
  ROBOTO_200: "Roboto200",
  ROBOTO_300: "Roboto300",
  ROBOTO_400: "Roboto400",
  ROBOTO_500: "Roboto500",
  ROBOTO_600: "Roboto600",
  ROBOTO_700: "Roboto700",
  ROBOTO_800: "Roboto800",
  ROBOTO_900: "Roboto900",
};
