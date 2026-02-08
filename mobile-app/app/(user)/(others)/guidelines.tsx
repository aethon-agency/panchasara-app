import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function GuidelinesScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const sectionKeys = ["general", "etiquette", "safety"] as const;
  const icons = {
    general: "information-circle-outline",
    etiquette: "body-outline",
    safety: "shield-checkmark-outline",
  };

  const sections = sectionKeys.map((key) => ({
    title: t(`explore.guidelines.sections.${key}.title`),
    icon: icons[key],
    items: t(`explore.guidelines.sections.${key}.rules`, {
      returnObjects: true,
    }) as string[],
  }));

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("explore.guidelines.title")}
        subtitle={t("explore.guidelines.subtitle")}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introSection}>
          <MaterialCommunityIcons
            name="book-open-variant"
            size={40}
            color="#EA580C"
          />
          <Text style={styles.introText}>{t("explore.guidelines.intro")}</Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon as any} size={24} color="#EA580C" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.itemsContainer}>
              {Array.isArray(section.items) &&
                section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.itemRow}>
                    <View style={styles.bullet} />
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t("explore.guidelines.footer")}
          </Text>
          <Text style={styles.jaiMataji}>— जय माताजी —</Text>
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
  introSection: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#FFF7ED",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  introText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "500",
  },
  sectionCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
  },
  itemsContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: "row",
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EA580C",
    marginTop: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 8,
  },
  jaiMataji: {
    fontSize: 16,
    fontWeight: "800",
    color: "#EA580C",
    marginTop: 8,
  },
});
