export function initHero(): void {
  const slider = document.querySelector<HTMLElement>('[data-hero-slider]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll<HTMLElement>('.hero-slide'));
  const dots = Array.from(slider.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
  let current = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index: number): void {
    current = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const isActive = i === current;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.querySelectorAll<HTMLElement>('button, a, input').forEach((el) => {
        if (!isActive) el.setAttribute('tabindex', '-1');
        else el.removeAttribute('tabindex');
      });
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });
  }

  function startAutoplay(): void {
    if (reducedMotion) return;
    stopAutoplay();
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  function stopAutoplay(): void {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  let touchStartX = 0;
  let touchDeltaX = 0;

  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0]?.clientX ?? 0;
      touchDeltaX = 0;
    },
    { passive: true },
  );

  slider.addEventListener(
    'touchmove',
    (e) => {
      touchDeltaX = (e.touches[0]?.clientX ?? 0) - touchStartX;
    },
    { passive: true },
  );

  slider.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) < 50) return;
    if (touchDeltaX < 0) goTo(current + 1);
    else goTo(current - 1);
  });

  goTo(0);
  startAutoplay();
}
