import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useAuthStore } from "../../../src/stores/authStore";
import { AppHeader } from "@/src/components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";
import { DEFAULT_BANNER } from "@/src/constants/data";
import { getBanners } from "@/src/services/bannerServices";
import { Section } from "@/src/components/Section";
import { GalleryCollageCard } from "@/src/components/GalleryCollageCard";
import { AnnouncementCard } from "@/src/components/AnnouncementCard";
import { MandirEventCard } from "@/src/components/MandirEventCard";
import { getUserProfile } from "@/src/services/userServices";
import { getAnnouncements } from "@/src/services/announcementServices";
import { getGalleries } from "@/src/services/galleryServices";
import { formatDate, toGujarati } from "@/src/utils/functions";
import { getAllEvents } from "@/src/services/eventServices";
import { MandirEvent } from "@/src/constants/types";

const { width } = Dimensions.get("window");

const ITEM_MARGIN = 20;
const CARD_WIDTH = width - ITEM_MARGIN * 2;
const PAGE_WIDTH = width;

const HomeScreen = () => {
  const { user, updateUser } = useAuthStore();
  const router = useRouter();
  const { t, isGujarati } = useLanguage();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScroll = useRef(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [galleries, setGalleries] = useState<any[]>([]);
  const [events, setEvents] = useState<MandirEvent[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [bannerLoadError, setBannerLoadError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatGalleryDate = (month: number, year: number) => {
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return `${t(`months.${monthNames[month - 1]}`)} ${isGujarati ? toGujarati(year?.toString()) : year}`;
  };

  const fetchHomeData = async () => {
    try {
      const syncProfile = async () => {
        try {
          const response = await getUserProfile();
          if (response?.status && response.data) {
            updateUser(response.data);
          }
        } catch (err) {
          console.error("[HomeScreen] Profile sync failed:", err);
        }
      };

      const fetchAnnouncements = async () => {
        try {
          const response = await getAnnouncements();
          if (response && response.success) {
            setAnnouncements(response.data);
          }
        } catch (error) {
          console.error("[HomeScreen] Error fetching announcements:", error);
        }
      };

      const fetchGalleries = async () => {
        try {
          const response = await getGalleries();
          if (response && response.success) {
            setGalleries(response.data);
          }
        } catch (error) {
          console.error("[HomeScreen] Error fetching galleries:", error);
        }
      };

      const fetchBanners = async () => {
        try {
          const data = await getBanners();
          setBannerImages(data.map((b) => b.image_url));
          setBannerLoadError(false);
        } catch (error) {
          console.error("[HomeScreen] Error fetching banners:", error);
          // Clear remote list so the bundled local banner is shown.
          setBannerImages([]);
        }
      };

      const fetchEvents = async () => {
        try {
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
          console.error("[HomeScreen] Error fetching events:", error);
        }
      };

      await Promise.all([
        syncProfile(),
        fetchAnnouncements(),
        fetchEvents(),
        fetchGalleries(),
        fetchBanners(),
      ]);
    } catch (err) {
      console.error("[HomeScreen] Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };

  // FETCH DATA
  useEffect(() => {
    fetchHomeData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  }, []);

  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        return new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2]),
        );
      } else {
        return new Date(
          Number(parts[2]),
          Number(parts[1]) - 1,
          Number(parts[0]),
        );
      }
    }
    return new Date(dateStr);
  };

  const now = new Date();
  const upcomingEvents = events
    ?.filter((e) => {
      const eventDate = parseDate(e.date);
      // Set to beginning of day for comparison
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return eventDate >= today;
    })
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  const latestEvent = upcomingEvents[0];

  // Banners come from R2 via the API. If the fetch returned nothing, or a
  // remote image failed to load, fall back to the bundled local banner so a
  // banner always shows (even offline).
  const useRemoteBanners = bannerImages.length > 0 && !bannerLoadError;
  const heroSources = useRemoteBanners
    ? bannerImages.map((uri) => ({ uri }))
    : [DEFAULT_BANNER];

  const bannerCount = heroSources.length;

  // Keep the current slide in range when the banner set changes (e.g. after a
  // banner is deleted the count shrinks).
  useEffect(() => {
    setCurrentIndex((i) => (i >= bannerCount ? 0 : i));
  }, [bannerCount]);

  // AUTO SLIDE. Depends on bannerCount so the interval never holds a stale
  // length and tries to scroll past the end.
  useEffect(() => {
    if (bannerCount <= 1) return; // nothing to rotate through

    const interval = setInterval(() => {
      if (!autoScroll.current) return;

      const next = (currentIndex + 1) % bannerCount;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, bannerCount]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <AppHeader
        title={t("home.title")}
        subtitle={t("home.bhaduka")}
        rightAction={<LanguageSelector />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#EA580C"
            colors={["#EA580C"]}
          />
        }
      >
        <View style={styles.banner}>
          <FlatList
            ref={flatListRef}
            data={heroSources}
            horizontal
            pagingEnabled
            snapToInterval={PAGE_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScrollToIndexFailed={() => {
              // Index briefly out of range (e.g. data just shrank). Ignore
              // instead of crashing; the next tick will realign.
            }}
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
                  <Image
                    source={item}
                    style={styles.bannerImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    transition={300}
                    onError={() => setBannerLoadError(true)}
                  />

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

        {loading ? (
          <Section title={t("home.upcomingEvent")}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#EA580C" />
            </View>
          </Section>
        ) : (
          latestEvent && (
            <Section
              title={t("home.upcomingEvent")}
              onSeeAll={() => router.push("/(user)/(tabs)/event" as any)}
            >
              <MandirEventCard
                event={latestEvent}
                containerStyle={styles.latestEventCard}
              />
            </Section>
          )
        )}

        {loading ? (
          <Section title={t("home.announcements")}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#EA580C" />
            </View>
          </Section>
        ) : (
          announcements.length > 0 && (
            <Section
              title={t("home.announcements")}
              onSeeAll={() => router.push("/(user)/(announcements)" as any)}
              contentStyle={{ gap: 12 }}
            >
              {announcements.slice(0, 3).map((item) => (
                <AnnouncementCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  containerStyle={styles.announcementCard}
                />
              ))}
            </Section>
          )
        )}

        {loading ? (
          <Section title={t("home.eventGallery")}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#EA580C" />
            </View>
          </Section>
        ) : (
          galleries?.length > 0 && (
            <Section
              title={t("home.eventGallery")}
              onSeeAll={() => router.push("/(user)/(gallery)" as any)}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {galleries?.slice(0, 3).map((item) => (
                  <GalleryCollageCard
                    key={item.id}
                    id={String(item.id)}
                    title={item.title}
                    date={formatGalleryDate(item.month, item.year)}
                    images={item.images}
                    containerStyle={styles.galleryCard}
                  />
                ))}
              </ScrollView>
            </Section>
          )
        )}
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
    width: 300,
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
  latestEventCard: {
    paddingHorizontal: 20,
  },
  loaderContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
