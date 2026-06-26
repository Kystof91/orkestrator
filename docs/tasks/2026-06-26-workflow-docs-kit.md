# Доработка workflow kit документации

**Дата:** 2026-06-26  
**Статус:** done  
**Риск:** low

## Цель

Сделать kit самодостаточным: публичный README, обновлённый шаблон TASK.md с review-статусами, PRD этой задачи и минимальный пример заполненного PRD.

## Definition of Done

### Для документации (md-only)

- [x] README.md есть и читаем (русский, ≤80 строк)
- [x] TASK.md обновлён: статусы `awaiting-review`, `review-done`, секции Review brief и Review findings, split DoD
- [x] PRD этой задачи в `docs/tasks/` с заполненными обязательными секциями
- [x] `examples/sample-task.md` с фиктивной задачей CTA
- [x] Review gate через subagent bugbot (не self-review)
- [x] Финальный отчёт по `templates/FINAL_REPORT.md`
- [ ] Ручной чеклист выполнен

## Out of scope

- Код, npm/pnpm, новые зависимости
- Изменения `~/.cursor/rules/` и skills
- Изменения `TEST_PROMPT.md`
- Коммит без явного запроса
- Изменения `REVIEW_BRIEF.md`, `PHASE_REPORT.md`, `FINAL_REPORT.md` (если не требуется)

## Риски

| Зона | Уровень | Что может пойти не так |
|------|---------|------------------------|
| templates | low | Сломать смысл существующих шаблонов при правках TASK.md |
| docs | low | PRD не отражает фактические решения grill-me |

## Регрессия

Что **не должно** сломаться после этой задачи:

- `templates/REVIEW_BRIEF.md`, `templates/PHASE_REPORT.md`, `templates/FINAL_REPORT.md` остаются валидными
- `TEST_PROMPT.md` не изменён
- Существующая структура `templates/TASK.md` сохраняет все прежние секции

## Контекст (после grill-me)

### Решения

- README — публичный kit, **без** упоминания TEST_PROMPT
- Review brief в TASK.md — краткий inline-скелет (не дублировать REVIEW_BRIEF.md целиком)
- `examples/sample-task.md` — минимум: Цель, DoD, Out of scope, Риски, План фаз (1–2 фазы)
- DoD в TASK.md — две варианта: для кодовых проектов и для md-only

### Открытые вопросы

- [x] Все вопросы закрыты на этапе grill-me

## План фаз

### Фаза 1: README.md

- **Цель:** Публичное описание kit и workflow
- **Файлы:** `README.md`
- **Проверки:** ручной — ≤80 строк, русский, нет TEST_PROMPT
- **Риск:** low
- **Откат:** удалить файл

### Фаза 2: Обновить templates/TASK.md

- **Цель:** Статусы review, split DoD, секции Review brief и Review findings
- **Файлы:** `templates/TASK.md`
- **Проверки:** ручной — все новые секции на месте
- **Риск:** low
- **Откат:** git checkout или ручной откат

### Фаза 3: examples/sample-task.md

- **Цель:** Минимальный пример заполненного PRD (CTA на лендинг)
- **Файлы:** `examples/sample-task.md`
- **Проверки:** ручной — только минимальные секции
- **Риск:** low
- **Откат:** удалить файл

### Фаза 4: Review gate

- **Цель:** Bugbot review, findings в PRD, статус review-done
- **Файлы:** этот PRD
- **Проверки:** subagent bugbot
- **Риск:** low
- **Откат:** исправить findings

## Review brief

**PRD:** docs/tasks/2026-06-26-workflow-docs-kit.md  
**Изменённые файлы:**

- `README.md` — новый
- `templates/TASK.md` — статусы, DoD, review-секции
- `docs/tasks/2026-06-26-workflow-docs-kit.md` — PRD задачи
- `examples/sample-task.md` — пример

**Фокус review:**

- [ ] Соответствие DoD и решениям grill-me
- [ ] README не ссылается на TEST_PROMPT
- [ ] TASK.md сохраняет обратную совместимость секций
- [ ] sample-task.md — минимальный, без лишних секций

Полный brief — по `templates/REVIEW_BRIEF.md`.

## Review findings

| Severity | Location | Finding |
|----------|----------|---------|
| 🟡 замечание | examples/sample-task.md:15-41 | DoD требует lint/typecheck/test/build, но фаза 1 указывала только lint и build — **исправлено** |
| 🟡 замечание | templates/TASK.md:13-26 | DoD для кодовых проектов не включал review gate — **исправлено** |

## Журнал фаз

### Фаза 0 — 2026-06-26

**Статус:** done  
**Сделано:** PRD создан, план согласован  
**Проверки:** N/A (md-only)  
**Проблемы:** нет

### Фаза 1 — 2026-06-26

**Статус:** done  
**Сделано:** README.md (45 строк, русский, workflow, без TEST_PROMPT)  
**Проверки:** N/A (md-only)  
**Проблемы:** нет

### Фаза 2 — 2026-06-26

**Статус:** done  
**Сделано:** templates/TASK.md — статусы review, split DoD, Review brief, Review findings  
**Проверки:** N/A (md-only)  
**Проблемы:** нет

### Фаза 3 — 2026-06-26

**Статус:** done  
**Сделано:** examples/sample-task.md — минимальный CTA-пример  
**Проверки:** N/A (md-only)  
**Проблемы:** нет

### Фаза 4 — 2026-06-26

**Статус:** done  
**Сделано:** Bugbot review (natural language), 2 замечания исправлены  
**Проверки:** N/A (md-only)  
**Проблемы:** git diff недоступен — review через natural language
