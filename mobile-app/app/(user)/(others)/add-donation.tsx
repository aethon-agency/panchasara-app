import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AddDonationScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("admin.menu.addDonation.title")}
        showBack
        onBack={() => router.back()}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{t("common.comingSoon")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#431407",
    fontWeight: "600",
  },
});
