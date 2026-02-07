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
import Animated, { FadeInUp } from "react-native-reanimated";
import { MandirEvent } from "@/src/constants/data";
import { useLanguage } from "@/src/hooks/useLanguage";

interface MandirEventCardProps {
  event: MandirEvent;
  index?: number;
  containerStyle?: ViewStyle;
}

export const MandirEventCard: React.FC<MandirEventCardProps> = ({
  event,
  index = 0,
  containerStyle,
}) => {
  const router = useRouter();
  const { t } = useLanguage();

  const getEventBadgeLabel = (type: string) => {
    switch (type) {
      case "poonam":
        return t("events.badges.poonam");
      case "havan":
        return t("events.badges.havan");
      default:
        return t("events.badges.poonam");
    }
  };

  const handlePress = () => {
    router.push({
      pathname: "/(user)/(others)/event-details",
      params: { id: event.id },
    });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).duration(500)}
      style={[styles.cardContainer, containerStyle]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={styles.card}
      >
        <LinearGradient colors={["#FFFBEB", "#FEF3C7"]} style={styles.gradient}>
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {event.title}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {getEventBadgeLabel(event.type).toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <Ionicons name="calendar-outline" size={14} color="#EA580C" />
              <Text style={styles.dateText}>{event.date}</Text>
              <View style={styles.dot} />
              <Text style={styles.dayText}>{event.day}</Text>
            </View>
          </View>

          <View style={styles.chevronBox}>
            <Ionicons name="chevron-forward" size={20} color="#EA580C" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 0,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FDE68A",
    elevation: 1,
    shadowColor: "#92400E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: "#FFF",
  },
  gradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
  },
  badge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 2,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9A3412",
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(234, 88, 12, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
