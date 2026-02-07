import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useAuthStore } from "../../../src/stores/authStore";
import { AppHeader } from "@/src/components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  HERO_IMAGES,
  ALL_ANNOUNCEMENTS,
  GALLERY_DATA,
} from "@/src/constants/data";

import { Section } from "@/src/components/Section";
import { GalleryCollageCard } from "@/src/components/GalleryCollageCard";
import { AnnouncementCard } from "@/src/components/AnnouncementCard";

const { width } = Dimensions.get("window");

const ITEM_MARGIN = 20;
const CARD_WIDTH = width - ITEM_MARGIN * 2;
const PAGE_WIDTH = width;

const HomeScreen = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { t } = useLanguage();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScroll = useRef(true);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScroll.current) return;

      let next = currentIndex + 1;
      if (next >= HERO_IMAGES.length) next = 0;

      flatListRef.current?.scrollToIndex({
        index: next,
        animated: true,
      });

      setCurrentIndex(next);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <AppHeader
        title={t("home.title")}
        subtitle={user?.firstname || t("home.defaultUser")}
        rightAction={<LanguageSelector />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO CAROUSEL */}
        <View style={styles.banner}>
          <FlatList
            ref={flatListRef}
            data={HERO_IMAGES}
            horizontal
            pagingEnabled
            snapToInterval={PAGE_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScrollBeginDrag={() => (autoScroll.current = false)}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / PAGE_WIDTH,
              );
              setCurrentIndex(index);

              setTimeout(() => {
                autoScroll.current = true;
              }, 3000);
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: PAGE_WIDTH,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.heroCard}>
                  <Image source={{ uri: item }} style={styles.bannerImage} />

                  <LinearGradient
                    colors={[
                      "rgba(0,0,0,0.15)",
                      "rgba(0,0,0,0.45)",
                      "rgba(0,0,0,0.75)",
                    ]}
                    style={styles.bannerOverlay}
                  />
                </View>
              </View>
            )}
          />
        </View>

        {/* ANNOUNCEMENTS SECTION */}
        <Section
          title={t("home.whatsNew")}
          onSeeAll={() => router.push("/(user)/announcements" as any)}
          contentStyle={{ gap: 12 }}
        >
          {ALL_ANNOUNCEMENTS?.slice(0, 3).map((item) => (
            <AnnouncementCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              containerStyle={styles.announcementCard}
            />
          ))}
        </Section>

        {/* GALLERY */}
        <Section
          title={t("home.eventGallery")}
          onSeeAll={() => router.push("/(user)/gallery" as any)}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {GALLERY_DATA?.slice(0, 3).map((item) => (
              <GalleryCollageCard
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                images={item.images}
                containerStyle={styles.galleryCard}
              />
            ))}
          </ScrollView>
        </Section>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },

  scrollContent: {
    paddingBottom: 140,
    paddingTop: 20,
  },

  banner: {
    height: 220,
  },

  heroCard: {
    width: CARD_WIDTH,
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  galleryCard: {
    width: 200,
    height: 140,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 20,
  },

  galleryImage: {
    width: "100%",
    height: "100%",
  },

  galleryOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 12,
  },

  galleryTitle: {
    color: "#FFF",
    fontWeight: "700",
  },

  galleryDate: {
    color: "#DDD",
    fontSize: 12,
  },

  announcementCard: {
    marginHorizontal: 20,
  },
});
