import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          chat: "Chat",
          settings: "Settings",
          settingThemeDark: "Dark",
          settingThemeLite: "Lite",
          settingLanguage: "Language",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "Clock Display",
          settingDateFormat12H: "12 Hours",
          settingDateFormat24H: "24 Hours",
        },
      },
      de: {
        translation: {
          chat: "DE: Chat",
          settings: "DE: Settings",
          settingThemeDark: "DE: Dark",
          settingThemeLite: "ED: Lite",
          settingLanguage: "DE: Language",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "DE: Clock Display",
          settingDateFormat12H: "DE: 12 Hours",
          settingDateFormat24H: "DE: 24 Hours",
        },
      },
      pl: {
        translation: {
          chat: "Czat",
          settings: "Ustawienia",
          settingThemeDark: "Ciemny",
          settingThemeLite: "Jasny",
          settingLanguage: "Język",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "Format daty",
          settingDateFormat12H: "12 godzinny",
          settingDateFormat24H: "24 godzinny",
        },
      },
    },
    lng: "pl",
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18n: false,
    },
  });

export default i18n;
