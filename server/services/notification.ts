/**
 * Service to handle sending push notifications via Expo's Push API.
 */

export interface PushNotificationMessage {
  title?: string;
  body: string;
  data?: Record<string, any>;
  sound?: "default" | null;
  badge?: number;
  channelId?: string;
}

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

/**
 * Sends push notifications to multiple Expo push tokens.
 * Handles batching automatically (Expo limit is 100 per request).
 *
 * @param tokens Array of Expo push tokens (strings starting with ExponentPushToken[...])
 * @param message The message content (title, body, etc.)
 */
export async function sendPushNotifications(
  tokens: string[],
  message: PushNotificationMessage,
) {
  try {
    // Filter out invalid or empty tokens
    const validTokens = tokens.filter(
      (token) =>
        token &&
        typeof token === "string" &&
        token.startsWith("ExponentPushToken"),
    );

    if (validTokens.length === 0) {
      console.warn("No valid Expo push tokens provided provided.");
      return { success: false, message: "No valid tokens provided" };
    }

    // Expo allows up to 100 notifications per single request
    const chunks: string[][] = [];
    for (let i = 0; i < validTokens.length; i += 100) {
      chunks.push(validTokens.slice(i, i + 100));
    }

    const results = await Promise.all(
      chunks.map(async (chunk) => {
        const notifications = chunk.map((token) => ({
          to: token,
          title: message.title,
          body: message.body,
          data: message.data,
          sound: message.sound || "default",
          badge: message.badge,
          channelId: message.channelId,
        }));

        const response = await fetch(EXPO_PUSH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
          },
          body: JSON.stringify(notifications),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Expo API error: ${response.status} - ${errorText}`);
        }

        return response.json();
      }),
    );

    return {
      success: true,
      message: `Sent to ${validTokens.length} tokens in ${chunks.length} batches`,
      results,
    };
  } catch (err: any) {
    console.error("Error sending push notifications:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}
