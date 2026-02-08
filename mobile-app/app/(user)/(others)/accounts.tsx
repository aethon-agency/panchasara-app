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

export default function AccountsScreen() {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  const copyToClipboard = async (text: any) => {
    // await Clipboard.setStringAsync(text);
    // console.log("Copied:", text);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Bank Accounts"
        subtitle="Donation Details"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For Online Transfer</Text>
          <Text style={styles.sectionSubtitle}>
            Use these details for NEFT/RTGS/IMPS
          </Text>
        </View>

        {/* Bank Card */}
        <LinearGradient colors={["#431407", "#7C2D12"]} style={styles.bankCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.bankName}>State Bank of India</Text>
            <FontAwesome name="bank" size={24} color="#FDE68A" />
          </View>

          <View style={styles.cardBody}>
            <View>
              <Text style={styles.label}>Account Holder</Text>
              <Text style={styles.value}>Shree Panchasara Parivar Trust</Text>
            </View>

            <View>
              <Text style={styles.label}>Account Number</Text>
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
                <Text style={styles.label}>IFSC Code</Text>
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
                <Text style={styles.label}>Branch</Text>
                <Text style={styles.value}>Main Road, Patan</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* UPI */}
        <View style={styles.upiContainer}>
          <Text style={styles.sectionTitle}>UPI Payment</Text>

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
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.note}>
          Note: Please share transaction details on WhatsApp after donation.
        </Text>
      </ScrollView>

      {/* ✅ Overlay */}
      {showOverlay && (
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.overlayCard} pointerEvents="auto">
            <Ionicons name="information-circle" size={30} color="#EA580C" />
            <Text style={styles.overlayTitle}>Account Setup Coming Soon</Text>
            <Text style={styles.overlayText}>
              Trust bank account setup is in progress.
            </Text>
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
    backgroundColor: "rgba(0,0,0,0.1)",
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
