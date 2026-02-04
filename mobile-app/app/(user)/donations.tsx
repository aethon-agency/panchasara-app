import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

// Mock Data
const DONATIONS = [
  {
    id: "1",
    amount: "₹5,001",
    date: "12 Mar 2026",
    purpose: "Poonam Bhojan Prasad",
    receiptNo: "RCP-2026-045",
  },
  {
    id: "2",
    amount: "₹1,100",
    date: "20 Feb 2026",
    purpose: "General Donation",
    receiptNo: "RCP-2026-012",
  },
  {
    id: "3",
    amount: "₹501",
    date: "01 Jan 2026",
    purpose: "Aarti Seva",
    receiptNo: "RCP-2026-003",
  },
];

export default function DonationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader
        title="My Donations"
        subtitle="Receipts & History"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {DONATIONS.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInUp.delay(index * 100).duration(500)}
            style={styles.cardContainer}
          >
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <LinearGradient
                colors={["#FFFFFF", "#FFF7ED"]}
                style={styles.cardGradient}
              >
                <View style={styles.row}>
                  <View>
                    <Text style={styles.purpose}>{item.purpose}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                  <Text style={styles.amount}>{item.amount}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.footerRow}>
                  <Text style={styles.receipt}>No: {item.receiptNo}</Text>
                  <View style={styles.downloadBtn}>
                    <Text style={styles.downloadText}>View Receipt</Text>
                    <Ionicons
                      name="document-text-outline"
                      size={14}
                      color="#EA580C"
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Showing last 3 donations. Specific donation history integration
            coming soon.
          </Text>
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
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    overflow: "hidden",
  },
  cardGradient: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  purpose: {
    fontSize: 16,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  amount: {
    fontSize: 18,
    fontWeight: "900",
    color: "#EA580C",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFEDD5",
    marginVertical: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receipt: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    fontSize: 12,
    color: "#EA580C",
    fontWeight: "700",
  },
  placeholderContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
});
