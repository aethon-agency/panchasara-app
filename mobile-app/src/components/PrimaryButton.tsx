import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Platform,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  colors?: readonly [string, string, ...string[]];
  height?: number;
  style?: ViewStyle; // Added to allow external margin/layout control
}

// Default colors moved outside to prevent re-renders
const DEFAULT_COLORS = ["#F97316", "#EA580C", "#C2410C"] as const;
const GLASS_SHEEN = ["rgba(255,255,255,0.2)", "transparent"] as const;

export const PrimaryButton = ({
  onPress,
  label,
  loading = false,
  disabled = false,
  icon,
  colors = DEFAULT_COLORS,
  height = 64,
  style,
}: PrimaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[styles.buttonOuter, isDisabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.gradient, { height }]}
      >
        {/* SUBTLE GLASS SHEEN OVERLAY */}
        {!isDisabled && (
          <LinearGradient
            colors={GLASS_SHEEN}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <View style={styles.content}>
            <Text style={styles.text}>{label}</Text>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={22}
                color="#FFF"
                style={styles.icon}
              />
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOuter: {
    borderRadius: 22,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#EA580C",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  disabled: {
    opacity: 0.6,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 22,
    paddingHorizontal: 24, // Prevents text from hitting edges
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
