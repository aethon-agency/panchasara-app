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
import { ALL_EVENTS } from "../../src/constants/events";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event: any = ALL_EVENTS.find((e) => e.id === id);

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

  const isPoonam = event.type === "regular";

  const getEventLabel = (type: string) => {
    switch (type) {
      case "regular":
        return "Poonam";
      case "havan":
        return "Havan";
      case "special":
        return "Special Event";
      default:
        return "Event";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title="Event Details"
        subtitle={event.title}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.badgesRow}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>
                {getEventLabel(event.type).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.dayLabel}>
              {event.dayGujarati} | {event.dayEnglish}
            </Text>
          </View>
        </View>

        {/* Quick Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <LinearGradient
              colors={["#FFF7ED", "#FFEDD5"]}
              style={styles.iconCircle}
            >
              <Ionicons name="calendar" size={20} color="#EA580C" />
            </LinearGradient>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{event.date}</Text>
          </View>

          <View style={styles.infoCard}>
            <LinearGradient
              colors={["#FFF7ED", "#FFEDD5"]}
              style={styles.iconCircle}
            >
              <Ionicons name="time" size={20} color="#EA580C" />
            </LinearGradient>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{event.time}</Text>
          </View>
        </View>

        {/* Special Poonam Message Section */}
        {isPoonam && (
          <View style={styles.messageSection}>
            <Text style={styles.gujaratiTitle}>ભોજન પ્રસાદ આમંત્રણ</Text>
            <LinearGradient
              colors={["#FFFBEB", "#FEF3C7"]}
              style={styles.messageBox}
            >
              <MaterialCommunityIcons
                name="flower-tulip"
                size={30}
                color="#EA580C"
                style={styles.flowerIcon}
              />
              <Text style={styles.gujaratiMessage}>
                સહર્ષ પરિવારજનોને જણાવવાનું કે {event.gujaratiMonth} માસની{" "}
                {event.gujaratiPoonamName}નો કાર્યક્રમ તા. {event.date},{" "}
                {event.dayGujarati}ના રોજ રાબેતા મુજબ છે, જેના ભોજન પ્રસાદના
                દાતા <Text style={styles.donorName}>{event.organizerName}</Text>{" "}
                રહેશે.
              </Text>
              <MaterialCommunityIcons
                name="flower-tulip"
                size={30}
                color="#EA580C"
                style={styles.flowerIconBottom}
              />
            </LinearGradient>
          </View>
        )}

        <View style={styles.locationCard}>
          <Ionicons name="location" size={22} color="#9A3412" />
          <View>
            <Text style={styles.locationLabel}>Venue</Text>
            <Text style={styles.locationValue}>{event.location}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About this Event</Text>
          <Text style={styles.descriptionText}>{event.desc}</Text>
        </View>

        {/* Additional Info / Footer */}
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
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  typeBadge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  typeBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9A3412",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#431407",
    textAlign: "center",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    gap: 15,
    marginBottom: 24,
  },
  locationLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  locationValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#431407",
  },
  messageSection: {
    marginBottom: 24,
  },
  gujaratiTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 12,
    textAlign: "center",
  },
  messageBox: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    position: "relative",
  },
  flowerIcon: {
    position: "absolute",
    top: 5,
    left: 5,
    opacity: 0.2,
  },
  flowerIconBottom: {
    position: "absolute",
    bottom: 5,
    right: 5,
    opacity: 0.2,
  },
  gujaratiMessage: {
    fontSize: 18,
    color: "#431407",
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "500",
  },
  donorName: {
    fontWeight: "900",
    color: "#9A3412",
    textDecorationLine: "underline",
  },
  descriptionSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 20,
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
