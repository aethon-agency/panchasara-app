import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";

const TABS = [
  { id: "regular", label: "Poonam " },
  { id: "havan", label: "Havan" },
  { id: "special", label: "Special Events" },
];

const POONAM_REGULAR = [
  {
    id: "1",
    title: "Maha Poonam",
    gujaratiPoonamName: "પૂનમ",
    gujaratiMonth: "મહા",
    date: "12-2-2026",
    dayEnglish: "Thursday",
    dayGujarati: "ગુરુવાર",
    time: "06:00 AM - 08:00 PM",
    organizerName: "શ્રી જયંતિભાઇ રાઘવજીભાઈ - જાલી",
    desc: "Monthly divine gathering with Aarti and Prasad in the Village Mandir.",
    location: "Main Village Mandir",
  },
  {
    id: "2",
    title: "Phalguna Poonam",
    gujaratiPoonamName: "પૂનમ",
    gujaratiMonth: "ફાગણ",
    date: "14-3-2026",
    dayEnglish: "Saturday",
    dayGujarati: "શનિવાર",
    time: "06:00 AM - 08:00 PM",
    organizerName: "શ્રી રમેશભાઈ પ્રભુભાઈ",
    desc: "Holi festival poonam celebration with special Bhakti Sangeet.",
    location: "Main Village Mandir",
  },
];

const POONAM_SPECIAL = [
  {
    id: "s1",
    title: "Shravan Mahotsav",
    date: "Aug 28, 2026",
    time: "05:00 AM - 10:00 PM",
    desc: "Grand Shravan Month culmination with traditional rituals.",
    location: "Mandir Ground",
  },
];

const HAVAN_EVENTS = [
  {
    id: "h1",
    title: "Vishwakarma Mahayagya",
    date: "Sept 17, 2026",
    time: "07:00 AM - 04:00 PM",
    desc: "Annual Havan for prosperity and well-being of the village community.",
    location: "Yagya Shala",
  },
];

export default function EventScreen() {
  const [activeTab, setActiveTab] = useState("regular");

  const renderEventCard = (item: any, index: number) => {
    const isPoonam = activeTab === "regular";

    return (
      <Animated.View
        key={item.id}
        entering={FadeInUp.delay(index * 100).duration(500)}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {isPoonam && (
                <Text style={styles.dayBadge}>
                  {item.dayGujarati} | {item.dayEnglish}
                </Text>
              )}
            </View>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={14} color="#EA580C" />
              <Text style={styles.subInfo}>{item.date}</Text>
            </View>
          </View>
        </View>

        {isPoonam && (
          <View style={styles.messageBox}>
            <LinearGradient
              colors={["#FFFBEB", "#FEF3C7"]}
              style={styles.invitationGradient}
            >
              <Text style={styles.invitationText}>
                સહર્ષ પરિવારજનોને જણાવવાનું કે {item.gujaratiMonth} માસની{" "}
                {item.gujaratiPoonamName}નો કાર્યક્રમ તા. {item.date},{" "}
                {item.dayGujarati}ના રોજ રાબેતા મુજબ છે, જેના ભોજન પ્રસાદના દાતા{" "}
                <Text style={styles.boldGujarati}>{item.organizerName}</Text>{" "}
                રહેશે.
              </Text>
            </LinearGradient>
          </View>
        )}

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsText}>View Event Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#EA580C" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const getEvents = () => {
    switch (activeTab) {
      case "regular":
        return POONAM_REGULAR;
      case "special":
        return POONAM_SPECIAL;
      case "havan":
        return HAVAN_EVENTS;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Mandir Events" subtitle="Poornima & Yagya Schedule" />

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.id && (
              <Animated.View
                layout={LinearTransition}
                style={styles.activeIndicator}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {getEvents().map((item, index) => renderEventCard(item, index))}

        {getEvents().length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="calendar-blank"
              size={64}
              color="#CBD5E1"
            />
            <Text style={styles.emptyText}>No upcoming events scheduled</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94A3B8",
  },
  activeTabLabel: {
    color: "#EA580C",
    fontWeight: "800",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: "60%",
    height: 3,
    backgroundColor: "#EA580C",
    borderRadius: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  infoBanner: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerBackground: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    gap: 10,
  },
  bannerText: {
    fontSize: 12,
    color: "#7C2D12",
    flex: 1,
    fontWeight: "500",
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 3,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 16,
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#EA580C",
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    textTransform: "uppercase",
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
    flex: 1,
  },
  dayBadge: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subInfo: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },
  messageBox: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  invitationGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 16,
  },
  invitationText: {
    fontSize: 15,
    color: "#431407",
    lineHeight: 24,
    fontWeight: "500",
  },
  boldGujarati: {
    fontWeight: "900",
    color: "#9A3412",
  },
  cardBody: {
    marginBottom: 15,
  },
  descText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  locationText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#431407",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#EA580C",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "600",
  },
});
