import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const EXPLORE_ITEMS = [
  {
    id: "accounts",
    title: "Bank Accounts",
    subtitle: "Donation Details",
    icon: (color: string) => (
      <Ionicons name="card-outline" size={28} color={color} />
    ),
    route: "/accounts",
  },
  {
    id: "donations",
    title: "Donations List",
    subtitle: "View History",
    icon: (color: string) => (
      <Ionicons name="heart-outline" size={28} color={color} />
    ),
    route: "/donations",
  },
  {
    id: "mandir",
    title: "Mandir Details",
    subtitle: "About Temple",
    icon: (color: string) => (
      <MaterialCommunityIcons name="temple-buddhist" size={28} color={color} />
    ),
    route: "/mandir-details",
  },
  {
    id: "contact",
    title: "Contact Details",
    subtitle: "Get in Touch",
    icon: (color: string) => (
      <Ionicons name="call-outline" size={28} color={color} />
    ),
    route: "/contact",
  },
  {
    id: "history",
    title: "Family History",
    subtitle: "Panchasara Lineage",
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="book-open-variant"
        size={28}
        color={color}
      />
    ),
    route: "/history",
  },
];

export default function ExploreScreen() {
  const router = useRouter();

  const handlePress = (item: any) => {
    // Navigate to the respective screen
    router.push(item.route as any);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Explore" subtitle="Discover Activities" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {EXPLORE_ITEMS.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(index * 100).duration(500)}
              style={styles.cardContainer}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlePress(item)}
                style={styles.card}
              >
                <LinearGradient
                  colors={["#FFFFFF", "#FFF7ED"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.iconContainer}>
                    {item.icon("#EA580C")}
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>More features coming soon...</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    overflow: "hidden",
    height: 140,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#9A3412",
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    fontStyle: "italic",
  },
});
