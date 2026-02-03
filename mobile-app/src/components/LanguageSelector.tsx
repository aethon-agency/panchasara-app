import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { useLanguage } from "../hooks/useLanguage";

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  // Animation value 0 to 1
  const animValue = useRef(
    new Animated.Value(currentLanguage === "gu" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: currentLanguage === "gu" ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Smooth "Material" transition
      useNativeDriver: false, // Background color and layout need false
    }).start();
  }, [currentLanguage]);

  // Movement of the knob
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 84], // Adjusted for wider track (170 - 4 - 82 = 84)
  });

  // Background color morph: Light Gold -> Saffron
  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FEF3C7", "#FFEDD5"],
  });

  const handleToggle = () => {
    const nextLang = currentLanguage === "en" ? "gu" : "en";
    changeLanguage(nextLang);
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        style={styles.touchWrapper}
      >
        <Animated.View style={[styles.track, { backgroundColor: "#FEF3C7" }]}>
          {/* Static Labels */}
          <View style={styles.labelContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                currentLanguage === "en" && styles.activeLabel,
              ]}
            >
              English
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                currentLanguage === "gu" && styles.activeLabel,
              ]}
            >
              ગુજરાતી
            </Text>
          </View>

          {/* Sliding Knob */}
          <Animated.View
            style={[
              styles.knob,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "flex-end",
    marginVertical: 8,
  },
  touchWrapper: {
    borderRadius: 22,
    ...Platform.select({
      ios: {
        shadowColor: "#7C2D12",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  track: {
    width: 170, // Increased width to accommodate full text
    height: 44, // Slightly taller for better touch target and text fit
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  labelContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B45309",
    flex: 1, // Take equal space
    textAlign: "center",
  },
  activeLabel: {
    color: "#7C2D12",
  },
  knob: {
    width: 82, // Approximately half width
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
