import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { CustomInput } from "@/src/components/CustomInput";
import { useAuthStore } from "@/src/stores/authStore";
import { useLanguage } from "@/src/hooks/useLanguage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { updateUserProfile } from "@/src/services/userServices";
import { useToast } from "@/src/contexts/ToastProvider";

export default function ProfileDetailsScreen() {
  const { user, updateUser } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const toast = useToast();

  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [middleName, setMiddleName] = useState(user?.middlename || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [location, setLocation] = useState(user?.location || "");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !location.trim()) {
      toast.error(t("profile.fillAllFields"));
      return;
    }

    setLoading(true);
    try {
      const response = await updateUserProfile({
        firstName,
        lastName,
        middleName,
        location,
      });

      if (response.status && response.data) {
        const userData = response.data;
        updateUser({
          firstname: userData.firstName,
          lastname: userData.lastName,
          middlename: userData.middleName,
          mobilenumber: userData.mobileNumber?.toString(),
          location: userData.location,
          isadmin: userData.isadmin,
        });

        toast.success(t("profile.updateSuccess"));
        setTimeout(() => {
          router.back();
        }, 500);
      } else {
        toast.error(response.error || t("profile.updateError"));
      }
    } catch (error: any) {
      console.error("Scale update error", error);
      toast.error(error?.response?.data?.error || t("profile.updateError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("profile.menu.myDetails.label")}
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <View style={styles.readOnlyContainer}>
              <View style={styles.readOnlyValueContainer}>
                <Text style={styles.readOnlyPrefix}>🇮🇳 +91</Text>
                <Text style={styles.readOnlyValue}>{user?.mobilenumber}</Text>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#94A3B8"
                />
              </View>
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
                label={t("login.middleNameLabel") ?? "Middle Name"}
                icon="account-outline"
                placeholder={t("login.middleNameLabel") ?? "Enter middle name"}
                value={middleName}
                onChangeText={setMiddleName}
              />

              <CustomInput
                label={t("login.lastNameLabel") ?? "Last Name"}
                icon="account-details-outline"
                placeholder={t("login.lastNameLabel") ?? "Enter last name"}
                value={lastName}
                onChangeText={setLastName}
              />

              <CustomInput
                label={t("login.locationLabel") ?? "Residence Village"}
                icon="map-marker-outline"
                placeholder={
                  t("login.locationPlaceholder") ?? "Enter village name"
                }
                value={location}
                onChangeText={setLocation}
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
  readOnlyContainer: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    color: "#431407",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  readOnlyValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  readOnlyPrefix: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginRight: 8,
  },
  readOnlyValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    flex: 1,
    letterSpacing: 1,
  },
});
