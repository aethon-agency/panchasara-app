import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { getDonations, Donation } from "@/src/services/donationServices";

export default function DonationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await getDonations();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("donations.title")}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.historyTitle}>{t("donations.historyTitle")}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#EA580C" />
        ) : donations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={48} color="#EA580C" />
            <Text style={styles.emptyText}>{t("donations.emptyState")}</Text>
          </View>
        ) : (
          donations.map((item) => (
            <View key={item.id} style={styles.cardContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                <LinearGradient
                  colors={["#FFFFFF", "#FFF7ED"]}
                  style={styles.cardGradient}
                >
                  {/* Header */}
                  <View style={styles.headerRow}>
                    <View
                      style={[
                        styles.badge,
                        item.type === "item"
                          ? styles.badgeItem
                          : styles.badgeCash,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          item.type === "item"
                            ? styles.badgeTextItem
                            : styles.badgeTextCash,
                        ]}
                      >
                        {t(`donations.types.${item.type}`)}
                      </Text>
                    </View>

                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                  </View>

                  {/* Body */}
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      {/* ✅ MAIN NAME */}
                      <Text style={styles.mainName}>{item.title}</Text>

                      {/* ✅ DONORS */}
                      {item.donor_name && item.donor_name !== item.title && (
                        <Text style={styles.donorName}>
                          {t("donations.by", { donorName: item.donor_name })}
                        </Text>
                      )}
                    </View>

                    {item.type === "cash" ? (
                      <Text style={styles.amount}>₹ {item.amount}</Text>
                    ) : (
                      <View style={styles.itemBox}>
                        <Ionicons
                          name="cube-outline"
                          size={18}
                          color="#7C3AED"
                        />
                        <Text style={styles.itemText}>
                          {item.item_qty} {item.item_name}
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))
        )}
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

  historyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cardContainer: {
    marginBottom: 16,
  },

  card: {
    borderRadius: 16,
    elevation: 2,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    overflow: "hidden",
  },

  cardGradient: {
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeCash: {
    backgroundColor: "#DCFCE7",
  },

  badgeItem: {
    backgroundColor: "#EDE9FE",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "800",
  },

  badgeTextCash: {
    color: "#16A34A",
  },

  badgeTextItem: {
    color: "#7C3AED",
  },

  date: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* ✅ Main name highlight */
  mainName: {
    fontSize: 17,
    fontWeight: "900",
    color: "#431407",
  },

  donorName: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  amount: {
    fontSize: 18,
    fontWeight: "900",
    color: "#EA580C",
  },

  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  itemText: {
    fontWeight: "700",
    color: "#5B21B6",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    borderStyle: "dashed",
  },

  emptyText: {
    fontSize: 14,
    color: "#9A3412",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
  },
});
