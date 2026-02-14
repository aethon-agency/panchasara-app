import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "@/src/stores/authStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { SwipeButton } from "@/src/components/SwipeButton";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { useLanguage } from "@/src/hooks/useLanguage";
import { useKeyboardVisible } from "@/src/hooks/useKeyboardVisible";
import { verifyOTP } from "@/src/services/authServices";
import { Toast } from "@/src/contexts/ToastProvider";

const { width, height } = Dimensions.get("window");

const OTPScreen = () => {
  const params = useLocalSearchParams();
  const mobileNumber = Array.isArray(params.mobileNumber)
    ? params.mobileNumber[0]
    : params.mobileNumber;
  const hash = Array.isArray(params.hash) ? params.hash[0] : params.hash;

  if (!mobileNumber || !hash) {
    console.error("Missing mobileNumber or hash in OTP screen");
  }
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardVisible();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs: any = useRef([]);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (value: any, index: any) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length < 4) return;

    try {
      setLoading(true);
      Keyboard.dismiss();
      const verifyDone: any = await verifyOTP({
        mobileNumber,
        otp: otp.join(""),
        hash: hash,
      });
      if (verifyDone?.success) {
        login(verifyDone?.token, verifyDone?.user);
        router.replace("/(user)/(tabs)/home");
      } else {
        Toast.error(verifyDone?.message);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.join("").length === 4;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* LIGHT SAFFRON BACKGROUND */}
      <LinearGradient
        colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topHalo, { top: -width * 0.3 }]} />

      {/* TOP SECTION */}
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

      <KeyboardAvoidingContainer style={{ flex: 1 }} iosOffset={0}>
        <View style={styles.formSheet}>
          <View style={styles.sheetHandle} />

          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>
              {t("login.otpTitle") ?? "Verify OTP"}
            </Text>

            <View style={styles.formInputs}>
              <View style={styles.otpSection}>
                <Text style={styles.inputLabel}>
                  {t("login.otpLabel") ?? "Verification Code"}
                </Text>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <View
                      key={index}
                      style={[
                        styles.otpCard,
                        otp[index] ? styles.activeOtpCard : null,
                      ]}
                    >
                      <TextInput
                        ref={(ref: any) => (inputs.current[index] = ref)}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(v) => handleOtpChange(v, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        selectionColor="#EA580C"
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View
              style={{
                paddingTop: 10,
                paddingBottom: isKeyboardVisible
                  ? 10
                  : Math.max(insets.bottom, 10) + 10,
              }}
            >
              <SwipeButton
                label={t("login.verifyCta") ?? "Slide to Verify"}
                onSwipeComplete={handleVerify}
                loading={loading}
                disabled={!isOtpComplete}
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
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

export default OTPScreen;

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
        elevation: 1,
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 12,
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
    marginBottom: 8,
  },
  sheetContent: {
    flex: 1,
    marginHorizontal: 24,
  },
  sheetTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#431407",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  formInputs: {
    flex: 1,
    justifyContent: "flex-start",
  },
  otpSection: {
    width: "100%",
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#431407",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
    marginBlock: 8,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  otpCard: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    borderBottomWidth: 1.5,
    borderBottomColor: "#FED7AA", // Same as CustomInput's default underline
    justifyContent: "center",
    alignItems: "center",
  },
  activeOtpCard: {
    borderBottomColor: "#EA580C", // Same saffron color on focus/filled
    borderBottomWidth: 2,
  },
  otpInput: {
    fontSize: 28,
    fontWeight: "700",
    color: "#431407",
    textAlign: "center",
    width: "100%",
    paddingBottom: 8,
  },
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
