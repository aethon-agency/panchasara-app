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
import { Ionicons } from "@expo/vector-icons";
import {
  HERO_IMAGES,
  ALL_ANNOUNCEMENTS,
  GALLERY_DATA,
  ALL_EVENTS,
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
        subtitle={user?.firstname || t("home.bhaduka")}
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

        {/* LATEST EVENT */}
        {(() => {
          const parseDate = (dateStr: string) => {
            const [d, m, y] = dateStr.split("-").map(Number);
            return new Date(y, m - 1, d);
          };

          const now = new Date();
          const upcomingEvents = ALL_EVENTS.filter(
            (e) => parseDate(e.date) >= now,
          ).sort(
            (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
          );

          const latestEvent = upcomingEvents[0];

          if (!latestEvent) return null;

          return (
            <Section
              title={t("home.upcomingEvent")}
              onSeeAll={() => router.push("/(user)/(tabs)/event" as any)}
            >
              <View style={styles.eventCardContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: "/(user)/(others)/event-details",
                      params: { id: latestEvent.id },
                    })
                  }
                  style={styles.eventCard}
                >
                  <LinearGradient
                    colors={["#FFFBEB", "#FEF3C7"]}
                    style={styles.eventGradient}
                  >
                    <View style={styles.eventInfo}>
                      <View style={styles.eventTitleRow}>
                        <Text style={styles.eventTitle}>
                          {latestEvent.title}
                        </Text>
                        <View style={styles.eventBadge}>
                          <Text style={styles.eventBadgeText}>
                            {latestEvent.type.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.eventDetailsRow}>
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color="#EA580C"
                        />
                        <Text style={styles.eventDateText}>
                          {latestEvent.date}
                        </Text>
                        <View style={styles.eventDot} />
                        <Text style={styles.eventDayText}>
                          {latestEvent.dayGujarati} | {latestEvent.dayEnglish}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.eventChevron}>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#EA580C"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Section>
          );
        })()}

        {/* ANNOUNCEMENTS SECTION */}
        <Section
          title={t("home.announcements")}
          onSeeAll={() => router.push("/(user)/(announcements)" as any)}
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
          onSeeAll={() => router.push("/(user)/(gallery)" as any)}
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
  /* EVENT SECTION */
  eventCardContainer: {
    paddingHorizontal: 20,
  },
  eventCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FDE68A",
    elevation: 3,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  eventGradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  eventInfo: {
    flex: 1,
  },
  eventTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
    flex: 1,
  },
  eventBadge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  eventBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
  },
  eventDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eventDateText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 2,
  },
  eventDayText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9A3412",
  },
  eventChevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(234, 88, 12, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
