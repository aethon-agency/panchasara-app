import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppHeader } from "@/src/components/AppHeader";
import { Toast } from "@/src/contexts/ToastProvider";
import { uploadImageAsset } from "@/src/services/mediaServices";
import {
  Banner,
  addBanner,
  deleteBanner,
  getBanners,
  reorderBanners,
  updateBanner,
} from "@/src/services/bannerServices";

const ManageBannersScreen = () => {
  const { t } = useTranslation();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  const pickImage = async (): Promise<string | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.error(t("manageBanners.permissionDenied"));
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.9,
    });
    if (result.canceled || !result.assets?.[0]) return null;
    return result.assets[0].uri;
  };

  const handleAdd = async () => {
    try {
      const uri = await pickImage();
      if (!uri) return;
      setBusyId("new");
      const { url, key } = await uploadImageAsset(uri, "banner");
      await addBanner(url, key);
      Toast.success(t("manageBanners.added"));
      await load();
    } catch (error: any) {
      Toast.error(error.message || t("manageBanners.uploadError"));
    } finally {
      setBusyId(null);
    }
  };

  const handleEdit = async (banner: Banner) => {
    try {
      const uri = await pickImage();
      if (!uri) return;
      setBusyId(banner.id);
      const { url, key } = await uploadImageAsset(uri, "banner");
      await updateBanner(banner.id, url, key);
      Toast.success(t("manageBanners.updated"));
      await load();
    } catch (error: any) {
      Toast.error(error.message || t("manageBanners.uploadError"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (banner: Banner) => {
    try {
      setBusyId(banner.id);
      await deleteBanner(banner.id);
      Toast.success(t("manageBanners.removed"));
      await load();
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
    } finally {
      setBusyId(null);
    }
  };

  // Move a banner up/down and persist the new order.
  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= banners.length) return;
    const next = [...banners];
    [next[index], next[target]] = [next[target], next[index]];
    setBanners(next);
    try {
      await reorderBanners(next.map((b) => b.id));
    } catch (error: any) {
      Toast.error(error.message || t("common.error"));
      load();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={t("manageBanners.header")} showBack />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              load();
            }}
            tintColor="#EA580C"
            colors={["#EA580C"]}
          />
        }
      >
        <Text style={styles.subtitle}>{t("manageBanners.subtitle")}</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          disabled={busyId !== null}
        >
          {busyId === "new" ? (
            <ActivityIndicator size="small" color="#EA580C" />
          ) : (
            <MaterialCommunityIcons
              name="plus-circle"
              size={20}
              color="#EA580C"
            />
          )}
          <Text style={styles.addButtonText}>{t("manageBanners.add")}</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#EA580C"
            style={{ marginTop: 40 }}
          />
        ) : banners.length === 0 ? (
          <View style={styles.empty}>
            <MaterialCommunityIcons
              name="image-off-outline"
              size={40}
              color="#9CA3AF"
            />
            <Text style={styles.emptyText}>{t("manageBanners.empty")}</Text>
          </View>
        ) : (
          banners.map((banner, index) => (
            <View key={banner.id} style={styles.card}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <Image
                source={{ uri: banner.image_url }}
                style={styles.thumb}
                contentFit="cover"
                cachePolicy="memory-disk"
                transition={200}
              />

              {busyId === banner.id ? (
                <View style={styles.actions}>
                  <ActivityIndicator size="small" color="#EA580C" />
                </View>
              ) : (
                <View style={styles.actions}>
                  <View style={styles.reorder}>
                    <TouchableOpacity
                      onPress={() => move(index, -1)}
                      disabled={index === 0 || busyId !== null}
                    >
                      <MaterialCommunityIcons
                        name="chevron-up"
                        size={24}
                        color={index === 0 ? "#D6D3D1" : "#78716C"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => move(index, 1)}
                      disabled={index === banners.length - 1 || busyId !== null}
                    >
                      <MaterialCommunityIcons
                        name="chevron-down"
                        size={24}
                        color={
                          index === banners.length - 1 ? "#D6D3D1" : "#78716C"
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleEdit(banner)}
                    disabled={busyId !== null}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={20}
                      color="#2563EB"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDelete(banner)}
                    disabled={busyId !== null}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={20}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ManageBannersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF7ED" },
  content: { padding: 20, paddingBottom: 40 },
  subtitle: { fontSize: 13, color: "#78716C", marginBottom: 16 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFEDD5",
    borderStyle: "dashed",
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  addButtonText: { fontSize: 14, fontWeight: "700", color: "#EA580C" },
  empty: { alignItems: "center", paddingVertical: 48, gap: 12 },
  emptyText: { fontSize: 14, color: "#9CA3AF" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  numberText: { color: "#FFF", fontWeight: "800", fontSize: 13 },
  thumb: {
    width: 90,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#F5F5F4",
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  reorder: { marginRight: 6 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
});
