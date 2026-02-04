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
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ALL_EVENTS, MandirEvent } from "@/src/constants/events";

export default function EventScreen() {
  const router = useRouter();

  const parseDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const sortedEvents = [...ALL_EVENTS].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });

  const getEventBadgeStyle = (type: string) => {
    switch (type) {
      case "poonam":
        return { bg: "#FFF7ED", text: "#EA580C", label: "Poonam" };
      case "havan":
        return { bg: "#EEF2FF", text: "#4F46E5", label: "Havan" };
      case "special":
        return { bg: "#F0FDF4", text: "#16A34A", label: "Special" };
      default:
        return { bg: "#F8FAFC", text: "#64748B", label: "Event" };
    }
  };

  const renderEventCard = (item: MandirEvent, index: number) => {
    const goToDetails = () => {
      router.push({
        pathname: "/(user)/event-details",
        params: { id: item.id },
      });
    };

    const badge = getEventBadgeStyle(item.type);

    return (
      <Animated.View
        key={item.id}
        entering={FadeInUp.delay(index * 100).duration(500)}
        style={styles.card}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToDetails}
          style={styles.cardContent}
        >
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.typeBadgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={14} color="#EA580C" />
              <Text style={styles.subInfo}>{item.date}</Text>
              <View style={styles.dot} />
              <Text style={styles.dayLabel}>
                {item.dayGujarati} | {item.dayEnglish}
              </Text>
            </View>
          </View>

          <View style={styles.rightChevron}>
            <Ionicons name="chevron-forward" size={20} color="#EA580C" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Events" subtitle="Upcoming Mandir Schedule" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedEvents.map((item, index) => renderEventCard(item, index))}

        {sortedEvents.length === 0 && (
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
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 3,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  subInfo: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9A3412",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },
  rightChevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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
