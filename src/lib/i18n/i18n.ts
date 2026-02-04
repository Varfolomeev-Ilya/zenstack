/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const getBuildHash = () => {
  const splittedScriptSrc = (document as any).currentScript.src.split('.');

  return splittedScriptSrc[splittedScriptSrc.length - 2];
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?hash=${getBuildHash()}`,
    },
    ns: ['auth'],

    interpolation: {
      escapeValue: false,
    },

    detection: { caches: ['localStorage'] },
    load: 'languageOnly',
    cleanCode: true,
    debug: false,
  });

export default i18n;
