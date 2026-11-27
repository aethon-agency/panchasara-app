const MSG91_BASE_URL = "https://api.msg91.com/api/v5/widget";
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "";
const MSG91_WIDGET_ID = process.env.MSG91_WIDGET_ID || "";

// Whitelisted numbers that skip MSG91 and use a fixed OTP (for close relatives).
// Configured via env: comma-separated numbers + the fixed OTP.
const BYPASS_NUMBERS = (process.env.OTP_BYPASS_NUMBERS || "")
  .split(",")
  .map((n) => n.trim())
  .filter(Boolean);
const BYPASS_OTP = process.env.OTP_BYPASS_CODE || "1234";
// Sentinel hash returned for bypass numbers so verifyOTP can recognize them.
const BYPASS_HASH = "BYPASS_OTP_HASH";

export const sendOTP = async (mobileNumber: string): Promise<string | null> => {
  if (BYPASS_NUMBERS.includes(mobileNumber)) {
    return BYPASS_HASH;
  }
  try {
    const url = `${MSG91_BASE_URL}/sendOtp`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authkey: MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        widgetId: MSG91_WIDGET_ID,
        identifier: `91${mobileNumber}`,
      }),
    });
    const data: any = await response.json();
    if (data?.type === "success" && data?.message) {
      return data?.message;
    }
    return null;
  } catch (error) {
    console.error("Error sending OTP via MSG91:", error);
    return null;
  }
};

export const verifyOTP = async (
  otp: string,
  hash?: string,
): Promise<boolean> => {
  if (hash === BYPASS_HASH) {
    return otp === BYPASS_OTP;
  }
  try {
    const url = `${MSG91_BASE_URL}/verifyOtp`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authkey: MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        widgetId: MSG91_WIDGET_ID,
        reqId: hash,
        otp: otp,
      }),
    });

    const data: any = await response.json();
    if (data.type === "success") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error verifying OTP via MSG91:", error);
    return false;
  }
};
