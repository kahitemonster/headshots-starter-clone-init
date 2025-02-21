import i18n from "i18next"
// import { useTranslation, initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "Company_name": "Facetune"
    }
  },
  pl: {
    translation: {
      "Company_name": "Aspekt"
    }
  }
}
  
i18n.init({
  resources,
  lng: "en"
})

export default i18n
  