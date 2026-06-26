const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

let activeModal: HTMLElement | null = null;
let previousFocus: HTMLElement | null = null;

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
  );
}

function trapFocus(event: KeyboardEvent, panel: HTMLElement): void {
  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements(panel);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeModal(): void {
  if (!activeModal) return;

  activeModal.setAttribute('hidden', '');
  activeModal.setAttribute('aria-hidden', 'true');
  activeModal.removeEventListener('keydown', onModalKeydown);

  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const menuOpen = menu && !menu.hasAttribute('hidden');
  if (!menuOpen) {
    document.body.style.overflow = '';
  }

  if (previousFocus) {
    previousFocus.focus();
  }

  activeModal = null;
  previousFocus = null;
}

function onModalKeydown(event: KeyboardEvent): void {
  if (!activeModal) return;

  const panel = activeModal.querySelector<HTMLElement>('.modal-panel');
  if (!panel) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  trapFocus(event, panel);
}

function openModal(id: string, product?: string): void {
  if (activeModal) {
    activeModal.setAttribute('hidden', '');
    activeModal.setAttribute('aria-hidden', 'true');
    activeModal.removeEventListener('keydown', onModalKeydown);
    activeModal = null;
  }

  const modal = document.getElementById(id);
  if (!modal) return;

  previousFocus = document.activeElement as HTMLElement | null;
  activeModal = modal;

  modal.removeAttribute('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const productInput = modal.querySelector<HTMLInputElement>('input[name="product"]');
  if (productInput && product) {
    productInput.value = product;
  }

  modal.addEventListener('keydown', onModalKeydown);

  const panel = modal.querySelector<HTMLElement>('.modal-panel');
  const firstInput = panel?.querySelector<HTMLElement>(FOCUSABLE);
  firstInput?.focus();
}

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('7');
}

function validateName(value: string): boolean {
  return value.trim().length >= 2;
}

function formatPhoneInput(input: HTMLInputElement): void {
  let digits = input.value.replace(/\D/g, '');

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }
  if (!digits.startsWith('7') && digits.length > 0) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  let formatted = '';
  if (digits.length > 0) formatted = '+7';
  if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) formatted += ')';
  if (digits.length > 4) formatted += ` ${digits.slice(4, 7)}`;
  if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
  if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;

  input.value = formatted;
}

function handleFormSubmit(form: HTMLFormElement): void {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
    const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
    const successEl = form.parentElement?.querySelector<HTMLElement>('[data-form-success]');
    const errorEls = form.querySelectorAll<HTMLElement>('[data-error]');

    errorEls.forEach((el) => {
      el.textContent = '';
      el.hidden = true;
    });

    let valid = true;

    if (nameInput) {
      const nameError = form.querySelector<HTMLElement>('[data-error="name"]');
      if (!validateName(nameInput.value)) {
        valid = false;
        if (nameError) {
          nameError.textContent = 'Введите имя (минимум 2 символа)';
          nameError.hidden = false;
        }
        nameInput.setAttribute('aria-invalid', 'true');
      } else {
        nameInput.removeAttribute('aria-invalid');
      }
    }

    if (phoneInput) {
      const phoneError = form.querySelector<HTMLElement>('[data-error="phone"]');
      if (!validatePhone(phoneInput.value)) {
        valid = false;
        if (phoneError) {
          phoneError.textContent = 'Введите корректный номер: +7 (___) ___-__-__';
          phoneError.hidden = false;
        }
        phoneInput.setAttribute('aria-invalid', 'true');
      } else {
        phoneInput.removeAttribute('aria-invalid');
      }
    }

    if (!valid) return;

    form.hidden = true;
    successEl?.removeAttribute('hidden');

    setTimeout(() => {
      form.reset();
      form.hidden = false;
      successEl?.setAttribute('hidden', '');
      if (form.closest('.modal-backdrop')) {
        closeModal();
      }
    }, 2500);
  });
}

export function initModals(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalOpen;
      const product = trigger.dataset.product;
      if (modalId) openModal(modalId, product);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.querySelectorAll<HTMLElement>('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeModal();
    });
  });

  document.querySelectorAll<HTMLFormElement>('[data-validate-form]').forEach(handleFormSubmit);

  document.querySelectorAll<HTMLInputElement>('input[data-phone-mask]').forEach((input) => {
    input.addEventListener('input', () => formatPhoneInput(input));
  });
}
