import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { CustomInput } from "@/src/components/CustomInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { createAnnouncement } from "@/src/services/announcementServices";
import { Toast } from "@/src/contexts/ToastProvider";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { z } from "zod";
import { useZodForm } from "@/src/hooks/useZodForm";
import { useTranslation } from "react-i18next";

const announcementSchema = z.object({
  title: z.string().min(1, "addAnnouncement.messages.fillRequired"),
  contact_number: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "addAnnouncement.messages.invalidPhone",
    }),
  description: z.string().min(10, "addAnnouncement.messages.descriptionLength"),
});

const AddAnnouncementScreen = () => {
  const { t } = useTranslation();
  const {
    values: form,
    errors,
    handleChange,
    isValid,
    setValues: setForm,
  } = useZodForm(announcementSchema, {
    title: "",
    contact_number: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!announcementSchema.safeParse(form).success) {
      Toast.error(t("addAnnouncement.messages.fillRequired"));
      return;
    }

    setLoading(true);
    try {
      const response = await createAnnouncement(form);
      if (response && response.success) {
        Toast.success(t("addAnnouncement.messages.success"));
        setForm({
          title: "",
          contact_number: "",
          description: "",
        });
        router.back();
      } else {
        Toast.error(response?.message || t("addAnnouncement.messages.failed"));
      }
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <AppHeader title={t("addAnnouncement.header")} showBack />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <CustomInput
            label={t("addAnnouncement.labels.title")}
            placeholder={t("addAnnouncement.placeholders.title")}
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
            error={errors.title ? t(errors.title) : ""}
          />

          <CustomInput
            label={t("addAnnouncement.labels.contactNumber")}
            placeholder={t("addAnnouncement.placeholders.contactNumber")}
            value={form.contact_number}
            onChangeText={(text) => handleChange("contact_number", text)}
            keyboardType="phone-pad"
            error={errors.contact_number ? t(errors.contact_number) : ""}
          />

          <CustomInput
            label={t("addAnnouncement.labels.description")}
            placeholder={t("addAnnouncement.placeholders.description")}
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            style={{ height: 120 }}
            error={errors.description ? t(errors.description) : ""}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t("addAnnouncement.submit")}
              onPress={handleSubmit}
              loading={loading}
              disabled={!isValid}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

export default AddAnnouncementScreen;

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
  buttonContainer: {
    marginTop: 24,
  },
});
