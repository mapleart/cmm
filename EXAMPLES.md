# 💡 Примеры использования

Практические примеры интеграции Cookie Consent Configurable в различных сценариях.

## 🎯 Базовые примеры

### Минимальная настройка
```javascript
// Простейший вариант - все настройки по умолчанию
const cookieConsent = new CookieConsentConfigurable()
```

### Простой баннер
```javascript
// Только согласие без детальных настроек
const cookieConsent = new CookieConsentConfigurable({
  mode: 'simple',
  position: 'bottom-center'
})
```

### Кастомизация внешнего вида
```javascript
const cookieConsent = new CookieConsentConfigurable({
  position: 'bottom-right',
  style: {
    primary: '#e74c3c',
    background: '#2c3e50',
    text: '#ecf0f1',
    radius: '15px'
  }
})
```

## 🔧 Интеграция с аналитикой

### Яндекс.Метрика + Google Analytics
```javascript
const cookieConsent = new CookieConsentConfigurable({
  callbacks: {
    onAccept: (consent) => {
      const analytics = consent.cookies.find(c => c.name === 'analytics')
      
      if (analytics?.enabled) {
        // Инициализация Яндекс.Метрики
        if (typeof ym !== 'undefined') {
          ym(12345678, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true
          })
        }
        
        // Инициализация Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('config', 'GA_TRACKING_ID')
        }
      }
    },
    onReject: () => {
      console.log('Аналитика отключена пользователем')
    }
  }
})
```

### Условная загрузка скриптов
```javascript
const cookieConsent = new CookieConsentConfigurable({
  autoShow: false, // показываем вручную после загрузки страницы
  
  callbacks: {
    onAccept: (consent) => {
      const analytics = consent.cookies.find(c => c.name === 'analytics')
      
      if (analytics?.enabled) {
        // Динамическая загрузка скриптов аналитики
        loadAnalyticsScripts()
      }
    }
  }
})

function loadAnalyticsScripts() {
  // Яндекс.Метрика
  const ymScript = document.createElement('script')
  ymScript.src = 'https://mc.yandex.ru/metrika/watch.js'
  document.head.appendChild(ymScript)
  
  // Google Analytics
  const gaScript = document.createElement('script')
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  document.head.appendChild(gaScript)
}

// Показываем панель после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  if (!cookieConsent.hasConsent()) {
    cookieConsent.show()
  }
})
```

## 🎨 Темизация

### Темная тема
```javascript
const cookieConsent = new CookieConsentConfigurable({
  ui: {
    theme: 'dark'
  },
  style: {
    primary: '#bb86fc',
    background: '#121212',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#333333',
    surface: '#1e1e1e'
  }
})
```

### Корпоративные цвета
```javascript
const cookieConsent = new CookieConsentConfigurable({
  style: {
    primary: '#0066cc',        // корпоративный синий
    primaryHover: '#0052a3',   
    background: '#f8f9fa',     
    text: '#212529',
    border: '#dee2e6',
    radius: '0',               // прямые углы
    shadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
})
```

## 📱 Адаптивность

### Мобильная оптимизация
```javascript
const cookieConsent = new CookieConsentConfigurable({
  position: window.innerWidth < 768 ? 'bottom-center' : 'bottom-right',
  
  style: {
    spacing: window.innerWidth < 768 ? '15px' : '20px',
    radius: window.innerWidth < 768 ? '0' : '8px'
  },
  
  texts: {
    description: window.innerWidth < 768 
      ? 'Краткое описание для мобильных'
      : 'Полное описание для десктопа'
  }
})
```

## 🌍 Мультиязычность

### Переключение языков
```javascript
const languages = {
  ru: {
    title: 'Cookie',
    description: 'Мы используем файлы cookie...',
    buttons: {
      allowAll: 'Разрешить все',
      settings: 'Настройки'
    }
  },
  en: {
    title: 'Cookies',
    description: 'We use cookies to...',
    buttons: {
      allowAll: 'Allow all',
      settings: 'Settings'
    }
  }
}

const currentLang = document.documentElement.lang || 'ru'
const texts = languages[currentLang] || languages.ru

const cookieConsent = new CookieConsentConfigurable({
  texts: texts
})
```

## 🔄 Динамические обновления

### Обновление конфигурации
```javascript
const cookieConsent = new CookieConsentConfigurable()

// Изменение темы по клику
document.getElementById('toggle-theme').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-theme')
  
  cookieConsent.updateConfig({
    style: {
      primary: isDark ? '#007cba' : '#bb86fc',
      background: isDark ? '#ffffff' : '#121212',
      text: isDark ? '#333333' : '#ffffff'
    }
  })
})
```

### Динамическое изменение текстов
```javascript
// Переключение языка
function switchLanguage(lang) {
  const texts = languages[lang]
  
  cookieConsent.updateConfig({
    texts: texts
  })
  
  // Если панель уже показана, пересоздаем интерфейс
  if (cookieConsent.state.isVisible) {
    cookieConsent.hide()
    setTimeout(() => cookieConsent.show(), 100)
  }
}
```

## 📊 Отслеживание действий

### Детальная аналитика действий
```javascript
const cookieConsent = new CookieConsentConfigurable({
  callbacks: {
    onShow: () => {
      console.log('Cookie banner shown')
      // Отправка события в аналитику
      trackEvent('cookie_banner', 'show')
    },
    
    onAccept: (consent) => {
      console.log('Consent accepted:', consent)
      trackEvent('cookie_consent', 'accept', {
        analytics: consent.cookies.find(c => c.name === 'analytics')?.enabled,
        functional: consent.cookies.find(c => c.name === 'functional')?.enabled
      })
    },
    
    onReject: (consent) => {
      console.log('Consent rejected:', consent)
      trackEvent('cookie_consent', 'reject')
    },
    
    onSettingsShow: () => {
      trackEvent('cookie_settings', 'show')
    }
  }
})

function trackEvent(category, action, data = {}) {
  // Ваша система аналитики
  if (typeof analytics !== 'undefined') {
    analytics.track(action, {
      category: category,
      ...data
    })
  }
}
```

## 🎭 A/B тестирование

### Тестирование разных вариантов
```javascript
// Определяем вариант A/B теста
const variant = Math.random() < 0.5 ? 'A' : 'B'

const cookieConsent = new CookieConsentConfigurable({
  texts: {
    title: variant === 'A' ? 'Cookie' : 'Файлы cookie',
    description: variant === 'A' 
      ? 'Короткое описание...'
      : 'Подробное описание с деталями...',
    buttons: {
      allowAll: variant === 'A' ? 'ОК' : 'Разрешить все'
    }
  },
  
  callbacks: {
    onAccept: (consent) => {
      // Отправляем информацию о варианте теста
      trackEvent('ab_test_cookie_consent', 'accept', { variant })
    }
  }
})
```

---

💡 **Совет**: Комбинируйте различные подходы в зависимости от ваших потребностей. Модуль достаточно гибкий для большинства реальных сценариев использования. 