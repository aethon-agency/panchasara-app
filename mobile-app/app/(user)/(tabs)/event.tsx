import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/src/hooks/useLanguage";
import { MandirEventCard } from "@/src/components/MandirEventCard";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { getAllEvents } from "@/src/services/eventServices";
import { MandirEvent } from "@/src/constants/types";
import { formatDate, parseEventDate, startOfToday } from "@/src/utils/functions";

export default function EventScreen() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<MandirEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await getAllEvents();
      if (response.success) {
        const mappedEvents = response.data.map((item: any) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          date: formatDate(item.event_date),
          day: item.day,
          startTime: item.start_time,
          endTime: item.end_time,
          description: item.description,
          location: item.location,
          organizerName: item.organizer_name,
        }));
        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEvents(false);
  }, []);

  // Only today-and-future events belong on this tab. Yesterday and earlier are
  // moved to the history screen. Sorted soonest-first.
  const todayStart = startOfToday().getTime();
  const upcomingEvents = [...events]
    .filter((e) => parseEventDate(e.date).getTime() >= todayStart)
    .sort(
      (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime(),
    );

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("events.title")}
        subtitle={t("events.subtitle")}
        rightAction={<LanguageSelector />}
      />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push("/(user)/(others)/event-history")}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="history" size={18} color="#EA580C" />
          <Text style={styles.historyButtonText}>{t("events.history")}</Text>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EA580C" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#EA580C"
              colors={["#EA580C"]}
            />
          }
        >
          {upcomingEvents.map((item) => (
            <MandirEventCard key={item.id} event={item} />
          ))}

          {upcomingEvents.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="calendar-blank"
                size={64}
                color="#CBD5E1"
              />
              <Text style={styles.emptyText}>{t("events.emptyState")}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  scrollContent: {
    rowGap: 16,
    padding: 20,
    paddingBottom: 100,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  historyButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EA580C",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
