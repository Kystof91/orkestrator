---
name: grilling
description: >-
  Интервью по одному вопросу. Ждать ответ пользователя. Использовать при /grill-me
  и когда нужно уточнить план до кода.
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding.

## Hard rules (non-negotiable)

1. **One question per message.** Never two or more questions in the same turn.
2. **Stop after each question.** Wait for the user's reply before the next question.
3. Each question includes **your recommended answer** (what you would choose and why).
4. If the answer is in the codebase, explore first — then ask only what code cannot answer.
5. Do **not** batch decisions into a list without user confirmation on each branch.
6. Do **not** treat the original task description as pre-approved — confirm assumptions.
7. Do **not** create files or write PRD during grilling.
8. Answers like «ок», «делай», «по рекомендации» are **not** final — confirm with one follow-up: «Подтверждаете: [конкретное решение]?»

## Question format

```text
**Вопрос N:** [single focused question]

**Рекомендация:** [your answer + brief rationale]
```

## When done

Ask: «Ещё вопросы по плану, или завершаем grill-me?»

Only after user confirms → hand off to PRD with grill-me log.

Ask question 1 now. Nothing else in this message.
