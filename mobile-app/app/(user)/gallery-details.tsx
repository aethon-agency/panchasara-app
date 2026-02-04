import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 2;

export default function GalleryDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = (params.title as string) || "Event Gallery";
  const date = (params.date as string) || "Recent";

  // Mock images based on the event (in a real app, fetch based on ID)
  const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1623345805780-8f6e85c18c26?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561336313-0bd5518eb139?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa7c5e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544434255-a0f2C55db236?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542382156-97216664e43e?q=80&w=600&auto=format&fit=crop",
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader
        title={title}
        subtitle={date}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {GALLERY_IMAGES.map((img, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={styles.imageContainer}
            >
              <Image source={{ uri: img }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {GALLERY_IMAGES.length} Photos • All Rights Reserved
          </Text>
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
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#E2E8F0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    marginTop: 32,
    marginBottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
  },
});
