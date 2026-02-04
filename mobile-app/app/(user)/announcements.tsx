import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

// Mock Data
const ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Paryushan Mahaparva 2026",
    date: "15 Aug 2026",
    author: "Admin",
    desc: "8 days of spiritual purification starts Aug 15. Join us for daily Snatra Puja and Pravachans.",
  },
  {
    id: "2",
    title: "Annual General Meeting",
    date: "10 Sep 2026",
    author: "Secretary",
    desc: "All members are requested to attend the AGM at 10 AM in the community hall. Agenda includes yearly accounts.",
  },
  {
    id: "3",
    title: "Medical Camp Registration",
    date: "05 Oct 2026",
    author: "Health Committee",
    desc: "Free eye checkup camp organized for senior citizens. Registrations open at the office.",
  },
  {
    id: "4",
    title: "Diwali Celebration Plans",
    date: "01 Nov 2026",
    author: "Event Team",
    desc: "Suggest your ideas for this year's Diwali decorations and cultural programs.",
  },
];

export default function AnnouncementsListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title="Announcements"
        subtitle="News & Updates"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {ANNOUNCEMENTS.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInUp.delay(index * 100).duration(500)}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/(user)/announcement-details",
                  params: {
                    title: item.title,
                    date: item.date,
                    author: item.author,
                    description: item.desc, // In real app, might fetch full desc
                  },
                } as any)
              }
            >
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={["#FFEDD5", "#FED7AA"]}
                  style={styles.iconGradient}
                >
                  <Ionicons
                    name="megaphone-outline"
                    size={24}
                    color="#EA580C"
                  />
                </LinearGradient>
              </View>

              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>
                  {item.date} • {item.author}
                </Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
});
