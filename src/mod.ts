export { baseStyles, tokenStyles, resetStyles, accessibilityStyles } from './styles/global.ts';

// ── Atomics ──
export { AuyInternalButton } from './atomics/button.ts';
export { AuyInternalBadge } from './atomics/badge.ts';
export { AuyInternalSpinner } from './atomics/spinner.ts';
export { AuyInternalCard } from './atomics/card.ts';
export { AuyInternalBreadcrumb } from './atomics/breadcrumb.ts';
export type { Crumb } from './atomics/breadcrumb.ts';
export { AuyInternalTooltip } from './atomics/tooltip.ts';
export { AuyInternalModal } from './atomics/modal.ts';
export { AuyInternalTable } from './atomics/table.ts';
export { AuyInternalToast } from './atomics/toast.ts';
export { AuyInternalTabs } from './atomics/tabs.ts';
export type { Tab } from './atomics/tabs.ts';
export { AuyInternalFormGroup } from './atomics/form-group.ts';
export { AuyInternalPagination } from './atomics/pagination.ts';
export { AuyInternalAlert } from './atomics/alert.ts';
export { AuyInternalCheckbox } from './atomics/checkbox.ts';
export { AuyButtonGroup } from './atomics/button-group.ts';
export { AuyInternalCodeEditor } from './atomics/code-editor.ts';
export { AuyInternalSearch } from './atomics/search.ts';
export { AuyInternalMetadata } from './atomics/metadata.ts';

// ── Components ──
export { AuyAccordion } from './components/accordion.ts';
export { AuyDropdown } from './components/dropdown.ts';
export { AuyNav } from './components/nav.ts';
export { AuyProgress } from './components/progress.ts';
export { AuyContainer } from './components/container.ts';
export { AuySection } from './components/section.ts';
export { AuyFileInput } from './components/file-input.ts';
export { AuyRangeInput } from './components/range-input.ts';
export { AuyColorInput } from './components/color-input.ts';
export { AuyDateInput } from './components/date-input.ts';
export { AuyToastContainer } from './components/toast-container.ts';

// ── Layout ──
export { AuySkeleton } from './layout/skeleton.ts';
export { AuyAccessibilityBar } from './layout/accessibility/top-bar.ts';
export { AuyHeader } from './layout/header/header.ts';
export { AuySidebar } from './layout/base-struct/sidebar.ts';
export type { NavItem } from './layout/base-struct/sidebar.ts';
export { AuyMainSection } from './layout/main-section/main-section.ts';
export { AuyFooter } from './layout/footer/footer.ts';
export { AuyAppLayout } from './layout/app-layout.ts';
export type { SkipLink } from './layout/app-layout.ts';
export { AuyFooterTransparency } from './layout/footer/footer-transparency.ts';
export type { TransparencyItem } from './layout/footer/footer-transparency.ts';
export { AuyInternalPrintEngine } from './layout/print-engine.ts';
export { AuyBackToTop } from './layout/back-to-top.ts';
export { AuyBanner } from './layout/banner.ts';
export { AuyCmsLayout } from './layout/cms/cms-layout.ts';
export { AuyCmsLogin } from './layout/cms/cms-login.ts';
export { AuyError404 } from './layout/error/404.ts';
export { AuyError500 } from './layout/error/500.ts';
export { AuyError403 } from './layout/error/403.ts';
export { AuyError419 } from './layout/error/419.ts';
export { AuyError503 } from './layout/error/503.ts';

// ── Themes ──
export { THEMES } from './styles/themes/index.ts';
export type { Theme } from './styles/themes/index.ts';

// ── Utils ──
export { injectAria, setRole, announce, focusTrap, setAriaExpanded, setAriaSelected, setAriaCurrent, injectSkipLink, prefersReducedMotion, prefersColorScheme } from './utils/aria.ts';
export { observeVisibility, observeResize, observeMutations, debounce, throttle, delegateEvent, escapeHtml, createStore, queryMap, groupBy } from './utils/dom.ts';
export { formatDate, formatCurrency, formatNumber, formatRelativeTime, pluralize, truncate, slugify, maskCPF, maskCNPJ, maskPhone, stripMask, capitalize } from './utils/format.ts';

// ── Assets ──
export { ICONS, type IconName } from './assets/icons.ts';
