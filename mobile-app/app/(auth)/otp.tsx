import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
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
import { SCREEN } from "../../src/constants/style";
import { useAuthStore } from "../../src/stores/authStore";

const OTPScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);
  const login = useAuthStore((state) => state.login);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length < 4) return;

    setLoading(true);
    // Mock Verification Logic
    setTimeout(() => {
      setLoading(false);
      // In a real app, you'd get the token and user from the API
      const mockToken = "mock-jwt-token";
      const mockUser = {
        id: "1",
        mobilenumber: 1234567890,
        firstname: "Mandir",
        lastname: "User",
        vehiclenumber: "GJ01AB1234",
        upiid: "user@upi",
        isriding: false,
      };
      login(mockToken, mockUser);
      router.replace("/(user)/home");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your mobile number
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            (otp.join("").length < 4 || loading) && styles.buttonDisabled,
          ]}
          onPress={handleVerify}
          disabled={otp.join("").length < 4 || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify & Continue"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code? <Text style={styles.link}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.INTER_700,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  otpInput: {
    width: (SCREEN.WIDTH - 48 - 45) / 4,
    height: 64,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 24,
    fontFamily: FONTS.INTER_700,
    color: COLORS.textPrimary,
    textAlign: "center",
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
  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    fontFamily: FONTS.INTER_400,
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontFamily: FONTS.INTER_600,
  },
});
