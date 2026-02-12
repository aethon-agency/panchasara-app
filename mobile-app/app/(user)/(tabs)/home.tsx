import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { useAuthStore } from "../../../src/stores/authStore";
import { AppHeader } from "@/src/components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";
import { HERO_IMAGES, GALLERY_DATA, MandirEvent } from "@/src/constants/data";
import { Section } from "@/src/components/Section";
import { GalleryCollageCard } from "@/src/components/GalleryCollageCard";
import { AnnouncementCard } from "@/src/components/AnnouncementCard";
import { MandirEventCard } from "@/src/components/MandirEventCard";
import { getUserProfile } from "@/src/services/userServices";
import { getAnnouncements } from "@/src/services/announcementServices";
import { getAllEvents } from "@/src/services/eventServices";
import { formatDate } from "@/src/utils/functions";

const { width } = Dimensions.get("window");

const ITEM_MARGIN = 20;
const CARD_WIDTH = width - ITEM_MARGIN * 2;
const PAGE_WIDTH = width;

const HomeScreen = () => {
  const { user, updateUser } = useAuthStore();
  const router = useRouter();
  const { t } = useLanguage();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScroll = useRef(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<MandirEvent[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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

      await Promise.all([syncProfile(), fetchAnnouncements(), fetchEvents()]);
    } catch (err) {
      console.error("[HomeScreen] Error fetching home data:", err);
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
        {latestEvent && (
          <Section
            title={t("home.upcomingEvent")}
            onSeeAll={() => router.push("/(user)/(tabs)/event" as any)}
          >
            <MandirEventCard
              event={latestEvent}
              containerStyle={styles.latestEventCard}
            />
          </Section>
        )}

        {/* ANNOUNCEMENTS SECTION */}
        {announcements.length > 0 && (
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
        )}

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
  latestEventCard: {
    paddingHorizontal: 20,
  },
});
