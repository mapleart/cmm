import './cookie-consent-styles.css'
import { CookieConsentConfigurable, createCookieConsent } from './cookie-consent-configurable.js'

// Экспортируем класс и функцию для использования как ES модуль
export { CookieConsentConfigurable, createCookieConsent }

// Также делаем доступными как глобальные переменные для UMD сборки
if (typeof window !== 'undefined') {
  window.CookieConsentConfigurable = CookieConsentConfigurable
  window.createCookieConsent = createCookieConsent
}

export default CookieConsentConfigurable 