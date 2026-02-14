import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { CustomInput } from "@/src/components/CustomInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { createDonation } from "@/src/services/donationServices";
import { Toast } from "@/src/contexts/ToastProvider";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { z } from "zod";
import { useZodForm } from "@/src/hooks/useZodForm";
import { SelectionModal } from "@/src/components/SelectionModal";
import { SelectionField } from "@/src/components/SelectionField";
import { DateSelectionField } from "@/src/components/DateSelectionField";
import { useTranslation } from "react-i18next";

const donationSchema = z
  .object({
    type: z.enum(["cash", "item"]),
    title: z.string().min(1, "addDonation.messages.fillRequired"),
    donor_name: z.string().min(1, "addDonation.messages.fillRequired"),
    amount: z.string().optional(),
    item_name: z.string().optional(),
    item_qty: z.string().optional(),
    date: z.string().min(1, "addDonation.messages.fillRequired"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "cash") {
      if (!data.amount || parseFloat(data.amount) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "addDonation.messages.fillRequired",
          path: ["amount"],
        });
      }
    } else {
      if (!data.item_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "addDonation.messages.fillRequired",
          path: ["item_name"],
        });
      }
      if (!data.item_qty || parseInt(data.item_qty) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "addDonation.messages.fillRequired",
          path: ["item_qty"],
        });
      }
    }
  });

const AddDonationScreen = () => {
  const { t } = useTranslation();
  const today = new Date();
  const initialDate = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

  const {
    values: form,
    errors,
    handleChange,
    isValid,
    setValues: setForm,
  } = useZodForm(donationSchema, {
    type: "cash",
    title: "",
    donor_name: "",
    amount: "",
    item_name: "",
    item_qty: "",
    date: initialDate,
  });

  const [loading, setLoading] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const donationTypes = [
    { label: t("addDonation.types.cash"), value: "cash" },
    { label: t("addDonation.types.item"), value: "item" },
  ];

  const handleSubmit = async () => {
    if (!donationSchema.safeParse(form).success) {
      Toast.error(t("addDonation.messages.fillRequired"));
      return;
    }

    setLoading(true);
    try {
      const response = await createDonation(form as any);
      if (response && response.success) {
        Toast.success(t("addDonation.messages.success"));
        router.back();
      } else {
        Toast.error(response?.message || t("addDonation.messages.failed"));
      }
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <AppHeader title={t("addDonation.header")} showBack />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <CustomInput
            label={t("addDonation.labels.mainName")}
            placeholder={t("addDonation.placeholders.mainName")}
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
            error={errors.title ? t(errors.title) : ""}
          />

          <SelectionField
            label={t("addDonation.labels.type")}
            value={t(`addDonation.types.${form.type}`)}
            placeholder={t("addDonation.placeholders.type")}
            onPress={() => setShowTypePicker(true)}
            error={errors.type ? t(errors.type) : ""}
          />

          <CustomInput
            label={t("addDonation.labels.donorName")}
            placeholder={t("addDonation.placeholders.donorName")}
            value={form.donor_name}
            onChangeText={(text) => handleChange("donor_name", text)}
            error={errors.donor_name ? t(errors.donor_name) : ""}
          />

          <DateSelectionField
            label={t("addDonation.labels.date")}
            value={form.date}
            placeholder={t("addDonation.placeholders.date")}
            onSelect={(date) => handleChange("date", date)}
            error={errors.date ? t(errors.date) : ""}
          />

          {form.type === "cash" ? (
            <CustomInput
              label={t("addDonation.labels.amount")}
              placeholder={t("addDonation.placeholders.amount")}
              value={form.amount}
              onChangeText={(text) => handleChange("amount", text)}
              keyboardType="numeric"
              error={errors.amount ? t(errors.amount) : ""}
            />
          ) : (
            <View>
              <CustomInput
                label={t("addDonation.labels.itemName")}
                placeholder={t("addDonation.placeholders.itemName")}
                value={form.item_name}
                onChangeText={(text) => handleChange("item_name", text)}
                error={errors.item_name ? t(errors.item_name) : ""}
              />
              <CustomInput
                label={t("addDonation.labels.itemQty")}
                placeholder={t("addDonation.placeholders.itemQty")}
                value={form.item_qty}
                onChangeText={(text) => handleChange("item_qty", text)}
                keyboardType="numeric"
                error={errors.item_qty ? t(errors.item_qty) : ""}
              />
            </View>
          )}

          <PrimaryButton
            label={t("addDonation.submit")}
            onPress={handleSubmit}
            loading={loading}
            disabled={!isValid}
          />

          <SelectionModal
            visible={showTypePicker}
            onClose={() => setShowTypePicker(false)}
            title={t("addDonation.labels.type")}
            options={donationTypes}
            selectedValue={form.type}
            onSelect={(item) => {
              handleChange("type", item);
              setShowTypePicker(false);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

export default AddDonationScreen;

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
});
