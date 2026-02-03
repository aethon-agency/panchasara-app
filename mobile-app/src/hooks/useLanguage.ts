import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "gu" | "hi") => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isGujarati: currentLanguage === "gu",
    isHindi: currentLanguage === "hi",
    isEnglish: currentLanguage === "en",
  };
};
