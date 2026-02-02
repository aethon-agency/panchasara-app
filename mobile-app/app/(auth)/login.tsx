import { Ionicons } from "@expo/vector-icons";
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
} from "react-native";
import { COLORS } from "../../src/constants/colors";
import { FONTS } from "../../src/constants/fonts";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      // In a real app, use Toast here
      return;
    }
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/otp");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="sunny" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Panchasara Mandir</Text>
          <Text style={styles.subtitle}>Welcome to the Divine Journey</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your 10 digit number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (phoneNumber.length < 10 || loading) && styles.buttonDisabled,
            ]}
            onPress={handleSendOTP}
            disabled={phoneNumber.length < 10 || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms & Conditions</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.onboarding.illustrationBackground2,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.INTER_700,
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.INTER_600,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
  },
  prefix: {
    fontSize: 16,
    fontFamily: FONTS.INTER_600,
    color: COLORS.textPrimary,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textPrimary,
    height: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray[300],
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FONTS.INTER_700,
    color: COLORS.white,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    color: COLORS.primary,
    fontFamily: FONTS.INTER_600,
  },
});
