import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLanguage } from "../hooks/useLanguage";
import { COLORS } from "../constants/colors";

const languages = [
  { code: "en", label: "English", sub: "ENG" },
  { code: "gu", label: "ગુજરાતી", sub: "GUJ" },
] as const;

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            activeOpacity={0.7}
            style={[
              styles.button,
              currentLanguage === lang.code && styles.activeButton,
            ]}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text
              style={[
                styles.buttonText,
                currentLanguage === lang.code && styles.activeButtonText,
              ]}
            >
              {lang.label}
            </Text>
            <View
              style={[
                styles.dot,
                currentLanguage === lang.code
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    borderColor: "#FED7AA", // Light gold/orange border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 90,
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E", // Darker gold/brown
  },
  activeButtonText: {
    color: "#B91C1C", // Deep Red for active state
    fontWeight: "800",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  activeDot: {
    backgroundColor: "#B91C1C",
  },
  inactiveDot: {
    backgroundColor: "transparent",
  },
});
