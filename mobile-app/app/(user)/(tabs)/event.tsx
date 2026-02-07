import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ALL_EVENTS } from "@/src/constants/data";
import { useLanguage } from "@/src/hooks/useLanguage";
import { MandirEventCard } from "@/src/components/MandirEventCard";

export default function EventScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const parseDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const sortedEvents = [...ALL_EVENTS].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });

  return (
    <View style={styles.container}>
      <AppHeader title={t("events.title")} subtitle={t("events.subtitle")} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedEvents.map((item, index) => (
          <MandirEventCard key={item.id} event={item} index={index} />
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
