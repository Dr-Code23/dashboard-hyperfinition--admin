import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./Language/ar.json";
import en from "./Language/en.json";
import fr from "./Language/fr.json";
const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
    fr: {
        translation: fr,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem("language") || "en",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
