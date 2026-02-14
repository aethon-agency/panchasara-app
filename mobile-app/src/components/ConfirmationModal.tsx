import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  confirmColor?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  iconName = "log-out",
  confirmColor = "#EF4444",
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${confirmColor}10` },
              ]}
            >
              <Ionicons name={iconName} size={28} color={confirmColor} />
            </View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalMessage}>{message}</Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: confirmColor }]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    width: "100%",
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
