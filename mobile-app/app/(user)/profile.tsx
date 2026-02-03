import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useAuthStore } from "../../src/stores/authStore";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <AppHeader title="My Profile" subtitle={user?.firstname || "Devotee"} />
      <View style={styles.content}>
        <Text style={styles.text}>
          {user?.firstname} {user?.lastname}
        </Text>
        <Text style={styles.email}>{99999999}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  text: {
    fontSize: 24,
    color: "#431407",
    fontWeight: "800",
  },
  email: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#EF4444",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
