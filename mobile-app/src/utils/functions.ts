import { Linking } from "react-native";
import moment from "moment";

export const getJSONParam = <T>(
  param: string | string[] | undefined,
): T | null => {
  if (!param) return null;
  try {
    const jsonString = Array.isArray(param) ? param[0] : param;
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON param:", error);
    return null;
  }
};
export const getImageSource = (
  source: string | number | null | undefined,
  defaultSource: any,
) => {
  if (!source) return defaultSource;
  if (
    typeof source === "string" &&
    (source.startsWith("http") || source.startsWith("https"))
  ) {
    return { uri: source };
  }
  return source;
};

export const callPhoneNumber = (phoneNumber: string | number) => {
  if (!phoneNumber) {
    console.warn("No phone number provided");
    return;
  }
  const phoneUrl = `tel:${phoneNumber}`;

  Linking.openURL(phoneUrl).catch((err) => {
    console.error("Failed to open dialer:", err);
  });
};

export const formatTime = (time: string) => {
  if (!time) return "N/A";

  // If already in HH:MM AM/PM format
  const amPmRegex = /^([0][1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  if (amPmRegex.test(time)) return time;

  let m;

  // Handle simple time strings (HH:mm or HH:mm:ss) as UTC
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(time)) {
    m = moment.utc(time, ["HH:mm:ss", "HH:mm"]);
  } else {
    // Handle ISO strings or other formats (moment handles parsing)
    m = moment(time);
  }

  if (m.isValid()) {
    return m.utcOffset("+05:30").format("hh:mm A");
  }

  return time;
};
export const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim()?.split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const toGujarati = (text: string) => {
  const map = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];
  return text.replace(/[0-9]/g, (d: any) => map[d]);
};
