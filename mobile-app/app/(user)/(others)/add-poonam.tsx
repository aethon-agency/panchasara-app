import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { CustomInput } from "@/src/components/CustomInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { createPoonam } from "@/src/services/eventServices";
import { Toast } from "@/src/contexts/ToastProvider";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { POONAM_TITLE } from "@/src/constants";
import { z } from "zod";
import { useZodForm } from "@/src/hooks/useZodForm";
import { SelectionModal } from "@/src/components/SelectionModal";
import { SelectionField } from "@/src/components/SelectionField";
import { TimeSelectionField } from "@/src/components/TimeSelectionField";
import { DateSelectionField } from "@/src/components/DateSelectionField";

const poonamSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  organizer: z.string().optional(),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

const AddPoonamScreen = () => {
  const {
    values: form,
    errors,
    handleChange,
    isValid,
    setValues: setForm,
  } = useZodForm(poonamSchema, {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    organizer: "",
    description: "",
    location: "ભવાની માં મઢ - ભાડુકા",
  });

  const [loading, setLoading] = useState(false);
  const [showTitlePicker, setShowTitlePicker] = useState(false);

  const handleSubmit = async () => {
    if (!isValid) {
      Toast.error("Please fill in all required fields correctly.");
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
      <AppHeader title="Add Poonam Event" showBack />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <SelectionField
            label="Title"
            value={form.title}
            placeholder="Select Poonam Title"
            onPress={() => setShowTitlePicker(true)}
            error={errors.title}
            required
          />

          <View style={styles.row}>
            <DateSelectionField
              label="Date"
              value={form.date}
              onSelect={(date) => handleChange("date", date)}
              error={errors.date}
              required
              style={{ flex: 1 }}
            />
          </View>

          <View style={styles.row}>
            <TimeSelectionField
              label="Start Time"
              value={form.startTime}
              onSelect={(time) => handleChange("startTime", time)}
              style={{ flex: 1 }}
              required
            />
            <TimeSelectionField
              label="End Time"
              value={form.endTime}
              onSelect={(time) => handleChange("endTime", time)}
              style={{ flex: 1 }}
              required
            />
          </View>

          <CustomInput
            label="Organizer Name"
            placeholder="શ્રી જયંતિભાઇ રાઘવજીભાઈ પંચાસરા"
            value={form.organizer}
            onChangeText={(text) => handleChange("organizer", text)}
            error={errors.organizer}
          />

          <CustomInput
            label="Location"
            placeholder="Location"
            value={form.location}
            onChangeText={(text) => handleChange("location", text)}
            error={errors.location}
          />

          <CustomInput
            label="Description"
            placeholder="Event Description (Optional)"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            style={{ height: 80 }}
            error={errors.description}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Create Poonam"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>

          <SelectionModal
            visible={showTitlePicker}
            onClose={() => setShowTitlePicker(false)}
            title="Select Poonam"
            data={POONAM_TITLE}
            selectedValue={form.title}
            onSelect={(item) => handleChange("title", item)}
          />
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
  buttonContainer: {
    marginTop: 12,
  },
});
