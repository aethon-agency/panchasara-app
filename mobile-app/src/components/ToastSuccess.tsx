import { COLORS } from "@/src/constants/colors";
import { FONTS } from "@/src/constants/fonts";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ToastSuccessProps {
  message: string;
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/icons/fill-checkbox.png")}
        style={{ height: 21, width: 21 }}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ToastSuccess;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8.69,
    borderRadius: 22.87,
    borderWidth: 0.683,
    borderColor: "#EDEDED",
    backgroundColor: "#000",
    height: 45.74,
    paddingHorizontal: 20,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.INTER_600,
    fontSize: 10.877,
    lineHeight: 10.877,
    letterSpacing: 0.109,
    fontVariant: ["lining-nums", "proportional-nums"],
  },
});
