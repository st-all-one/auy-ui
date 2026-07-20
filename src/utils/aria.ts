/**
 * Sets multiple ARIA attributes on an element at once.
 * Each key in attrs is prefixed with "aria-" before being set.
 */
export function injectAria(el: HTMLElement, attrs: Record<string, string>): void {
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(`aria-${key}`, value);
  }
}

/**
 * Sets the `role` attribute on an element.
 */
export function setRole(el: HTMLElement, role: string): void {
  el.setAttribute('role', role);
}

let _liveRegion: HTMLDivElement | null = null;

/**
 * Creates or reuses a live region to announce messages to screen readers.
 * Appends a hidden div to the body and sets the message.
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (!_liveRegion) {
    _liveRegion = document.createElement('div');
    _liveRegion.setAttribute('aria-live', priority);
    _liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    _liveRegion.setAttribute('aria-atomic', 'true');
    _liveRegion.className = 'sr-only';
    document.body.appendChild(_liveRegion);
  } else {
    _liveRegion.setAttribute('aria-live', priority);
    _liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  }
  _liveRegion.textContent = '';
  requestAnimationFrame(() => {
    if (_liveRegion) {
      _liveRegion.textContent = message;
    }
  });
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), details, summary, audio[controls], video[controls], [contenteditable]';

function _getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/**
 * Traps focus within a container element when active.
 * Implements the WAI-ARIA modal focus pattern:
 * - Tabs cycle between focusable elements inside the container
 * - Shift+Tab reverses the cycle
 * - If focus escapes (e.g. by clicking outside), it is re-trapped
 * - Returns a cleanup function to remove all listeners
 */
export function focusTrap(container: HTMLElement, active: boolean): () => void {
  if (!active) return () => {};

  let _addedTabindex = false;
  const focusable = _getFocusable(container);
  if (focusable.length > 0) {
    focusable[0].focus();
  } else {
    container.setAttribute('tabindex', '-1');
    _addedTabindex = true;
    container.focus();
  }

  const keydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusable = _getFocusable(container);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !container.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const reTrap = (e: FocusEvent) => {
    if (!container.contains(e.target as Node) && e.target !== container) {
      requestAnimationFrame(() => {
        if (!container.contains(document.activeElement)) {
          const focusable = _getFocusable(container);
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            container.setAttribute('tabindex', '-1');
            container.focus();
          }
        }
      });
    }
  };

  document.addEventListener('keydown', keydown);
  document.addEventListener('focusin', reTrap);

  return () => {
    document.removeEventListener('keydown', keydown);
    document.removeEventListener('focusin', reTrap);
    if (_addedTabindex) {
      container.removeAttribute('tabindex');
    }
  };
}

/**
 * Sets the `aria-expanded` attribute on an element.
 */
export function setAriaExpanded(el: HTMLElement, expanded: boolean | undefined): void {
  if (expanded === undefined) {
    el.removeAttribute('aria-expanded');
  } else {
    el.setAttribute('aria-expanded', String(expanded));
  }
}

/**
 * Sets the `aria-selected` attribute on an element.
 */
export function setAriaSelected(el: HTMLElement, selected: boolean | undefined): void {
  if (selected === undefined) {
    el.removeAttribute('aria-selected');
  } else {
    el.setAttribute('aria-selected', String(selected));
  }
}

/**
 * Sets the `aria-current` attribute on an element.
 * Accepts boolean or specific token values ('page'|'step'|'location'|'date'|'time').
 */
export function setAriaCurrent(el: HTMLElement, current: boolean | string): void {
  const val = typeof current === 'boolean' ? String(current) : current;
  el.setAttribute('aria-current', val);
}

/**
 * Creates a skip link anchor element with sr-only-focusable class.
 * Returns the anchor element without appending it to the DOM.
 */
export function injectSkipLink(href: string, label: string): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  a.className = 'sr-only-focusable';
  return a;
}

/**
 * Returns whether the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns the user's preferred color scheme: 'light' or 'dark'.
 */
export function prefersColorScheme(): 'light' | 'dark' | 'no-preference' {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const light = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (!dark && !light) return 'no-preference';
  return dark ? 'dark' : 'light';
}
