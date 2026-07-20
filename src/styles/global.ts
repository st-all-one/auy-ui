import { css } from 'lit';

// Import all CSS files for Vite bundling
import './layers.css';
import './reset.css';
import './tokens/colors.css';
import './tokens/spacing.css';
import './tokens/typography.css';
import './tokens/surface.css';
import './base/typography.css';
import './base/link.css';
import './base/embed.css';
import './base/code.css';
import './base/misc.css';
import './base/table.css';
import './base/form.css';
import './utilities/accessibility.css';
import './utilities/reduce-motion.css';
import './utilities/truncate.css';
import './utilities/overflow-auto.css';
import './utilities/print.css';

// Theme files — ativados via [data-auy-theme="..."] no <html>
import './themes/azure.css';
import './themes/emerald.css';
import './themes/ruby.css';
import './themes/amber.css';
import './themes/violet.css';

export const resetStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const tokenStyles = css`
  @layer components {
    :host {
      --auy-color-primary: oklch(50% 0.2 250);
      --auy-color-primary-hover: oklch(45% 0.2 250);
      --auy-color-primary-active: oklch(42% 0.22 250);
      --auy-color-primary-focus: oklch(55% 0.25 250 / 0.35);
      --auy-color-primary-inverse: oklch(100% 0 0);
      --auy-color-secondary: oklch(45% 0.03 260);
      --auy-color-secondary-hover: oklch(40% 0.03 260);
      --auy-color-secondary-active: oklch(37% 0.03 260);
      --auy-color-secondary-focus: oklch(45% 0.03 260 / 0.35);
      --auy-color-secondary-inverse: oklch(100% 0 0);
      --auy-color-surface: oklch(98% 0.005 260);
      --auy-color-text: oklch(20% 0.03 260);
      --auy-color-text-muted: oklch(45% 0.03 260);
      --auy-color-border: oklch(0% 0 0 / 0.1);
      --auy-color-error: oklch(55% 0.22 30);
      --auy-color-success: oklch(55% 0.2 145);
      --auy-color-info: oklch(50% 0.2 250);
      --auy-color-overlay: oklch(0% 0 0 / 0.4);
      --auy-radius-sm: 4px;
      --auy-radius-md: 8px;
      --auy-transition: 200ms ease;
    }
  }
`;

export const accessibilityStyles = css`
  @layer components {
    :focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    :focus:not(:focus-visible) {
      outline: none;
    }

    .sr-only,
    .sr-only-focusable {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .sr-only-focusable:focus-within,
    .sr-only-focusable:focus {
      inline-size: auto;
      block-size: auto;
      padding: 0.5rem 1rem;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
      z-index: 1;
      background: var(--auy-color-surface);
      color: var(--auy-color-text);
      border-radius: var(--auy-radius-sm);
      text-decoration: none;
    }

    @media (forced-colors: active) {
      .sr-only-focusable:focus-within,
      .sr-only-focusable:focus {
        border: 2px solid ButtonText;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export const baseStyles = [tokenStyles, accessibilityStyles] as const;
