function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

class CarouselInstance {
  private root: HTMLElement;
  private track: HTMLElement;
  private slides: HTMLElement[];
  private dots: HTMLButtonElement[];
  private prevBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private current = 0;
  private autoplayMs: number;
  private timer: ReturnType<typeof setInterval> | null = null;
  private variant: 'slide' | 'fade';
  private slidesPerView: number;
  private touchStartX = 0;
  private touchDeltaX = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.track = root.querySelector<HTMLElement>('.carousel__track')!;
    this.slides = Array.from(root.querySelectorAll<HTMLElement>('.carousel__slide'));
    this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.carousel__dot'));
    this.prevBtn = root.querySelector<HTMLButtonElement>('.carousel__btn--prev');
    this.nextBtn = root.querySelector<HTMLButtonElement>('.carousel__btn--next');
    this.variant = (root.dataset.variant as 'slide' | 'fade') ?? 'slide';
    this.autoplayMs = Number(root.dataset.autoplay ?? 5000);
    this.slidesPerView = Number(root.dataset.slidesPerView ?? 1);

    if (this.slidesPerView > 1) {
      root.classList.add('carousel--multi');
      root.style.setProperty('--slides-per-view', String(this.slidesPerView));
    }

    if (this.variant === 'fade') {
      root.classList.add('carousel--fade');
    }

    this.bindEvents();
    this.goTo(0, false);
    this.startAutoplay();
  }

  private bindEvents(): void {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    this.root.addEventListener('mouseenter', () => this.stopAutoplay());
    this.root.addEventListener('mouseleave', () => this.startAutoplay());
    this.root.addEventListener('focusin', () => this.stopAutoplay());
    this.root.addEventListener('focusout', () => this.startAutoplay());

    this.root.addEventListener(
      'touchstart',
      (e) => {
        this.touchStartX = e.touches[0]?.clientX ?? 0;
        this.touchDeltaX = 0;
      },
      { passive: true },
    );

    this.root.addEventListener(
      'touchmove',
      (e) => {
        const x = e.touches[0]?.clientX ?? 0;
        this.touchDeltaX = x - this.touchStartX;
      },
      { passive: true },
    );

    this.root.addEventListener('touchend', () => {
      if (Math.abs(this.touchDeltaX) < 50) return;
      if (this.touchDeltaX < 0) this.next();
      else this.prev();
    });
  }

  private maxIndex(): number {
    if (this.slidesPerView > 1) {
      return Math.max(0, this.slides.length - this.slidesPerView);
    }
    return this.slides.length - 1;
  }

  goTo(index: number, animate = true): void {
    const max = this.maxIndex();
    this.current = ((index % (max + 1)) + (max + 1)) % (max + 1);

    if (this.variant === 'fade') {
      this.slides.forEach((slide, i) => {
        const isActive = i === this.current;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        if (!isActive) slide.setAttribute('inert', '');
        else slide.removeAttribute('inert');
      });
    } else {
      this.slides.forEach((slide, i) => {
        const isVisible =
          i >= this.current && i < this.current + this.slidesPerView;
        slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        if (!isVisible) slide.setAttribute('inert', '');
        else slide.removeAttribute('inert');
      });
      if (!animate || prefersReducedMotion()) {
        this.track.style.transition = 'none';
      } else {
        this.track.style.transition = '';
      }
      const offset = (this.current * 100) / this.slidesPerView;
      this.track.style.transform = `translateX(-${offset}%)`;
    }

    this.dots.forEach((dot, i) => {
      const isActive = i === this.current;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  next(): void {
    this.goTo(this.current + 1);
  }

  prev(): void {
    this.goTo(this.current - 1);
  }

  startAutoplay(): void {
    if (prefersReducedMotion() || this.autoplayMs <= 0) return;
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.autoplayMs);
  }

  stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    new CarouselInstance(root);
  });
}
