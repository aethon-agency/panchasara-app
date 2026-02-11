import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { CustomInput } from "@/src/components/CustomInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { createPoonam } from "@/src/services/eventServices";
import { Toast } from "@/src/contexts/ToastProvider";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";

const AddPoonamScreen = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    day: "",
    startTime: "",
    endTime: "",
    organizer: "",
    description: "",
    location: "ભવાની માં મઢ - ભાડુકા",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.day) {
      Toast.error("Please fill in all required fields (Title, Date, Day)");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      const response = await createPoonam(payload);
      if (response && response.success) {
        Toast.success("Poonam event created successfully!");
        setForm({
          title: "",
          date: "",
          day: "",
          startTime: "",
          endTime: "",
          organizer: "",
          description: "",
          location: "ભવાની માં મઢ - ભાડુકા",
        });
        router.back();
      } else {
        Toast.error(response?.message || "Failed to create event");
      }
    } catch (error: any) {
      Toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <AppHeader title="Add Poonam Event" />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <CustomInput
            label="Title *"
            placeholder="e.g. Sharad Poonam"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomInput
                label="Date (YYYY-MM-DD) *"
                placeholder="2024-10-17"
                value={form.date}
                onChangeText={(text) => handleChange("date", text)}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomInput
                label="Day *"
                placeholder="e.g. Sunday"
                value={form.day}
                onChangeText={(text) => handleChange("day", text)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomInput
                label="Start Time (HH:mm)"
                placeholder="18:00"
                value={form.startTime}
                onChangeText={(text) => handleChange("startTime", text)}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomInput
                label="End Time (HH:mm)"
                placeholder="20:00"
                value={form.endTime}
                onChangeText={(text) => handleChange("endTime", text)}
              />
            </View>
          </View>

          <CustomInput
            label="Organizer Name"
            placeholder="Organizer Name"
            value={form.organizer}
            onChangeText={(text) => handleChange("organizer", text)}
          />

          <CustomInput
            label="Location"
            placeholder="Location"
            value={form.location}
            onChangeText={(text) => handleChange("location", text)}
          />

          <CustomInput
            label="Description"
            placeholder="Event Description (Optional)"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            style={{ height: 80 }}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Create Poonam"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

export default AddPoonamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
