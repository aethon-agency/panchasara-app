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

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event = ALL_EVENTS.find((e) => e.id === id) as MandirEvent;

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text>Event not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isPoonam = event.type === "poonam";

  const getEventLabel = (type: string) => {
    switch (type) {
      case "poonam":
        return "Poonam";
      case "havan":
        return "Havan";
      case "special":
        return "Special Event";
      case "meeting":
        return "Community Meeting";
      default:
        return "Event";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title="Event Invitation"
        subtitle={event.title}
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
          {/* Decorative Corner Icons */}
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

          <Text style={styles.invitationHeaderTitle}>Jay Bhavani Maa</Text>
          <Text style={styles.invitationSubHeader}>
            Cordially Invites You To
          </Text>

          {/* Event Title */}
          <View style={styles.titleSection}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>
                {getEventLabel(event.type).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Save the Date Section */}
          <View style={styles.divider} />

          <View style={styles.dateTimeSection}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-clear" size={28} color="#EA580C" />
              <View>
                <Text style={styles.infoTextDate}>{event.date}</Text>
                <Text style={styles.dayTextLarge}>
                  {event.dayGujarati} | {event.dayEnglish}
                </Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={16} color="#64748B" />
              <Text style={styles.timeTextSmall}>
                Time: {isPoonam ? "10:00 AM - 01:00 PM" : event.time}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Venue Section */}
          <View style={styles.venueSection}>
            <Ionicons name="location" size={24} color="#EA580C" />
            <Text style={styles.venueLabel}>VENUE</Text>
            <Text style={styles.venueValue}>{event.location}</Text>
          </View>

          {/* Specific Message for Poonam or Description */}
          {isPoonam ? (
            <View style={styles.messageContainer}>
              <Text style={styles.gujaratiTitle}>ભોજન પ્રસાદ આમંત્રણ</Text>
              <Text style={styles.gujaratiMessage}>
                સહર્ષ પરિવારજનોને જણાવવાનું કે {event.gujaratiMonth} માસની{" "}
                {event.gujaratiPoonamName}નો કાર્યક્રમ તા. {event.date},{" "}
                {event.dayGujarati}ના રોજ રાબેતા મુજબ છે, જેના ભોજન પ્રસાદના
                દાતા{"\n"}
                <Text style={styles.donorName}>
                  “{event.organizerName}”
                </Text>{" "}
                રહેશે.
              </Text>
            </View>
          ) : (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>ABOUT EVENT</Text>
              <Text style={styles.descriptionText}>{event.desc}</Text>
            </View>
          )}

          <View style={styles.footerDecoration}>
            <MaterialCommunityIcons name="flower" size={30} color="#EA580C" />
          </View>

          <Text style={styles.welcomeNote}>— All are welcome to join —</Text>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={20} color="#EA580C" />
            <Text style={styles.shareButtonText}>Share Invitation</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            For more information or inquiries, please contact the Mandir Office.
          </Text>
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
    paddingTop: 8,
    marginTop: 10,
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
    marginVertical: 20,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#431407",
    textAlign: "center",
    marginBottom: 10,
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
    gap: 12,
    marginVertical: 5,
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
    marginVertical: 10,
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
});
