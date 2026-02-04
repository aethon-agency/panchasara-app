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

const { width } = Dimensions.get("window");

// Mock Data (Expanded)
const GALLERY_DATA = [
  {
    id: "1",
    title: "Janmashtami 2025",
    date: "August 2025",
    image:
      "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Navratri Garba 2025",
    date: "October 2025",
    image:
      "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Diwali Pujan 2024",
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Vasant Panchami",
    date: "February 2024",
    image:
      "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Community Picnic",
    date: "December 2023",
    image:
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Health Camp",
    date: "November 2023",
    image:
      "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
  },
];

export default function GalleryListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title="Event Gallery"
        subtitle="Memories & Moments"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {GALLERY_DATA.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(index * 100).duration(500)}
              style={styles.cardContainer}
            >
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/(user)/gallery-details",
                    params: { id: item.id, title: item.title, date: item.date },
                  } as any)
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.overlay}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
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
  },
  card: {
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    justifyContent: "flex-end",
    height: "100%",
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
