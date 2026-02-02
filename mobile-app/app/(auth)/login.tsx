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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
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
      colors={["#FFF7ED", "#FFEDD5", "#FED7AA"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <LinearGradient
                colors={["#FCD34D", "#F59E0B"]}
                style={styles.logoCircle}
              >
                <MaterialCommunityIcons
                  name="temple-hindu"
                  size={60}
                  color="#7C2D12"
                />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Panchasara Parivar</Text>
            <Text style={styles.subtitle}>
              🙏 Jay Mataji • Divine Darshan Awaits
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.label}>Enter Mobile Number</Text>

            <View style={styles.inputBox}>
              <Text style={styles.prefix}>🇮🇳 +91</Text>

              <TextInput
                placeholder="10 digit mobile number"
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
                (phoneNumber.length < 10 || loading) && { opacity: 0.5 },
              ]}
              onPress={handleSendOTP}
              disabled={phoneNumber.length < 10 || loading}
            >
              <LinearGradient
                colors={["#EA580C", "#F59E0B"]}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {loading ? "Sending OTP..." : "Continue to Darshan"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footer}>
              Secure login for Panchasara Parivar members 🪔
            </Text>
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
    marginBottom: 50,
  },

  logoWrapper: {
    elevation: 12,
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#7C2D12",
    marginTop: 16,
  },

  subtitle: {
    fontSize: 15,
    color: "#92400E",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFFEE",
    padding: 26,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
  },

  prefix: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 10,
    color: "#7C2D12",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },

  btn: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
  },

  btnGradient: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  footer: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 12,
    color: "#6B7280",
  },
});
