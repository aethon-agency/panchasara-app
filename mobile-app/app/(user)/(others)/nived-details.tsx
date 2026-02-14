import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const REQUIREMENTS = [
  "સુખડી (પરંપરાગત પ્રસાદ)",
  "કાળા અડદના વડા",
  "શ્રીફળ (નાળિયેર)",
  "દીપક (પરંપરાગત દીવો)",
  "તાજા ફળો અને ફૂલો",
];

const SCHEDULE = [
  "મહા આરતી - સવારે ૦૯:૦૦ વાગ્યે",
  "નિવેદ ધરાવવાની વિધિ - સવારે ૧૦:૩૦ વાગ્યે",
  "હવન પૂજા - બપોરે ૧૨:૦૦ વાગ્યે",
  "પ્રસાદ વિતરણ - બપોરે ૦૧:૦૦ વાગ્યે",
];

export default function NivedDetailsScreen() {
  return (
    <View style={styles.container}>
      <AppHeader
        title="નવરાત્રી આઠમ નિવેદ"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={["#FFFFFF", "#FFF7ED"]} style={styles.heroCard}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="brightness-7"
              size={40}
              color="#EA580C"
            />
          </View>
          <Text style={styles.heroTitle}>નવરાત્રી આઠમ નિવેદ</Text>
          <Text style={styles.heroSubtitle}>માહિતી અને વિધિ</Text>
        </LinearGradient>

        <View style={styles.noticeBox}>
          <Ionicons name="information-circle" size={20} color="#EA580C" />
          <Text style={styles.noticeText}>
            પરંપરાનું પાલન: તમામ પંચાસરા પરિવારના સભ્યોને પરંપરાગત પોશાકમાં આઠમ
            નિવેદ સમારોહમાં જોડાવા પ્રોત્સાહિત કરવામાં આવે છે.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.descriptionText}>
            શ્રી પંચાસરા પરિવાર મઢ ખાતે યોજાતા નવરાત્રી આઠમ નિવેદ અંગેની સંપૂર્ણ
            માર્ગદર્શિકા.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="basket-outline" size={20} color="#EA580C" />
            <Text style={styles.cardHeader}>તૈયારી અને સામગ્રી</Text>
          </View>
          <View style={styles.divider} />
          {REQUIREMENTS.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { marginTop: 24 }]}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="time-outline" size={20} color="#EA580C" />
            <Text style={styles.cardHeader}>કાર્યક્રમની રૂપરેખા</Text>
          </View>
          <View style={styles.divider} />
          {SCHEDULE.map((step, index) => (
            <View key={index} style={styles.scheduleItem}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                {index < SCHEDULE.length - 1 && (
                  <View style={styles.stepLine} />
                )}
              </View>
              <Text style={styles.scheduleText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F1",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#431407",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#EA580C",
    fontWeight: "700",
    textAlign: "center",
  },
  noticeBox: {
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 20,
    alignItems: "flex-start",
    gap: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: "#9A3412",
    fontWeight: "600",
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    elevation: 2,
    shadowColor: "#9A3412",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "900",
    color: "#431407",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFEDD5",
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EA580C",
  },
  listItemText: {
    fontSize: 15,
    color: "#4B5563",
    fontWeight: "600",
  },
  scheduleItem: {
    flexDirection: "row",
    gap: 16,
    minHeight: 50,
  },
  stepIndicator: {
    alignItems: "center",
    width: 24,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EA580C",
    color: "#FFF",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 24,
    zIndex: 1,
  },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#FFEDD5",
    marginVertical: -4,
  },
  scheduleText: {
    flex: 1,
    fontSize: 15,
    color: "#4B5563",
    fontWeight: "700",
    marginTop: 2,
  },
});
