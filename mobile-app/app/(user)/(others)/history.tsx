import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "@/src/components/AppHeader";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function HistoryScreen() {
  const router = useRouter();

  const sections = [
    {
      key: "ancient_capital",
      title: "પંચાસર: ચાવડા વંશની પ્રાચીન રાજધાની",
      text: "ગુજરાતમાં પાટણની સ્થાપના પહેલાં, પંચાસર એક સમૃદ્ધ નગર અને ચાવડા વંશની રાજધાની હતું. ૭મી સદીમાં પંચાસરના રાજા જયશિખરી ચાવડા હતા. લોકવાયકા મુજબ, પંચાસર એટલું ભવ્ય હતું કે તેની કીર્તિ સાંભળીને કલ્યાણના રાજા ભુવડે તેના પર આક્રમણ કર્યું હતું. ઈ.સ. ૬૯૭માં ભીષણ યુદ્ધ થયું જેમાં જયશિખરી ચાવડા વીરગતિ પામ્યા. જોકે, તેમણે પોતાની સગર્ભા રાણી રૂપસુંદરીને સલામત રીતે જંગલમાં મોકલી આપી હતી.",
    },
    {
      key: "vanraj_chawda",
      title: "વનરાજ ચાવડા અને પાટણનો ઉદય",
      text: "પંચાસરના પતન પછી, જંગલમાં જન્મેલા જયશિખરીના પુત્ર વનરાજ ચાવડાએ પંચાસરાનો વારસો ફરી બેઠો કર્યો. વનરાજ ચાવડાએ પોતાના મિત્ર અણહિલ ભરવાડના નામ પરથી ઈ.સ. ૭૪૬માં અણહિલવાડ પાટણની સ્થાપના કરી. વનરાજે પોતાના પૂર્વજોની યાદમાં અને પંચાસરના સન્માનમાં પાટણમાં પંચાસરા પાર્શ્વનાથનું ભવ્ય જિનાલય બનાવડાવ્યું.",
    },
    {
      key: "derasar",
      title: "પંચાસરા પાર્શ્વનાથ દેરાસર (પાટણ)",
      text: "આ મંદિર આજે પણ ગુજરાતના જૈન ધર્મ અને સ્થાપત્યનું મુખ્ય કેન્દ્ર છે. એવું માનવામાં આવે છે કે આ મંદિરમાં જે ભગવાન પાર્શ્વનાથની મૂર્તિ છે, તે મૂળ પંચાસર ગામથી લાવવામાં આવી હતી, તેથી તેનું નામ 'પંચાસરા પાર્શ્વનાથ' પડ્યું. આ મંદિરની કોતરણી અને તેની સાથે જોડાયેલો ઇતિહાસ ગુજરાતના સુવર્ણકાળની યાદ અપાવે છે.",
    },
    {
      key: "lineage",
      title: "પંચાસરા પરિવાર (જ્ઞાતિ અને કુળ)",
      text: "\"પંચાસરા\" શબ્દનો ઉપયોગ આજે એક અટક અથવા કુળ તરીકે પણ થાય છે. જે પરિવારોના પૂર્વજો મૂળ પંચાસર ગામ અથવા તે વિસ્તારના હતા, તેઓ પોતાની ઓળખ 'પંચાસરા' તરીકે આપે છે. પંચાસરા અટક મુખ્યત્વે જૈન વણિક અને વિશ્વકર્મા (ગજ્જર/સુથાર) જ્ઞાતિમાં જોવા મળે છે. આ પરિવારો શિલ્પકલા, સ્થાપત્ય અને વ્યાપારમાં વર્ષોથી અગ્રેસર રહ્યા છે.",
    },
    {
      key: "bhaduka",
      title: "ભાડુકા સાથેનો આધ્યાત્મિક સંબંધ",
      text: "એવું કહેવાય છે કે વર્ષો પહેલા પંચાસરા પરિવારના પૂર્વજો જ્યારે સ્થળાંતર કરીને આ વિસ્તારમાં આવ્યા, ત્યારે તેઓ પોતાના ઇષ્ટદેવ અને માતાજીને સાથે લાવ્યા હતા. ભાડુકાની પવિત્ર ભૂમિ પર માતાજીએ પ્રસન્ન થઈને ત્યાં સ્થાયી થવાનો સંકેત આપ્યો હતો. ત્યારથી પંચાસરા પરિવારે આ સ્થળને પોતાનું આસ્થાનું કેન્દ્ર બનાવી દીધું. મંદિરના જીર્ણોદ્ધાર અને વ્યવસ્થામાં આખા પંચાસરા પરિવારનો ફાળો રહેલો છે. અહીં દર વર્ષે થતા મેળાવડા કે સમૂહ ભોજનથી પરિવારના સભ્યો વચ્ચે સંપ અને એકતા જળવાઈ રહે છે. સારાંશ: ભાડુકા એ માં ભવાની પંચાસરા પરિવારના અસ્તિત્વ અને સંસ્કારોના પાયામાં છે. જો તમે પંચાસરા પરિવારના સભ્ય હોવ, તો ભાડુકા એ તમારા માટે માત્ર ગામ નથી, પણ તમારી પેઢીઓનો આશીર્વાદ છે.",
    },
    {
      key: "kuldevi",
      title: "કુળદેવી તરીકે સ્થાપના",
      text: "ભાડુકા ગામે બિરાજતા માં ભવાની એ પંચાસરા પરિવારના કુળદેવી છે. ઇતિહાસ મુજબ, પંચાસરા પરિવારના પૂર્વજો (જેઓ મુખ્યત્વે ગજ્જર/સુથાર જ્ઞાતિના છે) જ્યારે સદીઓ પહેલા સૌરાષ્ટ્રના પંચાલ પંથકમાં આવીને વસ્યા, ત્યારે તેમણે પોતાની રક્ષક દેવી તરીકે માં ભવાનીની સ્થાપના કરી હતી. ભાડુકા ગામમાં માં ભવાનીનું મંદિર એ પંચાસરા પરિવારનું 'મૂળ સ્થાનક' ગણાય છે.",
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader
        title="કુટુંબનો ઇતિહાસ"
        subtitle="પંચાસરા વંશાવળી"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={styles.quoteBox}
        >
          <Text style={styles.quoteText}>
            જે પોતાની ઓળખ જાણે છે, તે જ સાચું વારસો બનાવી શકે.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(100).duration(600)}
          style={styles.introSection}
        >
          <Text style={styles.paragraph}>
            "પંચાસરા" શબ્દ મુખ્યત્વે પાટણ જિલ્લાના પંચાસર ગામ અને ત્યાંના
            પ્રાચીન શાસકો સાથે જોડાયેલો છે.
          </Text>
        </Animated.View>

        {sections.map((section, index) => (
          <Animated.View
            key={section.key}
            entering={FadeInUp.delay(200 + index * 100).duration(600)}
            style={styles.section}
          >
            <Text style={styles.title}>{section.title}</Text>
            <Text style={styles.paragraph}>{section.text}</Text>
          </Animated.View>
        ))}

        <Text style={styles.footer}>
          આ ઇતિહાસ એક જીવંત દસ્તાવેજ છે, જે આપણા વડીલોની વાતોથી સતત સમૃદ્ધ થાય
          છે.
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
  introSection: {
    marginBottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#9A3412",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 26,
    textAlign: "justify",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
});
