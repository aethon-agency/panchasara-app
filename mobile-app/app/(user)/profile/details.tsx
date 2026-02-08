import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { CustomInput } from "@/src/components/CustomInput";
import { useAuthStore } from "@/src/stores/authStore";
import { useLanguage } from "@/src/hooks/useLanguage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileDetailsScreen() {
  const { user, updateUser } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();

  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [mobileNumber, setMobileNumber] = useState(
    user?.mobilenumber?.toString() || "",
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !mobileNumber.trim()) {
      Alert.alert(t("common.error"), t("profile.fillAllFields"));
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateUser({
        firstname: firstName,
        lastname: lastName,
        mobilenumber: parseInt(mobileNumber),
      });

      Alert.alert(t("common.success"), t("profile.updateSuccess"), [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert(t("common.error"), t("profile.updateError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={t("profile.menu.myDetails.label")} showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>
                  {firstName?.[0]}
                  {lastName?.[0]}
                </Text>
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              <CustomInput
                label={t("login.firstNameLabel") ?? "First Name"}
                icon="account-outline"
                placeholder={t("login.firstNameLabel") ?? "Enter first name"}
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

              <CustomInput
                label={t("login.mobileTitle") ?? "Mobile Number"}
                prefix="🇮🇳 +91"
                placeholder="00000 00000"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                editable={false} // Usually mobile number changes require OTP verification
                style={{ opacity: 0.6 }}
              />
            </View>

            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? t("common.saving") : t("common.saveChanges")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  scrollContent: {
    padding: 20,
  },
  formCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 32,
    position: "relative",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FED7AA",
  },
  avatarInitials: {
    fontSize: 40,
    fontWeight: "700",
    color: "#EA580C",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#EA580C",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  inputsContainer: {
    gap: 8,
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: "#EA580C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
