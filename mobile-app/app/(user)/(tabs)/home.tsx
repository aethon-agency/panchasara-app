import { Ionicons } from "@expo/vector-icons";
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
import Animated, { FadeInRight } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  HERO_IMAGES,
  ALL_ANNOUNCEMENTS,
  GALLERY_DATA,
} from "@/src/constants/data";

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

  const GalleryCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.galleryCard}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/(user)/gallery-details",
          params: { id: item.id },
        } as any)
      }
    >
      <Image source={{ uri: item.image }} style={styles.galleryImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.galleryOverlay}
      >
        <Text style={styles.galleryTitle}>{item.title}</Text>
        <Text style={styles.galleryDate}>{item.date}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("home.whatsNew")}</Text>
          <TouchableOpacity
            onPress={() => router.push("/(user)/announcements" as any)}
          >
            <Text style={styles.seeAll}>{t("home.seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 12 }}>
          {ALL_ANNOUNCEMENTS?.slice(0, 3).map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(500 + index * 100)}
            >
              <AnnouncementCard
                id={item.id}
                title={item.title}
                description={item.description}
                containerStyle={styles.announcementCard}
              />
            </Animated.View>
          ))}
        </View>

        {/* GALLERY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("home.eventGallery")}</Text>
          <Text style={styles.seeAll}>{t("home.seeAll")}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {GALLERY_DATA.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </ScrollView>
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

  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#431407",
  },

  seeAll: {
    color: "#EA580C",
    fontWeight: "700",
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
