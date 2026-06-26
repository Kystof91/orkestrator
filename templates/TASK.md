# [Название задачи]

**Дата:** YYYY-MM-DD  
**Статус:** draft | approved | in progress | awaiting-review | review-done | done

> Цепочка обязательна: не перескакивать на `done`. `awaiting-review` — перед bugbot; `review-done` — после; `done` — после финального отчёта.
**Риск:** low | medium | high

## Цель

Одно предложение: что должно измениться для пользователя или бизнеса.

## Definition of Done

### Для кодовых проектов

- [ ] ...
- [ ] lint / typecheck / test / build — зелёные
- [ ] review gate пройден (subagent, не self-review)
- [ ] findings записаны в PRD
- [ ] ручной чеклист выполнен

### Для документации (md-only)

- [ ] ...
- [ ] review gate пройден (subagent, не self-review)
- [ ] findings записаны в PRD
- [ ] ручной чеклист выполнен
- [ ] автопроверки: N/A

## Out of scope

- ...
- ...

## Риски

| Зона | Уровень | Что может пойти не так |
|------|---------|------------------------|
| auth / forms / PII / payments / deploy | low/medium/high | ... |

## Регрессия

Что **не должно** сломаться после этой задачи:

- ...
- ...

## Контекст (после grill-me)

### Grill-me log

| # | Вопрос | Ответ пользователя | Решение |
|---|--------|-------------------|---------|
| 1 | ... | (цитата из чата) | ... |

### Решения

- ...

### Открытые вопросы

- [ ] ...

## План фаз

### Фаза 1: [название]

- **Цель:**
- **Файлы:**
- **Тесты:**
- **Проверки:** `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- **Риск:**
- **Откат:**

### Фаза 2: ...

## Review brief

**PRD:** docs/tasks/YYYY-MM-DD-slug.md

**Изменённые файлы:**

- `path/to/file` — что изменилось

**Фокус review:**

- [ ] Баги и логические ошибки
- [ ] Соответствие DoD
- [ ] Регрессия из PRD
- [ ] Security / a11y — если применимо

Полный brief — по `templates/REVIEW_BRIEF.md`.

## Review findings

| Severity | Location | Finding |
|----------|----------|---------|
| 🔴 блокер / 🟡 замечание / 🟢 nit | file:line или путь | описание |

## Журнал фаз

<!-- После каждой фазы — краткая запись -->

### Фаза 1 — YYYY-MM-DD

**Статус:** done | blocked  
**Сделано:** ...  
**Проверки:** lint ✅ typecheck ✅ test ✅ (N passed)  
**Проблемы:** ...
