import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";

export default function AccountsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  const copyToClipboard = async (text: any) => {
    // await Clipboard.setStringAsync(text);
    // console.log("Copied:", text);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("accounts.title")}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("accounts.sectionTitle")}</Text>
          <Text style={styles.sectionSubtitle}>
            {t("accounts.sectionSubtitle")}
          </Text>
        </View>

        {/* Bank Card */}
        <LinearGradient colors={["#431407", "#7C2D12"]} style={styles.bankCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.bankName}>{t("accounts.bankName")}</Text>
            <FontAwesome name="bank" size={24} color="#FDE68A" />
          </View>

          <View style={styles.cardBody}>
            <View>
              <Text style={styles.label}>
                {t("accounts.labels.accountHolder")}
              </Text>
              <Text style={styles.value}>Shree Panchasara Parivar Trust</Text>
            </View>

            <View>
              <Text style={styles.label}>
                {t("accounts.labels.accountNumber")}
              </Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueLarge}>3021 5648 ****</Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard("3021564****")}
                >
                  <Ionicons name="copy-outline" size={18} color="#FDE68A" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>
                  {t("accounts.labels.ifscCode")}
                </Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>SBIN000****</Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard("SBIN000****")}
                  >
                    <Ionicons name="copy-outline" size={16} color="#FDE68A" />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.label}>{t("accounts.labels.branch")}</Text>
                <Text style={styles.value}>Main Road, Patan</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* UPI */}
        <View style={styles.upiContainer}>
          <Text style={styles.sectionTitle}>
            {t("accounts.labels.upiPayment")}
          </Text>

          <View style={styles.upiBox}>
            <View style={styles.upiIconBox}>
              <Ionicons name="qr-code-outline" size={32} color="#EA580C" />
            </View>

            <View style={styles.upiInfo}>
              <Text style={styles.upiId}>panchasara***@sbi</Text>
              <Text style={styles.upiName}>Panchasara Madh Bhaduka</Text>
            </View>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard("panchasara@sbi")}
            >
              <Text style={styles.copyText}>{t("accounts.labels.copy")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.note}>{t("accounts.labels.note")}</Text>
      </ScrollView>

      {/* ✅ Overlay */}
      {showOverlay && (
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.overlayCard} pointerEvents="auto">
            <Ionicons name="information-circle" size={30} color="#EA580C" />
            <Text style={styles.overlayTitle}>
              {t("accounts.overlay.title")}
            </Text>
            <Text style={styles.overlayText}>{t("accounts.overlay.text")}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCF9F1" },
  content: { padding: 20 },

  sectionHeader: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
  },
  sectionSubtitle: { fontSize: 13, color: "#64748B" },

  bankCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  bankName: { fontSize: 20, fontWeight: "800", color: "#FFF" },

  cardBody: { gap: 20 },

  label: {
    fontSize: 11,
    color: "#FDE68A",
    textTransform: "uppercase",
  },

  value: { fontSize: 16, color: "#FFF", fontWeight: "600" },

  valueLarge: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "700",
    letterSpacing: 2,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  upiContainer: { marginBottom: 20 },

  upiBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  upiIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  upiInfo: { flex: 1 },

  upiId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#431407",
  },

  upiName: { fontSize: 12, color: "#64748B" },

  copyButton: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  copyText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
  },

  note: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },

  /* ✅ Overlay Styles */
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  overlayCard: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },

  overlayTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
    marginTop: 10,
  },

  overlayText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 10,
    lineHeight: 20,
  },

  okBtn: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },

  okText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
