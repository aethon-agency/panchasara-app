import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { ContactModal } from "@/src/components/ContactModal";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  COMMITTEE_MEMBERS,
  WHATSAPP_GROUP_LINK,
  MANDIR_ADDRESS,
  MANDIR_MAPS_LINK,
} from "@/src/constants/data";
import { joinWhatsAppGroup, openMaps } from "@/src/utils/functions";
import { useTranslation } from "react-i18next";

export default function ContactScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppHeader
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.introText}>{t("contact.intro")}</Text>

        <View style={styles.contactList}>
          {/* ✅ Committee Menu Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible(true)}
          >
            <View style={[styles.iconBox, { backgroundColor: "#EFF6FF" }]}>
              <Ionicons name="people" size={24} color="#2563EB" />
            </View>

            <View style={styles.info}>
              <Text style={styles.value}>{t("contact.committee.title")}</Text>
              <Text style={styles.label}>{t("contact.committee.label")}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => joinWhatsAppGroup(WHATSAPP_GROUP_LINK)}
          >
            <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </View>

            <View style={styles.info}>
              <Text style={styles.value}>{t("contact.whatsapp.title")}</Text>
              <Text style={styles.label}>{t("contact.whatsapp.label")}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Address */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => openMaps(MANDIR_MAPS_LINK)}
          >
            <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
              <Ionicons name="location" size={24} color="#EA580C" />
            </View>

            <View style={styles.info}>
              <Text style={styles.value}>{t("contact.address.title")}</Text>
              <Text style={styles.label}>{MANDIR_ADDRESS}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ Reusable Committee Modal */}
      <ContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={t("contact.committee.title")}
        contacts={COMMITTEE_MEMBERS}
      />
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
    fontSize: 13,
    color: "#64748B",
  },

  value: {
    fontSize: 16,
    color: "#431407",
    fontWeight: "700",
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
  },
});
