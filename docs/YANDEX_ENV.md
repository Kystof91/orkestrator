# Яндекс: `.env`, приложения OAuth и токены

Инструкция для команды `/yandex` в Cursor. Токены **личные** — у каждого разработчика и у каждого клиентского проекта свои.

---

## 1. Создать `.env` в проекте

В **корне клиентского проекта** (не в глобальном `~/.cursor`):

```bash
cp .env.yandex.example .env.local
```

Почему `.env.local`:
- файл в `.gitignore` — не попадёт в git;
- Cursor и `/yandex` читают `.env` и `.env.local`.

Заполни переменные по шагам ниже. **Значения токенов никому не отправляй** и не коммить.

---

## 2. Одно приложение на все сервисы (рекомендуется)

Удобнее зарегистрировать **одно** OAuth-приложение со всеми нужными правами, получить **один токен** и вставить его во все поля `*_OAUTH_TOKEN` в `.env.local`.

| Шаг | Действие |
|-----|----------|
| 1 | Войти под аккаунтом, у которого есть доступ к сайту, Метрике и Директу клиента |
| 2 | Открыть [oauth.yandex.ru/client/new](https://oauth.yandex.ru/client/new) |
| 3 | Тип: **«Для доступа к API или отладки»** (расширенная форма) |
| 4 | Заполнить название и почту — произвольно |
| 5 | Платформа: **Веб-сервисы** |
| 6 | **Redirect URI:** `https://oauth.yandex.ru/verification_code` |
| 7 | **Доступ к данным** — добавить права из таблицы ниже |
| 8 | **Создать приложение** → скопировать **Client ID** |

### Какие права (scopes) включить

| Сервис | Что искать в «Доступ к данным» | Зачем |
|--------|-------------------------------|-------|
| **Вебмастер** | `webmaster:hostinfo`, `webmaster:verify` | Сайты, индексация, sitemap |
| **Метрика** | `metrika:read` (минимум для аудита) | Счётчики, цели, отчёты |
| **Метрика** (опц.) | `metrika:write` | Если нужно менять цели через API |
| **Директ** | `direct:api` — **Использование API Яндекс Директа** | Кампании, объявления |
| **Директ** (опц.) | `passport:business` | Авторизация от имени организации |

**Яндекс Бизнес** (карточка на Картах) **не имеет** отдельного публичного API для полного аудита карточки. Для Бизнеса в `.env` указывают ID/URL карточки (см. §6), токен не обязателен.

Официальные справки:
- [Вебмастер — OAuth](https://yandex.ru/dev/webmaster/doc/ru/tasks/how-to-get-oauth)
- [Метрика — авторизация](https://yandex.ru/dev/metrika/doc/api2/intro/authorization.html)
- [Директ — регистрация приложения](https://yandex.ru/dev/direct/doc/ru/concepts/register)

---

## 3. Получить токен по ссылке

Скопируй **Client ID** приложения и подставь в ссылку вместо `<CLIENT_ID>`:

```
https://oauth.yandex.ru/authorize?response_type=token&client_id=<CLIENT_ID>
```

**Пример** (Client ID `a1b2c3d4e5f6g7h8`):

```
https://oauth.yandex.ru/authorize?response_type=token&client_id=a1b2c3d4e5f6g7h8
```

1. Открой ссылку в браузере (лучше тот же аккаунт, что и у клиента).
2. Нажми **«Войти как…»** / **«Разрешить»**.
3. Токен появится **на странице** и в **адресной строке** после `access_token=`.
4. Скопируй токен целиком (длинная строка, часто начинается с `y0_`).

### Куда сохранить в `.env.local`

```env
YANDEX_WEBMASTER_OAUTH_TOKEN=вставь_токен_сюда
YANDEX_METRIKA_OAUTH_TOKEN=вставь_тот_же_токен
YANDEX_DIRECT_OAUTH_TOKEN=вставь_тот_же_токен
```

Если приложения разные — у каждого сервиса свой токен.

**Client secret** для ручного способа (`response_type=token`) **не нужен** — сохранять его в `.env` не обязательно.

### Срок действия

Токен Яндекса обычно живёт **~6 месяцев**. Истёк — снова открой ссылку из §3 и получи новый.

---

## 4. Вебмастер: `HOST_ID`

После токена укажи ID хоста в Вебмастере.

**Способ A — из URL кабинета**

1. [webmaster.yandex.ru](https://webmaster.yandex.ru) → выбери сайт.
2. В адресе или в настройках сайта найди `host_id` (числовой ID).

**Способ B — через API** (если токен уже в `.env`):

```bash
curl -s -H "Authorization: OAuth ВАШ_ТОКЕН" \
  "https://api.webmaster.yandex.net/v4/user/" | head
```

Далее запрос списка хостов — `host_id` для нужного домена.

В `.env.local`:

```env
YANDEX_WEBMASTER_HOST_ID=https:example.com:443
```

или числовой ID — как возвращает API для вашего аккаунта.

---

## 5. Метрика: `COUNTER_ID`

1. [metrika.yandex.ru](https://metrika.yandex.ru) → нужный счётчик.
2. **Настройки → счётчик** — число **«Номер счётчика»** (например `12345678`).

В `.env.local`:

```env
YANDEX_METRIKA_COUNTER_ID=12345678
```

Тот же ID виден в коде сайта: `ym(12345678, ...)`.

---

## 6. Яндекс Бизнес: без OAuth

Публичного API «как у Метрики» для карточки организации **нет**. `/yandex` для Бизнеса использует:

- публичную карточку на Картах;
- скриншот кабинета [yandex.ru/sprav](https://yandex.ru/sprav);
- ID из ссылки на организацию.

**ID из URL карточки**

Ссылка вида:

```
https://yandex.ru/maps/org/название/1234567890/
```

Число в конце — `YANDEX_BUSINESS_ORG_ID`:

```env
YANDEX_BUSINESS_ORG_ID=1234567890
```

Опционально URL целиком (для отчёта, не секрет):

```env
YANDEX_BUSINESS_CARD_URL=https://yandex.ru/maps/org/...
```

---

## 7. Директ: заявка на API (обязательно)

Токена мало — нужна **одобренная заявка** на доступ к API Директа.

| Шаг | Действие |
|-----|----------|
| 1 | В кабинете Директа должна быть **хотя бы одна кампания** |
| 2 | [direct.yandex.ru](https://direct.yandex.ru) → **Настройки → API** (или [справка](https://yandex.ru/dev/direct/doc/ru/concepts/register)) |
| 3 | Вкладка **«Мои заявки»** → **Новая заявка** |
| 4 | Указать **Client ID** из §2 |
| 5 | Заполнить описание приложения → **Отправить** |
| 6 | Ждать до **7 дней** (статус «одобрена») |

Без одобренной заявки запросы к боевому API вернут ошибку — `/yandex` перейдёт на чеклист и скриншоты.

Песочница (тестовый доступ): только `api-sandbox.direct.yandex.com` — для разработки, не для аудита клиента.

---

## 8. Пример готового `.env.local`

```env
# Один токен — если в OAuth выданы все права (§2)
YANDEX_WEBMASTER_OAUTH_TOKEN=y0_AgAAAAA...
YANDEX_WEBMASTER_HOST_ID=https:client-site.ru:443

YANDEX_METRIKA_OAUTH_TOKEN=y0_AgAAAAA...
YANDEX_METRIKA_COUNTER_ID=87654321

YANDEX_DIRECT_OAUTH_TOKEN=y0_AgAAAAA...

# Бизнес — ID карточки, токен не нужен
YANDEX_BUSINESS_ORG_ID=1234567890
YANDEX_BUSINESS_CARD_URL=https://yandex.ru/maps/org/...
```

---

## 9. Проверка

```bash
# Метрика — список счётчиков
curl -s -H "Authorization: OAuth $YANDEX_METRIKA_OAUTH_TOKEN" \
  "https://api-metrika.yandex.net/management/v1/counters" | head -c 200
```

Ответ с `"counters"` — токен рабочий. `401` — токен неверный или истёк.

В Cursor после заполнения `.env.local`:

```text
/yandex
client-site.ru
```

Агент должен увидеть токены и не спрашивать их повторно (если не пропущены вручную).

---

## 10. Безопасность

| Правило | Почему |
|---------|--------|
| Только `.env.local` / `.env`, не в git | Токен = полный доступ к кабинетам |
| Не вставлять токены в чат Cursor | Может попасть в логи |
| Отдельный OAuth-app на команду/агентство | Проще ротация |
| Для клиента — токен под **его** аккаунт | Иначе видишь не те данные |
| Client secret не коммитить | Если когда-нибудь понадобится server flow |

---

## Быстрая шпаргалка

```
1. cp .env.yandex.example .env.local
2. oauth.yandex.ru/client/new → права webmaster + metrika + direct
3. Redirect URI: https://oauth.yandex.ru/verification_code
4. https://oauth.yandex.ru/authorize?response_type=token&client_id=CLIENT_ID
5. Токен → .env.local
6. COUNTER_ID, HOST_ID, BUSINESS_ORG_ID — из кабинетов
7. Директ: заявка на API в настройках Директа
8. Reload Window → /yandex
```
