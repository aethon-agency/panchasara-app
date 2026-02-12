import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  prefix?: string;
  error?: string;
}

export const CustomInput = ({
  label,
  icon,
  prefix,
  error,
  style,
  ...props
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const underlineColor = error ? "#EF4444" : isFocused ? "#EA580C" : "#FED7AA";
  const underlineWidth = isFocused ? 2 : 1.2;

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[styles.label, { color: isFocused ? "#EA580C" : "#431407" }]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            borderBottomColor: underlineColor,
            borderBottomWidth: underlineWidth,
            height: props.multiline ? "auto" : 50,
            alignItems: props.multiline ? "flex-start" : "center",
            paddingTop: props.multiline ? 8 : 0,
          },
        ]}
      >
        {icon && (
          <View
            style={[
              styles.iconContainer,
              props.multiline && { marginTop: Platform.OS === "ios" ? 4 : 8 },
            ]}
          >
            <MaterialCommunityIcons
              name={icon}
              size={22}
              color={isFocused ? "#EA580C" : "#9A3412"}
            />
          </View>
        )}

        {prefix && (
          <View style={styles.phonePrefix}>
            <Text style={styles.prefixText}>{prefix}</Text>
          </View>
        )}

        <TextInput
          {...props}
          style={[styles.textInput, style]}
          placeholderTextColor="#A8A29E"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical={props.multiline ? "top" : "center"}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    marginLeft: 0,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 4,
    backgroundColor: "transparent", // No card background
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  phonePrefix: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  prefixText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#431407",
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#431407",
    paddingVertical: 8,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      } as any,
    }),
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 6,
    fontWeight: "500",
  },
});
