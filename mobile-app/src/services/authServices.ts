import api from "./api";

export const sendOTP = async (mobileNumber: string) => {
  try {
    if (!mobileNumber) return;
    return "bdhebfhef";
    // const response: any = await api.post("/auth/login", { mobileNumber });
    // if (response?.success) {
    //   return response?.hash;
    // }
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
  mobileNumber: number;
  otp: string;
  hash: string;
}) => {
  try {
    console.log("VERIFY CALL");

    // const response: any = await api.post("/auth/verify-otp", payload);

    // if (response?.success) {
    //   if (response?.token) {
    //     return response?.token;
    //   }
    // }
    return null;
  } catch (err) {
    console.error("Error Verifying OTP:", err);
    return null;
  }
};
