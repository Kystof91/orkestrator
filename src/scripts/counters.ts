function animateCounter(el: HTMLElement, target: number, suffix: string): void {
  const duration = 1500;
  const start = performance.now();

  function tick(now: number): void {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters(): void {
  const section = document.querySelector<HTMLElement>('[data-counters]');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        section.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count ?? 0);
          const suffix = el.dataset.suffix ?? '';
          if (reducedMotion) {
            el.textContent = `${target}${suffix}`;
          } else {
            animateCounter(el, target, suffix);
          }
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(section);
}
