import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { CustomInput } from "@/src/components/CustomInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { createGallery } from "@/src/services/galleryServices";
import { Toast } from "@/src/contexts/ToastProvider";
import { KeyboardAvoidingContainer } from "@/src/components/KeyboardAvoidingContainer";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { z } from "zod";
import { useZodForm } from "@/src/hooks/useZodForm";
import { useTranslation } from "react-i18next";
import { SelectionField } from "@/src/components/SelectionField";
import { SelectionModal } from "@/src/components/SelectionModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileImage } from "@/src/services/supabase";
import { SelectedImage } from "@/src/constants/types";

const gallerySchema = z.object({
  title: z.string().min(1, "addGallery.messages.fillRequired"),
  month: z.number().min(1).max(12),
  year: z.number().min(2025).max(2040),
});

const AddGalleryScreen = () => {
  const { t } = useTranslation();
  const {
    values: form,
    errors,
    handleChange,
    isValid,
    setValues: setForm,
  } = useZodForm(gallerySchema, {
    title: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const months = [
    { label: t("months.january"), value: 1 },
    { label: t("months.february"), value: 2 },
    { label: t("months.march"), value: 3 },
    { label: t("months.april"), value: 4 },
    { label: t("months.may"), value: 5 },
    { label: t("months.june"), value: 6 },
    { label: t("months.july"), value: 7 },
    { label: t("months.august"), value: 8 },
    { label: t("months.september"), value: 9 },
    { label: t("months.october"), value: 10 },
    { label: t("months.november"), value: 11 },
    { label: t("months.december"), value: 12 },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 2040 - (currentYear - 1) + 1 },
    (_, i) => ({
      label: String(currentYear - 1 + i),
      value: currentYear - 1 + i,
    }),
  );

  const handlePickImage = async () => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Toast.error(t("addGallery.messages.permissionDenied"));
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10,
      });

      if (!result.canceled && result.assets) {
        const newImages: SelectedImage[] = result.assets.map(
          (asset, index) => ({
            uri: asset.uri,
            fileName: `${Date.now()}_${index}.jpg`,
          }),
        );

        setSelectedImages([...selectedImages, ...newImages]);
      }
    } catch (error: any) {
      console.error("Error picking image:", error);
      Toast.error(error.message || t("common.error"));
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isValid) {
      Toast.error(t("addGallery.messages.fillRequired"));
      return;
    }

    if (selectedImages.length === 0) {
      Toast.error(t("addGallery.messages.atLeastOneImage"));
      return;
    }

    setLoading(true);
    try {
      // Upload images to Supabase Storage
      setUploadProgress({ current: 0, total: selectedImages.length });

      const folder = `${form.year}/${String(form.month).padStart(2, "0")}`;
      const imageUrls = await uploadProfileImage(selectedImages, folder);

      // Create gallery entry with uploaded URLs
      const response = await createGallery({
        ...form,
        images: imageUrls,
      });

      if (response && response.success) {
        Toast.success(t("addGallery.messages.success"));
        setForm({
          title: "",
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        });
        setSelectedImages([]);
        router.back();
      } else {
        Toast.error(response?.message || t("addGallery.messages.failed"));
      }
    } catch (error: any) {
      console.error("Error creating gallery:", error);
      Toast.error(error.message || t("addGallery.messages.uploadError"));
    } finally {
      setLoading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <AppHeader title={t("addGallery.header")} showBack />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <CustomInput
            label={t("addGallery.labels.title")}
            placeholder={t("addGallery.placeholders.title")}
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
            error={errors.title ? t(errors.title) : ""}
          />

          <SelectionField
            label={t("addGallery.labels.month")}
            value={months.find((m) => m.value === form.month)?.label || ""}
            placeholder={t("addGallery.placeholders.month")}
            onPress={() => setShowMonthModal(true)}
            required
          />

          <SelectionField
            label={t("addGallery.labels.year")}
            value={String(form.year)}
            placeholder={t("addGallery.placeholders.year")}
            icon="calendar"
            onPress={() => setShowYearModal(true)}
            required
          />

          <View style={styles.imagesSection}>
            <Text style={styles.imagesLabel}>
              {t("addGallery.labels.images")} *
            </Text>

            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <View style={styles.imageGrid}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={24}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Select Image Button */}
            <TouchableOpacity
              style={styles.selectButton}
              onPress={handlePickImage}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="image-plus"
                size={20}
                color="#EA580C"
              />
              <Text style={styles.selectButtonText}>
                {selectedImages.length > 0
                  ? t("addGallery.addImage")
                  : t("addGallery.selectImage")}
              </Text>
            </TouchableOpacity>

            {/* Upload Progress */}
            {loading && uploadProgress.total > 0 && (
              <View style={styles.progressContainer}>
                <ActivityIndicator size="small" color="#EA580C" />
                <Text style={styles.progressText}>
                  {t("addGallery.uploadProgress", {
                    current: uploadProgress.current,
                    total: uploadProgress.total,
                  })}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t("addGallery.submit")}
              onPress={handleSubmit}
              loading={loading}
              disabled={!isValid || selectedImages.length === 0}
            />
          </View>
        </View>
      </ScrollView>

      <SelectionModal
        visible={showMonthModal}
        onClose={() => setShowMonthModal(false)}
        options={months}
        onSelect={(value) => {
          handleChange("month", Number(value));
          setShowMonthModal(false);
        }}
        selectedValue={String(form.month)}
      />

      <SelectionModal
        visible={showYearModal}
        onClose={() => setShowYearModal(false)}
        options={years}
        onSelect={(value) => {
          handleChange("year", Number(value));
          setShowYearModal(false);
        }}
        selectedValue={String(form.year)}
      />
    </KeyboardAvoidingContainer>
  );
};

export default AddGalleryScreen;

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
  imagesSection: {
    marginBottom: 28,
  },
  imagesLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 0,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
    color: "#431407",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  imagePreviewContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFEDD5",
    borderStyle: "dashed",
    backgroundColor: "#FFF",
    marginTop: 8,
  },
  selectButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#EA580C",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#EA580C",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 24,
  },
});
