import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";
import { COLORS } from "@/src/constants/colors";

const LoginScreen = () => {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/otp");
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#7C2D12", "#92400E", "#B91C1C"]} // Richer Deep Red/Burgundy/Gold tones
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <LanguageSelector />

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../../assets/images/screen-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>{t("login.title")}</Text>
            <Text style={styles.subtitle}>{t("login.subtitle")}</Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.label}>{t("login.mobileLabel")}</Text>

            <View style={styles.inputBox}>
              <Text style={styles.prefix}>🇮🇳 +91</Text>

              <TextInput
                placeholder={t("login.mobilePlaceholder")}
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.btn,
                (phoneNumber.length < 10 || loading) && { opacity: 0.7 },
              ]}
              onPress={handleSendOTP}
              disabled={phoneNumber.length < 10 || loading}
            >
              <LinearGradient
                colors={["#B91C1C", "#92400E"]} // Matching logo's red and gold
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {loading ? t("login.sendingOtp") : t("login.cta")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footer}>{t("login.footer")}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 80,
    padding: 10,
  },

  logo: {
    width: 140,
    height: 140,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#FED7AA",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 28,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 20,
    height: 64,
    marginBottom: 28,
  },

  prefix: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 12,
    color: "#B91C1C",
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: "#111827",
    fontWeight: "500",
  },

  btn: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#B91C1C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  btnGradient: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  footer: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    lineHeight: 18,
  },
});
