import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "@/src/hooks/useLanguage";
import { EXPLORE_ITEMS } from "@/src/constants/data";
import { LanguageSelector } from "@/src/components/LanguageSelector";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function ExploreScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const handlePress = (item: any) => {
    // Navigate to the respective screen
    router.push(item.route as any);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("explore.title")}
        subtitle={t("explore.subtitle")}
        rightAction={<LanguageSelector />}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {EXPLORE_ITEMS.map((item, index) => (
            <View key={item.id} style={styles.cardContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlePress(item)}
                style={styles.card}
              >
                <LinearGradient
                  colors={["#FFFFFF", "#FFF7ED"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.iconContainer}>
                    {item.icon("#EA580C")}
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {t(item?.title)}
                  </Text>
                  <Text style={styles.cardSubtitle}>{t(item?.subtitle)}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("common.comingSoon")}</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    overflow: "hidden",
    height: 140,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#9A3412",
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    fontStyle: "italic",
  },
});
