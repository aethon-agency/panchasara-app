import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { callPhoneNumber } from "../utils/functions";

interface ContactItem {
  name: string;
  phone: string;
}

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  contacts: ContactItem[];
}

export const ContactModal: React.FC<ContactModalProps> = ({
  visible,
  onClose,
  title,
  contacts,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>

          <FlatList
            data={contacts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.memberRow}
                onPress={() => callPhoneNumber(item.phone)}
              >
                <Text style={styles.memberName}>{item.name}</Text>
                <Ionicons name="call" size={22} color="#2563EB" />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
    color: "#431407",
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  closeBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  closeBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
