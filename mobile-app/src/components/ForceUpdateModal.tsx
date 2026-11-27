import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface Props {
  visible: boolean;
  storeUrl?: string;
  latestVersion?: string;
}

// Full-screen, non-dismissible update gate. Shown only when the server says the
// installed version is below the minimum supported one.
export const ForceUpdateModal = ({ visible, storeUrl, latestVersion }: Props) => {
  const { t } = useTranslation();

  const openStore = () => {
    if (storeUrl) Linking.openURL(storeUrl).catch(() => {});
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      // Block Android hardware back from closing it.
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name="cellphone-arrow-down"
            size={56}
            color="#EA580C"
          />
        </View>

        <Text style={styles.title}>{t("forceUpdate.title")}</Text>
        <Text style={styles.message}>{t("forceUpdate.message")}</Text>

        {latestVersion ? (
          <Text style={styles.version}>
            {t("forceUpdate.latest")} {latestVersion}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={openStore}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="update" size={20} color="#FFF" />
          <Text style={styles.buttonText}>{t("forceUpdate.button")}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFEDD5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#431407",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: "#78716C",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  version: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 28,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EA580C",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
