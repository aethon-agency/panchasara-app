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
        {/* Left Section: Back Button */}
        <View style={styles.sideSection}>
          {showBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.iconHalo}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#7C2D12" />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section: Title & Subtitle */}
        <View style={styles.centerSection}>
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

        {/* Right Section: Actions */}
        <View style={[styles.sideSection, styles.rightSide]}>
          {rightAction}
        </View>
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
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sideSection: {
    minWidth: 44,
    height: "100%",
    justifyContent: "center",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  iconHalo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF7ED", // Very light saffron
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
    fontSize: 19,
    fontWeight: "900",
    color: "#431407", // Deep Brown
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9A3412", // Rich Saffron
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 1,
    opacity: 0.9,
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#FDE68A", // Golden tint
    opacity: 0.5,
  },
});
