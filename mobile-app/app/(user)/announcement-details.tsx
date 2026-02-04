import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AnnouncementDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Default fallback data if no params provided
  const title = (params.title as string) || "Paryushan Mahaparva 2026";
  const date = (params.date as string) || "15 Aug 2026";
  const description =
    (params.description as string) ||
    "Join us for the 8 days of spiritual purification. Daily Pravacahns, Pratikraman, and Bhakti Sangeet will be organized. \n\nDetailed Schedule:\n- 6:00 AM: Snatra Puja\n- 9:30 AM: Pravachan\n- 8:00 PM: Bhakti Bhavna\n\nPlease register your name at the office for Ekasana and Upvas.";
  const author = (params.author as string) || "Mandir Admin";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title="Announcement"
        subtitle="News & Updates"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <LinearGradient
            colors={["#FFF7ED", "#FFFFFF"]}
            style={styles.headerGradient}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="bullhorn-outline"
                size={32}
                color="#EA580C"
              />
            </View>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} color="#64748B" />
                <Text style={styles.metaText}>{date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons
                  name="person-circle-outline"
                  size={14}
                  color="#64748B"
                />
                <Text style={styles.metaText}>Posted by: {author}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.divider} />

          <View style={styles.body}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>-- Jai Jinendra --</Text>
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
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 4,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerGradient: {
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#431407",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 30,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  metaText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    width: "100%",
  },
  body: {
    padding: 24,
  },
  description: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 26,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "700",
    fontStyle: "italic",
    letterSpacing: 1,
  },
});
