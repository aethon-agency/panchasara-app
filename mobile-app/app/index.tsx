import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useAuthStore } from "@/src/stores/authStore";
import { COLORS } from "@/src/constants/colors";
import { Redirect } from "expo-router";

const index = () => {
  const { authLoading, token } = useAuthStore();

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/(user)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default index;
