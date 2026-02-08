import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../hooks/useLanguage";

// Configuration for easy adjustments
const TRACK_WIDTH = 84;
const TRACK_HEIGHT = 40;
const KNOB_WIDTH = 38;
const PADDING = 4;
const TRAVEL_DISTANCE = TRACK_WIDTH - KNOB_WIDTH - PADDING * 2;

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  // Animation value: 0 (EN) to 1 (GU)
  const animValue = useRef(
    new Animated.Value(currentLanguage === "gu" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: currentLanguage === "gu" ? 1 : 0,
      friction: 8,
      tension: 50,
      useNativeDriver: false, // Required for layout/color interpolations
    }).start();
  }, [currentLanguage]);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, TRAVEL_DISTANCE + PADDING],
  });

  const handleToggle = () => {
    changeLanguage(currentLanguage === "en" ? "gu" : "en");
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleToggle}
        style={styles.touchWrapper}
      >
        <View style={styles.track}>
          {/* Animated Background Knob */}
          <Animated.View
            style={[styles.knobContainer, { transform: [{ translateX }] }]}
          >
            <LinearGradient
              colors={["#F97316", "#D97706"]} // Saffron Gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.knobGradient}
            />
          </Animated.View>

          {/* Label Overlay */}
          <View style={styles.labelLayer}>
            <View style={styles.labelWrapper}>
              <Text
                style={[
                  styles.labelBase,
                  currentLanguage === "en"
                    ? styles.labelActive
                    : styles.labelInactive,
                ]}
              >
                En
              </Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text
                style={[
                  styles.labelBase,
                  currentLanguage === "gu"
                    ? styles.labelActive
                    : styles.labelInactive,
                ]}
              >
                ગુજ
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "flex-end",
  },
  touchWrapper: {
    borderRadius: 25,
    backgroundColor: "#FFF",
    // Premium spiritual glow/shadow
    ...Platform.select({
      ios: {
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: 25,
    backgroundColor: "#FEF3C7", // Light chandan/cream color
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    justifyContent: "center",
    overflow: "hidden",
  },
  knobContainer: {
    position: "absolute",
    width: KNOB_WIDTH,
    height: TRACK_HEIGHT - PADDING * 2,
    borderRadius: 20,
    zIndex: 1,
  },
  knobGradient: {
    flex: 1,
    borderRadius: 20,
  },
  labelLayer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: PADDING,
    zIndex: 2, // Text stays on top
  },
  labelWrapper: {
    width: (TRACK_WIDTH - PADDING * 2) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  labelBase: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  labelActive: {
    color: "#FFFFFF", // White text on Saffron knob
  },
  labelInactive: {
    color: "#92400E", // Deep brown text on cream track
  },
});
