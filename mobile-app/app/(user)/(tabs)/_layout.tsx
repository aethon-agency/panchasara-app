import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "@/src/hooks/useLanguage";

const { width } = Dimensions.get("window");

const renderIcon = (routeName: string, focused: boolean) => {
  const color = focused ? "#431407" : "#9CA3AF";
  const size = 22;

  switch (routeName) {
    case "home":
      return (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={size}
          color={color}
        />
      );
    case "event":
      return (
        <MaterialCommunityIcons
          name={focused ? "calendar" : "calendar-blank"}
          size={size}
          color={color}
        />
      );
    case "explore":
      return (
        <Ionicons
          name={focused ? "compass" : "compass-outline"}
          size={size}
          color={color}
        />
      );
    case "profile":
      return (
        <FontAwesome
          name={focused ? "user" : "user-o"}
          size={size}
          color={color}
        />
      );
    default:
      return <Ionicons name="help-circle-outline" size={size} color={color} />;
  }
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  // Layout Constants
  const numTabs = state.routes.length;
  const TAB_BAR_MARGIN = 20; // Total horizontal padding for the main box
  const tabWidth = (width - TAB_BAR_MARGIN) / numTabs;

  // Shared value for the sliding animation
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Move the pill to the current active index
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 60,
      stiffness: 300,
    });
  }, [state.index, tabWidth]);

  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.tabBarWrapper}>
      <View
        style={[styles.innerContainer, { paddingBottom: insets?.bottom || 16 }]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#FFFBEB"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.topBorder} />

        <View style={styles.mainBox}>
          {/* Sliding Background Highlight */}
          <Animated.View
            style={[
              styles.activePill,
              { width: tabWidth - 12 }, // Slight margin inside the pill
              animatedPillStyle,
            ]}
          />

          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const label = descriptors[route.key].options.title ?? route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                if (Platform.OS !== "web")
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={[styles.tabItem, { width: tabWidth }]}
                activeOpacity={1}
              >
                <View style={styles.contentContainer}>
                  {renderIcon(route.name, isFocused)}
                  <Animated.Text
                    style={[
                      styles.label,
                      { color: isFocused ? "#431407" : "#9CA3AF" },
                    ]}
                  >
                    {label}
                  </Animated.Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default function TabsLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: t("tabs.home") }} />
      <Tabs.Screen name="event" options={{ title: t("tabs.events") }} />
      <Tabs.Screen name="explore" options={{ title: t("tabs.explore") }} />
      <Tabs.Screen name="profile" options={{ title: t("tabs.profile") }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  innerContainer: {
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "rgba(253, 230, 138, 0.4)",
    // Shadow/Elevation for modern look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  topBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#FDE68A",
    position: "absolute",
    top: 0,
    opacity: 0.3,
  },
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10, // Must match half of TAB_BAR_MARGIN logic
    position: "relative",
  },
  activePill: {
    position: "absolute",
    height: 56,
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    left: 16, // Manual alignment tweak for the first tab
    borderWidth: 1,
    borderColor: "#FFEDD5",
    zIndex: 0,
  },
  tabItem: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
