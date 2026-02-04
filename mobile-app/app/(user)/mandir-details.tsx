import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function MandirDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader
        title="Shree Panchasara Parivar"
        subtitle="About Our Mandir"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <MaterialCommunityIcons
              name="temple-buddhist"
              size={60}
              color="#EA580C"
            />
            <Text style={styles.imgText}>Mandir Image</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>History & Significance</Text>
          <Text style={styles.paragraph}>
            The Shree Panchasara Parivar Mandir stands as a beacon of faith and
            unity for our community. Established with the blessings of our
            ancestors, it serves as the spiritual center for all religious
            activities, festivals, and community gatherings.
          </Text>
          <Text style={styles.paragraph}>
            Dedicated to Maa Bhavani, the mandir hosts daily Aarti, monthly
            Poonam gatherings, and grand celebrations during Navratri and other
            auspicious occasions.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Schedule</Text>

          <View style={styles.scheduleItem}>
            <Ionicons name="sunny-outline" size={20} color="#EA580C" />
            <View style={styles.scheduleText}>
              <Text style={styles.timeLabel}>Mangala Aarti</Text>
              <Text style={styles.timeValue}>06:00 AM</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.scheduleItem}>
            <Ionicons name="moon-outline" size={20} color="#431407" />
            <View style={styles.scheduleText}>
              <Text style={styles.timeLabel}>Sandhya Aarti</Text>
              <Text style={styles.timeValue}>07:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visiting Hours</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Morning:</Text>
            <Text style={styles.value}>05:30 AM - 12:00 PM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Evening:</Text>
            <Text style={styles.value}>04:00 PM - 09:00 PM</Text>
          </View>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    elevation: 2,
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imgText: {
    color: "#9A3412",
    fontWeight: "600",
  },
  infoSection: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#EA580C",
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  scheduleText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#431407",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#9A3412",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
    marginLeft: 35,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },
  value: {
    fontSize: 15,
    color: "#431407",
    fontWeight: "700",
  },
});
