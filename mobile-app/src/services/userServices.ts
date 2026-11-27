import api from "./api";

export const getUserProfile = async () => {
  try {
    const response: any = await api.get("/user/profile");
    return response;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw err;
  }
};
export const updateUserProfile = async (userData: any) => {
  try {
    const response: any = await api.patch("/user/profile", userData);
    return response;
  } catch (err) {
    console.error("Error updating user profile:", err);
    throw err;
  }
};

// Register this device's Expo push token with the backend.
export const registerPushToken = async (pushToken: string) => {
  try {
    const response: any = await api.post("/user/push-token", { pushToken });
    return response;
  } catch (err) {
    console.error("Error registering push token:", err);
    throw err;
  }
};

// Turn push notifications on/off for this user.
export const setNotificationsEnabled = async (enabled: boolean) => {
  try {
    const response: any = await api.patch("/user/notifications", { enabled });
    return response;
  } catch (err) {
    console.error("Error updating notifications flag:", err);
    throw err;
  }
};
