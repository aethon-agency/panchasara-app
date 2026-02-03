import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  colors?: string[];
}

export const PrimaryButton = ({
  onPress,
  label,
  loading,
  disabled,
  icon,
  colors = ["#EA580C", "#9A3412"], // Default Saffron Gradient
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.button, (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
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
  button: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  disabled: {
    opacity: 0.6,
  },
  gradient: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  icon: {
    marginLeft: 4,
  },
});
