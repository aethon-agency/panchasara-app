import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader
        title="Family History"
        subtitle="Our Heritage & Lineage"
        showBack={true}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.quoteBox}>
          <MaterialCommunityIcons
            name="format-quote-open"
            size={30}
            color="#FDE68A"
            style={styles.quoteIcon}
          />
          <Text style={styles.quoteText}>
            "Knowing our roots allows us to grow stronger branches for the
            future generations."
          </Text>
        </View>

        <Text style={styles.title}>The Origins</Text>
        <Text style={styles.paragraph}>
          The history of the Panchasara family traces back several centuries to
          the ancient town of Panchasar. Known for their unwavering faith and
          dedication to community service, our ancestors established traditions
          that we proudly uphold today.
        </Text>

        <Text style={styles.title}>Establishment of the Trust</Text>
        <Text style={styles.paragraph}>
          In the early 1950s, community elders came together with a vision to
          unite all family members scattered across different regions. This led
          to the formation of the Shree Panchasara Parivar Trust. The primary
          goal was to preserve our culture, support the needy, and maintain our
          Kuldevi's mandir.
        </Text>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            Today, the family has grown to over 500 members residing across
            Gujarat, Mumbai, and overseas.
          </Text>
        </View>

        <Text style={styles.title}>Our Values</Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.bold}>Unity:</Text> Keeping the family bond
          strong.{"\n"}• <Text style={styles.bold}>Seva:</Text> Selfless service
          to the mandir and society.{"\n"}•{" "}
          <Text style={styles.bold}>Faith:</Text> Unshakable belief in Maa
          Bhavani.
        </Text>

        <Text style={styles.footer}>
          This history is a living document, constantly enriched by the stories
          of our elders.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  quoteBox: {
    backgroundColor: "#431407",
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
    position: "relative",
    alignItems: "center",
  },
  quoteIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    opacity: 0.5,
  },
  quoteText: {
    color: "#FDE68A",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#9A3412",
    marginBottom: 10,
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 26,
    marginBottom: 20,
    textAlign: "justify",
  },
  highlightBox: {
    backgroundColor: "#FFF7ED",
    borderLeftWidth: 4,
    borderLeftColor: "#EA580C",
    padding: 16,
    marginVertical: 10,
  },
  highlightText: {
    fontSize: 16,
    color: "#431407",
    fontWeight: "600",
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "700",
    color: "#431407",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
});
