import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useAuthStore } from "../../../src/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "@/src/hooks/useLanguage";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useToast } from "@/src/contexts/ToastProvider";

interface MenuItemData {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  route?: string;
  type?: "toggle" | "value" | "link";
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

interface MenuSectionData {
  title: string;
  items: MenuItemData[];
}

const ProfileCard = ({
  user,
  t,
}: {
  user: any;
  t: (key: string) => string;
}) => (
  <View style={styles.profileCardWrapper}>
    <LinearGradient colors={["#FFFFFF", "#FFF7ED"]} style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarInitials}>
            {user?.firstname ? user?.firstname?.[0] : "U"}
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.firstname ? user?.firstname + " " + user?.lastname : "User"}
          </Text>
          {user?.mobilenumber && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={styles.profilePhone}>+91 {user?.mobilenumber}</Text>
              <Ionicons name="checkmark-circle" size={16} color="#EA580C" />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  </View>
);

const MenuSection = ({
  section,
  router,
}: {
  section: MenuSectionData;
  router: Router;
  isLastSection: boolean;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
    <View style={styles.sectionContent}>
      {section.items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.menuItem,
            idx === section.items.length - 1 && styles.lastMenuItem,
          ]}
          onPress={() => {
            if (item.type === "toggle" && item.onValueChange) {
              item.onValueChange(!item.value);
            } else if (item.route) {
              router.push(item.route as any);
            }
          }}
          activeOpacity={item.type === "toggle" ? 1 : 0.7}
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

          {item.type === "toggle" ? (
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: "#CBD5E1", true: "#FED7AA" }}
              thumbColor={item.value ? "#EA580C" : "#F1F5F9"}
              ios_backgroundColor="#CBD5E1"
            />
          ) : (
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const LogoutButton = ({
  onPress,
  label,
}: {
  onPress: () => void;
  label: string;
}) => (
  <TouchableOpacity
    style={styles.logoutButton}
    onPress={onPress}
    // activeOpacity={0.8}
  >
    <Ionicons name="log-out-outline" size={20} color="#EF4444" />
    <Text style={styles.logoutText}>{label}</Text>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { t } = useLanguage();
  const toast = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    toast.success(value ? "Notifications enabled" : "Notifications disabled");
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => {
      logout();
    }, 500);
  };

  const menuItems: MenuSectionData[] = [
    {
      title: t("profile.sections.personalInfo"),
      items: [
        {
          icon: "person-outline",
          label: t("profile.menu.myDetails.label"),
          subtitle: t("profile.menu.myDetails.subtitle"),
          route: "/(user)/(others)/profile-details",
        },
      ],
    },
    {
      title: t("profile.sections.appSettings"),
      items: [
        {
          icon: "notifications-outline",
          label: t("profile.menu.notifications.label"),
          subtitle: t("profile.menu.notifications.subtitle"),
          type: "toggle",
          value: notificationsEnabled,
          onValueChange: toggleNotifications,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("profile.title")}
        subtitle={t("profile.subtitle")}
        rightAction={<LanguageSelector />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileCard user={user} t={t} />

        {menuItems.map((section, index) => (
          <MenuSection
            key={index}
            section={section}
            router={router}
            isLastSection={index === menuItems.length - 1}
          />
        ))}

        <LogoutButton onPress={handleLogout} label={t("common.logoutButton")} />

        <Text style={styles.versionText}>{t("profile.version")}</Text>
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
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
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
    width: 60,
    height: 60,
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
  },
  profilePhone: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "600",
    alignItems: "center",
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
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    gap: 8,
    marginBottom: 24,
  },
  logoutText: {
    color: "#FFF",
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
