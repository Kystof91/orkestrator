export function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');

  if (!toggle || !menu) return;

  const open = (): void => {
    menu.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const close = (): void => {
    menu.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  };

  toggle.addEventListener('click', () => {
    if (menu.hasAttribute('hidden')) open();
    else close();
  });

  closeBtn?.addEventListener('click', close);

  menu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hasAttribute('hidden')) {
      close();
    }
  });
}
