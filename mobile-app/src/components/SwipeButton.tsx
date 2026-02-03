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
}) => {
  const containerWidth = customWidth || DEFAULT_WIDTH - 60;
  const HANDLE_SIZE = height - PADDING * 2 - 2;
  const MAX_TRANSLATE_X = containerWidth - HANDLE_SIZE - PADDING * 2;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isComplete = useSharedValue(false);
  const loadingRotation = useSharedValue(0);
  const shimmerValue = useSharedValue(0);

  // Label Shimmer Animation
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
    backgroundColor: interpolateColor(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      ["#EA580C", "#F59E0B"], // Shifts from Bright Saffron to Warm Amber/Golden
    ),
    shadowColor: interpolateColor(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      ["#EA580C", "#F59E0B"],
    ),
  }));

  // Progress Bar Gradient Styling
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: translateX.value + HANDLE_SIZE + PADDING,
    opacity: interpolate(
      translateX.value,
      [0, 20],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // Shimmer Text Styling
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X / 2],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [0, MAX_TRANSLATE_X],
            [0, 30],
          ),
        },
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
        { height, width: containerWidth },
        disabled && styles.disabled,
      ]}
    >
      {/* Background Track with inner glow effect */}
      <View style={styles.track}>
        <AnimatedGradient
          colors={["rgba(253, 186, 116, 0.3)", "rgba(234, 88, 12, 0.6)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progress, animatedProgressStyle]}
        />
      </View>

      {/* Elegant Label */}
      <View style={styles.labelContainer}>
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </View>

      {/* The Handle / Swipeable element */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.handle,
            { width: HANDLE_SIZE, height: HANDLE_SIZE },
            animatedHandleStyle,
          ]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.4)", "transparent"]}
            style={styles.gradientOverlay}
          />
          {loading ? (
            <Animated.View style={animatedLoadingStyle}>
              <MaterialCommunityIcons name="loading" size={30} color="#FFF" />
            </Animated.View>
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={34}
                color="#FFF"
              />
            </View>
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
    paddingVertical: 4,
  },
  progress: {
    height: "100%",
    borderRadius: 30,
  },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40, // Offset for the thumb
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#9A3412", // Rich Deep Saffron
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: -2,
  },
  handle: {
    borderRadius: 35,
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
        elevation: 10,
      },
    }),
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
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
