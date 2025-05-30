import './cookie-consent-styles.css'
import { CookieConsentConfigurable } from './cookie-consent-configurable.js'

// Экспортируем класс для использования как ES модуль
export { CookieConsentConfigurable }

// Также делаем доступным как глобальную переменную для UMD сборки
if (typeof window !== 'undefined') {
  window.CookieConsentConfigurable = CookieConsentConfigurable
}

export default CookieConsentConfigurable 