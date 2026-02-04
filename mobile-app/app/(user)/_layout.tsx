import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const BAR_MARGIN = 20;
const TAB_BAR_WIDTH = width - BAR_MARGIN * 2;

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 150,
  mass: 0.8,
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const numTabs = state.routes.length;
  const TAB_WIDTH = TAB_BAR_WIDTH / numTabs;

  const translateX = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, SPRING_CONFIG);
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.outerContainer, { bottom: insets.bottom || 20 }]}>
      <BlurView intensity={80} tint="light" style={styles.blurWrapper}>
        {/* The Animated Background Pill */}
        <Animated.View
          style={[
            styles.slidingIndicator,
            indicatorStyle,
            { width: TAB_WIDTH },
          ]}
        >
          <View style={styles.indicatorPill} />
        </Animated.View>

        <View style={styles.mainBox}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const options = descriptors[route.key].options;
            const label = options.title ?? route.name;

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
                key={index}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={1}
              >
                <View style={styles.contentContainer}>
                  {renderIcon(route.name, isFocused)}
                  {isFocused && (
                    <Animated.Text
                      entering={undefined} // Add layout animations here if desired
                      style={styles.label}
                    >
                      {label}
                    </Animated.Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const renderIcon = (name: string, isFocused: boolean) => {
  const color = isFocused ? "#EA580C" : "#94a3b8";
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
        <MaterialCommunityIcons name="flower-tulip" size={26} color={color} />
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
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: "rgba(255,255,255,0.7)",
    overflow: "hidden",
  },
  blurWrapper: {
    height: 70,
    flexDirection: "row",
  },
  mainBox: {
    flex: 1,
    flexDirection: "row",
    zIndex: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  slidingIndicator: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  indicatorPill: {
    width: "85%", // Controls how wide the white pill looks relative to the tab
    height: 55,
    borderRadius: 28,
    backgroundColor: "white", // To match your white pill reference
    // Inner shadow or border
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EA580C",
    marginTop: 2,
  },
});
