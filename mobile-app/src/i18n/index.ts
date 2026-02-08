import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./translations/en.json";
import gu from "./translations/gu.json";

const resources = {
  en: { translation: en },
  gu: { translation: gu },
};

// Get the device language
const getDeviceLanguage = () => {
  const languageCode = Localization.getLocales()[0]?.languageCode;

  // Map or fallback to supported languages
  if (languageCode === "gu") return "gu";
  return "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
