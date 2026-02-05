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

const { width } = Dimensions.get("window");

const ITEM_MARGIN = 20;
const CARD_WIDTH = width - ITEM_MARGIN * 2;
const PAGE_WIDTH = width;

const HERO_IMAGES = [
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
  "https://eijolqvtchrmhuvuytbl.supabase.co/storage/v1/object/public/BANNER/Banner.jpeg",
];

const GALLERY_DATA = [
  {
    id: "1",
    title: "Janmashtami",
    date: "August 2025",
    image:
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Navratri Garba",
    date: "October 2025",
    image:
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Diwali Pujan",
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
  },
];

const ANNOUNCEMENT_DATA = [
  {
    id: "1",
    title: "Paryushan Mahaparva 2026",
    date: "15 Aug 2026",
    author: "Admin",
    description:
      "8 days of spiritual purification starts Aug 15. Join us for daily pratikraman and pravachans.",
  },
  {
    id: "2",
    title: "General Assembly Meeting",
    date: "10 Oct 2026",
    author: "Committee",
    description:
      "Annual general meeting for all members to discuss upcoming events and budget.",
  },
  {
    id: "3",
    title: "Medical Camp",
    date: "05 Nov 2026",
    author: "Health Team",
    description:
      "Free medical checkup camp for all devotees. Eye checkup and general physician available.",
  },
];

const HomeScreen = () => {
  const { user } = useAuthStore();
  const router = useRouter();

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
        title="Jai Mataji"
        subtitle={user?.firstname || "Devotee"}
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
          <Text style={styles.sectionTitle}>What's New</Text>
          <TouchableOpacity
            onPress={() => router.push("/(user)/announcements" as any)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 12 }}>
          {ANNOUNCEMENT_DATA.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(500 + index * 100)}
            >
              <TouchableOpacity
                style={styles.announcementCard}
                onPress={() =>
                  router.push({
                    pathname: "/(user)/announcement-details",
                    params: {
                      title: item.title,
                      date: item.date,
                      author: item.author,
                      description: item.description,
                    },
                  } as any)
                }
              >
                <View style={styles.announcementIcon}>
                  <LinearGradient
                    colors={["#FFEDD5", "#FED7AA"]}
                    style={styles.iconInnerGradient}
                  >
                    <Ionicons name="megaphone" size={22} color="#EA580C" />
                  </LinearGradient>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.announcementTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.announcementDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* GALLERY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Event Gallery</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    paddingBottom: 40,
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
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  announcementIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 16,
  },

  iconInnerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  announcementTitle: {
    fontWeight: "800",
    color: "#431407",
  },

  announcementDesc: {
    fontSize: 12,
    color: "#64748B",
  },
});
