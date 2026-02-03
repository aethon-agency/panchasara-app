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
import { CustomInput } from "@/src/components/CustomInput";
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

      {/* LIGHT SAFFRON BACKGROUND */}
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.formSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetContent}>
            {/* MODERN TAB SWITCHER */}
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
                style={[
                  styles.tab,
                  activeTab === "register" && styles.activeTab,
                ]}
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

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[
                styles.scrollForm,
                { paddingBottom: insets.bottom + 60 },
              ]}
            >
              {activeTab === "register" && (
                <>
                  <CustomInput
                    label={t("login.firstNameLabel") ?? "First Name"}
                    icon="account-outline"
                    placeholder={
                      t("login.firstNameLabel") ?? "Enter first name"
                    }
                    value={firstName}
                    onChangeText={setFirstName}
                  />

                  <CustomInput
                    label={t("login.lastNameLabel") ?? "Last Name"}
                    icon="account-details-outline"
                    placeholder={t("login.lastNameLabel") ?? "Enter last name"}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </>
              )}

              <CustomInput
                label={t("login.mobileTitle") ?? "Mobile Number"}
                prefix="🇮🇳 +91"
                placeholder={t("login.mobilePlaceholder") ?? "00000 00000"}
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={{ letterSpacing: 1.5 }}
              />

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
                  height={54}
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {t("login.footerText") ??
                    "Secure portal for Panchasara Parivar members 🪔"}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    borderRadius: 100,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "rgba(251, 146, 60, 0.3)",
    ...Platform.select({
      ios: {
        shadowColor: "#EA580C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo: {
    width: 200,
    height: 200,
  },
  formSheet: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed to White for premium contrast
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 12, // Reduced for handle
    marginTop: -25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  sheetHandle: {
    width: 44,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 28,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(251, 146, 60, 0.08)",
    borderRadius: 24,
    padding: 6,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 18,
  },
  activeTab: {
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748B",
  },
  activeTabText: {
    color: "#EA580C",
  },
  scrollForm: {
    // Dynamically padded
  },
  buttonContainer: {
    marginTop: 12,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
});
