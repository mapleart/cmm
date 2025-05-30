/*!
 * Cookie Consent Configurable - Vanilla JS
 * Полноценный модуль с расширенными настройками
 * Version: 2.1.0
 */
class a {
  constructor(e = {}) {
    this.version = "2.1.0", this.defaultConfig = {
      // Основные настройки
      storageKey: "cookie_consent_configurable",
      debug: !1,
      autoShow: !0,
      position: "bottom-left",
      // bottom-left, bottom-right, bottom-center
      mode: "full",
      // 'full' - полный режим с настройками, 'simple' - простой баннер
      // Тексты интерфейса
      texts: {
        // Основная панель
        title: "Cookie",
        description: "Наш сайт использует файлы cookie для аналитики и персонализации. Продолжая использовать сайт после ознакомления с этим сообщением и предоставления своего выбора, вы соглашаетесь с нашей {policyLink}.",
        policyLinkText: "Политикой обработки персональных данных",
        policyUrl: "/privacy-policy",
        // Простой режим
        simpleDescription: 'Мы используем cookie для улучшения работы сайта. Нажимая "Принять", вы соглашаетесь с {policyLink}.',
        // Панель настроек
        settingsTitle: "Настройка cookie",
        settingsDescription: [
          "Технические cookie нужны для стабильной работы.",
          "Аналитические и другие cookie помогают нам делать сайт лучше для вас: понимать, что вам интересно, и улучшать навигацию.",
          "Эти данные анонимны. Разрешая их, вы вносите свой вклад в развитие нашего сайта. Подробности в Политике обработки персональных данных."
        ],
        // Кнопки
        buttons: {
          allowAll: "Разрешить все",
          allowSelected: "Разрешить выбранные",
          allowNecessary: "Разрешить обязательные",
          settings: "Настройка",
          back: "Назад",
          // Простой режим
          accept: "Принять",
          decline: "Отклонить"
        },
        // Типы cookie
        cookieTypes: [
          {
            name: "technical",
            title: "Технические cookie (всегда активны)",
            description: "Эти файлы cookie необходимы для правильной работы сайта и его основных функций (например, навигация, сохранение сессии, работа форм). Без них сайт не сможет функционировать должным образом. Они не собирают информацию для маркетинга или отслеживания. Этот тип cookie нельзя отключить.",
            required: !0,
            enabled: !0
          },
          {
            name: "analytics",
            title: "Аналитические/Рекламные cookie",
            description: "Эти файлы cookie позволяют нам собирать информацию о том, как посетители используют наш сайт (например, какие страницы посещают чаще, сколько времени проводят на сайте, возникают ли ошибки). Эта информация собирается в агрегированном или обезличенном виде и используется для анализа и улучшения работы сайта. Данные обрабатываются Яндекс.Метрикой и Top.Mail.Ru согласно их политикам конфиденциальности.",
            required: !1,
            enabled: !1
          },
          {
            name: "functional",
            title: "Функциональные (остальные) cookie",
            description: "Эти файлы cookie позволяют сайту запоминать сделанный вами выбор и предоставлять расширенные функции для вашего удобства. Они также могут использоваться для обеспечения работы встроенных на сайт сервисов (например, видеоплееров от Vimeo, виджетов социальных сетей VK), которые улучшают ваш опыт взаимодействия с сайтом.",
            required: !1,
            enabled: !1
          }
        ]
      },
      // Паттерны для блокировки cookie
      blockingPatterns: {
        analytics: [
          // Яндекс.Метрика
          "_ym_uid",
          "_ym_d",
          "_ym_isad",
          "_ym_visorc",
          "yandexuid",
          "ymex",
          "yabs-sid",
          "_ym_",
          "yp",
          "ys",
          // Top.Mail.Ru  
          "_tmr_lvid",
          "_tmr_lvidTS",
          "_tmr_reqNum",
          "tmr_",
          "mailru",
          // Google Analytics
          "_ga",
          "_gid",
          "_gat",
          "gtm",
          "_gtm",
          "__utm",
          // Общие аналитические
          "_fbp",
          "_fbc",
          "amplitude"
        ],
        functional: [
          "vimeo",
          "youtube",
          "player",
          "embed"
        ]
      },
      // Настройки UI
      ui: {
        showCloseButton: !1,
        closeOnBackdropClick: !1,
        animationDuration: 300,
        theme: "light",
        // light, dark, или любое пользовательское значение
        // CSS классы для кнопок (можно заменить на свои)
        buttonClasses: {
          primary: "iq-cookie-consent__button iq-cookie-consent__button--primary",
          // Акцентные: "Принять", "Разрешить все"
          secondary: "iq-cookie-consent__button iq-cookie-consent__button--secondary"
          // Обычные: остальные кнопки
        }
      },
      // Настройки стилей (CSS переменные)
      style: {
        primary: "#007cba",
        // Основной цвет
        primaryHover: "#005a82",
        // Цвет при наведении
        background: "#ffffff",
        // Фон панели
        text: "#333333",
        // Цвет основного текста
        textSecondary: "#555555",
        // Цвет вторичного текста
        border: "#e0e0e0",
        // Цвет границ
        surface: "#f9f9f9",
        // Цвет поверхностей
        shadow: "0 4px 12px rgba(0,0,0,0.15)",
        // Тень
        radius: "8px",
        // Радиус скругления
        spacing: "20px"
        // Основные отступы
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
    }, this.config = this.mergeConfig(this.defaultConfig, e), this.state = {
      isVisible: !1,
      showSettings: !1,
      expandedItems: [],
      enabledCookies: [],
      isBlocked: !0
    }, this.initializeState(), this.panelElement = null, this.originalCookieDescriptor = null, this.blockedCookies = [], this.init();
  }
  // Глубокое объединение конфигураций
  mergeConfig(e, t) {
    const i = JSON.parse(JSON.stringify(e)), o = (s, n) => {
      for (const c in n)
        n[c] && typeof n[c] == "object" && !Array.isArray(n[c]) ? (s[c] = s[c] || {}, o(s[c], n[c])) : s[c] = n[c];
    };
    return o(i, t), i;
  }
  // Инициализация состояния
  initializeState() {
    this.state.expandedItems = new Array(this.config.texts.cookieTypes.length).fill(!1), this.config.mode === "simple" ? (this.state.enabledCookies = this.config.texts.cookieTypes.map(() => !0), this.state.isBlocked = !1) : (this.state.enabledCookies = this.config.texts.cookieTypes.map((e) => e.enabled), this.state.isBlocked = !0), this.log("Состояние инициализировано:", this.state), this.log("Режим работы:", this.config.mode);
  }
  // Основная инициализация
  init() {
    this.log("Инициализация Cookie Consent..."), this.loadSettings(), this.config.mode === "full" && this.setupCookieBlocking(), this.createInterface(), this.config.autoShow && !this.hasConsent() && this.show(), this.log("Cookie Consent инициализирован");
  }
  // Логирование
  log(e, ...t) {
    this.config.debug && console.log(`[CookieConsent] ${e}`, ...t);
  }
  warn(e, ...t) {
    console.warn(`[CookieConsent] ${e}`, ...t);
  }
  // Проверка наличия согласия
  hasConsent() {
    const e = localStorage.getItem(this.config.storageKey);
    if (!e) return !1;
    try {
      const t = JSON.parse(e);
      return !t.version || !t.enabledCookies || !Array.isArray(t.enabledCookies) ? (this.log("Некорректные данные согласия в localStorage, сбрасываем"), localStorage.removeItem(this.config.storageKey), !1) : t.version !== this.version ? (this.log(`Версия изменена с ${t.version} на ${this.version}, сбрасываем согласие`), localStorage.removeItem(this.config.storageKey), !1) : !0;
    } catch (t) {
      return this.warn("Ошибка парсинга данных согласия:", t), localStorage.removeItem(this.config.storageKey), !1;
    }
  }
  // Загрузка сохраненных настроек
  loadSettings() {
    if (!this.hasConsent()) {
      this.log("Сохраненные настройки отсутствуют или некорректны");
      return;
    }
    const e = localStorage.getItem(this.config.storageKey);
    try {
      const t = JSON.parse(e);
      this.state.enabledCookies = t.enabledCookies || this.state.enabledCookies, this.state.isBlocked = !this.state.enabledCookies[1], this.log("Настройки успешно загружены:", t);
    } catch (t) {
      this.warn("Ошибка загрузки настроек:", t);
    }
  }
  // Сохранение настроек
  saveSettings() {
    const e = {
      enabledCookies: this.state.enabledCookies,
      cookieTypes: this.config.texts.cookieTypes.map((t, i) => ({
        name: t.name,
        enabled: this.state.enabledCookies[i]
      })),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: this.version
      // Сохраняем текущую версию модуля
    };
    localStorage.setItem(this.config.storageKey, JSON.stringify(e)), this.log("Настройки сохранены:", e), this.config.callbacks.onChange && this.config.callbacks.onChange(this.getConsent());
  }
  // Настройка блокировки cookie
  setupCookieBlocking() {
    this.originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
    const e = this;
    Object.defineProperty(document, "cookie", {
      get() {
        return e.originalCookieDescriptor.get.call(this);
      },
      set(t) {
        if (e.shouldBlockCookie(t)) {
          e.warn("Попытка настроить файл cookie через заголовок set-cookie заблокирована:", t), e.blockedCookies.push({
            value: t,
            timestamp: Date.now(),
            type: e.getCookieType(t)
          });
          return;
        }
        return e.originalCookieDescriptor.set.call(this, t);
      },
      configurable: !0
    }), this.log("Блокировка cookie настроена");
  }
  // Проверка нужно ли блокировать cookie
  shouldBlockCookie(e) {
    if (!this.state.isBlocked) return !1;
    const t = this.getCookieType(e), i = this.config.texts.cookieTypes.findIndex((o) => o.name === t);
    return i === -1 ? !1 : !this.state.enabledCookies[i];
  }
  // Определение типа cookie
  getCookieType(e) {
    return this.config.blockingPatterns.analytics.some((t) => e.includes(t)) ? "analytics" : this.config.blockingPatterns.functional.some((t) => e.includes(t)) ? "functional" : "technical";
  }
  // Создание интерфейса
  createInterface() {
    this.panelElement = document.createElement("div"), this.panelElement.className = `iq-cookie-consent ${this.getPositionClass()}${this.getThemeClass()} iq-cookie-consent--hidden`, this.panelElement.innerHTML = this.generateHTML(), document.body.appendChild(this.panelElement), this.applyCustomStyles(), this.bindEvents(), this.log("Интерфейс создан (скрыт по умолчанию)");
  }
  // Получение класса позиции
  getPositionClass() {
    const e = {
      "bottom-left": "iq-cookie-consent--position-bottom-left",
      "bottom-right": "iq-cookie-consent--position-bottom-right",
      "bottom-center": "iq-cookie-consent--position-bottom-center"
    };
    return e[this.config.position] || e["bottom-left"];
  }
  // Получение модификатора темы
  getThemeClass() {
    return this.config.ui && this.config.ui.theme && this.config.ui.theme !== "light" ? ` iq-cookie-consent--theme-${this.config.ui.theme}` : "";
  }
  // Применение пользовательских CSS переменных
  applyCustomStyles() {
    if (!this.panelElement || !this.config.style) return;
    const e = {
      primary: "--iq-cookie-primary",
      primaryHover: "--iq-cookie-primary-hover",
      background: "--iq-cookie-background",
      text: "--iq-cookie-text",
      textSecondary: "--iq-cookie-text-secondary",
      border: "--iq-cookie-border",
      surface: "--iq-cookie-surface",
      shadow: "--iq-cookie-shadow",
      radius: "--iq-cookie-radius",
      spacing: "--iq-cookie-spacing"
    };
    Object.keys(this.config.style).forEach((t) => {
      const i = e[t];
      i && this.config.style[t] !== void 0 && this.panelElement.style.setProperty(i, this.config.style[t]);
    }), this.log("Пользовательские стили применены:", this.config.style);
  }
  // Генерация HTML
  generateHTML() {
    if (this.config.mode === "simple")
      return this.generateSimpleHTML();
    const e = this.config.texts.description.replace(
      "{policyLink}",
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
                            <p>${e}</p>
                        </div>
                        
                        <div class="iq-cookie-consent__accordion" style="display: none;">
                            ${this.config.texts.cookieTypes.map((t, i) => `
                                <div class="iq-cookie-consent__accordion-item ${this.state.expandedItems[i] ? "iq-cookie-consent__accordion-item--expanded" : ""}" data-index="${i}">
                                    <div class="iq-cookie-consent__accordion-header" data-action="toggle" data-index="${i}">
                                        <span class="iq-cookie-consent__accordion-title">
                                            ${t.title}
                                        </span>
                                        <label class="iq-cookie-consent__switch" onclick="event.stopPropagation()">
                                            <input class="iq-cookie-consent__switch-input" type="checkbox" 
                                                   ${this.state.enabledCookies[i] ? "checked" : ""} 
                                                   ${t.required ? "disabled" : ""}
                                                   data-action="toggle-cookie" 
                                                   data-index="${i}">
                                            <span class="iq-cookie-consent__switch-slider"></span>
                                        </label>
                                    </div>
                                    <div class="iq-cookie-consent__accordion-content">
                                        <div>${t.description}</div>
                                    </div>
                                </div>
                            `).join("")}
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
    const e = this.config.texts.simpleDescription.replace(
      "{policyLink}",
      `<a href="${this.config.texts.policyUrl}">${this.config.texts.policyLinkText}</a>`
    );
    return `
            <div class="iq-cookie-consent__panel iq-cookie-consent__panel--simple">
                <div class="iq-cookie-consent__header">
                    <span class="iq-cookie-consent__title">${this.config.texts.title}</span>
                </div>

                <div class="iq-cookie-consent__content">
                    <div class="iq-cookie-consent__text">
                        <p>${e}</p>
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
    this.panelElement.addEventListener("click", (e) => {
      var o, s;
      const t = e.target.dataset.action || ((o = e.target.closest("[data-action]")) == null ? void 0 : o.dataset.action), i = e.target.dataset.index || ((s = e.target.closest("[data-index]")) == null ? void 0 : s.dataset.index);
      if (e.target.type === "checkbox" && e.target.dataset.action === "toggle-cookie") {
        this.toggleCookie(parseInt(e.target.dataset.index));
        return;
      }
      switch (t) {
        case "back":
          this.hideSettings();
          break;
        case "settings":
          this.showSettings();
          break;
        case "toggle":
          this.toggleExpanded(parseInt(i));
          break;
        case "toggle-cookie":
          this.toggleCookie(parseInt(i));
          break;
        case "allow-all":
          this.allowAll();
          break;
        case "allow-selected":
          this.allowSelected();
          break;
        case "allow-necessary":
          this.allowNecessary();
          break;
        case "accept":
          this.acceptSimple();
          break;
      }
    }), this.log("События привязаны");
  }
  // Показать панель
  show() {
    this.state.isVisible = !0, this.panelElement.classList.remove("iq-cookie-consent--hidden"), this.config.callbacks.onShow && this.config.callbacks.onShow(), this.log("Панель показана");
  }
  // Скрыть панель
  hide() {
    this.state.isVisible = !1, this.panelElement.classList.add("iq-cookie-consent--hidden"), this.config.callbacks.onHide && this.config.callbacks.onHide(), this.log("Панель скрыта");
  }
  // Показать настройки
  showSettings() {
    this.state.showSettings = !0;
    const e = this.panelElement.querySelector(".iq-cookie-consent__title");
    e.textContent = this.config.texts.settingsTitle, this.panelElement.querySelector(".iq-cookie-consent__back-button").classList.add("iq-cookie-consent__back-button--show");
    const i = this.panelElement.querySelector(".iq-cookie-consent__accordion");
    i.style.display = "block", this.updateButtons(), this.config.callbacks.onSettingsShow && this.config.callbacks.onSettingsShow(), this.log("Настройки показаны");
  }
  // Скрыть настройки
  hideSettings() {
    this.state.showSettings = !1;
    const e = this.panelElement.querySelector(".iq-cookie-consent__title");
    e.textContent = this.config.texts.title, this.panelElement.querySelector(".iq-cookie-consent__back-button").classList.remove("iq-cookie-consent__back-button--show");
    const i = this.panelElement.querySelector(".iq-cookie-consent__accordion");
    i.style.display = "none", this.updateButtons(), this.config.callbacks.onSettingsHide && this.config.callbacks.onSettingsHide(), this.log("Настройки скрыты");
  }
  // Обновление кнопок
  updateButtons() {
    const e = this.panelElement.querySelector('[data-action="allow-selected"]'), t = this.panelElement.querySelector('[data-action="settings"]');
    this.state.showSettings ? (e.style.display = "block", t.style.display = "none") : (e.style.display = "none", t.style.display = "block");
  }
  // Переключение раскрытия элемента
  toggleExpanded(e) {
    this.state.expandedItems[e] ? this.state.expandedItems[e] = !1 : (this.state.expandedItems = new Array(this.config.texts.cookieTypes.length).fill(!1), this.state.expandedItems[e] = !0), this.config.texts.cookieTypes.forEach((t, i) => {
      const o = this.panelElement.querySelector(`[data-index="${i}"]`);
      o && (this.state.expandedItems[i] ? o.classList.add("iq-cookie-consent__accordion-item--expanded") : o.classList.remove("iq-cookie-consent__accordion-item--expanded"));
    }), this.log(`Аккордеон: элемент ${e} ${this.state.expandedItems[e] ? "открыт" : "закрыт"}, остальные закрыты`);
  }
  // Переключение cookie
  toggleCookie(e) {
    const t = this.config.texts.cookieTypes[e];
    if (t.required) return;
    this.state.enabledCookies[e] = !this.state.enabledCookies[e];
    const i = this.panelElement.querySelector(`input[data-index="${e}"]`);
    i && (i.checked = this.state.enabledCookies[e]), this.log(`Cookie ${t.name} переключен:`, this.state.enabledCookies[e]);
  }
  // Разрешить все
  allowAll() {
    this.state.enabledCookies = this.config.texts.cookieTypes.map(() => !0), this.saveSettings(), this.unblockCookies(), this.hide(), this.config.callbacks.onAccept && this.config.callbacks.onAccept(this.getConsent()), this.log("Разрешены все cookie");
  }
  // Разрешить выбранные
  allowSelected() {
    this.saveSettings(), this.state.enabledCookies[1] ? this.unblockCookies() : this.blockCookies(), this.hide(), this.config.callbacks.onAccept && this.config.callbacks.onAccept(this.getConsent()), this.log("Разрешены выбранные cookie:", this.state.enabledCookies);
  }
  // Разрешить только обязательные
  allowNecessary() {
    this.state.enabledCookies = this.config.texts.cookieTypes.map((e) => e.required), this.saveSettings(), this.blockCookies(), this.hide(), this.config.callbacks.onReject && this.config.callbacks.onReject(this.getConsent()), this.log("Разрешены только обязательные cookie");
  }
  // Принять в простом режиме (все cookie уже разрешены)
  acceptSimple() {
    this.saveSettings(), this.hide(), this.config.callbacks.onAccept && this.config.callbacks.onAccept(this.getConsent()), this.log("Согласие принято в простом режиме");
  }
  // Разблокировка cookie
  unblockCookies() {
    this.state.isBlocked = !1, this.log("Cookie разблокированы");
  }
  // Блокировка cookie
  blockCookies() {
    this.state.isBlocked = !0, this.deleteAnalyticsCookies(), this.log("Cookie заблокированы");
  }
  // Удаление аналитических cookie
  deleteAnalyticsCookies() {
    const e = document.cookie.split(";"), t = [
      ...this.config.blockingPatterns.analytics,
      ...this.config.blockingPatterns.functional
    ];
    e.forEach((i) => {
      const o = i.split("=")[0].trim();
      t.some((s) => o.includes(s)) && ["", `.${window.location.hostname}`, ".yandex.ru", ".mail.ru"].forEach((n) => {
        document.cookie = `${o}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; ${n ? `domain=${n}` : ""}`;
      });
    });
  }
  // Публичные методы
  getConsent() {
    return {
      cookies: this.config.texts.cookieTypes.map((e, t) => ({
        name: e.name,
        title: e.title,
        enabled: this.state.enabledCookies[t],
        required: e.required
      })),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: this.version
      // Актуальная версия модуля
    };
  }
  updateConfig(e) {
    this.config = this.mergeConfig(this.config, e), this.panelElement && this.applyCustomStyles(), this.log("Конфигурация обновлена");
  }
  reset() {
    localStorage.removeItem(this.config.storageKey), this.initializeState(), this.blockCookies(), this.config.autoShow && this.show(), this.log("Настройки сброшены");
  }
  destroy() {
    this.panelElement && this.panelElement.remove(), this.originalCookieDescriptor && Object.defineProperty(document, "cookie", this.originalCookieDescriptor), this.log("Компонент уничтожен");
  }
}
function l(r = {}) {
  return new a(r);
}
document.addEventListener("DOMContentLoaded", () => {
  window.CookieConsentConfig && (window.cookieConsent = l(window.CookieConsentConfig));
});
typeof module < "u" && module.exports ? module.exports = { CookieConsentConfigurable: a, createCookieConsent: l } : (window.CookieConsentConfigurable = a, window.createCookieConsent = l);
typeof window < "u" && (window.CookieConsentConfigurable = a, window.createCookieConsent = l);
export {
  a as CookieConsentConfigurable,
  l as createCookieConsent,
  a as default
};
