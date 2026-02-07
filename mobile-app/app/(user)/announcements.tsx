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
import { useLanguage } from "@/src/hooks/useLanguage";
import { ALL_ANNOUNCEMENTS } from "@/src/constants/data";

export default function AnnouncementsListScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title={t("announcements.title")}
        subtitle={t("announcements.subtitle")}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {ALL_ANNOUNCEMENTS.map((item, index) => (
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
                    id: item.id,
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
                  {item.description}
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
