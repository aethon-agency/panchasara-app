import React from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useLanguage } from "@/src/hooks/useLanguage";
import { AnnouncementCard } from "@/src/components/AnnouncementCard";
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
          <AnnouncementCard
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            author={item.author}
            showDetails={true}
          />
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
});
