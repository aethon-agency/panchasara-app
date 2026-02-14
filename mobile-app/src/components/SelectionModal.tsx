import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SelectionOption = {
  label: string;
  value: string | number;
};

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  // Support both old format (data) and new format (options)
  data?: string[];
  options?: SelectionOption[];
  selectedValue?: string;
  onSelect: (item: string) => void;
  renderItemText?: (item: string) => string;
}

export const SelectionModal = ({
  visible,
  onClose,
  title,
  data,
  options,
  selectedValue,
  onSelect,
  renderItemText,
}: SelectionModalProps) => {
  // Normalize data to work with both formats
  const normalizedData = options
    ? options.map((opt) => String(opt.value))
    : data || [];

  const getDisplayText = (item: string) => {
    if (options) {
      const option = options.find((opt) => String(opt.value) === item);
      return option?.label || item;
    }
    return renderItemText ? renderItemText(item) : item;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          {title && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={normalizedData}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedValue === item && styles.selectedItemText,
                  ]}
                >
                  {getDisplayText(item)}
                </Text>
                {selectedValue === item && (
                  <Ionicons name="checkmark" size={20} color="#EA580C" />
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalItemText: {
    fontSize: 16,
    color: "#4B5563",
  },
  selectedItemText: {
    color: "#EA580C",
    fontWeight: "600",
  },
});
