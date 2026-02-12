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

import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      Toast.error(t("addPoonam.messages.fillRequired"));
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      const response = await createPoonam(payload);
      if (response && response.success) {
        Toast.success(t("addPoonam.messages.success"));
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
        Toast.error(response?.message || t("addPoonam.messages.failed"));
      }
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <AppHeader title={t("addPoonam.header")} showBack />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <SelectionField
            label={t("addPoonam.labels.title")}
            value={form.title}
            placeholder={t("addPoonam.placeholders.selectTitle")}
            onPress={() => setShowTitlePicker(true)}
            error={errors.title}
            required
          />

          <View style={styles.row}>
            <DateSelectionField
              label={t("addPoonam.labels.date")}
              value={form.date}
              placeholder={t("addPoonam.placeholders.selectDate")}
              onSelect={(date) => handleChange("date", date)}
              error={errors.date}
              required
              style={{ flex: 1 }}
            />
          </View>

          <View style={styles.row}>
            <TimeSelectionField
              label={t("addPoonam.labels.startTime")}
              value={form.startTime}
              placeholder={t("addPoonam.labels.selectTime")}
              onSelect={(time) => handleChange("startTime", time)}
              style={{ flex: 1 }}
              required
            />
            <TimeSelectionField
              label={t("addPoonam.labels.endTime")}
              value={form.endTime}
              placeholder={t("addPoonam.labels.selectTime")}
              onSelect={(time) => handleChange("endTime", time)}
              style={{ flex: 1 }}
              required
            />
          </View>

          <CustomInput
            label={t("addPoonam.labels.organizer")}
            placeholder={t("addPoonam.placeholders.organizer")}
            value={form.organizer}
            onChangeText={(text) => handleChange("organizer", text)}
            error={errors.organizer}
          />

          <CustomInput
            label={t("addPoonam.labels.location")}
            placeholder={t("addPoonam.placeholders.location")}
            value={form.location}
            onChangeText={(text) => handleChange("location", text)}
            error={errors.location}
          />

          <CustomInput
            label={t("addPoonam.labels.description")}
            placeholder={t("addPoonam.placeholders.description")}
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            style={{ height: 80 }}
            error={errors.description}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t("addPoonam.submit")}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>

          <SelectionModal
            visible={showTitlePicker}
            onClose={() => setShowTitlePicker(false)}
            title={t("addPoonam.modal.selectPoonam")}
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
