import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground,
} from "react-native";
import { COLORS } from "../../src/constants/colors";
import { FONTS } from "../../src/constants/fonts";
import { useAuthStore } from "../../src/stores/authStore";
import { AppHeader } from "@/src/components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated";

const HomeScreen = () => {
  const { user, logout } = useAuthStore();

  const QuickAction = ({ icon, label, mdi = false, delay = 0 }: any) => (
    <Animated.View entering={FadeInUp.delay(delay).duration(600)}>
      <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
        <LinearGradient
          colors={["#FFFFFF", "#FFF7ED"]}
          style={styles.iconCircle}
        >
          {mdi ? (
            <MaterialCommunityIcons name={icon} size={26} color="#EA580C" />
          ) : (
            <Ionicons name={icon} size={26} color="#EA580C" />
          )}
        </LinearGradient>
        <Text style={styles.actionLabel}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <AppHeader
        title="Jai Jinendra"
        subtitle={user?.firstname || "Devotee"}
        rightAction={
          <TouchableOpacity style={styles.notiButton} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={22} color="#431407" />
            <View style={styles.badge} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION: LIVE DARSHAN */}
        <Animated.View entering={FadeInUp.duration(800)}>
          <TouchableOpacity style={styles.banner} activeOpacity={0.9}>
            <LinearGradient
              colors={["#9A3412", "#EA580C", "#F59E0B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerOverlay}>
                <View style={{}}>
                  <View style={styles.liveContainer}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE NOW</Text>
                  </View>

                  <Text style={styles.bannerTitle}>Daily Darshan</Text>
                  <Text style={styles.bannerSubtitle}>
                    Experience the divine Mangala Darshan from the Main Temple.
                  </Text>

                  <TouchableOpacity style={styles.glassButton}>
                    <Text style={styles.viewButtonText}>View Blessings</Text>
                    <Ionicons name="play-circle" size={18} color="#EA580C" />
                  </TouchableOpacity>
                </View>

                {/* Symbolic Watermark */}
                <MaterialCommunityIcons
                  name="flower-tulip-outline"
                  size={140}
                  color="rgba(255,255,255,0.15)"
                  style={styles.watermarkIcon}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* SERVICES SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mandir Services</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need for your Sadhana
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          <QuickAction icon="calendar-outline" label="Panchang" delay={100} />
          <QuickAction icon="heart-outline" label="Donation" delay={200} />
          <QuickAction
            icon="book-open-variant"
            label="Literature"
            mdi
            delay={300}
          />
          <QuickAction icon="hands-pray" label="Seva" mdi delay={400} />
        </View>

        {/* TIMING CARD (DYNAMIC) */}
        <LinearGradient
          colors={["#431407", "#7C2D12"]}
          style={styles.timingCard}
        >
          <View>
            <Text style={styles.timingLabel}>Next Event</Text>
            <Text style={styles.timingTitle}>Evening Sandhya Aarti</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>07:00 PM</Text>
          </View>
        </LinearGradient>

        {/* ANNOUNCEMENTS SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What's New</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInRight.delay(500)}>
          <TouchableOpacity style={styles.announcementCard}>
            <View style={styles.announcementIcon}>
              <LinearGradient
                colors={["#FFEDD5", "#FED7AA"]}
                style={styles.iconInnerGradient}
              >
                <Ionicons name="megaphone" size={22} color="#EA580C" />
              </LinearGradient>
            </View>
            <View style={styles.announcementInfo}>
              <Text style={styles.announcementTitle}>
                Paryushan Mahaparva 2026
              </Text>
              <Text style={styles.announcementDesc}>
                8 days of spiritual purification starts Aug 15.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1", // More subtle cream
  },
  notiButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EA580C",
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  /* BANNER STYLES */
  banner: {
    height: 200,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 30,
    elevation: 8,
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  bannerGradient: {
    flex: 1,
  },
  bannerOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  liveContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
    marginRight: 6,
  },
  liveText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    marginBottom: 20,
    width: "75%",
  },
  glassButton: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#EA580C",
    fontWeight: "800",
    fontSize: 13,
  },
  watermarkIcon: {
    position: "absolute",
    right: -20,
    bottom: -30,
  },
  /* GRID STYLES */
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#431407",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionCard: {
    alignItems: "center",
    width: 75,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FED7AA",
    elevation: 3,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7C2D12",
    textAlign: "center",
  },
  /* TIMING CARD */
  timingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    marginBottom: 30,
  },
  timingLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  timingTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  timeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  timeText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 15,
  },
  /* ANNOUNCEMENT */
  announcementCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  announcementIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 16,
  },
  iconInnerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#431407",
  },
  announcementDesc: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#EA580C",
    position: "absolute",
    right: 0,
    bottom: 5,
  },
});
