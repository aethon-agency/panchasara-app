import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useLanguage } from "../hooks/useLanguage";

interface SectionProps {
  title: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  showSeeAll?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  onSeeAll,
  children,
  containerStyle,
  contentStyle,
  showSeeAll = true,
}) => {
  const { t } = useLanguage();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showSeeAll && onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.6}>
            <Text style={styles.seeAll}>{t("home.seeAll")}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#431407",
  },
  seeAll: {
    color: "#EA580C",
    fontWeight: "700",
    fontSize: 14,
  },
});
