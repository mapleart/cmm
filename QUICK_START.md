# 🚀 Быстрый старт с Vite

## Установка
```bash
npm install
```

## Команды

### Разработка
```bash
npm run dev
```
→ http://localhost:3000/demo.html

### Сборка
```bash
npm run build
```
Создает файлы в `dist/`:
- `ccm.js` - JavaScript модуль
- `ccm.css` - CSS стили
- `demo.html` - демо страница

### Предварительный просмотр
```bash
npm run preview
```

## Быстрое использование

### В HTML
```html
<link rel="stylesheet" href="dist/ccm.css">
<script type="module" src="dist/ccm.js"></script>
```

### Прямое подключение
```html
<link rel="stylesheet" href="ccm.css">
<script type="module" src="ccm.js"></script>
```

### Инициализация
```javascript
// Базовое использование
const cookieConsent = new CookieConsentConfigurable()

// С настройками
const cookieConsent = new CookieConsentConfigurable({
  debug: true,
  position: 'bottom-center',
  style: { primary: '#ff6b35' }
})
```

📚 **[Полная документация по конфигурации →](CONFIG.md)**

## Файлы проекта

- `src/` - исходный код
- `dist/` - собранные файлы  
- `demo.html` - демо страница для разработки
- `vite.config.js` - конфигурация Vite 

## Структура dist после сборки

```
dist/
├── demo.html    # Демо страница
├── ccm.css      # Стили
└── ccm.js       # JavaScript
``` 