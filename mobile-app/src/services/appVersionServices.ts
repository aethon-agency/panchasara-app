import { Platform } from "react-native";
import Constants from "expo-constants";
import api from "./api";

export interface AppVersionInfo {
  success: boolean;
  latestVersion?: string;
  minVersion?: string;
  storeUrl?: string;
  forceUpdate: boolean;
  updateAvailable: boolean;
}

// The version installed on this device, from app.json ("expo.version").
export const getCurrentVersion = (): string =>
  Constants.expoConfig?.version || "1.0.0";

// Ask the server whether this installed version must/should update.
export const getAppVersionInfo = async (): Promise<AppVersionInfo> => {
  const platform = Platform.OS === "ios" ? "ios" : "android";
  const version = getCurrentVersion();
  return api.get<AppVersionInfo>("/app-version", { platform, version });
};
