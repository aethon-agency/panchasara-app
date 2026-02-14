import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/src/hooks/useLanguage";
import { MandirEventCard } from "@/src/components/MandirEventCard";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { getAllEvents } from "@/src/services/eventServices";
import { MandirEvent } from "@/src/constants/types";
import { formatDate } from "@/src/utils/functions";

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

  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date(0);
    // Handle both DD-MM-YYYY, YYYY-MM-DD, DD/MM/YYYY, YYYY/MM/DD
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD
        return new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2]),
        );
      } else {
        // DD-MM-YYYY
        return new Date(
          Number(parts[2]),
          Number(parts[1]) - 1,
          Number(parts[0]),
        );
      }
    }
    return new Date(dateStr);
  };

  const sortedEvents = [...events].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("events.title")}
        subtitle={t("events.subtitle")}
        rightAction={<LanguageSelector />}
      />

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
          {sortedEvents.map((item) => (
            <MandirEventCard key={item.id} event={item} />
          ))}

          {sortedEvents.length === 0 && (
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
