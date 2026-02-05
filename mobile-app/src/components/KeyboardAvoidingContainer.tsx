import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingViewProps,
} from "react-native";
import { useKeyboardVisible } from "@/src/hooks/useKeyboardVisible";

interface Props extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  iosOffset?: number;
}

export const KeyboardAvoidingContainer: React.FC<Props> = ({
  children,
  style,
  iosOffset = 0,
  ...props
}) => {
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : isKeyboardVisible
          ? "padding"
          : undefined
      }
      keyboardVerticalOffset={Platform.OS === "ios" ? iosOffset : 0}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
