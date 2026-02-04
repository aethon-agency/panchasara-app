import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ContactScreen() {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Contact Us"
        subtitle="Get in Touch"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.introText}>
          Have questions or need assistance? Reach out to the Mandir Office
          through any of the channels below.
        </Text>

        <View style={styles.contactList}>
          {/* Phone */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => openLink("tel:+919876543210")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#EFF6FF" }]}>
              <Ionicons name="call" size={24} color="#2563EB" />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>+91 98765 43210</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => openLink("mailto:info@panchasara.org")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
              <Ionicons name="mail" size={24} color="#16A34A" />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>info@panchasara.org</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => openLink("https://wa.me/919876543210")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>WhatsApp</Text>
              <Text style={styles.value}>Chat with us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Address */}
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
              <Ionicons name="location" size={24} color="#EA580C" />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Mandir Address</Text>
              <Text style={styles.value}>
                Shree Panchasara Parivar Mandir,{"\n"}
                Opp. Village Panchayat,{"\n"}
                Panchasara, Patan - 384265
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-instagram" size={24} color="#E1306C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 40,
  },
  introText: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 24,
    lineHeight: 22,
  },
  contactList: {
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#431407",
    fontWeight: "700",
    lineHeight: 22,
  },
  socialSection: {
    marginTop: 40,
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    gap: 20,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
