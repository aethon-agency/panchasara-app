import { useEffect, useState } from "react";
import { AppState } from "react-native";
import {
  AppVersionInfo,
  getAppVersionInfo,
} from "../services/appVersionServices";

/**
 * Checks the backend version gate on launch and whenever the app returns to
 * the foreground. Fails open: any error leaves the app usable.
 */
export const useVersionGate = () => {
  const [info, setInfo] = useState<AppVersionInfo | null>(null);

  const check = async () => {
    try {
      const res = await getAppVersionInfo();
      setInfo(res);
    } catch {
      setInfo(null); // never block on a failed check
    }
  };

  useEffect(() => {
    check();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });
    return () => sub.remove();
  }, []);

  return {
    forceUpdate: info?.forceUpdate ?? false,
    storeUrl: info?.storeUrl,
    latestVersion: info?.latestVersion,
  };
};
