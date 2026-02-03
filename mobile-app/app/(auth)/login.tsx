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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { useLanguage } from "@/src/hooks/useLanguage";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (activeTab === "login") {
      if (phoneNumber.length < 10) return;
    } else {
      if (!firstName || !lastName || phoneNumber.length < 10) return;
    }

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/otp");
    }, 1500);
  };

  const isFormValid =
    activeTab === "login"
      ? phoneNumber.length === 10
      : firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        phoneNumber.length === 10;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topHalo, { top: -width * 0.3 }]} />

      <View style={styles.topSection}>
        <View style={[styles.languageRow, { top: Math.max(insets.top, 10) }]}>
          <LanguageSelector />
        </View>

        <View style={styles.logoWrapper}>
          <View style={styles.logoHalo}>
            <Image
              source={require("../../assets/images/screen-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* FORM SECTION (WHIT SHEET STYLE) */}
      <View style={styles.formSheet}>
        <View style={styles.sheetContent}>
          {/* TAB SWITCHER */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab("login")}
              style={[styles.tab, activeTab === "login" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "login" && styles.activeTabText,
                ]}
              >
                {t("login.loginTab") ?? "Login"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("register")}
              style={[styles.tab, activeTab === "register" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "register" && styles.activeTabText,
                ]}
              >
                {t("login.registerTab") ?? "Register"}
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.scrollForm,
                { paddingBottom: insets.bottom + 20 },
              ]}
            >
              {activeTab === "register" && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {t("login.firstNameLabel") ?? "First Name"}
                    </Text>
                    <View style={styles.inputField}>
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={20}
                        color="#92400E"
                      />
                      <TextInput
                        placeholder={
                          t("login.firstNameLabel") ?? "Enter first name"
                        }
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.textInput}
                        placeholderTextColor="#A8A29E"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {t("login.lastNameLabel") ?? "Last Name"}
                    </Text>
                    <View style={styles.inputField}>
                      <MaterialCommunityIcons
                        name="account-details-outline"
                        size={20}
                        color="#92400E"
                      />
                      <TextInput
                        placeholder={
                          t("login.lastNameLabel") ?? "Enter last name"
                        }
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.textInput}
                        placeholderTextColor="#A8A29E"
                      />
                    </View>
                  </View>
                </>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {t("login.mobileTitle") ?? "Mobile Number"}
                </Text>
                <View style={styles.inputField}>
                  <View style={styles.phonePrefix}>
                    <Text style={styles.prefixText}>🇮🇳 +91</Text>
                    <View style={styles.verticalDivider} />
                  </View>
                  <TextInput
                    placeholder={t("login.mobilePlaceholder") ?? "00000 00000"}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={[styles.textInput, { letterSpacing: 1 }]}
                    placeholderTextColor="#A8A29E"
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton
                  label={
                    loading
                      ? t("login.sendingOtp")
                      : (t("login.cta") ?? "Get OTP")
                  }
                  onPress={handleSendOTP}
                  loading={loading}
                  disabled={!isFormValid}
                  icon="arrow-right"
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {t("login.footerText") ??
                    "Secure portal for Panchasara Parivar members 🪔"}
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalo: {
    position: "absolute",
    left: -width * 0.1,
    width: width * 1.2,
    height: width * 0.7,
    backgroundColor: "rgba(251, 191, 36, 0.25)",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
  },
  topSection: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  languageRow: {
    position: "absolute",
    right: 20,
    zIndex: 10,
  },
  logoWrapper: {
    marginTop: 20,
  },
  logoHalo: {
    // padding: 12,
    borderRadius: 100,
    // backgroundColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "rgba(251, 146, 60, 0.3)",
  },
  logo: {
    width: 180,
    height: 180,
  },
  formSheet: {
    flex: 1,
    backgroundColor: "#FFF7ED", // Match the lightest saffron from background
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 30,
    marginTop: -20,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 28,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(251, 146, 60, 0.08)", // Subtle Saffron instead of Grey
    borderRadius: 20,
    padding: 6,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: "#FFF7ED", // Light saffron highlight instead of white
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#EA580C",
    fontWeight: "800",
  },
  scrollForm: {
    // paddingBottom set dynamically via insets
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#431407",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    height: 60,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  phonePrefix: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefixText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EA580C",
    marginRight: 10,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E5E7EB",
  },
  buttonContainer: {
    marginTop: 10,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
