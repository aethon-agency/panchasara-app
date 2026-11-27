import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/authStore";
import { registerForPushNotificationsAsync } from "../services/notifications";
import { registerPushToken } from "../services/userServices";

/**
 * Once the user is logged in, request notification permission, get the Expo
 * push token and sync it to the backend so admin actions can reach this
 * device. Runs once per session.
 */
export const usePushRegistration = () => {
  const token = useAuthStore((s) => s.token);
  const pushToken = useAuthStore((s) => s.pushToken);
  const setPushToken = useAuthStore((s) => s.setPushToken);
  const attempted = useRef(false);

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;

    (async () => {
      try {
        const expoToken = await registerForPushNotificationsAsync();
        if (!expoToken) return;
        // Only hit the server if the token is new.
        if (expoToken !== pushToken) {
          await registerPushToken(expoToken);
          setPushToken(expoToken);
        }
      } catch (err) {
        console.error("[Push] registration failed:", err);
      }
    })();
  }, [token, pushToken, setPushToken]);
};
