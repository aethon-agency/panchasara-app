import React, { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  interpolateColor,
  Extrapolation,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

interface SwipeButtonProps {
  onSwipeComplete: () => void;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  height?: number;
  width?: number;
  borderRadius?: number;
}

const { width: DEFAULT_WIDTH } = Dimensions.get("window");
const DEFAULT_BUTTON_HEIGHT = 64;
const PADDING = 6;

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export const SwipeButton: React.FC<SwipeButtonProps> = ({
  onSwipeComplete,
  label = "Slide to Login",
  loading = false,
  disabled = false,
  height = DEFAULT_BUTTON_HEIGHT,
  width: customWidth,
  borderRadius,
}) => {
  const containerWidth = customWidth || DEFAULT_WIDTH - 52;
  const containerRadius = borderRadius ?? height / 2;
  const innerRadius = Math.max(0, containerRadius - PADDING);

  const HANDLE_SIZE = height - PADDING * 2;
  const MAX_TRANSLATE_X = containerWidth - HANDLE_SIZE - PADDING * 2;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isComplete = useSharedValue(false);
  const loadingRotation = useSharedValue(0);
  const shimmerValue = useSharedValue(0);

  // Label Shimmer Animation - flows opacity through the text
  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(shimmerValue);
  }, []);

  const handleComplete = () => {
    isComplete.value = true;
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    onSwipeComplete();
  };

  const gesture = Gesture.Pan()
    .enabled(!disabled && !loading)
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      if (isComplete.value) return;

      const newX = Math.max(
        0,
        Math.min(startX.value + event.translationX, MAX_TRANSLATE_X),
      );

      // Haptic feedback feedback when crossing thresholds
      if (Platform.OS !== "web") {
        const prevProgress = translateX.value / MAX_TRANSLATE_X;
        const currentProgress = newX / MAX_TRANSLATE_X;
        if (Math.floor(prevProgress * 5) !== Math.floor(currentProgress * 5)) {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }

      translateX.value = newX;
    })
    .onEnd(() => {
      if (isComplete.value) return;

      if (translateX.value > MAX_TRANSLATE_X * 0.8) {
        translateX.value = withSpring(MAX_TRANSLATE_X, {
          damping: 20,
          stiffness: 90,
        });
        runOnJS(handleComplete)();
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    });

  // Handle Styling - Premium Saffron to Golden
  const animatedHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    shadowColor: interpolateColor(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      ["#EA580C", "#F59E0B"],
    ),
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: translateX.value + HANDLE_SIZE,
    opacity: interpolate(
      translateX.value,
      [0, 20],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // No translation to ensure perfect overlap during the swipe
  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -PADDING / 2 }],
  }));

  const animatedIconStyle = useAnimatedStyle(() => {
    // Subtle nudge animation tied to shimmer or independent
    const nudge = interpolate(
      shimmerValue.value,
      [0, 0.8, 1],
      [0, 6, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value === 0 ? nudge : 0 },
        { scale: translateX.value === 0 ? 1.05 : 1 },
      ],
    };
  });

  const animatedLoadingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${loadingRotation.value}deg` }],
  }));

  useEffect(() => {
    if (loading) {
      loadingRotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
      );
    } else {
      loadingRotation.value = 0;
    }

    if (!loading && isComplete.value) {
      translateX.value = withTiming(0);
      isComplete.value = false;
    }
  }, [loading]);

  return (
    <View
      style={[
        styles.container,
        { height, width: containerWidth, borderRadius: containerRadius },
        disabled && styles.disabled,
      ]}
    >
      {/* Elegant Label (Background) */}
      <View style={[styles.labelContainer, { width: containerWidth }]}>
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </View>

      {/* Background Track with opaque white reveal label */}
      <View style={styles.track}>
        <AnimatedGradient
          colors={["#FDBA74", "#EA580C"]} // Opaque colors to hide background text
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progress,
            animatedProgressStyle,
            { borderRadius: innerRadius, overflow: "hidden" },
          ]}
        >
          {/* Offset back by PADDING to align with global center */}
          <View
            style={[
              styles.labelContainer,
              { width: containerWidth, left: -PADDING },
            ]}
          >
            <Animated.Text
              style={[styles.label, animatedTextStyle, { color: "#FFF" }]}
            >
              {label}
            </Animated.Text>
          </View>
        </AnimatedGradient>
      </View>

      {/* The Handle / Swipeable element */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.handle,
            {
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              borderRadius: innerRadius,
            },
            animatedHandleStyle,
          ]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.4)", "transparent"]}
            style={[styles.gradientOverlay, { borderRadius: innerRadius }]}
          />
          {loading ? (
            <Animated.View style={animatedLoadingStyle}>
              <MaterialCommunityIcons name="loading" size={30} color="#FFF" />
            </Animated.View>
          ) : (
            <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={28}
                color="#FFF"
              />
            </Animated.View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF3C7", // Hard Chandan/Antique Cream
    borderRadius: 40,
    justifyContent: "center",
    padding: PADDING,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#FDE68A", // Golden tint border
    ...Platform.select({
      ios: {
        shadowColor: "#92400E",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    padding: PADDING - 2,
  },
  progress: {
    height: "100%",
  },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "900",
    color: "#9A3412", // Rich Deep Saffron
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: -2,
  },
  handle: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.4,
  },
});
