import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function HistoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const sections = [
    "ancient_capital",
    "vanraj_chawda",
    "derasar",
    "lineage",
    "bhaduka",
    "kuldevi",
  ];

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("history.title")}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={styles.quoteBox}
        >
          <MaterialCommunityIcons
            name="format-quote-open"
            size={30}
            color="#FDE68A"
            style={styles.quoteIcon}
          />
          <Text style={styles.quoteText}>{t("history.quote")}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(100).duration(600)}
          style={styles.introSection}
        >
          <Text style={styles.paragraph}>
            {t("history.sections.intro.text")}
          </Text>
        </Animated.View>

        {sections.map((sectionKey, index) => (
          <Animated.View
            key={sectionKey}
            entering={FadeInUp.delay(200 + index * 100).duration(600)}
            style={styles.section}
          >
            <Text style={styles.title}>
              {t(`history.sections.${sectionKey}.title`)}
            </Text>
            <Text style={styles.paragraph}>
              {t(`history.sections.${sectionKey}.text`)}
            </Text>
          </Animated.View>
        ))}

        <Text style={styles.footer}>
          This history is a living document, constantly enriched by the stories
          of our elders.
        </Text>
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
    padding: 24,
    paddingBottom: 40,
  },
  quoteBox: {
    backgroundColor: "#431407",
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
    position: "relative",
    alignItems: "center",
  },
  quoteIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    opacity: 0.5,
  },
  quoteText: {
    color: "#FDE68A",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "600",
  },
  introSection: {
    marginBottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#9A3412",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 26,
    textAlign: "justify",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
});
