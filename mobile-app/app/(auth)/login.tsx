import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
  Easing,
} from "react-native-reanimated";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { CustomInput } from "@/src/components/CustomInput";
import { SwipeButton } from "@/src/components/SwipeButton";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
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

  // Transition value: 0 for login, 1 for register
  const transition = useSharedValue(0);

  useEffect(() => {
    transition.value = withTiming(activeTab === "register" ? 1 : 0, {
      duration: 500,
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
  }, [activeTab]);

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

  // ANIMATED STYLES
  const animatedTopSectionStyle = useAnimatedStyle(() => {
    const collapsedHeight = insets.top + 40;

    const sectionHeight = interpolate(
      transition.value,
      [0, 1],
      [height * 0.35, collapsedHeight],
      Extrapolation.CLAMP,
    );
    return {
      height: sectionHeight,
    };
  });

  const animatedLogoStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      transition.value,
      [0, 0.8],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      transition.value,
      [0, 1],
      [1, 0.7],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      transition.value,
      [0, 1],
      [0, -20],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  const animatedLanguageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      transition.value,
      [0, 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  const animatedFormSheetStyle = useAnimatedStyle(() => {
    // Margin Top interpolation to create the "floating" gap at the top
    const marginTop = interpolate(
      transition.value,
      [0, 1],
      [-25, 0], // In Register mode, it sits below the collapsed topSection (which is insets.top+40)
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      transition.value,
      [0, 1],
      [40, 32],
      Extrapolation.CLAMP,
    );

    return {
      marginTop,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* LIGHT SAFFRON BACKGROUND */}
      <LinearGradient
        colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topHalo, { top: -width * 0.3 }]} />

      <Animated.View style={[styles.topSection, animatedTopSectionStyle]}>
        <Animated.View
          style={[
            styles.languageRow,
            { top: Math.max(insets.top, 10) },
            animatedLanguageStyle,
          ]}
        >
          <LanguageSelector />
        </Animated.View>

        <Animated.View style={[styles.logoWrapper, animatedLogoStyle]}>
          <View style={styles.logoHalo}>
            <Image
              source={require("../../assets/images/screen-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      </Animated.View>

      <KeyboardAvoidingContainer style={{ flex: 1 }} iosOffset={0}>
        <Animated.View style={[styles.formSheet, animatedFormSheetStyle]}>
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
              contentContainerStyle={[styles.scrollForm, { flexGrow: 1 }]}
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
            </ScrollView>

            <View
              style={{
                paddingTop: 10,
                paddingBottom: Platform.OS === "ios" ? insets.bottom + 10 : 10,
              }}
            >
              <SwipeButton
                label={t("login.cta") ?? "Slide to get OTP"}
                onSwipeComplete={handleSendOTP}
                loading={loading}
                disabled={!isFormValid}
                height={54}
                borderRadius={28}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {t("login.footerText") ??
                    "Secure portal for Panchasara Parivar members 🪔"}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingContainer>
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
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
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
    marginBottom: 8,
  },
  sheetContent: {
    flex: 1,
    marginHorizontal: 24,
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
  scrollForm: {},
  footer: {
    marginTop: 12,
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
