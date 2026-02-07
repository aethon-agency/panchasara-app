import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Share,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "@/src/hooks/useLanguage";

import { ALL_ANNOUNCEMENTS } from "@/src/constants/data";
import { callPhoneNumber } from "@/src/utils/functions";

interface AnnouncementParams {
  id?: string;
}

export default function AnnouncementDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const params = useLocalSearchParams() as unknown as AnnouncementParams;
  const { id } = params;

  const announcement = ALL_ANNOUNCEMENTS.find((a) => a.id === id);

  const {
    title = announcement?.title || "Paryushan Mahaparva 2026",
    description = announcement?.description ||
      "Join us for the 8 days of spiritual purification...",
    contactNumber = announcement?.contactNumber,
  } = (announcement || {}) as any;

  const handleCall = async () => {
    if (contactNumber) {
      callPhoneNumber(contactNumber);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}\n\n- Jai Mataji`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <AppHeader
        title={t("announcementDetails.title")}
        subtitle={t("announcementDetails.subtitle")}
        showBack={true}
        onBack={() => router.back()}
        rightAction={
          <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
            <Ionicons name="share-outline" size={22} color="#EA580C" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          {/* Header Section */}
          <LinearGradient
            colors={["#FFF7ED", "#FFFFFF"]}
            style={styles.headerGradient}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="bullhorn-variant"
                size={20}
                color="#EA580C"
              />
            </View>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </LinearGradient>

          <View style={styles.divider} />

          {/* Content Section */}
          <View style={styles.body}>
            <Text style={styles.description}>{description}</Text>
          </View>

          {contactNumber && (
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={handleCall}
            >
              <Ionicons name="call-outline" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Contact for Details</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("common.jaiMataji")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF9",
  },
  shareBtn: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#431407",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerGradient: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  badge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#431407",
    textAlign: "center",
    lineHeight: 32,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 24,
  },
  body: {
    padding: 24,
  },
  description: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 28,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9A3412",
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#9A3412",
    fontWeight: "600",
  },
});
