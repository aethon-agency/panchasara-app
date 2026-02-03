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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useLanguage } from "@/src/hooks/useLanguage";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) return;

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/otp");
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.topHalo} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.languageRow}>
            <LanguageSelector />
          </View>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoOuterRing}>
                <View style={styles.logoInnerRing}>
                  <Image
                    source={require("../../assets/images/screen-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* MANDIR DESIGN CARD */}
          <View style={styles.mandirCard}>
            {/* The Shikhar/Arch Accent */}
            <View style={styles.cardArch} />

            <View style={styles.cardBody}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>
                  {t("login.mobileTitle") ?? "Enter Mobile Number"}
                </Text>
              </View>

              {/* Enhanced Input Group */}
              <View style={styles.inputContainer}>
                <View style={styles.phoneRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.countryPicker}
                  >
                    <Text style={styles.flag}>🇮🇳</Text>
                    <Text style={styles.countryCode}>+91</Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={16}
                      color="#92400E"
                    />
                  </TouchableOpacity>

                  <View style={styles.inputDivider} />

                  <TextInput
                    placeholder={t("login.mobilePlaceholder") ?? "00000 00000"}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={styles.textInput}
                    placeholderTextColor="#A8A29E"
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.submitBtn,
                  (phoneNumber.length < 10 || loading) && styles.disabledBtn,
                ]}
                onPress={handleSendOTP}
                disabled={phoneNumber.length < 10 || loading}
              >
                <LinearGradient
                  colors={["#EA580C", "#9A3412"]} // Saffron to Vermillion
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>
                    {loading
                      ? t("login.sendingOtp")
                      : (t("login.cta") ?? "Get OTP")}
                  </Text>
                  {!loading && (
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={20}
                      color="#FFF"
                    />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t("login.footerText") ??
                "By continuing, you agree to our Terms and Privacy Policy"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalo: {
    position: "absolute",
    top: -width * 0.3,
    left: -width * 0.1,
    width: width * 1.2,
    height: width * 0.7,
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  languageRow: {
    alignItems: "flex-end",
    marginTop: Platform.OS === "ios" ? 10 : 40,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoOuterRing: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: "rgba(251, 146, 60, 0.15)",
  },
  logoInnerRing: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(251, 146, 60, 0.3)",
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#7C2D12",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9A3412",
    opacity: 0.8,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
  },
  /* MANDIR CARD STYLING */
  mandirCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    shadowColor: "#7C2D12",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  cardArch: {
    height: 6,
    width: "35%",
    backgroundColor: "#F59E0B",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardBody: {
    padding: 24,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  omIcon: {
    marginRight: 8,
    opacity: 0.7,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#431407",
  },
  sheetSubtitle: {
    fontSize: 14,
    color: "#78350F",
    opacity: 0.6,
    lineHeight: 20,
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 4,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E",
  },
  inputDivider: {
    width: 1,
    height: "50%",
    backgroundColor: "#FED7AA",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: "600",
    color: "#431407",
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#B45309",
    fontWeight: "500",
  },
  submitBtn: {
    marginTop: 24,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  btnGradient: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 18,
  },
});
