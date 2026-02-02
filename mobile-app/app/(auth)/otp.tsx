import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../../src/stores/authStore";

const OTPScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs: any = useRef([]);
  const login = useAuthStore((state) => state.login);

  const handleOtpChange = (value: any, index: any) => {
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

  const handleVerify = () => {
    if (otp.join("").length < 4) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const mockToken = "mock-jwt-token";
      const mockUser: any = { id: "1" };

      login(mockToken, mockUser);
      router.replace("/(user)/home");
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar barStyle="dark-content" />

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* BACK */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#7C2D12" />
          </TouchableOpacity>

          {/* HEADER */}
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={50}
              color="#C2410C"
            />

            <Text style={styles.title}>OTP Darshan</Text>
            <Text style={styles.subtitle}>
              Enter the divine 4-digit code 🙏
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: any) => (inputs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(v) => handleOtpChange(v, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={[
                styles.btn,
                (otp.join("").length < 4 || loading) && { opacity: 0.6 },
              ]}
              onPress={handleVerify}
              disabled={otp.join("").length < 4 || loading}
            >
              <LinearGradient
                colors={["#D97706", "#F59E0B"]}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {loading ? "Verifying..." : "Verify & Enter Mandir"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.resend}>
              Didn't receive?{" "}
              <Text style={{ color: "#C2410C", fontWeight: "600" }}>
                Resend OTP
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  backBtn: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7C2D12",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#92400E",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,
    elevation: 8,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  otpInput: {
    width: 60,
    height: 65,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    borderWidth: 2,
    borderColor: "#F59E0B",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#7C2D12",
  },

  btn: {
    borderRadius: 14,
    overflow: "hidden",
  },

  btnGradient: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  resend: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#6B7280",
  },
});
