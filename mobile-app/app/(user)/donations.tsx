import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

// Mock Data
const DONATIONS = [
  {
    id: "1",
    amount: "₹5,001",
    date: "12 Mar 2026",
    purpose: "Poonam Bhojan Prasad",
    receiptNo: "RCP-2026-045",
    type: "Online",
    transactionId: "UPI-8979328472",
    donorName: "Gajjar Family",
  },
  {
    id: "2",
    amount: "₹1,100",
    date: "20 Feb 2026",
    purpose: "General Donation",
    receiptNo: "RCP-2026-012",
    type: "Cash",
    transactionId: "-",
    donorName: "Gajjar Family",
  },
  {
    id: "3",
    amount: "₹501",
    date: "01 Jan 2026",
    purpose: "Aarti Seva",
    receiptNo: "RCP-2026-003",
    type: "Online",
    transactionId: "UPI-2384723984",
    donorName: "Gajjar Family",
  },
];

export default function DonationsScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [donationType, setDonationType] = useState<"Online" | "Cash">("Online");
  const [amount, setAmount] = useState("");
  const [txnId, setTxnId] = useState("");

  const handleDonate = () => {
    // In a real app, this would submit to API
    Alert.alert(
      "Success",
      "Donation details submitted successfully! Waiting for admin approval.",
    );
    setShowModal(false);
    setAmount("");
    setTxnId("");
  };

  const openDonateModal = (type: "Online" | "Cash") => {
    setDonationType(type);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="My Donations"
        subtitle="Receipts & History"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* MAKE A CONTRIBUTION SECTION */}
        <View style={styles.contributeSection}>
          <Text style={styles.sectionTitle}>Make a Contribution</Text>
          <View style={styles.contributeGrid}>
            <TouchableOpacity
              style={[styles.contributeCard, { backgroundColor: "#FFF7ED" }]}
              activeOpacity={0.8}
              onPress={() => openDonateModal("Online")}
            >
              <View style={[styles.iconBox, { backgroundColor: "#FFEDD5" }]}>
                <Ionicons name="qr-code-outline" size={24} color="#EA580C" />
              </View>
              <Text style={styles.contributeLabel}>Online / UPI</Text>
              <Text style={styles.contributeSub}>Instant Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contributeCard, { backgroundColor: "#F0FDF4" }]}
              activeOpacity={0.8}
              onPress={() => openDonateModal("Cash")}
            >
              <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
                <Ionicons name="cash-outline" size={24} color="#16A34A" />
              </View>
              <Text style={[styles.contributeLabel, { color: "#15803D" }]}>
                Cash
              </Text>
              <Text style={[styles.contributeSub, { color: "#166534" }]}>
                At Mandir Office
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.historyTitle}>Recent History</Text>

        {DONATIONS.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInUp.delay(index * 100).duration(500)}
            style={styles.cardContainer}
          >
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <LinearGradient
                colors={["#FFFFFF", "#FFF7ED"]}
                style={styles.cardGradient}
              >
                <View style={styles.headerRow}>
                  <View
                    style={[
                      styles.badge,
                      item.type === "Cash"
                        ? styles.badgeCash
                        : styles.badgeOnline,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        item.type === "Cash"
                          ? styles.badgeTextCash
                          : styles.badgeTextOnline,
                      ]}
                    >
                      {item.type}
                    </Text>
                  </View>
                  <Text style={styles.date}>{item.date}</Text>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text style={styles.purpose}>{item.purpose}</Text>
                    <Text style={styles.donorName}>By: {item.donorName}</Text>
                  </View>
                  <Text style={styles.amount}>{item.amount}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.footerRow}>
                  <View>
                    <Text style={styles.receipt}>No: {item.receiptNo}</Text>
                    {item.type === "Online" && (
                      <Text style={styles.txnId}>
                        Txn: {item.transactionId}
                      </Text>
                    )}
                  </View>
                  <View style={styles.downloadBtn}>
                    <Text style={styles.downloadText}>View Receipt</Text>
                    <Ionicons
                      name="document-text-outline"
                      size={14}
                      color="#EA580C"
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* DONATION MODAL */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {donationType === "Online"
                  ? "Online Donation"
                  : "Cash Donation"}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              {donationType === "Online"
                ? "Scan QR Code or enter UPI ID to donate."
                : "Visit Mandir office or pledge here."}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 501"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {donationType === "Online" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Transaction ID / UPI Ref</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 12-digit Ref No"
                  value={txnId}
                  onChangeText={setTxnId}
                />
              </View>
            )}

            <TouchableOpacity style={styles.submitBtn} onPress={handleDonate}>
              <Text style={styles.submitBtnText}>Submit Donation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  /* CONTRIBUTE SECTION */
  contributeSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 16,
  },
  contributeGrid: {
    flexDirection: "row",
    gap: 16,
  },
  contributeCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  contributeLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#EA580C",
    marginBottom: 4,
  },
  contributeSub: {
    fontSize: 11,
    color: "#9A3412",
    opacity: 0.8,
  },
  /* HISTORY SECTION */
  historyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    overflow: "hidden",
  },
  cardGradient: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeOnline: { backgroundColor: "#FFEDD5" },
  badgeCash: { backgroundColor: "#DCFCE7" },
  badgeText: { fontSize: 10, fontWeight: "700" },
  badgeTextOnline: { color: "#EA580C" },
  badgeTextCash: { color: "#16A34A" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  purpose: {
    fontSize: 16,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 2,
  },
  donorName: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },
  amount: {
    fontSize: 18,
    fontWeight: "900",
    color: "#EA580C",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFEDD5",
    marginVertical: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receipt: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  txnId: {
    fontSize: 10,
    color: "#CBD5E1",
    marginTop: 2,
    fontFamily: "System",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    fontSize: 12,
    color: "#EA580C",
    fontWeight: "700",
  },
  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#431407",
  },
  modalSub: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#431407",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1E293B",
  },
  submitBtn: {
    backgroundColor: "#EA580C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
