/**
 * Module is responsible for guessing user language.
 *
 * First it uses navigator.languages if it matches one of supported language then it selected as default.
 * If no language is matched `FALLBACK_LANGUAGE` language is set.
 *
 */
const FALLBACK_LANGUAGE = "en";
const userLanguages = navigator.languages || [FALLBACK_LANGUAGE];
const supportedLanguages = ["en", "de", "pl"];

const defaultLanguage =
  userLanguages.find((userLanguage) =>
    supportedLanguages.some(
      (supportedLanguage) => supportedLanguage === userLanguage
    )
  ) || FALLBACK_LANGUAGE;

export default defaultLanguage;
