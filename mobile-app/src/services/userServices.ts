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
