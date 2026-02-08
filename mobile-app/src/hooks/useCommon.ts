import { useToast } from "@/src/contexts/ToastProvider";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNetwork } from "./useNetwork";

export const useCommon = () => {
  const router = useRouter();
  const toast = useToast();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { networkState } = useNetwork();
  const isIOS = Platform.OS === "ios";

  const goBackHandler = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return {
    router,
    toast,
    insets,
    navigation,
    networkState,
    isIOS,
    useLocalSearchParams,
    goBackHandler,
  };
};
