import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.outerContainer,
        { paddingTop: insets.top },
        transparent && styles.transparent,
      ]}
    >
      <StatusBar barStyle="dark-content" />

      {!transparent && (
        <LinearGradient
          colors={["#FFFFFF", "#FFFBEB"]} // White to light cream
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={styles.content}>
        {/* Left Group: Combines Back Button + Title/Subtitle */}
        <View style={styles.leftGroup}>
          {showBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.iconHalo}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#7C2D12" />
            </TouchableOpacity>
          )}

          <View style={[styles.textSection, showBack && { marginLeft: 14 }]}>
            {title && (
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text numberOfLines={1} style={styles.subtitle}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Right Section: Actions */}
        <View style={styles.rightSide}>{rightAction}</View>
      </View>

      {/* Premium Bottom Border */}
      {!transparent && <View style={styles.bottomBorder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        zIndex: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  transparent: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  content: {
    height: 64, // Slightly taller for better alignment
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftGroup: {
    flex: 1, // Occupies remaining space to keep rightAction on the far right
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    justifyContent: "center",
    alignItems: "flex-start", // Anchors text to the left
  },
  rightSide: {
    minWidth: 44,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  iconHalo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFEDD5",
    ...Platform.select({
      ios: {
        shadowColor: "#EA580C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: 20, // Increased size for left-aligned branding
    fontWeight: "900",
    color: "#431407",
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 0,
    opacity: 0.8,
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#FDE68A",
    opacity: 0.4,
  },
});
