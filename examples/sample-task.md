# Кнопка CTA на лендинг

**Дата:** 2026-06-20  
**Статус:** done  
**Риск:** low

## Цель

Добавить заметную кнопку «Начать бесплатно» в hero-секцию лендинга, чтобы увеличить конверсию в регистрацию.

## Definition of Done

- [ ] Кнопка видна above the fold на desktop и mobile
- [ ] Клик ведёт на `/signup`
- [ ] lint / typecheck / test / build — зелёные
- [ ] review gate пройден (subagent, не self-review)
- [ ] findings записаны в PRD

## Out of scope

- A/B-тестирование текста кнопки
- Аналитика кликов (отдельная задача)

## Риски

| Зона | Уровень | Что может пойти не так |
|------|---------|------------------------|
| UI / a11y | low | Кнопка без focus-стиля или контраста |

## План фаз

### Фаза 1: Компонент и стили

- **Цель:** Создать `CTAButton` и добавить в hero
- **Файлы:** `src/components/CTAButton.tsx`, `src/pages/index.astro`
- **Проверки:** `pnpm lint && pnpm typecheck && pnpm test && pnpm build`

### Фаза 2: Проверка и review

- **Цель:** Ручной чеклист mobile/desktop, review gate
- **Файлы:** PRD в `docs/tasks/`
- **Проверки:** ручной чеклист, bugbot review
