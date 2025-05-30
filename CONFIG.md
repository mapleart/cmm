# 📚 Конфигурация Cookie Consent Configurable

Модуль поддерживает обширную настройку через объект конфигурации, передаваемый в конструктор.

## 🎯 Базовое использование

```javascript
// Минимальная конфигурация
const cookieConsent = new CookieConsentConfigurable()

// С кастомными настройками
const cookieConsent = new CookieConsentConfigurable({
  debug: true,
  position: 'bottom-center',
  style: {
    primary: '#ff6b35'
  }
})
```

## ⚙️ Основные настройки

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `storageKey` | `string` | `'cookie_consent_configurable'` | Ключ для сохранения настроек в localStorage |
| `debug` | `boolean` | `false` | Включает подробное логирование в консоль |
| `autoShow` | `boolean` | `true` | Автоматически показывать панель при загрузке |
| `position` | `string` | `'bottom-left'` | Позиция панели: `bottom-left`, `bottom-right`, `bottom-center` |
| `mode` | `string` | `'full'` | Режим работы: `full` (с настройками) или `simple` (простой баннер) |

### Пример:
```javascript
{
  storageKey: 'my_cookie_consent',
  debug: true,
  autoShow: false,
  position: 'bottom-center',
  mode: 'simple'
}
```

## 📝 Тексты интерфейса

### Основные тексты

| Параметр | Описание |
|----------|----------|
| `texts.title` | Заголовок панели |
| `texts.description` | Описание в основной панели (поддерживает `{policyLink}`) |
| `texts.policyLinkText` | Текст ссылки на политику |
| `texts.policyUrl` | URL политики конфиденциальности |
| `texts.simpleDescription` | Описание для простого режима |
| `texts.settingsTitle` | Заголовок панели настроек |

### Кнопки

```javascript
texts: {
  buttons: {
    allowAll: 'Разрешить все',
    allowSelected: 'Разрешить выбранные', 
    allowNecessary: 'Разрешить обязательные',
    settings: 'Настройка',
    back: 'Назад',
    accept: 'Принять',      // для простого режима
    decline: 'Отклонить'    // для простого режима
  }
}
```

### Типы cookie

Каждый тип cookie настраивается через объект:

```javascript
{
  name: 'analytics',              // уникальное имя
  title: 'Аналитические cookie',  // заголовок
  description: 'Описание...',     // подробное описание
  required: false,                // обязательный ли тип
  enabled: false                  // включен ли по умолчанию
}
```

## 🚫 Блокировка cookie

Настройка паттернов для блокировки определенных типов cookie:

```javascript
blockingPatterns: {
  analytics: [
    '_ym_uid', '_ym_d',           // Яндекс.Метрика
    '_ga', '_gid', '_gat',        // Google Analytics  
    '_tmr_lvid', '_tmr_lvidTS'    // Top.Mail.Ru
  ],
  functional: [
    'vimeo', 'youtube', 'player'
  ]
}
```

## 🎨 Настройки интерфейса

### UI настройки

```javascript
ui: {
  showCloseButton: false,         // показывать кнопку закрытия
  closeOnBackdropClick: false,    // закрытие по клику вне панели
  animationDuration: 300,         // длительность анимаций (мс)
  theme: 'light',                 // тема: 'light', 'dark' или кастомная
  buttonClasses: {
    primary: 'custom-btn-primary',    // CSS класс основных кнопок
    secondary: 'custom-btn-secondary' // CSS класс вторичных кнопок
  }
}
```

### Стили (CSS переменные)

```javascript
style: {
  primary: '#007cba',                     // основной цвет
  primaryHover: '#005a82',                // цвет при наведении
  background: '#ffffff',                  // фон панели
  text: '#333333',                       // цвет основного текста
  textSecondary: '#555555',              // цвет вторичного текста
  border: '#e0e0e0',                     // цвет границ
  surface: '#f9f9f9',                    // цвет поверхностей
  shadow: '0 4px 12px rgba(0,0,0,0.15)', // тень
  radius: '8px',                         // радиус скругления
  spacing: '20px'                        // основные отступы
}
```

## 🔄 Колбэки (обработчики событий)

```javascript
callbacks: {
  onShow: () => console.log('Панель показана'),
  onHide: () => console.log('Панель скрыта'),
  onAccept: (consent) => console.log('Согласие принято:', consent),
  onReject: (consent) => console.log('Согласие отклонено:', consent),
  onChange: (consent) => console.log('Настройки изменены:', consent),
  onSettingsShow: () => console.log('Настройки показаны'),
  onSettingsHide: () => console.log('Настройки скрыты')
}
```

### Объект consent

Колбэки `onAccept`, `onReject` и `onChange` получают объект с информацией о согласии:

```javascript
{
  cookies: [
    {
      name: 'technical',
      title: 'Технические cookie',
      enabled: true,
      required: true
    },
    // ... другие типы
  ],
  timestamp: '2024-01-01T12:00:00.000Z',
  version: '2.1.0'
}
```

## 🎯 Полный пример конфигурации

```javascript
const cookieConsent = new CookieConsentConfigurable({
  // Основные настройки
  debug: true,
  position: 'bottom-center',
  mode: 'full',
  
  // Тексты
  texts: {
    title: 'Файлы Cookie',
    description: 'Мы используем cookie для улучшения работы сайта. Подробнее в {policyLink}.',
    policyUrl: '/privacy',
    buttons: {
      allowAll: 'Принять все',
      settings: 'Настроить'
    }
  },
  
  // Стили
  style: {
    primary: '#ff6b35',
    background: '#f8f9fa',
    radius: '12px'
  },
  
  // Колбэки
  callbacks: {
    onAccept: (consent) => {
      // Инициализация аналитики
      if (consent.cookies.find(c => c.name === 'analytics')?.enabled) {
        // включить Яндекс.Метрику
      }
    }
  }
})
```

## 🔧 Методы для работы с конфигурацией

### Обновление конфигурации

```javascript
// Обновить конфигурацию после создания
cookieConsent.updateConfig({
  style: {
    primary: '#new-color'
  }
})
```

### Получение текущего согласия

```javascript
const consent = cookieConsent.getConsent()
console.log(consent)
```

### Сброс настроек

```javascript
// Сбросить все настройки и показать панель заново
cookieConsent.reset()
```

---

## 📚 Дополнительные материалы

- 💡 **[Примеры использования →](EXAMPLES.md)** - практические сценарии интеграции
- 🚀 **[Быстрый старт →](QUICK_START.md)** - быстрое начало работы  
- 🏠 **[Главная документация →](README.md)** - обзор проекта

💡 **Совет**: Начните с базовой конфигурации и постепенно добавляйте нужные настройки. Все параметры опциональны и имеют разумные значения по умолчанию. 