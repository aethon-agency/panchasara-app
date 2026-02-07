import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface GalleryCollageCardProps {
  id: string;
  title: string;
  date: string;
  images: string[];
  containerStyle?: ViewStyle;
}

export const GalleryCollageCard: React.FC<GalleryCollageCardProps> = ({
  id,
  title,
  date,
  images = [],
  containerStyle,
}) => {
  const router = useRouter();
  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const handlePress = () => {
    router.push({
      pathname: "/(user)/gallery/details",
      params: { id, title, date },
    } as any);
  };

  return (
    <TouchableOpacity
      style={[styles.card, containerStyle]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.gridContainer}>
        {displayImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            {index === 3 && remainingCount > 0 && (
              <View style={styles.moreOverlay}>
                <Text style={styles.moreText}>+{remainingCount}</Text>
              </View>
            )}
          </View>
        ))}
        {/* Placeholder if less than 4 images */}
        {[...Array(Math.max(0, 4 - displayImages.length))].map((_, i) => (
          <View
            key={`placeholder-${i}`}
            style={[styles.imageWrapper, styles.placeholder]}
          />
        ))}
      </View>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F1F5F9",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    width: "50%",
    height: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    backgroundColor: "#E2E8F0",
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  moreText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "800",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    justifyContent: "flex-end",
  },
  textContainer: {
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  date: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11,
    fontWeight: "500",
  },
});
