import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useLanguage } from "@/src/hooks/useLanguage";
import { GALLERY_DATA } from "@/src/constants/data";

import { GalleryCollageCard } from "@/src/components/GalleryCollageCard";

const { width } = Dimensions.get("window");

export default function GalleryListScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title={t("home.eventGallery")}
        subtitle={t("home.whatsNew")}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {GALLERY_DATA.map((item: any, index: number) => (
            <GalleryCollageCard
              id={item.id}
              title={item.title}
              date={item.date}
              images={item.images}
              containerStyle={styles.cardContainer}
            />
          ))}
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  cardContainer: {
    width: (width - 48) / 2,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  date: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "500",
  },
});
