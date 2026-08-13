import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Helper to apply language attributes to document
const applyLanguageToDocument = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Apply language attributes on initial load
applyLanguageToDocument(savedLanguage);

// Set document direction and lang attribute based on language changes
i18n.on('languageChanged', (lng) => {
  applyLanguageToDocument(lng);
  localStorage.setItem('preferredLanguage', lng);
});

export default i18n;
