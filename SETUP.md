# Установка и настройка

Всё, что нужно после `git clone`. Другие файлы читать не обязательно.

---

## 1. Cursor workflow kit

```bash
git clone https://github.com/Kystof91/orkestrator.git
cd orkestrator
./cursor-kit/install.sh
```

1. Скрипт копирует **rules** → `~/.cursor/rules/`, **skills** → `~/.cursor/skills/` и `~/.agents/skills/`.
2. Cursor: **Cmd+Shift+P** → **Developer: Reload Window**.
3. Проверка в Agent-чате:
   ```text
   /fire
   тестовая задача
   ```
   Агент задаёт **один** вопрос — не пишет код сразу.

### Шаблоны в клиентский проект

```bash
cp -R templates/ docs/ /path/to/client-project/
mkdir -p /path/to/client-project/docs/tasks /path/to/client-project/docs/yandex-audits
cp .env.yandex.example /path/to/client-project/
```

### Демо-лендинг (этот репо)

```bash
pnpm install && pnpm generate:images && pnpm dev
```

---

## 2. Команды

| Команда | Когда |
|---------|-------|
| `/fire` | Новый сайт, рефакторинг, >3 файлов, неясные требования |
| `/yandex` | Аудит Вебмастер + Метрика + Бизнес + Директ |
| `/grill-me` | Только интервью до кода |

`/yandex` читает `.env` / `.env.local`. Нет токена → спросит: **скрин** / **токен** / **пропустить**.

---

## 3. Яндекс: файл `.env.local`

В **корне проекта**, с которым работаешь (клиентский сайт или этот репо):

```bash
cp .env.yandex.example .env.local
```

`.env.local` в `.gitignore` — **не коммитить**. Токены личные, под аккаунт клиента.

---

## 4. OAuth-приложение Яндекса

Одно приложение на все сервисы — один токен во все поля `*_OAUTH_TOKEN`.

| Шаг | Действие |
|-----|----------|
| 1 | Войти под аккаунтом с доступом к сайту, Метрике и Директу **клиента** |
| 2 | Открыть **oauth.yandex.ru/client/new** |
| 3 | Тип: **«Для доступа к API или отладки»** |
| 4 | Платформа: **Веб-сервисы** |
| 5 | **Redirect URI:** `https://oauth.yandex.ru/verification_code` |
| 6 | **Доступ к данным** — см. таблицу ниже |
| 7 | **Создать** → скопировать **Client ID** |

### Права (scopes)

| Сервис | Что выбрать в «Доступ к данным» |
|--------|--------------------------------|
| **Вебмастер** | `webmaster:hostinfo`, `webmaster:verify` |
| **Метрика** | `metrika:read` (для аудита достаточно) |
| **Метрика** (опц.) | `metrika:write` — если менять цели через API |
| **Директ** | **Использование API Яндекс Директа** (`direct:api`) |
| **Директ** (опц.) | `passport:business` |

**Яндекс Бизнес** (карточка на Картах) — отдельного API-токена нет. Только ID карточки (§8).

---

## 5. Получить токен

Подставь **Client ID** вместо `<CLIENT_ID>`:

```
https://oauth.yandex.ru/authorize?response_type=token&client_id=<CLIENT_ID>
```

Пример:

```
https://oauth.yandex.ru/authorize?response_type=token&client_id=a1b2c3d4e5f6g7h8
```

1. Открыть ссылку в браузере.
2. **«Войти как…»** / **«Разрешить»**.
3. Скопировать токен со страницы или из адресной строки (`access_token=...`). Обычно начинается с `y0_`.

### Записать в `.env.local`

```env
YANDEX_WEBMASTER_OAUTH_TOKEN=сюда_токен
YANDEX_METRIKA_OAUTH_TOKEN=тот_же_токен
YANDEX_DIRECT_OAUTH_TOKEN=тот_же_токен
```

**Client secret** для этого способа не нужен.

Токен живёт **~6 месяцев**. Истёк — снова открой ссылку из этого раздела.

---

## 6. Вебмастер — `YANDEX_WEBMASTER_HOST_ID`

1. **webmaster.yandex.ru** → выбрать сайт.
2. Взять `host_id` из кабинета или через API:

```bash
curl -s -H "Authorization: OAuth ВАШ_ТОКЕН" \
  "https://api.webmaster.yandex.net/v4/user/"
```

```env
YANDEX_WEBMASTER_HOST_ID=https:example.com:443
```

Формат как в API для вашего аккаунта.

---

## 7. Метрика — `YANDEX_METRIKA_COUNTER_ID`

1. **metrika.yandex.ru** → счётчик клиента.
2. **Настройки** → **«Номер счётчика»** (например `12345678`).

Тот же номер в коде сайта: `ym(12345678, ...)`.

```env
YANDEX_METRIKA_COUNTER_ID=12345678
```

---

## 8. Яндекс Бизнес — без токена

Публичного API карточки нет. `/yandex` смотрит карточку на Картах или скрин из **yandex.ru/sprav**.

ID из URL:

```
https://yandex.ru/maps/org/название/1234567890/
                              ↑ это YANDEX_BUSINESS_ORG_ID
```

```env
YANDEX_BUSINESS_ORG_ID=1234567890
YANDEX_BUSINESS_CARD_URL=https://yandex.ru/maps/org/...
```

---

## 9. Директ — заявка на API

Токена мало. Нужна одобренная заявка:

| Шаг | Действие |
|-----|----------|
| 1 | В Директе есть **хотя бы одна кампания** |
| 2 | **direct.yandex.ru** → **Настройки → API** |
| 3 | **Мои заявки** → **Новая заявка** |
| 4 | Указать **Client ID** из §4 |
| 5 | Отправить → ждать до **7 дней** |

Без одобрения API не отдаст данные — `/yandex` уйдёт в чеклист и скрины.

---

## 10. Пример `.env.local`

```env
YANDEX_WEBMASTER_OAUTH_TOKEN=y0_AgAAAAA...
YANDEX_WEBMASTER_HOST_ID=https:client.ru:443

YANDEX_METRIKA_OAUTH_TOKEN=y0_AgAAAAA...
YANDEX_METRIKA_COUNTER_ID=87654321

YANDEX_DIRECT_OAUTH_TOKEN=y0_AgAAAAA...

YANDEX_BUSINESS_ORG_ID=1234567890
YANDEX_BUSINESS_CARD_URL=https://yandex.ru/maps/org/...
```

---

## 11. Проверка

```bash
curl -s -H "Authorization: OAuth ВАШ_ТОКЕН" \
  "https://api-metrika.yandex.net/management/v1/counters" | head -c 300
```

Есть `"counters"` — ок. `401` — токен неверный или просрочен.

В Cursor:

```text
/yandex
client-site.ru
```

---

## 12. Безопасность

- Токены только в `.env.local`, не в git и не в чат Cursor.
- Токен под **аккаунт клиента** — иначе смотришь чужие данные.
- `.env.yandex.example` — только шаблон, без секретов.

---

## Шпаргалка

```
./cursor-kit/install.sh → Reload Window
cp .env.yandex.example .env.local
oauth.yandex.ru/client/new → webmaster + metrika + direct
Redirect URI: https://oauth.yandex.ru/verification_code
https://oauth.yandex.ru/authorize?response_type=token&client_id=CLIENT_ID
токен → .env.local
COUNTER_ID, HOST_ID, BUSINESS_ORG_ID из кабинетов
Директ: заявка в Настройки → API
/yandex
```
