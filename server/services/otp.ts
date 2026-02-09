const MSG91_BASE_URL = "https://api.msg91.com/api/v5/widget";
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "";
const MSG91_WIDGET_ID = process.env.MSG91_WIDGET_ID || "";

export const sendOTP = async (mobileNumber: string): Promise<string | null> => {
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
