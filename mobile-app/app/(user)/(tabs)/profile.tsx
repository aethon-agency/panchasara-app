import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useAuthStore } from "../../../src/stores/authStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const menuItems = [
    {
      title: "Personal Information",
      items: [
        {
          icon: "person-outline",
          label: "My Details",
          subtitle: "Name, Gotra, Village",
          route: "/(user)/profile/details", // Placeholder
        },
      ],
    },
    {
      title: "Seva & Dharma",
      items: [
        {
          icon: "heart-outline",
          label: "My Donations",
          subtitle: "History of contributions",
          route: "/(user)/donations",
        },
      ],
    },
    {
      title: "App Settings",
      items: [
        {
          icon: "language-outline",
          label: "Language / ભાષા",
          subtitle: "English",
          type: "value",
        },
        {
          icon: "notifications-outline",
          label: "Notifications",
          subtitle: "On",
          type: "toggle",
        },
      ],
    },
  ];

  const renderProfileCard = () => (
    <View style={styles.profileCardWrapper}>
      <LinearGradient
        colors={["#FFFFFF", "#FFF7ED"]}
        style={styles.profileCard}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.profileimage ? (
              <Image
                source={{ uri: user.profileimage }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>
                  {user?.firstname?.[0]}
                  {user?.lastname?.[0]}
                </Text>
              </View>
            )}
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#EA580C" />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstname} {user?.lastname}
            </Text>
            <Text style={styles.profilePhone}>+91 {user?.mobilenumber}</Text>
            <View style={styles.membershipTag}>
              <MaterialCommunityIcons name="crown" size={14} color="#B45309" />
              <Text style={styles.membershipText}>Life Member</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="My Profile" subtitle="Manage your account" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileCard()}

        {menuItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item: any, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.menuItem,
                    idx === section.items.length - 1 && styles.lastMenuItem,
                  ]}
                  onPress={() => (item.route ? router.push(item.route) : null)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconBox}>
                    <Ionicons name={item.icon} size={22} color="#9A3412" />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.subtitle && (
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout from App</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0 • Panchasara Samaj</Text>
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
    padding: 20,
    paddingBottom: 50,
  },
  profileCardWrapper: {
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
    borderRadius: 24,
  },
  profileCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: "700",
    color: "#9A3412",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 8,
  },
  membershipTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  membershipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B45309",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9A3412",
    marginBottom: 12,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    gap: 8,
    marginBottom: 24,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "500",
  },
});
