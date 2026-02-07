import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ALL_EVENTS, MandirEvent } from "@/src/constants/data";
import { useLanguage } from "@/src/hooks/useLanguage";
import { toGujarati } from "@/src/utils/functions";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t, isGujarati } = useLanguage();
  const event = ALL_EVENTS.find((e) => e.id === id) as MandirEvent;

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text>{t("eventDetails.errorNotFound")}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButtonText}>
            {t("eventDetails.errorGoBack")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getEventLabel = (type: string) => {
    switch (type) {
      case "poonam":
        return t("events.badges.poonam");
      case "havan":
        return t("events.badges.havan");
      default:
        return t("events.badges.poonam");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title={
          getEventLabel(event.type).toUpperCase() +
          " - " +
          t("eventDetails.title")
        }
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#FFFBEB", "#FEF3C7", "#FFFBEB"]}
          style={styles.invitationCard}
        >
          <MaterialCommunityIcons
            name="flower-tulip"
            size={24}
            color="#EA580C"
            style={styles.topLeftIcon}
          />
          <MaterialCommunityIcons
            name="flower-tulip"
            size={24}
            color="#EA580C"
            style={styles.topRightIcon}
          />
          <MaterialCommunityIcons
            name="flower-tulip"
            size={24}
            color="#EA580C"
            style={styles.bottomLeftIcon}
          />
          <MaterialCommunityIcons
            name="flower-tulip"
            size={24}
            color="#EA580C"
            style={styles.bottomRightIcon}
          />

          {/* Invitation Header */}
          <View style={styles.headerDecoration}>
            <View style={styles.decorationLine} />
            <MaterialCommunityIcons name="om" size={32} color="#EA580C" />
            <View style={styles.decorationLine} />
          </View>

          <Text style={styles.invitationHeaderTitle}>
            {t("eventDetails.headerTitle")}
          </Text>
          <Text style={styles.invitationSubHeader}>
            {t("eventDetails.headerSubtitle")}
          </Text>

          {/* Event Title */}
          <View style={styles.titleSection}>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>

          {/* Save the Date Section */}
          <View style={styles.divider} />

          {/* Date & Time Section */}
          <View style={styles.dateTimeSection}>
            <Text style={styles.dateTimeLabel}>
              {t("eventDetails.occasionLabel")}
            </Text>

            {/* Date */}
            <View style={styles.infoBlock}>
              <Ionicons name="calendar" size={22} color="#B45309" />
              <View style={styles.dateContainer}>
                <Text style={styles.infoText}>
                  {isGujarati ? toGujarati(event.date) : event.date} -
                </Text>
                <Text style={styles.dayText}>
                  {t(`days.${event.day.toLowerCase()}`)}
                </Text>
              </View>
            </View>

            {/* Time */}
            <View style={styles.infoBlock}>
              <Ionicons name="time" size={22} color="#B45309" />
              <Text style={styles.timeText}>
                {event.startTime} - {event.endTime}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.messageContainer}>
            <Text style={styles.gujaratiTitle}>ભોજન પ્રસાદ આમંત્રણ</Text>
            <Text style={styles.gujaratiMessage}>
              સહર્ષ પરિવારજનોને જણાવવાનું કે {event.title} નો કાર્યક્રમ તા.{" "}
              <Text style={styles.donorName}>
                {toGujarati(event.date)}, {t(`days.${event.day.toLowerCase()}`)}
              </Text>{" "}
              ના રોજ રાબેતા મુજબ છે, જેના ભોજન પ્રસાદના દાતા{"\n"}
              <Text style={styles.donorName}>“{event.organizerName}”</Text>{" "}
              રહેશે.
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.venueSection}>
            <Ionicons name="location" size={20} color="#EA580C" />
            <Text style={styles.venueLabel}>
              {t("eventDetails.venueLabel")} :{" "}
            </Text>
            <Text style={styles.venueValue}>{event.location}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.welcomeNote}>
            {t("eventDetails.welcomeNote")}
          </Text>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={20} color="#EA580C" />
            <Text style={styles.shareButtonText}>
              {t("eventDetails.shareButton")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("eventDetails.footerText")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  invitationCard: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 30,
    paddingTop: 10,
    marginTop: 10,
    paddingBottom: 20,
    borderWidth: 2,
    borderColor: "#FDE68A",
    elevation: 8,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    alignItems: "center",
    position: "relative",
  },
  topLeftIcon: { position: "absolute", top: 15, left: 15, opacity: 0.6 },
  topRightIcon: { position: "absolute", top: 15, right: 15, opacity: 0.6 },
  bottomLeftIcon: { position: "absolute", bottom: 15, left: 15, opacity: 0.6 },
  bottomRightIcon: {
    position: "absolute",
    bottom: 15,
    right: 15,
    opacity: 0.6,
  },

  headerDecoration: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    gap: 15,
  },
  decorationLine: {
    height: 1.5,
    flex: 1,
    backgroundColor: "#FDE68A",
  },
  invitationHeaderTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#9A3412",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  invitationSubHeader: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    fontStyle: "italic",
    fontWeight: "600",
  },
  titleSection: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    columnGap: 10,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#431407",
    textAlign: "center",
  },
  typeBadge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#FDE68A",
    marginVertical: 15,
  },
  dateTimeSection: {
    alignItems: "center",
    gap: 8,
    marginVertical: 5,
  },
  dateTimeLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoTextDate: {
    fontSize: 28,
    fontWeight: "900",
    color: "#431407",
    lineHeight: 34,
  },
  dayTextLarge: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9A3412",
    marginTop: 2,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  timeTextSmall: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
  venueSection: {
    alignItems: "center",
    marginVertical: 4,
    flexDirection: "row",
    columnGap: 10,
  },
  venueLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 2,
    marginTop: 5,
  },
  venueValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
    textAlign: "center",
    marginTop: 4,
  },
  messageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  gujaratiTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 12,
    textDecorationLine: "underline",
  },
  gujaratiMessage: {
    fontSize: 18,
    color: "#431407",
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "600",
  },
  donorName: {
    fontWeight: "900",
    color: "#9A3412",
    fontSize: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  descriptionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 2,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  footerDecoration: {
    marginTop: 25,
    marginBottom: 10,
  },
  welcomeNote: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "700",
    fontStyle: "italic",
    paddingTop: 10,
  },
  actionSection: {
    marginTop: 25,
    alignItems: "center",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#FFEDD5",
    elevation: 2,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#EA580C",
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F1",
  },
  backButtonText: {
    marginTop: 20,
    color: "#EA580C",
    fontWeight: "700",
  },

  infoBlock: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },

  dateContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },

  infoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#7C2D12",
  },

  dayText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B45309",
  },

  timeText: { fontWeight: "700", color: "#64748B" },
});
