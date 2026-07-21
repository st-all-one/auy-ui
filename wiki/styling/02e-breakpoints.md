# Breakpoints

Sistema de breakpoints tokens e `@custom-media` queries para responsividade em auy-ui.

## Breakpoint Tokens

Definidos em `src/styling/tokens/breakpoints.css`:

| Token | Valor |
|---|---|
| `--auy-breakpoint-sm` | `576px` |
| `--auy-breakpoint-md` | `768px` |
| `--auy-breakpoint-lg` | `1024px` |
| `--auy-breakpoint-xl` | `1280px` |
| `--auy-breakpoint-2xl` | `1536px` |

Úteis em cálculos CSS, `clamp()`, ou como referência para container queries:

```css
.component {
  max-inline-size: var(--auy-breakpoint-md);
}
```

## @custom-media Queries

Definidos em `src/styling/layers.css`:

### Viewport width

| Custom Media | Equivalente |
|---|---|
| `@media (--auy-media-sm)` | `(width >= 576px)` |
| `@media (--auy-media-md)` | `(width >= 768px)` |
| `@media (--auy-media-lg)` | `(width >= 1024px)` |
| `@media (--auy-media-xl)` | `(width >= 1280px)` |
| `@media (--auy-media-2xl)` | `(width >= 1536px)` |

### Preferências do usuário

| Custom Media | Equivalente |
|---|---|
| `@media (--auy-media-dark)` | `(prefers-color-scheme: dark)` |
| `@media (--auy-media-light)` | `(prefers-color-scheme: light)` |
| `@media (--auy-media-contrast-more)` | `(prefers-contrast: more)` |
| `@media (--auy-media-motion-ok)` | `(prefers-reduced-motion: no-preference)` |
| `@media (--auy-media-motion-not)` | `(prefers-reduced-motion: reduce)` |
| `@media (--auy-media-print)` | `print` |

## Como Usar

### Viewport media queries

```css
@media (--auy-media-md) {
  .sidebar { display: grid; }
}

@media (--auy-media-lg) {
  .layout { grid-template-columns: 1fr 2fr; }
}
```

### Tema escuro / claro

```css
@media (--auy-media-dark) {
  :root { --color-bg: oklch(0.2 0 0); }
}

@media (--auy-media-light) {
  :root { --color-bg: oklch(0.98 0 0); }
}
```

### Movimento reduzido

```css
@media (--auy-media-motion-not) {
  .animated { animation: none; }
}
```

### Fallback para browsers sem suporte a @custom-media

```css
@media (min-width: 768px) {
  .sidebar { display: grid; }
}

@supports (width >= 0) {
  @media (--auy-media-md) {
    .sidebar { display: grid; }
  }
}
```

## Container Queries

Container queries não aceitam `var()` diretamente. Use valores fixos com comentário referenciando o token:

```css
@container (max-width: 600px) {
  /* --auy-breakpoint-table: 600px — threshold para tabela responsiva */
  .table-responsive { display: block; }
}

@container (max-width: 400px) {
  /* --auy-breakpoint-breadcrumb: 400px — threshold para breadcrumb */
  .breadcrumb li { max-inline-size: 10ch; }
}
```

## Grid Responsivo

```css
.grid {
  display: grid;
  gap: var(--auy-space-md);
  grid-template-columns: 1fr;
}

@media (--auy-media-sm) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (--auy-media-md) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

## Convenções

- **Viewport breakpoints** usam `min-width` (mobile-first)
- **Container breakpoints** são específicos do componente e definidos localmente
- **Preferências do usuário** seguem as queries padrão de acessibilidade do sistema

## Próximos Passos

- [Utilitários: Grid](04-utilities.md)
- [Base: Elementos HTML](03-base.md)
