const MSG91_TOKEN_KEY = process.env.MSG91_TOKEN_KEY || "";
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || "";
const MSG91_BASE_URL = "https://control.msg91.com/api/v5";

export const sendOTP = async (mobileNumber: string): Promise<string | null> => {
  try {
    const url = `${MSG91_BASE_URL}/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=91${mobileNumber}&authkey=${MSG91_TOKEN_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: mobileNumber }),
    });
    const data: any = await response.json();
    if (data?.type === "success" && data?.request_id) {
      return data?.request_id;
    }
    return null;
  } catch (error) {
    console.error("Error sending OTP via MSG91:", error);
    return null;
  }
};

export const verifyOTP = async (
  mobileNumber: string,
  otp: string,
  hash?: string,
): Promise<boolean> => {
  try {
    const url = `${MSG91_BASE_URL}/otp/verify?mobile=91${mobileNumber}&otp=${otp}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authkey: MSG91_TOKEN_KEY,
      },
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

export const resendOTP = async (
  mobileNumber: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const url = `${MSG91_BASE_URL}/otp/retry?mobile=91${mobileNumber}&authkey=${MSG91_TOKEN_KEY}&retrytype=text`;

    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: mobileNumber }),
    });
    const data: any = await response.json();
    if (data?.type === "success") {
      return { success: true, message: "OTP resent successfully" };
    } else if (data?.type === "error") {
      return { success: false, message: data?.message };
    }
    return {
      success: false,
      message: response?.message || "Failed to send OTP",
    };
  } catch (error: any) {
    console.error("Error sending OTP via MSG91:", error);
    return { success: false, message: error?.message || "Failed to send OTP" };
  }
};
