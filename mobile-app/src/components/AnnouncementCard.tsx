import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface AnnouncementCardProps {
  id: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  showDetails?: boolean;
  containerStyle?: ViewStyle;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  id,
  title,
  description,
  showDetails = false,
  containerStyle,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, containerStyle]}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/(user)/(announcements)/details",
          params: { id },
        } as any)
      }
    >
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={["#FFEDD5", "#FED7AA"]}
          style={styles.iconGradient}
        >
          <Ionicons
            name={showDetails ? "megaphone-outline" : "megaphone"}
            size={showDetails ? 24 : 22}
            color="#EA580C"
          />
        </LinearGradient>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={showDetails ? 20 : 18}
        color="#CBD5E1"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#431407",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
});
