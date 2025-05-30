<?php
/**
 * Cookie Consent Manager (CCM)
 * Автоматический менеджер для скачивания и подключения виджета согласия на куки
 *
 * Установка:
 * 1. Поместите этот файл в корень сайта
 * 2. Создайте папку /assets/cookie-consent/ с правами на запись
 * 3. Установите токен безопасности в переменной $security_token
 *
 * Использование:
 * - Для обновления файлов: https://yoursite.com/ccm.php?action=update&token=ваш_токен
 * - В коде PHP: cookie_consent_init($config);
 */

class CookieConsentManager {

    private $base_dir;
    private $assets_dir;
    private $security_token;
    private $github_repo = 'https://raw.githubusercontent.com/mapleart/cmm/refs/heads/main/dist';

    // Файлы для скачивания из репозитория
    private $files = array(
        'ccm.js' => 'assets/cookie-consent/cookie-consent-configurable.js',
        'ccm.css' => 'assets/cookie-consent/cookie-consent-styles.css'
    );

    public function __construct() {
        $this->base_dir = __DIR__;
        $this->assets_dir = $this->base_dir . '/assets/cookie-consent/';

        // ⚠️ ВАЖНО: Измените этот токен на свой уникальный!
        $this->security_token = 'sdafewr3wrsdfa';

        // Создаем папку для файлов если её нет
        if (!file_exists($this->assets_dir)) {
            mkdir($this->assets_dir, 0755, true);
        }
    }

    /**
     * Обработка веб-запросов
     */
    public function handleRequest() {
        $action = isset($_GET['action']) ? $_GET['action'] : '';
        $token = isset($_GET['token']) ? $_GET['token'] : '';

        // Проверяем токен для всех запросов
        if ($token !== $this->security_token) {
            http_response_code(403);

            // Для API запросов возвращаем JSON
            if (!empty($action)) {
                header('Content-Type: application/json');
                echo json_encode(array('error' => 'Неверный токен безопасности'));
                return;
            }

            // Для веб-интерфейса показываем 403 страницу
            $this->show403();
            return;
        }

        if ($action === 'update') {
            $this->handleUpdate($token);
        } elseif ($action === 'status') {
            $this->handleStatus($token);
        } else {
            $this->showInterface();
        }
    }

    /**
     * Обновление файлов из репозитория
     */
    private function handleUpdate($token) {
        header('Content-Type: application/json');

        $results = array();
        $errors = array();

        foreach ($this->files as $source => $target) {
            $url = $this->github_repo . $source;
            $target_path = $this->base_dir . '/' . $target;

            $content = $this->downloadFile($url);

            if ($content !== false) {
                if (file_put_contents($target_path, $content)) {
                    $results[] = "✅ {$source} обновлен";
                } else {
                    $errors[] = "❌ Ошибка записи {$source}";
                }
            } else {
                $errors[] = "❌ Ошибка скачивания {$source}";
            }
        }

        echo json_encode(array(
            'success' => count($errors) === 0,
            'results' => $results,
            'errors' => $errors,
            'timestamp' => date('Y-m-d H:i:s')
        ));
    }

    /**
     * Статус файлов
     */
    private function handleStatus($token) {
        header('Content-Type: application/json');

        $status = array();
        foreach ($this->files as $source => $target) {
            $path = $this->base_dir . '/' . $target;
            $status[$source] = array(
                'exists' => file_exists($path),
                'size' => file_exists($path) ? filesize($path) : 0,
                'modified' => file_exists($path) ? date('Y-m-d H:i:s', filemtime($path)) : null
            );
        }

        echo json_encode($status);
    }

    /**
     * Страница 403 ошибки
     */
    private function show403() {
        ?>
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>403 - Доступ запрещен</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    max-width: 600px;
                    margin: 100px auto;
                    padding: 20px;
                    text-align: center;
                    background: #f8f9fa;
                }
                .error-container {
                    background: white;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    padding: 40px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .error-code {
                    font-size: 72px;
                    font-weight: bold;
                    color: #dc3545;
                    margin-bottom: 20px;
                }
                .error-message {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .error-description {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                .access-form {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 6px;
                    margin-top: 20px;
                }
                .form-group {
                    margin: 10px 0;
                    text-align: left;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                .form-group input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #ced4da;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                .btn {
                    padding: 10px 20px;
                    background: #007cba;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                }
                .btn:hover {
                    background: #005a82;
                }
            </style>
        </head>
        <body>
        <div class="error-container">
            <div class="error-code">403</div>
            <div class="error-message">Доступ запрещен</div>
            <div class="error-description">
                Для доступа к менеджеру cookie необходим токен безопасности.<br>
                Введите токен в URL: <code>?token=ваш_токен</code>
            </div>

            <div class="access-form">
                <form method="GET">
                    <div class="form-group">
                        <label for="token">Токен безопасности:</label>
                        <input type="password" id="token" name="token" placeholder="Введите токен" required>
                    </div>
                    <button type="submit" class="btn">🔓 Войти</button>
                </form>
            </div>
        </div>
        </body>
        </html>
        <?php
    }

    /**
     * Скачивание файла
     */
    private function downloadFile($url) {
        $context = stream_context_create(array(
            'http' => array(
                'timeout' => 30,
                'user_agent' => 'Cookie Consent Manager/1.0'
            )
        ));

        return file_get_contents($url, false, $context);
    }

    /**
     * Веб-интерфейс
     */
    private function showInterface() {
        ?>
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cookie Consent Manager</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .card { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
                .btn { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
                .btn-primary { background: #007cba; color: white; }
                .btn-primary:hover { background: #005a82; }
                .btn-secondary { background: #6c757d; color: white; }
                .status { padding: 10px; border-radius: 4px; margin: 10px 0; }
                .status.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
                .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
                .status.info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
                .code { background: #f8f9fa; padding: 15px; border-radius: 4px; font-family: 'Monaco', 'Consolas', monospace; font-size: 14px; margin: 10px 0; }
                .form-group { margin: 15px 0; }
                .form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
                .form-group input { width: 100%; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dee2e6; }
                th { background: #f8f9fa; font-weight: 600; }
                .badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
                .badge.success { background: #d4edda; color: #155724; }
                .badge.error { background: #f8d7da; color: #721c24; }
            </style>
        </head>
        <body>
        <div class="header">
            <h1>🍪 Cookie Consent Manager</h1>
            <p>Менеджер для автоматического обновления виджета согласия на куки</p>
        </div>

        <div class="card">
            <h2>📊 Статус файлов</h2>
            <div id="status-container">
                <p>⏳ Загрузка статуса...</p>
            </div>
            <button class="btn btn-secondary" onclick="loadStatus()">🔄 Обновить статус</button>
        </div>

        <div class="card">
            <h2>⬇️ Обновление файлов</h2>
            <button class="btn btn-primary" onclick="updateFiles()">📥 Обновить файлы</button>
            <div id="update-result"></div>
        </div>

        <div class="card">
            <h2>🔧 Использование</h2>
            <p>Добавьте в ваши PHP файлы:</p>

            <div class="code">&lt;?php
                require_once 'ccm.php';
                cookie_consent_init();
                ?&gt;</div>
        </div>

        <script>
            // Получаем токен из URL
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            function loadStatus() {
                const statusContainer = document.getElementById('status-container');

                if (!token) {
                    statusContainer.innerHTML = '<div class="status error">❌ Токен не найден в URL</div>';
                    return;
                }

                statusContainer.innerHTML = '<p>⏳ Загрузка статуса...</p>';

                fetch(`?action=status&token=${encodeURIComponent(token)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            statusContainer.innerHTML = `<div class="status error">❌ ${data.error}</div>`;
                            return;
                        }

                        let html = '<table><tr><th>Файл</th><th>Статус</th><th>Размер</th><th>Изменен</th></tr>';

                        for (const [file, info] of Object.entries(data)) {
                            const status = info.exists ?
                                '<span class="badge success">✅ Существует</span>' :
                                '<span class="badge error">❌ Отсутствует</span>';

                            html += `<tr>
                            <td>${file}</td>
                            <td>${status}</td>
                            <td>${info.size ? (info.size + ' байт') : '-'}</td>
                            <td>${info.modified || '-'}</td>
                        </tr>`;
                        }

                        html += '</table>';
                        statusContainer.innerHTML = html;
                    })
                    .catch(error => {
                        statusContainer.innerHTML = '<div class="status error">❌ Ошибка сети: ' + error.message + '</div>';
                    });
            }

            function updateFiles() {
                const resultDiv = document.getElementById('update-result');

                if (!token) {
                    resultDiv.innerHTML = '<div class="status error">❌ Токен не найден в URL</div>';
                    return;
                }

                resultDiv.innerHTML = '<div class="status info">⏳ Обновление файлов...</div>';

                fetch(`?action=update&token=${encodeURIComponent(token)}`)
                    .then(response => response.json())
                    .then(data => {
                        let html = '';

                        if (data.success) {
                            html += '<div class="status success">✅ Файлы успешно обновлены!</div>';
                        } else {
                            html += '<div class="status error">❌ Ошибки при обновлении</div>';
                        }

                        if (data.results && data.results.length > 0) {
                            html += '<ul>';
                            data.results.forEach(result => {
                                html += `<li>${result}</li>`;
                            });
                            html += '</ul>';
                        }

                        if (data.errors && data.errors.length > 0) {
                            html += '<div class="status error"><strong>Ошибки:</strong><ul>';
                            data.errors.forEach(error => {
                                html += `<li>${error}</li>`;
                            });
                            html += '</ul></div>';
                        }

                        html += `<p><small>Время обновления: ${data.timestamp}</small></p>`;

                        resultDiv.innerHTML = html;
                        loadStatus(); // Обновляем статус после обновления файлов
                    })
                    .catch(error => {
                        resultDiv.innerHTML = '<div class="status error">❌ Ошибка сети: ' + error.message + '</div>';
                    });
            }

            // Автоматически загружаем статус при загрузке страницы
            document.addEventListener('DOMContentLoaded', function() {
                loadStatus();
            });
        </script>
        </body>
        </html>
        <?php
    }
}

/**
 * Функция инициализации виджета (для использования в PHP коде сайта)
 */
function cookie_consent_init($config = array()) {
    $manager = new CookieConsentManager();

    // Дефолтные настройки (соответствуют вашей JS конфигурации)
    $default_config = array(
        'debug' => false,
        'autoShow' => true,
        'position' => 'bottom-right',
        'mode' => 'simple',
        'language' => 'ru',
        'autoInit' => true,

        // UI настройки
        'ui' => array(

        ),

        // Стили
        'style' => array(
            'primary' => '#589a49',
            'primaryHover' => '#589a49'
        ),

        // Тексты
        'texts' => array(
            'title' => 'Cookie',
            'description' => 'Этот веб-сайт использует файлы cookies, чтобы обеспечить удобную работу пользователей с ним и функциональные возможности сайта. Нажимая кнопку «Разрешить все», Вы соглашаетесь с условиями использования файлов cookies в соответствии c {policyLink}.',
            'simpleDescription' => 'Этот веб-сайт использует файлы cookies, чтобы обеспечить удобную работу пользователей с ним и функциональные возможности сайта. Нажимая кнопку «Принять», Вы соглашаетесь с условиями использования файлов cookies в соответствии c {policyLink}.',
            'policyLinkText' => '«Политикой в отношении использования файлов cookie»',
            'policyUrl' => '/policy'
        ),

        // Категории (для расширенного режима)
        'categories' => array(
            'technical' => array('enabled' => true, 'required' => true),
            'analytics' => array('enabled' => false, 'required' => false),
            'functional' => array('enabled' => false, 'required' => false)
        )
    );

    $config = array_merge($default_config, $config);

    // Подключаем CSS
    echo '<link rel="stylesheet" href="/assets/cookie-consent/cookie-consent-styles.css">' . "\n";

    // Подключаем JS с настройками
    echo '<script data-skip-moving="true">window.cookieConsentConfig = ' . json_encode($config) . ';</script>' . "\n";
    echo '<script src="/assets/cookie-consent/cookie-consent-configurable.js" data-skip-moving="true"></script>' . "\n";
}

/**
 * Проверка согласия на определенную категорию куки
 */
function cookie_consent_check($category) {
    $consent = isset($_COOKIE['iq_cookie_consent']) ? $_COOKIE['iq_cookie_consent'] : '';

    if (empty($consent)) {
        return false; // Нет согласия
    }

    $data = json_decode($consent, true);

    if (!$data || !isset($data['categories'])) {
        return false;
    }

    return isset($data['categories'][$category]) && $data['categories'][$category] === true;
}

/**
 * Получение всех настроек согласия
 */
function cookie_consent_get_settings() {
    $consent = isset($_COOKIE['iq_cookie_consent']) ? $_COOKIE['iq_cookie_consent'] : '';

    if (empty($consent)) {
        return null;
    }

    return json_decode($consent, true);
}

/**
 * Проверка на серверной стороне - нужно ли показывать виджет
 */
function cookie_consent_should_show() {
    return !isset($_COOKIE['iq_cookie_consent']);
}

// Автоматическая обработка запросов если файл вызван напрямую
if (basename($_SERVER['PHP_SELF']) === 'ccm.php') {
    $manager = new CookieConsentManager();
    $manager->handleRequest();
}

?>
