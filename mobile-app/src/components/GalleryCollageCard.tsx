import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from "react-native"; // Or 'react-native'
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

  // Memoize logic to prevent recalculation on every render
  const { displayImages, remainingCount } = useMemo(() => {
    return {
      displayImages: images.slice(0, 4),
      remainingCount: images.length - 4,
    };
  }, [images]);

  const handlePress = () => {
    router.push({
      pathname: "/(user)/(gallery)/details",
      params: { id, title, date },
    } as any);
  };

  return (
    <TouchableOpacity
      style={[styles.card, containerStyle]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {/* 1. Image Frame Wrapper */}
      <View style={styles.frame}>
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

          {/* Placeholder logic */}
          {[...Array(Math.max(0, 4 - displayImages.length))].map((_, i) => (
            <View
              key={`empty-${i}`}
              style={[styles.imageWrapper, styles.placeholder]}
            />
          ))}
        </View>
      </View>

      {/* 2. Content Section (Outside the image frame) */}
      <View style={styles.footer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.dateOnImage}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: "#FFFFFF", // Solid white for the frame
    padding: 8, // This creates the "border" effect
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  frame: {
    height: 180, // Define height so grid doesn't collapse
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  imageWrapper: {
    width: "50%",
    height: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F5F9",
  },
  placeholder: {
    backgroundColor: "#F1F5F9",
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: "flex-end",
    padding: 8,
  },

  footer: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 4,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    color: "#EA580C", // Darker color for visibility on light card
    fontSize: 16,
    fontWeight: "700",
    flexShrink: 1,
  },
  dateOnImage: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
});
