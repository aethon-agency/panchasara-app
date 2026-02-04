import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

const { width } = Dimensions.get("window");

export default function AccountsScreen() {
  const router = useRouter();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    // You might want to show a toast here in a real app
    console.log("Copied:", text);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Bank Accounts"
        subtitle="Donation Details"
        showBack={true}
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
        <LinearGradient
          colors={["#431407", "#7C2D12"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bankCard}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.bankName}>State Bank of India</Text>
            <FontAwesome name="bank" size={24} color="#FDE68A" />
          </View>

          <View style={styles.cardBody}>
            <View>
              <Text style={styles.label}>Account Holder</Text>
              <Text style={styles.value}>Shree Panchasara Parivar Trust</Text>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Account Number</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.valueLarge}>3021 5648 9012</Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard("302156489012")}
                  >
                    <Ionicons name="copy-outline" size={18} color="#FDE68A" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>IFSC Code</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>SBIN0001234</Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard("SBIN0001234")}
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

        {/* UPI Details */}
        <View style={styles.upiContainer}>
          <Text style={styles.sectionTitle}>UPI Payment</Text>
          <View style={styles.upiBox}>
            <View style={styles.upiIconBox}>
              <Ionicons name="qr-code-outline" size={32} color="#EA580C" />
            </View>
            <View style={styles.upiInfo}>
              <Text style={styles.upiId}>panchasara@sbi</Text>
              <Text style={styles.upiName}>Shree Panchasara Trust</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard("panchasara@sbi")}
            >
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrText}>QR Code Coming Soon</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Note: Please share the transaction details on WhatsApp after making a
          donation for the receipt.
        </Text>
      </ScrollView>
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
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },
  bankCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  bankName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  cardBody: {
    gap: 20,
  },
  label: {
    fontSize: 11,
    color: "#FDE68A",
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },
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
  upiContainer: {
    marginBottom: 20,
  },
  upiBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
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
  upiInfo: {
    flex: 1,
  },
  upiId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#431407",
  },
  upiName: {
    fontSize: 12,
    color: "#64748B",
  },
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
  qrPlaceholder: {
    height: 200,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F1F5F9",
    borderStyle: "dashed",
  },
  qrText: {
    color: "#94A3B8",
    fontWeight: "600",
  },
  note: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
