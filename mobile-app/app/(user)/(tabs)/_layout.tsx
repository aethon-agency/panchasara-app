import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
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
import { useLanguage } from "@/src/hooks/useLanguage";

const renderIcon = (routeName: string, focused: boolean) => {
  const color = focused ? "#431407" : "#9CA3AF";

  switch (routeName) {
    case "home":
      return (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={24}
          color={color}
        />
      );
    case "event":
      return (
        <MaterialCommunityIcons
          name={focused ? "calendar" : "calendar-blank"}
          size={24}
          color={color}
        />
      );
    case "explore":
      return (
        <Ionicons
          name={focused ? "compass" : "compass-outline"}
          size={24}
          color={color}
        />
      );
    case "profile":
      return (
        <FontAwesome
          name={focused ? "user" : "user-o"}
          size={24}
          color={color}
        />
      );
    default:
      return <Ionicons name="help-circle-outline" size={24} color={color} />;
  }
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarWrapper]}>
      <View
        style={[styles.innerContainer, { paddingBottom: insets?.bottom || 20 }]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#FFFBEB"]}
          style={StyleSheet.absoluteFill}
        />

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
                  layout={LinearTransition.springify()
                    .damping(20)
                    .stiffness(150)}
                  style={[
                    styles.contentContainer,
                    isFocused && styles.activeContentContainer,
                  ]}
                >
                  {renderIcon(route.name, isFocused)}
                  {isFocused && (
                    <Animated.Text
                      entering={FadeIn.delay(50)}
                      exiting={FadeOut.duration(50)}
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
    </View>
  );
};

export default function TabsLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
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
    alignItems: "center",
    backgroundColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  innerContainer: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    paddingTop: 10,
    borderWidth: 0.5,
    borderColor: "rgba(253, 230, 138, 0.5)", // FDE68A with opacity
  },
  topBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#FDE68A",
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
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
    color: "#431407",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
});
