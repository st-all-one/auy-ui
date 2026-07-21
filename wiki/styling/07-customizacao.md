# Customização

auy-ui foi projetado para ser customizado via CSS Custom Properties. Todas as variáveis `--auy-*` podem ser sobrescritas.

## Sobrescrever Tokens no `:root`

```css
:root {
  /* Cores */
  --auy-color-primary: oklch(55% 0.25 180);
  --auy-color-primary-hover: oklch(50% 0.25 180);
  --auy-color-primary-active: oklch(47% 0.27 180);
  --auy-color-primary-focus: oklch(60% 0.3 180 / 0.35);
  --auy-color-primary-inverse: oklch(100% 0 0);

  /* Espaçamento */
  --auy-space-md: clamp(12px, 1.5vw, 20px);

  /* Tipografia */
  --auy-font-size-multiplier: 1.125;
  --auy-font-sans: 'Open Sans', system-ui, sans-serif;
  --auy-font-mono: 'Fira Code', monospace;

  /* Superfície */
  --auy-radius-md: 6px;
  --auy-radius-lg: 10px;
  --auy-transition: 250ms ease;

  /* Breakpoints */
  --auy-breakpoint-md: 800px;
}
```

## Tema Customizado via `[data-auy-theme]`

Crie seu próprio tema com um seletor de data attribute:

```css
[data-auy-theme="custom"] {
  --auy-color-primary: oklch(50% 0.25 30);
  --auy-color-primary-hover: oklch(45% 0.25 30);
  --auy-color-primary-active: oklch(42% 0.27 30);
  --auy-color-primary-focus: oklch(55% 0.3 30 / 0.35);
  --auy-color-primary-inverse: oklch(100% 0 0);
  --auy-color-info: oklch(50% 0.2 250);
  --auy-color-warning: oklch(65% 0.2 85);
}

/* Dark mode para o tema customizado */
@media (prefers-color-scheme: dark) {
  [data-auy-theme="custom"] {
    --auy-color-primary: oklch(60% 0.25 30);
    --auy-color-primary-hover: oklch(65% 0.25 30);
    --auy-color-primary-active: oklch(60% 0.27 30);
    --auy-color-primary-focus: oklch(65% 0.3 30 / 0.3);
  }
}
```

Aplique no HTML:

```html
<html lang="pt-BR" data-auy-theme="custom">
```

## Temas Existentes

auy-ui inclui 22 temas de cores prontos. Basta adicionar o data attribute:

```html
<html data-auy-theme="amber">
<html data-auy-theme="azure">
<html data-auy-theme="blue">
<html data-auy-theme="cyan">
<html data-auy-theme="emerald">
<html data-auy-theme="fuchsia">
<html data-auy-theme="green">
<html data-auy-theme="grey">
<html data-auy-theme="indigo">
<html data-auy-theme="jade">
<html data-auy-theme="lime">
<html data-auy-theme="orange">
<html data-auy-theme="pink">
<html data-auy-theme="pumpkin">
<html data-auy-theme="purple">
<html data-auy-theme="red">
<html data-auy-theme="ruby">
<html data-auy-theme="sand">
<html data-auy-theme="slate">
<html data-auy-theme="violet">
<html data-auy-theme="yellow">
<html data-auy-theme="zinc">
```

## Fallback Colors

Navegadores sem suporte a OKLCH recebem fallback HSL automático. Você também pode fornecer seus próprios fallbacks:

```css
:root {
  --auy-color-primary: oklch(50% 0.2 250);
  /* Fallback manual */
  color: var(--auy-color-primary, hsl(250, 40%, 50%));
}
```

## Variáveis de Componentes

Alguns componentes expõem variáveis internas para customização:

```css
:root {
  --auy-spinner-size: 2rem;
  --auy-spinner-speed: 0.6;
  --truncate-lines: 4;
  --auy-list-marker: '→ ';
  --auy-list-counter: upper-alpha;
}
```

## Acessibilidade na Customização

- Mantenha contraste mínimo de 4.5:1 para texto normal
- Teste temas com `prefers-contrast: more`
- Verifique o comportamento em dark mode
- Use OKLCH em vez de HSL para cores perceptualmente consistentes
- Nunca remova o outline de foco

## Próximos Passos

- [Migração](08-migracao.md)
- [Índice](00-index.md)
