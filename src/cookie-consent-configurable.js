/*!
 * Cookie Consent Configurable - Vanilla JS
 * Полноценный модуль с расширенными настройками
 * Version: 2.1.0
 */

class CookieConsentConfigurable {
    constructor(userConfig = {}) {
        // Версия модуля для совместимости
        this.version = '2.1.1';
        
        // Конфигурация по умолчанию
        this.defaultConfig = {
            // Основные настройки
            storageKey: 'cookie_consent_configurable',
            debug: false,
            autoShow: true,
            position: 'bottom-left', // bottom-left, bottom-right, bottom-center
            mode: 'full', // 'full' - полный режим с настройками, 'simple' - простой баннер
            
            // Тексты интерфейса
            texts: {
                // Основная панель
                title: 'Cookie',
                description: 'Наш сайт использует файлы cookie для аналитики и персонализации. Продолжая использовать сайт после ознакомления с этим сообщением и предоставления своего выбора, вы соглашаетесь с нашей {policyLink}.',
                policyLinkText: 'Политикой обработки персональных данных',
                policyUrl: '/privacy-policy',
                
                // Простой режим
                simpleDescription: 'Мы используем cookie для улучшения работы сайта. Нажимая "Принять", вы соглашаетесь с {policyLink}.',
                
                // Панель настроек
                settingsTitle: 'Настройка cookie',
                settingsDescription: [
                    'Технические cookie нужны для стабильной работы.',
                    'Аналитические и другие cookie помогают нам делать сайт лучше для вас: понимать, что вам интересно, и улучшать навигацию.',
                    'Эти данные анонимны. Разрешая их, вы вносите свой вклад в развитие нашего сайта. Подробности в Политике обработки персональных данных.'
                ],
                
                // Кнопки
                buttons: {
                    allowAll: 'Разрешить все',
                    allowSelected: 'Разрешить выбранные',
                    allowNecessary: 'Разрешить обязательные',
                    settings: 'Настройка',
                    back: 'Назад',
                    // Простой режим
                    accept: 'Принять',
                    decline: 'Отклонить'
                },
                
                // Типы cookie
                cookieTypes: [
                    {
                        name: 'technical',
                        title: 'Технические cookie (всегда активны)',
                        description: 'Эти файлы cookie необходимы для правильной работы сайта и его основных функций (например, навигация, сохранение сессии, работа форм). Без них сайт не сможет функционировать должным образом. Они не собирают информацию для маркетинга или отслеживания. Этот тип cookie нельзя отключить.',
                        required: true,
                        enabled: true
                    },
                    {
                        name: 'analytics',
                        title: 'Аналитические/Рекламные cookie',
                        description: 'Эти файлы cookie позволяют нам собирать информацию о том, как посетители используют наш сайт (например, какие страницы посещают чаще, сколько времени проводят на сайте, возникают ли ошибки). Эта информация собирается в агрегированном или обезличенном виде и используется для анализа и улучшения работы сайта. Данные обрабатываются Яндекс.Метрикой и Top.Mail.Ru согласно их политикам конфиденциальности.',
                        required: false,
                        enabled: false
                    },
                    {
                        name: 'functional',
                        title: 'Функциональные (остальные) cookie',
                        description: 'Эти файлы cookie позволяют сайту запоминать сделанный вами выбор и предоставлять расширенные функции для вашего удобства. Они также могут использоваться для обеспечения работы встроенных на сайт сервисов (например, видеоплееров от Vimeo, виджетов социальных сетей VK), которые улучшают ваш опыт взаимодействия с сайтом.',
                        required: false,
                        enabled: false
                    }
                ]
            },
            
            // Паттерны для блокировки cookie
            blockingPatterns: {
                analytics: [
                    // Яндекс.Метрика
                    '_ym_uid', '_ym_d', '_ym_isad', '_ym_visorc', 'yandexuid', 'ymex', 'yabs-sid', '_ym_', 'yp', 'ys',
                    // Top.Mail.Ru  
                    '_tmr_lvid', '_tmr_lvidTS', '_tmr_reqNum', 'tmr_', 'mailru',
                    // Google Analytics
                    '_ga', '_gid', '_gat', 'gtm', '_gtm', '__utm',
                    // Общие аналитические
                    '_fbp', '_fbc', 'amplitude'
                ],
                functional: [
                    'vimeo', 'youtube', 'player', 'embed'
                ]
            },
            
            // Настройки UI
            ui: {
                showCloseButton: false,
                closeOnBackdropClick: false,
                animationDuration: 300,
                theme: 'light', // light, dark, или любое пользовательское значение
                // CSS классы для кнопок (можно заменить на свои)
                buttonClasses: {
                    primary: 'iq-cookie-consent__button iq-cookie-consent__button--primary',   // Акцентные: "Принять", "Разрешить все"
                    secondary: 'iq-cookie-consent__button iq-cookie-consent__button--secondary' // Обычные: остальные кнопки
                }
            },

            // Настройки стилей (CSS переменные)
            style: {
                primary: '#007cba',           // Основной цвет
                primaryHover: '#005a82',      // Цвет при наведении
                background: '#ffffff',        // Фон панели
                text: '#333333',             // Цвет основного текста
                textSecondary: '#555555',     // Цвет вторичного текста
                border: '#e0e0e0',           // Цвет границ
                surface: '#f9f9f9',          // Цвет поверхностей
                shadow: '0 4px 12px rgba(0,0,0,0.15)', // Тень
                radius: '8px',               // Радиус скругления
                spacing: '20px'              // Основные отступы
            },
            
            // Колбэки
            callbacks: {
                onShow: null,
                onHide: null,
                onAccept: null,
                onReject: null,
                onChange: null,
                onSettingsShow: null,
                onSettingsHide: null
            }
        };

        // Объединяем конфигурации
        this.config = this.mergeConfig(this.defaultConfig, userConfig);
        
        // Состояние
        this.state = {
            isVisible: false,
            showSettings: false,
            expandedItems: [],
            enabledCookies: [],
            isBlocked: true
        };

        // Инициализация состояния на основе конфига
        this.initializeState();
        
        // Служебные переменные
        this.panelElement = null;
        this.originalCookieDescriptor = null;
        this.blockedCookies = [];
        
        this.init();
    }

    // Глубокое объединение конфигураций
    mergeConfig(defaultConfig, userConfig) {
        const merged = JSON.parse(JSON.stringify(defaultConfig));
        
        const mergeDeep = (target, source) => {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    target[key] = target[key] || {};
                    mergeDeep(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        };
        
        mergeDeep(merged, userConfig);
        return merged;
    }

    // Инициализация состояния
    initializeState() {
        // Инициализируем состояние аккордеона
        this.state.expandedItems = new Array(this.config.texts.cookieTypes.length).fill(false);
        
        // Инициализируем состояние cookie в зависимости от режима
        if (this.config.mode === 'simple') {
            // В простом режиме все cookie разрешены изначально
            this.state.enabledCookies = this.config.texts.cookieTypes.map(() => true);
            this.state.isBlocked = false; // Нет блокировки в простом режиме
        } else {
            // В полном режиме используем настройки из конфига
            this.state.enabledCookies = this.config.texts.cookieTypes.map(type => type.enabled);
            this.state.isBlocked = true; // Блокировка по умолчанию
        }
        
        this.log('Состояние инициализировано:', this.state);
        this.log('Режим работы:', this.config.mode);
    }

    // Основная инициализация
    init() {
        this.log('Инициализация Cookie Consent...');
        
        // Загружаем сохраненные настройки
        this.loadSettings();
        
        // Настраиваем блокировку cookie только в полном режиме
        if (this.config.mode === 'full') {
            this.setupCookieBlocking();
        }
        
        // Создаем интерфейс
        this.createInterface();
        
        // Показываем панель если нужно
        if (this.config.autoShow && !this.hasConsent()) {
            this.show();
        }
        
        this.log('Cookie Consent инициализирован');
    }

    // Логирование
    log(message, ...args) {
        if (this.config.debug) {
            console.log(`[CookieConsent] ${message}`, ...args);
        }
    }

    warn(message, ...args) {
        console.warn(`[CookieConsent] ${message}`, ...args);
    }

    // Проверка наличия согласия
    hasConsent() {
        const saved = localStorage.getItem(this.config.storageKey);
        if (!saved) return false;
        
        try {
            const data = JSON.parse(saved);
            // Проверяем версию и наличие базовых данных
            if (!data.version || !data.enabledCookies || !Array.isArray(data.enabledCookies)) {
                this.log('Некорректные данные согласия в localStorage, сбрасываем');
                localStorage.removeItem(this.config.storageKey);
                return false;
            }
            
            // Проверяем совместимость версий
            if (data.version !== this.version) {
                this.log(`Версия изменена с ${data.version} на ${this.version}, сбрасываем согласие`);
                localStorage.removeItem(this.config.storageKey);
                return false;
            }
            
            return true;
        } catch (e) {
            this.warn('Ошибка парсинга данных согласия:', e);
            localStorage.removeItem(this.config.storageKey);
            return false;
        }
    }

    // Загрузка сохраненных настроек
    loadSettings() {
        // Используем улучшенную проверку hasConsent()
        if (!this.hasConsent()) {
            this.log('Сохраненные настройки отсутствуют или некорректны');
            return;
        }
        
        const saved = localStorage.getItem(this.config.storageKey);
        try {
            const data = JSON.parse(saved);
            this.state.enabledCookies = data.enabledCookies || this.state.enabledCookies;
            this.state.isBlocked = !this.state.enabledCookies[1]; // блокируем если аналитика выключена
            
            this.log('Настройки успешно загружены:', data);
        } catch (e) {
            this.warn('Ошибка загрузки настроек:', e);
            // hasConsent() уже очистил некорректные данные
        }
    }

    // Сохранение настроек
    saveSettings() {
        const data = {
            enabledCookies: this.state.enabledCookies,
            cookieTypes: this.config.texts.cookieTypes.map((type, index) => ({
                name: type.name,
                enabled: this.state.enabledCookies[index]
            })),
            timestamp: new Date().toISOString(),
            version: this.version // Сохраняем текущую версию модуля
        };
        
        localStorage.setItem(this.config.storageKey, JSON.stringify(data));
        this.log('Настройки сохранены:', data);
        
        // Вызываем колбэк
        if (this.config.callbacks.onChange) {
            this.config.callbacks.onChange(this.getConsent());
        }
    }

    // Настройка блокировки cookie
    setupCookieBlocking() {
        this.originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
        
        const self = this;
        Object.defineProperty(document, 'cookie', {
            get() {
                return self.originalCookieDescriptor.get.call(this);
            },
            set(value) {
                if (self.shouldBlockCookie(value)) {
                    self.warn('Попытка настроить файл cookie через заголовок set-cookie заблокирована:', value);
                    self.blockedCookies.push({
                        value: value,
                        timestamp: Date.now(),
                        type: self.getCookieType(value)
                    });
                    return;
                }
                return self.originalCookieDescriptor.set.call(this, value);
            },
            configurable: true
        });
        
        this.log('Блокировка cookie настроена');
    }

    // Проверка нужно ли блокировать cookie
    shouldBlockCookie(cookieString) {
        if (!this.state.isBlocked) return false;
        
        const type = this.getCookieType(cookieString);
        const typeIndex = this.config.texts.cookieTypes.findIndex(t => t.name === type);
        
        if (typeIndex === -1) return false;
        
        return !this.state.enabledCookies[typeIndex];
    }

    // Определение типа cookie
    getCookieType(cookieString) {
        // Проверяем аналитические
        if (this.config.blockingPatterns.analytics.some(pattern => cookieString.includes(pattern))) {
            return 'analytics';
        }
        
        // Проверяем функциональные
        if (this.config.blockingPatterns.functional.some(pattern => cookieString.includes(pattern))) {
            return 'functional';
        }
        
        // По умолчанию технические
        return 'technical';
    }

    // Создание интерфейса
    createInterface() {
        // Создаем основной контейнер
        this.panelElement = document.createElement('div');
        this.panelElement.className = `iq-cookie-consent ${this.getPositionClass()}${this.getThemeClass()} iq-cookie-consent--hidden`;
        this.panelElement.innerHTML = this.generateHTML();
        
        // Добавляем в DOM
        document.body.appendChild(this.panelElement);
        
        // Применяем пользовательские стили
        this.applyCustomStyles();
        
        // Привязываем события
        this.bindEvents();
        
        this.log('Интерфейс создан (скрыт по умолчанию)');
    }

    // Получение класса позиции
    getPositionClass() {
        const positions = {
            'bottom-left': 'iq-cookie-consent--position-bottom-left',
            'bottom-right': 'iq-cookie-consent--position-bottom-right',
            'bottom-center': 'iq-cookie-consent--position-bottom-center'
        };
        return positions[this.config.position] || positions['bottom-left'];
    }

    // Получение модификатора темы
    getThemeClass() {
        if (this.config.ui && this.config.ui.theme && this.config.ui.theme !== 'light') {
            return ` iq-cookie-consent--theme-${this.config.ui.theme}`;
        }
        return '';
    }

    // Применение пользовательских CSS переменных
    applyCustomStyles() {
        if (!this.panelElement || !this.config.style) return;
        
        const styleMapping = {
            primary: '--iq-cookie-primary',
            primaryHover: '--iq-cookie-primary-hover',
            background: '--iq-cookie-background',
            text: '--iq-cookie-text',
            textSecondary: '--iq-cookie-text-secondary',
            border: '--iq-cookie-border',
            surface: '--iq-cookie-surface',
            shadow: '--iq-cookie-shadow',
            radius: '--iq-cookie-radius',
            spacing: '--iq-cookie-spacing'
        };

        // Применяем переменные к элементу панели
        Object.keys(this.config.style).forEach(key => {
            const cssProperty = styleMapping[key];
            if (cssProperty && this.config.style[key] !== undefined) {
                this.panelElement.style.setProperty(cssProperty, this.config.style[key]);
            }
        });

        this.log('Пользовательские стили применены:', this.config.style);
    }

    // Генерация HTML
    generateHTML() {
        // В простом режиме возвращаем упрощенный интерфейс
        if (this.config.mode === 'simple') {
            return this.generateSimpleHTML();
        }
        
        // Полный интерфейс
        const description = this.config.texts.description.replace(
            '{policyLink}',
            `<a href="${this.config.texts.policyUrl}" target="_blank">${this.config.texts.policyLinkText}</a>`
        );

        return `
            <div class="iq-cookie-consent__panel">
                <div class="iq-cookie-consent__header">
                    <span class="iq-cookie-consent__title">${this.config.texts.title}</span>
                    <button class="iq-cookie-consent__back-button" type="button" data-action="back">
                        <svg class="iq-cookie-consent__back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.75722 19.5156C10.089 19.8635 10.0795 20.418 9.73606 20.7541C9.39258 21.0902 8.84516 21.0806 8.51337 20.7327L4 16L8.51337 11.2673C8.84516 10.9194 9.39258 10.9098 9.73606 11.2459C10.0795 11.582 10.089 12.1365 9.75722 12.4844L7.35819 15L13.5 15C15.9853 15 18 12.9853 18 10.5C18 8.01472 15.9853 6 13.5 6L11 6C10.4477 6 10 5.55228 10 5C10 4.44772 10.4477 4 11 4L13.5 4C17.0899 4 20 6.91015 20 10.5C20 14.0899 17.0899 17 13.5 17L7.35818 17L9.75722 19.5156Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>

                <div class="iq-cookie-consent__content">
                    <div class="iq-cookie-consent__main-content">
                        <div class="iq-cookie-consent__text">
                            <p>${description}</p>
                        </div>
                        
                        <div class="iq-cookie-consent__accordion" style="display: none;">
                            ${this.config.texts.cookieTypes.map((type, index) => `
                                <div class="iq-cookie-consent__accordion-item ${this.state.expandedItems[index] ? 'iq-cookie-consent__accordion-item--expanded' : ''}" data-index="${index}">
                                    <div class="iq-cookie-consent__accordion-header" data-action="toggle" data-index="${index}">
                                        <span class="iq-cookie-consent__accordion-title">
                                            ${type.title}
                                        </span>
                                        <label class="iq-cookie-consent__switch" onclick="event.stopPropagation()">
                                            <input class="iq-cookie-consent__switch-input" type="checkbox" 
                                                   ${this.state.enabledCookies[index] ? 'checked' : ''} 
                                                   ${type.required ? 'disabled' : ''}
                                                   data-action="toggle-cookie" 
                                                   data-index="${index}">
                                            <span class="iq-cookie-consent__switch-slider"></span>
                                        </label>
                                    </div>
                                    <div class="iq-cookie-consent__accordion-content">
                                        <div>${type.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="iq-cookie-consent__buttons">
                    <button class="${this.config.ui.buttonClasses.primary}" data-action="allow-all">
                        <span class="iq-cookie-consent__button-text">${this.config.texts.buttons.allowAll}</span>
                    </button>

                    <button class="${this.config.ui.buttonClasses.secondary}" data-action="allow-selected" style="display: none;">
                        <span class="iq-cookie-consent__button-text">${this.config.texts.buttons.allowSelected}</span>
                    </button>

                    <button class="${this.config.ui.buttonClasses.secondary}" data-action="allow-necessary">
                        <span class="iq-cookie-consent__button-text">${this.config.texts.buttons.allowNecessary}</span>
                    </button>

                    <button class="${this.config.ui.buttonClasses.secondary}" type="button" data-action="settings">
                        <span class="iq-cookie-consent__button-text">${this.config.texts.buttons.settings}</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Генерация упрощенного HTML для простого режима
    generateSimpleHTML() {
        const description = this.config.texts.simpleDescription.replace(
            '{policyLink}',
            `<a href="${this.config.texts.policyUrl}" target="_blank">${this.config.texts.policyLinkText}</a>`
        );

        return `
            <div class="iq-cookie-consent__panel iq-cookie-consent__panel--simple">
                <div class="iq-cookie-consent__header">
                    <span class="iq-cookie-consent__title">${this.config.texts.title}</span>
                </div>

                <div class="iq-cookie-consent__content">
                    <div class="iq-cookie-consent__text">
                        <p>${description}</p>
                    </div>
                </div>

                <div class="iq-cookie-consent__buttons iq-cookie-consent__buttons--simple">
                    <button class="${this.config.ui.buttonClasses.primary}" data-action="accept">
                        <span class="iq-cookie-consent__button-text">${this.config.texts.buttons.accept}</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Привязка событий
    bindEvents() {
        this.panelElement.addEventListener('click', (e) => {
            // Проверяем сначала прямые атрибуты элемента, потом ищем вверх по DOM
            const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
            const index = e.target.dataset.index || e.target.closest('[data-index]')?.dataset.index;

            // Дополнительная проверка для чекбоксов - они должны обрабатываться отдельно
            if (e.target.type === 'checkbox' && e.target.dataset.action === 'toggle-cookie') {
                this.toggleCookie(parseInt(e.target.dataset.index));
                return;
            }

            switch (action) {
                case 'back':
                    this.hideSettings();
                    break;
                case 'settings':
                    this.showSettings();
                    break;
                case 'toggle':
                    this.toggleExpanded(parseInt(index));
                    break;
                case 'toggle-cookie':
                    this.toggleCookie(parseInt(index));
                    break;
                case 'allow-all':
                    this.allowAll();
                    break;
                case 'allow-selected':
                    this.allowSelected();
                    break;
                case 'allow-necessary':
                    this.allowNecessary();
                    break;
                case 'accept':
                    this.acceptSimple();
                    break;
            }
        });

        this.log('События привязаны');
    }

    // Показать панель
    show() {
        this.state.isVisible = true;
        this.panelElement.classList.remove('iq-cookie-consent--hidden');
        
        if (this.config.callbacks.onShow) {
            this.config.callbacks.onShow();
        }
        
        this.log('Панель показана');
    }

    // Скрыть панель
    hide() {
        this.state.isVisible = false;
        this.panelElement.classList.add('iq-cookie-consent--hidden');
        
        if (this.config.callbacks.onHide) {
            this.config.callbacks.onHide();
        }
        
        this.log('Панель скрыта');
    }

    // Показать настройки
    showSettings() {
        this.state.showSettings = true;
        
        // Изменяем заголовок
        const title = this.panelElement.querySelector('.iq-cookie-consent__title');
        title.textContent = this.config.texts.settingsTitle;
        
        // Показываем кнопку назад
        const backBtn = this.panelElement.querySelector('.iq-cookie-consent__back-button');
        backBtn.classList.add('iq-cookie-consent__back-button--show');
        
        // Показываем аккордеон
        const accordion = this.panelElement.querySelector('.iq-cookie-consent__accordion');
        accordion.style.display = 'block';
        
        // Обновляем кнопки
        this.updateButtons();
        
        if (this.config.callbacks.onSettingsShow) {
            this.config.callbacks.onSettingsShow();
        }
        
        this.log('Настройки показаны');
    }

    // Скрыть настройки
    hideSettings() {
        this.state.showSettings = false;
        
        // Возвращаем заголовок
        const title = this.panelElement.querySelector('.iq-cookie-consent__title');
        title.textContent = this.config.texts.title;
        
        // Скрываем кнопку назад
        const backBtn = this.panelElement.querySelector('.iq-cookie-consent__back-button');
        backBtn.classList.remove('iq-cookie-consent__back-button--show');
        
        // Скрываем аккордеон
        const accordion = this.panelElement.querySelector('.iq-cookie-consent__accordion');
        accordion.style.display = 'none';
        
        // Обновляем кнопки
        this.updateButtons();
        
        if (this.config.callbacks.onSettingsHide) {
            this.config.callbacks.onSettingsHide();
        }
        
        this.log('Настройки скрыты');
    }

    // Обновление кнопок
    updateButtons() {
        const allowSelectedBtn = this.panelElement.querySelector('[data-action="allow-selected"]');
        const settingsBtn = this.panelElement.querySelector('[data-action="settings"]');
        
        if (this.state.showSettings) {
            allowSelectedBtn.style.display = 'block';
            settingsBtn.style.display = 'none';
        } else {
            allowSelectedBtn.style.display = 'none';
            settingsBtn.style.display = 'block';
        }
    }

    // Переключение раскрытия элемента
    toggleExpanded(index) {
        // Если элемент уже открыт, закрываем его
        if (this.state.expandedItems[index]) {
            this.state.expandedItems[index] = false;
        } else {
            // Закрываем все элементы
            this.state.expandedItems = new Array(this.config.texts.cookieTypes.length).fill(false);
            // Открываем выбранный
            this.state.expandedItems[index] = true;
        }
        
        // Обновляем DOM для всех элементов
        this.config.texts.cookieTypes.forEach((_, i) => {
            const item = this.panelElement.querySelector(`[data-index="${i}"]`);
            if (item) {
                if (this.state.expandedItems[i]) {
                    item.classList.add('iq-cookie-consent__accordion-item--expanded');
                } else {
                    item.classList.remove('iq-cookie-consent__accordion-item--expanded');
                }
            }
        });
        
        this.log(`Аккордеон: элемент ${index} ${this.state.expandedItems[index] ? 'открыт' : 'закрыт'}, остальные закрыты`);
    }

    // Переключение cookie
    toggleCookie(index) {
        const cookieType = this.config.texts.cookieTypes[index];
        if (cookieType.required) return; // обязательные нельзя отключить
        
        this.state.enabledCookies[index] = !this.state.enabledCookies[index];
        
        const checkbox = this.panelElement.querySelector(`input[data-index="${index}"]`);
        if (checkbox) {
            checkbox.checked = this.state.enabledCookies[index];
        }
        
        this.log(`Cookie ${cookieType.name} переключен:`, this.state.enabledCookies[index]);
    }

    // Разрешить все
    allowAll() {
        this.state.enabledCookies = this.config.texts.cookieTypes.map(() => true);
        this.saveSettings();
        this.unblockCookies();
        this.hide();
        
        if (this.config.callbacks.onAccept) {
            this.config.callbacks.onAccept(this.getConsent());
        }
        
        this.log('Разрешены все cookie');
    }

    // Разрешить выбранные
    allowSelected() {
        this.saveSettings();
        
        // Проверяем нужно ли разблокировать
        const hasAnalytics = this.state.enabledCookies[1]; // предполагаем что аналитика второй тип
        if (hasAnalytics) {
            this.unblockCookies();
        } else {
            this.blockCookies();
        }
        
        this.hide();
        
        if (this.config.callbacks.onAccept) {
            this.config.callbacks.onAccept(this.getConsent());
        }
        
        this.log('Разрешены выбранные cookie:', this.state.enabledCookies);
    }

    // Разрешить только обязательные
    allowNecessary() {
        this.state.enabledCookies = this.config.texts.cookieTypes.map(type => type.required);
        this.saveSettings();
        this.blockCookies();
        this.hide();
        
        if (this.config.callbacks.onReject) {
            this.config.callbacks.onReject(this.getConsent());
        }
        
        this.log('Разрешены только обязательные cookie');
    }

    // Принять в простом режиме (все cookie уже разрешены)
    acceptSimple() {
        // В простом режиме все уже разрешено, просто сохраняем
        this.saveSettings();
        this.hide();
        
        if (this.config.callbacks.onAccept) {
            this.config.callbacks.onAccept(this.getConsent());
        }
        
        this.log('Согласие принято в простом режиме');
    }

    // Разблокировка cookie
    unblockCookies() {
        this.state.isBlocked = false;
        this.log('Cookie разблокированы');
    }

    // Блокировка cookie
    blockCookies() {
        this.state.isBlocked = true;
        this.deleteAnalyticsCookies();
        this.log('Cookie заблокированы');
    }

    // Удаление аналитических cookie
    deleteAnalyticsCookies() {
        const cookies = document.cookie.split(';');
        const allPatterns = [
            ...this.config.blockingPatterns.analytics,
            ...this.config.blockingPatterns.functional
        ];
        
        cookies.forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            if (allPatterns.some(pattern => name.includes(pattern))) {
                const domains = ['', `.${window.location.hostname}`, '.yandex.ru', '.mail.ru'];
                domains.forEach(domain => {
                    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; ${domain ? `domain=${domain}` : ''}`;
                });
            }
        });
    }

    // Публичные методы
    getConsent() {
        return {
            cookies: this.config.texts.cookieTypes.map((type, index) => ({
                name: type.name,
                title: type.title,
                enabled: this.state.enabledCookies[index],
                required: type.required
            })),
            timestamp: new Date().toISOString(),
            version: this.version // Актуальная версия модуля
        };
    }

    updateConfig(newConfig) {
        this.config = this.mergeConfig(this.config, newConfig);
        
        // Обновляем пользовательские стили если панель создана
        if (this.panelElement) {
            this.applyCustomStyles();
        }
        
        this.log('Конфигурация обновлена');
    }

    reset() {
        localStorage.removeItem(this.config.storageKey);
        this.initializeState();
        this.blockCookies();
        if (this.config.autoShow) {
            this.show();
        }
        this.log('Настройки сброшены');
    }

    destroy() {
        if (this.panelElement) {
            this.panelElement.remove();
        }
        
        if (this.originalCookieDescriptor) {
            Object.defineProperty(document, 'cookie', this.originalCookieDescriptor);
        }
        
        this.log('Компонент уничтожен');
    }
}

// Фабричная функция для создания экземпляра
function createCookieConsent(config = {}) {
    return new CookieConsentConfigurable(config);
}

// Автоинициализация если есть глобальная конфигурация
document.addEventListener('DOMContentLoaded', () => {
    if (window.CookieConsentConfig) {
        window.cookieConsent = createCookieConsent(window.CookieConsentConfig);
    }
});

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CookieConsentConfigurable, createCookieConsent };
} else {
    window.CookieConsentConfigurable = CookieConsentConfigurable;
    window.createCookieConsent = createCookieConsent;
}

// ES6 экспорт для современных модульных сборщиков
export { CookieConsentConfigurable, createCookieConsent }
