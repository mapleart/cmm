# Cookie Consent Configurable

Конфигурируемый модуль для управления согласием на использование cookie на веб-сайтах.

## 🚀 Vite сборка

Проект настроен для работы с Vite для современной разработки и сборки.

### Установка зависимостей

```bash
npm install
```

### Команды

#### Разработка
```bash
npm run dev
```
Запускает dev-сервер на http://localhost:3000 с демо страницей

#### Сборка
```bash
npm run build
```
Создает production сборку в папке `dist/`:
- `ccm.js` - JavaScript модуль
- `ccm.css` - CSS стили
- `demo.html` - демо страница

#### Предварительный просмотр
```bash
npm run preview
```
Запускает локальный сервер для просмотра production сборки

## 📦 Использование

### Прямое подключение
```html
<link rel="stylesheet" href="ccm.css">
<script type="module" src="ccm.js"></script>
```

### В проекте
```html
<link rel="stylesheet" href="dist/ccm.css">
<script type="module" src="dist/ccm.js"></script>
```

### Инициализация модуля
```javascript
// Базовое использование
const cookieConsent = new CookieConsentConfigurable()

// С настройками
const cookieConsent = new CookieConsentConfigurable({
  debug: true,
  position: 'bottom-center',
  mode: 'full',
  style: {
    primary: '#ff6b35',
    background: '#f8f9fa'
  },
  callbacks: {
    onAccept: (consent) => {
      console.log('Согласие принято:', consent)
    }
  }
})
```

## ⚙️ Конфигурация

Модуль поддерживает обширную настройку:

- **Основные параметры**: позиция, режим работы, автопоказ
- **Тексты интерфейса**: заголовки, описания, кнопки
- **Стили**: цвета, шрифты, отступы через CSS переменные
- **Блокировка cookie**: паттерны для разных типов cookie
- **Колбэки**: обработчики событий для интеграции

### Быстрые примеры:

```javascript
// Простой режим
new CookieConsentConfigurable({ mode: 'simple' })

// Кастомные цвета
new CookieConsentConfigurable({
  style: {
    primary: '#007cba',
    background: '#ffffff'
  }
})

// С колбэками
new CookieConsentConfigurable({
  callbacks: {
    onAccept: (consent) => {
      // Включить аналитику если разрешена
      if (consent.cookies.find(c => c.name === 'analytics')?.enabled) {
        // инициализация Яндекс.Метрики, Google Analytics и т.д.
      }
    }
  }
})
```

## 📚 Документация

- 📖 **[Подробная конфигурация →](CONFIG.md)** - все параметры и настройки
- 💡 **[Примеры использования →](EXAMPLES.md)** - практические сценарии
- 🚀 **[Быстрый старт →](QUICK_START.md)** - быстрое начало работы

## 🏗️ Структура проекта

```
├── src/                          # Исходный код
│   ├── index.js                  # Главный файл модуля
│   ├── cookie-consent-configurable.js  # Основной класс
│   └── cookie-consent-styles.css # Стили
├── dist/                         # Собранные файлы (создается после build)
│   ├── demo.html                 # Демо страница
│   ├── ccm.js                    # JavaScript модуль
│   └── ccm.css                   # CSS стили
├── demo.html                     # Демо страница для разработки
├── index.html                    # Оригинальная демо страница
├── vite.config.js               # Конфигурация Vite
├── CONFIG.md                     # Документация по конфигурации
├── EXAMPLES.md                   # Примеры использования
└── package.json                 # Зависимости и скрипты
```

## 🎯 Особенности сборки

- **ES модули** - современный стандарт для импорта/экспорта
- **CSS обработка** - автоматическая сборка стилей
- **Tree shaking** - исключение неиспользуемого кода
- **Hot Module Replacement** - мгновенное обновление при разработке
- **Понятные названия файлов** - ccm.js и ccm.css

## 🔧 API методы

```javascript
const cookieConsent = new CookieConsentConfigurable(config)

// Управление панелью
cookieConsent.show()              // Показать панель
cookieConsent.hide()              // Скрыть панель

// Работа с настройками
cookieConsent.getConsent()        // Получить текущее согласие
cookieConsent.reset()             // Сбросить все настройки
cookieConsent.updateConfig(newConfig) // Обновить конфигурацию

// Проверки
cookieConsent.hasConsent()        // Есть ли сохраненное согласие
```

## 🤝 Разработка

1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Запустите dev-сервер: `npm run dev`
4. Откройте http://localhost:3000 для тестирования
5. Внесите изменения в файлы в папке `src/`
6. Соберите для production: `npm run build` 