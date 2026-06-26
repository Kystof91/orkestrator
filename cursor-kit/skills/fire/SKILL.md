---
name: fire
description: >-
  Запуск полного workflow: grill-me → PRD → фазы → проверки → review gate → отчёт.
  Вызывать когда пользователь пишет /fire или «запусти fire» в начале задачи.
disable-model-invocation: true
---

# Fire — полный workflow

Пользователь запустил **fire**. Это не обычная задача — это **полный pipeline**.

## Сразу прочитать

- Rules: `agent-workflow`, `grill-me-gate`, `review-gate`
- Skills: `grill-me`, `grilling`, `task-review-gate`, `search-first`

## Порядок (строго)

### 1. Grill-me
- **Первое сообщение — только вопрос 1** (+ рекомендация).
- Один вопрос → ответ → следующий. Минимум 5 вопросов на нетривиальных задачах.
- «По рекомендации» / «делай» — уточняющий follow-up, не финальное решение.
- Не создавать файлы до «Grill-me завершён» + «ок».

### 2. PRD
- `docs/tasks/YYYY-MM-DD-slug.md` по шаблону (если в проекте есть `templates/TASK.md` — использовать).
- Секции: Цель, DoD, Out of scope, Риски, Регрессия, **Grill-me log**, План фаз.
- Статус: `draft` → `approved`.

### 3. План фаз
- Показать план. **STOP.** Ждать «ок» / «делай» / «go».
- Статус: `in progress`.

### 4. Реализация
- По фазам; после каждой: lint/typecheck/test/build (что есть в проекте).
- Отдельная запись в журнале фаз PRD.
- Для UI: skill `impeccable` или `motion-ui` по необходимости.
- Перед кодом в незнакомой области: `search-first`.

### 5. Review gate
- Статус PRD → `awaiting-review`.
- Skill `task-review-gate` + subagent **bugbot** (не self-review).
- Findings в PRD → фиксы → `review-done`.

### 6. Финальный отчёт
- По `templates/FINAL_REPORT.md` или тот же формат в чате.
- Ручной чеклист: конкретные URL, viewport, сценарии.
- Статус PRD → `done`.

## Триаж

| Задача | Действие |
|--------|----------|
| Опечатка, 1 файл | Короткий путь без grill-me: fix → lint → 3 строки отчёта |
| Нетривиальная | Полный fire с grill-me |

## Сейчас

Если пользователь уже описал задачу в сообщении с `/fire` — начни **grill-me, вопрос 1**. Больше ничего в этом сообщении.
