---
name: task-review-gate
description: >-
  Обязательный review gate после реализации задачи. Запускать автоматически
  когда код готов, lint/test/build зелёные, и задача нетривиальная. Запускает
  bugbot или review-security subagent, фиксирует findings, блокирует финальный
  отчёт до прохождения gate.
---

# Task Review Gate

Выполнять **без запроса пользователя** после завершения реализации (см. rule `review-gate`).

## 1. Подготовить brief

Найти PRD: `docs/tasks/*.md`. Если нет — создать минимальный brief из контекста задачи.

Заполнить или обновить секцию **Review brief** в PRD (или `templates/REVIEW_BRIEF.md`):

- Путь к PRD и DoD
- Список изменённых файлов
- Уровень риска (из PRD)
- Что проверить: баги, регрессия, a11y, security

Установить в PRD: `**Статус:** awaiting-review`

## 2. Запустить subagent

### Обычный код → bugbot

Прочитать skill `review-bugbot` и следовать ему.

Добавить в `Custom Instructions` (если есть PRD):

```text
PRD: <path to docs/tasks/...md>
DoD: <кратко из PRD>
Регрессия: <из PRD>
Фокус: блокеры и риски, не стиль. Сверить с DoD.
```

По умолчанию `Diff: uncommitted changes` если ветка ещё не закоммичена; иначе `branch changes`.

**Репозиторий без git:** сразу `Diff: natural language` с `Change Description` по изменённым файлам — не тратить попытку на пустой diff.

### High-risk → review-security

Прочитать skill `review-security`. Запустить **после** или **вместе с** bugbot если риск high или зоны auth/forms/PII/payments.

`readonly: true`, `run_in_background: false`

## 3. Обработать findings

| Уровень | Действие |
|---------|----------|
| 🔴 блокер | Исправить в основном агенте, повторить gate |
| 🟡 замечание | Записать в PRD / FINAL_REPORT |
| 🟢 nit | Опционально в отчёт |

Записать в PRD секцию **Review findings** (таблица: Severity | Location | Finding).

## 4. Закрыть gate

- Статус PRD → `review-done`
- Финальный отчёт по `templates/FINAL_REPORT.md`
- Статус PRD → `done` только после отчёта
- В отчёте: таблица review findings + что исправлено

Запрещено: `done` без прохождения `awaiting-review` → `review-done`.

## 5. Эскалация (новый чат)

Если риск **high** или пользователь просит второе мнение:

1. Сохранить `docs/tasks/...-REVIEW_BRIEF.md` из шаблона
2. Сказать пользователю: «Откройте новый чат, вставьте brief, выберите другую модель»
3. Не считать gate закрытым, пока пользователь не подтвердит или не пройдёт повторный subagent

## Не делать

- Не заменять subagent своим review в том же контексте
- Не пропускать gate «чтобы сэкономить время»
- Не выдавать финальный отчёт со статусом `awaiting-review`
