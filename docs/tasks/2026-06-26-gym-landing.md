# Лендинг фитнес-клуба СЭР

**Дата:** 2026-06-26  
**Статус:** done  
**Риск:** medium

## Цель

Одностраничный лендинг фитнес-клуба «СЭР» на Astro + Tailwind v4 — визуально близкий к референсу oml.ru, с плавными каруселями, модалками и mock-формами.

## Definition of Done

### Для кодовых проектов

- [x] 11 секций главной по брифу (шапка → подвал)
- [x] Модалки: обратный звонок, заявка/заказ (focus trap, Escape, aria)
- [x] Карусели: autoplay, стрелки, точки, swipe, combo-анимации, reduced-motion
- [x] Формы: клиентская валидация, success-состояние, mock submit
- [x] Mobile 375px: бургер, читаемый hero, свайп каруселей
- [x] `pnpm lint && pnpm build` — зелёные
- [x] review gate пройден (subagent, не self-review)
- [x] findings записаны в PRD
- [x] ручной чеклист выполнен (подтверждено пользователем 2026-06-26)

## Out of scope

- Бэкенд и реальная отправка форм
- A/B-тесты, аналитика
- Деплой на прод
- Копирование ассетов с oml.ru
- Изменения `templates/`, workflow kit PRD, глобальных rules/skills

## Риски

| Зона | Уровень | Что может пойти не так |
|------|---------|------------------------|
| Carousel perf на mobile | medium | Jank при transform без GPU-hint |
| a11y модалок | medium | Потеря фокуса, нет Escape |
| Смешение kit + Astro | low | Случайное удаление templates/ |
| Stock licensing | low | Нужна attribution в README |

## Регрессия

Что **не должно** сломаться после этой задачи:

- `templates/`, `examples/`, `.agents/skills/` — без изменений
- `docs/tasks/2026-06-26-workflow-docs-kit.md` — без изменений
- README workflow kit секция сохранена

## Контекст (после grill-me)

### Grill-me log

| # | Вопрос | Ответ пользователя | Решение |
|---|--------|-------------------|---------|
| 1 | Имя бренда vs слоган | «1 делай» (рекомендация) | **СЭР** / SER в логотипе и title; «Сила. Энергия. Результат.» — слоган в hero и meta |
| 2 | Корень vs подпапка | «корень» | Scaffold в корне репозитория |
| 3 | Источник фото | «давай по рекомендации» | Unsplash/Pexels → `src/assets/images/`, Astro `<Image>` |
| 4 | Цены тарифов | «как в рекомендации» | 3 500 / 15 000 / 25 000 ₽, бейдж -30%, зачёркнутая цена |
| 5 | Карусели | «очень плавными, красивыми» | Не минимальный функционал — premium motion |
| 6 | Стиль анимации | «комбо» | Hero crossfade + Ken Burns; карточки slide с easing; reduced-motion |

### Решения

- Контакты-заглушки: +7 (495) 000-00-00, г. Москва, Ленинский пр., д. 123
- Один `<Carousel>` island + hero на CSS
- Tailwind v4, тёмная спортивная палитра
- ИНН/ОГРНИП — заглушки в подвале

### Открытые вопросы

- [x] Все вопросы закрыты на этапе grill-me

## План фаз

### Фаза 1: Scaffold

- **Цель:** Astro + Tailwind v4, layout, tokens, site.ts
- **Файлы:** `astro.config.mjs`, `src/layouts/`, `src/styles/`, `src/data/site.ts`
- **Проверки:** `pnpm lint && pnpm build`

### Фаза 2: Header + Footer + Modal

- **Цель:** Навигация, модалки с a11y
- **Файлы:** `src/components/Header.astro`, `Footer.astro`, `Modal.astro`, `src/scripts/modal.ts`

### Фаза 3: Hero + Pricing

- **Цель:** Hero crossfade, тарифы carousel
- **Файлы:** `Hero.astro`, `Pricing.astro`, stock images

### Фаза 4: Services + About + Features

- **Цель:** Зоны, счётчики, преимущества
- **Файлы:** `Services.astro`, `About.astro`, `Features.astro`

### Фаза 5: Forms + Gallery + Partners + Reviews

- **Цель:** Остальные секции, index.astro
- **Файлы:** `ContactForm.astro`, `Gallery.astro`, `Partners.astro`, `Reviews.astro`, `index.astro`

### Фаза 6: Motion polish + SEO

- **Цель:** carousel.ts, scroll-reveal, meta/OG
- **Файлы:** `src/scripts/`, layout meta

### Фаза 7: Review gate

- **Цель:** bugbot, финальный отчёт, чеклист

## Review brief

**PRD:** docs/tasks/2026-06-26-gym-landing.md

**Изменённые файлы:**

- `src/**` — новый Astro-проект
- `package.json`, `astro.config.mjs` — scaffold
- `README.md` — инструкции запуска

**Фокус review:**

- [ ] Баги и логические ошибки
- [ ] Соответствие DoD
- [ ] Регрессия из PRD
- [ ] Security / a11y — модалки, формы, карусели

## Review findings

| Severity | Location | Finding | Статус |
|----------|----------|---------|--------|
| 🔴 high | modal.ts:33-38 | closeModal сбрасывал overflow при открытом mobile menu | ✅ исправлено |
| 🔴 high | carousel.ts:99-107 | Неактивные slide-слайды оставались в tab order | ✅ inert + aria-hidden |
| 🟡 medium | hero.ts | Hero без touch swipe | ✅ добавлен swipe |
| 🟡 medium | Hero.astro | Кнопки в aria-hidden слайдах | ✅ tabindex -1 на inactive |
| 🟡 medium | modal.ts:64-80 | Второй modal не закрывал первый | ✅ close before open |
| 🟡 medium | Modal.astro | Нет aria-describedby для ошибок | ✅ добавлено |

## Журнал фаз

### Фаза 1 — 2026-06-26

**Статус:** done  
**Сделано:** Astro 7 scaffold, Tailwind v4, layout, tokens, site.ts, README  
**Проверки:** lint ✅ build ✅

### Фаза 2 — 2026-06-26

**Статус:** done  
**Сделано:** Header, Footer, Modal, modal.ts  
**Проверки:** build ✅

### Фаза 3 — 2026-06-26

**Статус:** done  
**Сделано:** Hero, Pricing, stock/placeholder images  
**Проверки:** build ✅

### Фаза 4 — 2026-06-26

**Статус:** done  
**Сделано:** Services, About, Features  
**Проверки:** build ✅

### Фаза 5 — 2026-06-26

**Статус:** done  
**Сделано:** ContactForm, Gallery, Partners, Reviews, index.astro  
**Проверки:** build ✅

### Фаза 6 — 2026-06-26

**Статус:** done  
**Сделано:** carousel.ts, scroll-reveal, SEO meta  
**Проверки:** lint ✅ build ✅

### Фаза 7 — 2026-06-26

**Статус:** done  
**Сделано:** bugbot review, fixes, финальный отчёт  
**Проверки:** lint ✅ build ✅ после фиксов

---

## Финальный отчёт

**Задача:** docs/tasks/2026-06-26-gym-landing.md  
**Дата:** 2026-06-26

### Выполнено

- [x] Фаза 1: Scaffold
- [x] Фаза 2: Header + Footer + Modal
- [x] Фаза 3: Hero + Pricing
- [x] Фаза 4: Services + About + Features
- [x] Фаза 5: Forms + Gallery + Partners + Reviews
- [x] Фаза 6: Motion + SEO meta
- [x] Фаза 7: Review gate

### Автопроверки

- lint: ✅ (`astro check`, 0 errors)
- build: ✅ (SSG + WebP images)

### Проверить вручную

1. `pnpm dev` → http://localhost:4321 — hero, 11 секций, тёмная тема
2. Desktop 1280px — тарифы в 3 колонки, все карусели с стрелками
3. Mobile 375px — бургер-меню, тарифы-карусель, swipe hero/каруселей
4. «Обратный звонок» → модалка → Escape закрывает, Tab внутри панели
5. «Заказать» на тарифе → модалка с hidden product
6. Форма «Остались вопросы?» — пустой submit → ошибки; валидный → success
7. DevTools → `prefers-reduced-motion: reduce` — анимации отключены

### Не вошло в scope

- Реальный бэкенд форм
- Stock-фото Unsplash (использованы gradient placeholders; замена — в README)

### Assumptions

- Placeholder-изображения через `pnpm generate:images` — заменяемы на stock без смены кода

### Статус (аудит workflow 2026-06-26)

- `review-done` — после bugbot и фиксов
- `done` — после подтверждения пользователем «всё работает»
- Удалён `scripts/download-from-reference.mjs` (нарушал out of scope)
