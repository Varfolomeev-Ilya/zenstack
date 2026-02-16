import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      queryStringParams: {
        v: Date.now(),
      },
    },
    ns: ['auth', 'common', 'errors'],

    interpolation: {
      escapeValue: false,
    },

    detection: { caches: ['localStorage'] },
    load: 'languageOnly',
    cleanCode: true,
    debug: false,
  });

export default i18n;
