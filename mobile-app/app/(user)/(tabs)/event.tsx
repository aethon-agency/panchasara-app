import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";

export default function DarshanScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Daily Darshan" subtitle="Experience the Divine" />
      <View style={styles.content}>
        <Text style={styles.text}>Coming Soon: Daily Darshan Live Stream</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#431407",
    fontWeight: "600",
  },
});
