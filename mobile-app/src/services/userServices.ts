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
