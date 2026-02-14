import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppHeader } from "@/src/components/AppHeader";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/src/components/LanguageSelector";

const AdminScreen = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t("admin.menu.addPoonam.title"),
      icon: "calendar-plus",
      route: "/(user)/(others)/add-poonam" as const,
      description: t("admin.menu.addPoonam.description"),
    },
    {
      title: t("admin.menu.addAnnouncement.title"),
      icon: "bullhorn",
      route: "/(user)/(others)/add-announcement" as const,
      description: t("admin.menu.addAnnouncement.description"),
    },
    {
      title: t("admin.menu.addGallery.title"),
      icon: "image-multiple",
      route: "/(user)/(others)/add-gallery" as const,
      description: t("admin.menu.addGallery.description"),
    },
    {
      title: t("admin.menu.addDonation.title"),
      icon: "hand-coin",
      route: "/(user)/(others)/add-donation" as const,
      description: t("admin.menu.addDonation.description"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={t("admin.title")} rightAction={<LanguageSelector />} />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color="#EA580C"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#431407",
    marginBottom: 24,
    marginTop: 10,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#431407",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#78716C",
  },
});
