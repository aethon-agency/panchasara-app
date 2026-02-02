import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../src/constants/colors";
import { FONTS } from "../../src/constants/fonts";
import { useAuthStore } from "../../src/stores/authStore";

const HomeScreen = () => {
  const { user, logout } = useAuthStore();

  const QuickAction = ({ icon, label, color, mdi = false }: any) => (
    <TouchableOpacity style={styles.actionCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        {mdi ? (
          <MaterialCommunityIcons name={icon} size={28} color={color} />
        ) : (
          <Ionicons name={icon} size={28} color={color} />
        )}
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Jai Jinendra,</Text>
          <Text style={styles.userName}>{user?.firstname || "Devotee"}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={logout}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.textPrimary}
          />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Daily Darshan Banner */}
        <TouchableOpacity style={styles.banner}>
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Daily Darshan</Text>
            <Text style={styles.bannerSubtitle}>
              View today's mangala darshan
            </Text>
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Photo</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Mandir Services</Text>
        <View style={styles.actionsGrid}>
          <QuickAction icon="calendar" label="Panchang" color="#FF8C00" />
          <QuickAction icon="heart" label="Donation" color="#E91E63" />
          <QuickAction
            icon="book-open-variant"
            label="Literature"
            color="#4CAF50"
            mdi
          />
          <QuickAction icon="hand-heart" label="Seva" color="#2196F3" mdi />
        </View>

        {/* Announcements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.announcementCard}>
          <View style={styles.announcementIcon}>
            <Ionicons name="megaphone" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.announcementInfo}>
            <Text style={styles.announcementTitle}>
              Paryushan Mahaparva 2026
            </Text>
            <Text style={styles.announcementDesc}>
              Join us for the 8 days of spiritual purification starting Aug 15.
            </Text>
          </View>
        </View>

        <View style={[styles.announcementCard, { marginTop: 12 }]}>
          <View
            style={[
              styles.announcementIcon,
              { backgroundColor: COLORS.secondary + "20" },
            ]}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={COLORS.secondaryDark}
            />
          </View>
          <View style={styles.announcementInfo}>
            <Text style={styles.announcementTitle}>Evening Aarti Timing</Text>
            <Text style={styles.announcementDesc}>
              Aarti will be performed at 7:00 PM tonight.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 22,
    fontFamily: FONTS.INTER_700,
    color: COLORS.textPrimary,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    borderWidth: 2,
    borderColor: COLORS.backgroundPrimary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  banner: {
    height: 180,
    backgroundColor: COLORS.onboarding.illustrationBackground2,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  bannerOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontFamily: FONTS.INTER_700,
    color: COLORS.primaryDark,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.INTER_600,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.INTER_700,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 24,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: FONTS.INTER_600,
    color: COLORS.primary,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "47%",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 15,
    fontFamily: FONTS.INTER_600,
    color: COLORS.textPrimary,
  },
  announcementCard: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundSecondary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  announcementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontFamily: FONTS.INTER_600,
    color: COLORS.textPrimary,
  },
  announcementDesc: {
    fontSize: 13,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
