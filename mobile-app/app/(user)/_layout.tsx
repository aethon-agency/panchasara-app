import React from "react";
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
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BAR_MARGIN = 20;
const TAB_BAR_WIDTH = SCREEN_WIDTH - BAR_MARGIN * 2;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outerContainer, { bottom: insets.bottom || 20 }]}>
      {/* Matches Header Gradient: White to light cream */}
      <LinearGradient
        colors={["#FFFFFF", "#FFFBEB"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Premium Bottom/Top Border to match header style */}
      <View style={styles.topBorder} />

      <View style={styles.mainBox}>
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
              style={styles.tabItem}
              activeOpacity={1}
            >
              <Animated.View
                layout={LinearTransition.springify().damping(20).stiffness(150)}
                style={[
                  styles.contentContainer,
                  isFocused && styles.activeContentContainer,
                ]}
              >
                {renderIcon(route.name, isFocused)}
                {isFocused && (
                  <Animated.Text
                    entering={FadeIn.delay(100)}
                    exiting={FadeOut.duration(100)}
                    style={styles.label}
                  >
                    {label}
                  </Animated.Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const renderIcon = (name: string, isFocused: boolean) => {
  // Deep Brown for active, Saffron-tinted grey for inactive
  const color = isFocused ? "#431407" : "#9A3412";
  const size = 22;

  switch (name) {
    case "home":
      return (
        <Ionicons
          name={isFocused ? "home" : "home-outline"}
          size={size}
          color={color}
        />
      );
    case "darshan":
      return (
        <FontAwesome
          name={isFocused ? "file-text" : "file-text-o"}
          size={24}
          color={color}
        />
      );
    case "donation":
      return (
        <Ionicons
          name={isFocused ? "heart" : "heart-outline"}
          size={size}
          color={color}
        />
      );
    case "profile":
      return (
        <Ionicons
          name={isFocused ? "person" : "person-outline"}
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

export default function UserLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="darshan" options={{ title: "Darshan" }} />
      <Tabs.Screen name="donation" options={{ title: "Sewa" }} />
      <Tabs.Screen name="profile" options={{ title: "Me" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    alignSelf: "center",
    width: TAB_BAR_WIDTH,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#EA580C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  topBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#FDE68A", // Golden tint matching header
    position: "absolute",
    top: 0,
    opacity: 0.5,
  },
  mainBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    minWidth: 48,
    borderRadius: 24,
  },
  activeContentContainer: {
    backgroundColor: "#FFF7ED", // Very light saffron "Halo" matching header iconHalo
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5", // Saffron border
  },
  label: {
    fontSize: 13,
    fontWeight: "900", // Heavy weight to match Header title
    color: "#431407", // Deep brown
    marginLeft: 8,
    letterSpacing: 0.2,
  },
});
