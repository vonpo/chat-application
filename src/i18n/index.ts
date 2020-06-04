import i18n, { LanguageDetectorModule } from "i18next";
import { initReactI18next } from "react-i18next";
import defaultLanguage from "./defaultLanguage";

/**
 * First try to get language from user storage if it fails return default language from browser settings.
 * This it not needed but save one render cycle as we don't need to re-render when we have correct language set.
 */
const customLanguageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    const userRaw = localStorage.getItem("user");

    if (userRaw) {
      return JSON.parse(userRaw).language;
    }

    return defaultLanguage;
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(customLanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          chat: "Chat",
          chatMessage: "Type message here...",
          settings: "Settings",
          settingsSave: "Save",
          settingsUsername: "User name",
          settingThemeDark: "Dark",
          settingThemeLite: "Lite",
          settingLanguage: "Language",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "Clock Display",
          settingDateFormat12H: "12 Hours",
          settingDateFormat24H: "24 Hours",
          settingSend: "Send messages on CTRL+ENTER",
          settingSendCtrlEnterOn: "On",
          settingSendCtrlEnterOff: "Off",
          settingInterfaceColor: "Interface color",
          settingInterfaceColorLight: "Light",
          settingInterfaceColorDark: "Dark",
        },
      },
      de: {
        translation: {
          chat: "DE: Chat",
          chatMessage: "DE: Type message here...",
          settings: "DE: Settings",
          settingsSave: "DE: Save",
          settingsUsername: "DE: Username",
          settingThemeDark: "DE: Dark",
          settingThemeLite: "ED: Lite",
          settingLanguage: "DE: Language",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "DE: Clock Display",
          settingDateFormat12H: "DE: 12 Hours",
          settingDateFormat24H: "DE: 24 Hours",
          settingSend: "DE: Send messages on CTRL+ENTER",
          settingSendCtrlEnterOn: "DE: On",
          settingSendCtrlEnterOff: "DE: Off",
          settingInterfaceColor: "DE: Interface color",
          settingInterfaceColorLight: "DE: Light",
          settingInterfaceColorDark: "DE: Dark",
        },
      },
      pl: {
        translation: {
          chat: "Czat",
          chatMessage: "Wpisz wiadomość...",
          settings: "Ustawienia",
          settingsSave: "Zapisz",
          settingsUsername: "Nazwa na czacie",
          settingThemeDark: "Ciemny",
          settingThemeLite: "Jasny",
          settingLanguage: "Język",
          settingLanguageDE: "DE",
          settingLanguagePL: "PL",
          settingLanguageEN: "EN",
          settingDateFormat: "Format daty",
          settingDateFormat12H: "12 godzinny",
          settingDateFormat24H: "24 godzinny",
          settingSend: "Wyślij po naciśnięciu CTRL+ENTER",
          settingSendCtrlEnterOn: "Tak",
          settingSendCtrlEnterOff: "Nie",
          settingInterfaceColor: "Kolor interfejsu",
          settingInterfaceColorLight: "Jasny",
          settingInterfaceColorDark: "Ciemny",
        },
      },
    },
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
