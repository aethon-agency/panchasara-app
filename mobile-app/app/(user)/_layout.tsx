import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
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

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const TAB_WIDTH = width / 4;

  // Shared value for the sliding background indicator
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 120,
    });
  }, [state.index, TAB_WIDTH]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      <BlurView
        intensity={Platform.OS === "ios" ? 80 : 100}
        tint="light"
        style={styles.blurWrapper}
      >
        {/* Sliding Indicator Pill */}
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
            const label =
              options.title !== undefined ? options.title : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                if (Platform.OS !== "web")
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate(route.name);
              }
            };

            const renderIcon = () => {
              const color = isFocused ? "#EA580C" : "#64748B";

              if (route.name === "home")
                return (
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    size={22}
                    color={color}
                  />
                );

              if (route.name === "darshan")
                return (
                  <MaterialCommunityIcons
                    name="flower-tulip"
                    size={26}
                    color={color}
                  />
                );

              if (route.name === "donation")
                return (
                  <Ionicons
                    name={isFocused ? "heart" : "heart-outline"}
                    size={22}
                    color={color}
                  />
                );
              if (route.name === "profile")
                return (
                  <Ionicons
                    name={isFocused ? "person" : "person-outline"}
                    size={22}
                    color={color}
                  />
                );
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={1}
              >
                <Animated.View
                  style={useAnimatedStyle(() => ({
                    transform: [
                      { scale: isFocused ? withSpring(1.15) : withSpring(1) },
                    ],
                  }))}
                >
                  {renderIcon()}
                </Animated.View>
                {isFocused && (
                  <Animated.Text style={styles.label}>{label}</Animated.Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
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
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  blurWrapper: {
    height: 65,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  mainBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingIndicator: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorPill: {
    width: 50,
    height: 45,
    borderRadius: 16,
    backgroundColor: "rgba(234, 88, 12, 0.08)",
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: "#EA580C",
    textTransform: "uppercase",
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
