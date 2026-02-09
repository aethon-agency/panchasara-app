import api from "./api";

export const sendOTP = async (mobileNumber: string) => {
  try {
    if (!mobileNumber) return;
    const response: any = await api.post("/auth/login", { mobileNumber });
    if (response?.success) {
      console.log("OTP Sent via App Service:", response);
      // Return the whole response so UI can check for newUser or hash
      return response;
    }
    return null;
  } catch (err) {
    console.error("Error sending OTP:", err);
    throw err;
  }
};

export const registerUser = async (
  firstName: string,
  middleName: string,
  lastName: string,
  mobileNumber: string,
) => {
  try {
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !mobileNumber ||
      mobileNumber.length < 10
    )
      return;
    const response: any = await api.post("/auth/register", {
      mobileNumber,
      firstName,
      middleName,
      lastName,
    });
    if (response?.success) {
      return response?.hash;
    }
    return null;
  } catch (err) {
    console.error("Error generating OTP:", err);
  }
};

export const verifyOTP = async (payload: {
  mobileNumber: string;
  otp: string;
  hash: string;
}) => {
  try {
    const response: any = await api.post("/auth/verify-otp", payload);
    if (response?.success) {
      if (response?.token) {
        return response?.token;
      }
      return true;
    }
    return null;
  } catch (err) {
    console.error("Error Verifying OTP:", err);
    return null;
  }
};
