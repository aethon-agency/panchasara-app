import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { useLanguage } from "@/src/hooks/useLanguage";
import { GalleryCollageCard } from "@/src/components/GalleryCollageCard";
import { getGalleries } from "@/src/services/galleryServices";

const { width } = Dimensions.get("window");

interface Gallery {
  id: number;
  title: string;
  month: number;
  year: number;
  images: string[];
}

export default function GalleryListScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await getGalleries();
      if (response && response.success) {
        setGalleries(response.data);
      }
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (month: number, year: number) => {
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
    return `${t(`months.${monthNames[month - 1]}`)} ${year}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader
          title={t("home.eventGallery")}
          showBack={true}
          onBack={() => router.back()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#EA580C" />
        </View>
      </View>
    );
  }

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
          {galleries.map((item) => (
            <GalleryCollageCard
              key={item.id}
              id={String(item.id)}
              title={item.title}
              date={formatDate(item.month, item.year)}
              images={item.images}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
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
