import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Explore" subtitle="Discover Mandir Activities" />
      <View style={styles.content}>
        <Text style={styles.text}>Coming Soon: Explore Portal</Text>
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
