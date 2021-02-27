import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationFR from './locales/fr/common'

const resources = {
  fr: {
    translation: translationFR,
  },
}
i18n /*.use(LanguageDetector)*/
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'fr',
    resources,
    fallbackLng: 'fr',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // special options for react-i18next
    // learn more: https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
    },
  })

export default i18n
