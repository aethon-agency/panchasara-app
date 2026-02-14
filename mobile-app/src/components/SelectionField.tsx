import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectionFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  error?: string;
  style?: ViewStyle;
  required?: boolean;
}

export const SelectionField = ({
  label,
  value,
  placeholder,
  icon,
  onPress,
  error,
  style,
  required,
}: SelectionFieldProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        {label} {required ? "*" : ""}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.inputContainer,
          error ? { borderBottomColor: "#EF4444" } : {},
        ]}
      >
        <View style={styles.inputRow}>
          {icon && (
            <Ionicons
              name={icon}
              size={22}
              color="#9A3412"
              style={styles.icon}
            />
          )}
          <Text style={value ? styles.text : styles.placeholder}>
            {value || placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#6B7280" />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#431407",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  inputContainer: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#FED7AA",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "transparent",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "#431407",
  },
  placeholder: {
    fontSize: 17,
    fontWeight: "600",
    color: "#A8A29E",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 6,
    fontWeight: "500",
    marginLeft: 4,
  },
});
