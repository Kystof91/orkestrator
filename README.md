# Оркестратор

Cursor workflow kit для веб-разработчика + демо-лендинг «СЭР» (Astro).

Один репозиторий: **установи kit глобально** → работай `/fire` и `/yandex` в любом проекте. **Демо внутри** — эталон pipeline и UI.

---

## Установка в Cursor (3 шага)

```bash
git clone https://github.com/Kystof91/orkestrator.git
cd orkestrator
./cursor-kit/install.sh
```

1. Скрипт копирует **rules** в `~/.cursor/rules/` и **skills** в `~/.cursor/skills/` + `~/.agents/skills/`.
2. В Cursor: **Cmd+Shift+P** → **Developer: Reload Window**.
3. Проверка в Agent-чате:
   ```text
   /fire
   тестовая задача
   ```
   Агент должен задать **один** вопрос grill-me, а не сразу писать код.

### В клиентском проекте (опционально)

Скопируй из репо в свой проект:

```bash
cp -R templates/ docs/ /path/to/client-project/
mkdir -p /path/to/client-project/docs/tasks /path/to/client-project/docs/yandex-audits
```

Шаблоны: PRD, отчёты фаз, Yandex-аудит.

**Яндекс-токены:** `cp .env.yandex.example .env.local` → инструкция [docs/YANDEX_ENV.md](docs/YANDEX_ENV.md).

### Демо-лендинг

```bash
pnpm install && pnpm generate:images && pnpm dev
```

---

## Команды

| Команда | Что делает |
|---------|------------|
| `/fire` | Полный pipeline: grill-me → PRD → фазы → lint/build → bugbot review → отчёт |
| `/yandex` | Аудит Яндекса: Вебмастер, Метрика, Бизнес, Директ → вердикт и backlog |
| `/grill-me` | Только интервью требований (один вопрос за раз) |

### `/fire` — когда

Новый лендинг, рефакторинг, формы, auth, >3 файлов, неясные требования.

### `/yandex` — когда

Перед запуском Директа, после редизайна, просадка трафика, сверка целей Метрики и UTM.

Читает `.env` / `.env.local` на токены API. Нет токена → спрашивает: **скрин** / **токен** / **пропустить**.

**Настройка токенов:** [docs/YANDEX_ENV.md](docs/YANDEX_ENV.md) — OAuth-приложение, ссылка с `client_id`, что класть в `.env.local`.

---

## Зачем это нужно (плюсы)

| Проблема без kit | С kit |
|------------------|-------|
| Агент сразу пишет код по догадкам | **Grill-me** — 5+ вопросов, решения в PRD |
| Нет истории «что согласовали» | **Grill-me log** в `docs/tasks/` |
| «Сделал» без проверки | **Verification loop** — build/lint после фазы |
| Самооценка вместо ревью | **Review gate** — обязательный bugbot перед отчётом |
| Хаос в больших задачах | **Статусы PRD**: draft → approved → … → done |
| Яндекс-стек вручную | **`/yandex`** — чеклисты + API из `.env` |
| Каждый проект с нуля | **templates/** — TASK, PHASE_REPORT, FINAL_REPORT |

**Итог:** меньше переделок, предсказуемый процесс, артефакты для клиента и для себя через полгода.

---

## Что внутри репо

```
orkestrator/
├── cursor-kit/          # rules + skills + install.sh → в ~/.cursor
│   ├── rules/           # agent-workflow, grill-me-gate, review-gate
│   └── skills/          # fire, yandex, grill-me, verification-loop…
├── templates/           # PRD, отчёты, YANDEX_AUDIT
├── docs/
│   ├── YANDEX_ENV.md    # OAuth, .env.local, токены Яндекса
│   ├── tasks/           # примеры PRD
│   └── yandex-audits/
├── src/                 # демо «СЭР» (Astro 7)
└── .env.yandex.example  # шаблон → скопировать в .env.local
```

### Rules (always apply после install)

- `agent-workflow` — pipeline и статусы PRD
- `grill-me-gate` — один вопрос за раз, без фейкового grill-me
- `review-gate` — bugbot перед финальным отчётом
- `honest-disagreement` — агент спорит, если план слабый

### Skills

| Skill | Назначение |
|-------|------------|
| **fire** | Запуск полного workflow |
| **yandex** | Аудит экосистемы Яндекса |
| **grill-me** / **grilling** | Интервью до кода |
| **task-review-gate** | Процедура bugbot review |
| **verification-loop** | build/lint/test после фичи |
| **search-first** | Исследование до кода |
| **motion-ui** / **motion-patterns** | Анимации на лендингах |
| **plan-orchestrate** | План и цепочки субагентов |
| **configure-ecc** | Установка ECC skills (опционально) |

SEO-пакет `claude-seo` и `impeccable` в kit не входят — ставятся отдельно при необходимости.

---

## Не коммитить

`.env`, `.env.local` — только `.env.yandex.example`. Как получить токены: [docs/YANDEX_ENV.md](docs/YANDEX_ENV.md).

---

## Лицензия

MIT — используй в личных и клиентских проектах.
