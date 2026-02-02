import moment from "moment";

/**
 * Converts a time string in "HH:MM AM/PM" format to a Supabase-compatible timestamp string
 * with the +05:30 timezone offset for today's date.
 *
 * @param timeStr - The time string from the frontend (e.g., "01:11 AM")
 * @returns A formatted timestamp string (e.g., "2023-10-27T01:11:00+05:30")
 */
export const formatTimeToTimestamp = (timeStr: string): string => {
  const [time, modifier] = timeStr.split(" ");
  let [hoursStr, minutesStr] = time.split(":");

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Get current time in IST (UTC+05:30)
  // This ensures that "today" is determined by IST, not the server's local time.
  const nowInIST = moment().utcOffset("+05:30");

  // Set the hours and minutes derived from the input string
  nowInIST.hour(hours);
  nowInIST.minute(minutes);
  nowInIST.second(0);
  nowInIST.millisecond(0);

  // Return ISO 8601 format with the correct +05:30 offset
  return nowInIST.format("YYYY-MM-DDTHH:mm:ssZ");
};
