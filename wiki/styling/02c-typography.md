# Tipografia

auy-ui oferece uma escala tipográfica fluida, pesos customizáveis e duas opções de font family.

## Escala de Texto

Definida em `src/styling/tokens/typography.css`:

| Token | Tamanho |
|---|---|
| `--auy-text-3xs` | `0.5rem` |
| `--auy-text-2xs` | `0.625rem` |
| `--auy-text-xs` | `0.75rem` |
| `--auy-text-sm` | `0.875rem` |
| `--auy-text-base` | `1rem` |
| `--auy-text-lg` | `1.125rem` |
| `--auy-text-xl` | `1.3125rem` |
| `--auy-text-2xl` | `1.5rem` |
| `--auy-text-3xl` | `1.875rem` |
| `--auy-text-4xl` | `2.25rem` |
| `--auy-text-5xl` | `3rem` |

## `--auy-font-size-multiplier`

Um multiplicador global que escala toda a tipografia. Útil para acessibilidade (ajuste de tamanho de fonte do usuário):

```css
:root {
  --auy-font-size-multiplier: 1.25; /* Aumenta toda a tipografia em 25% */
}
```

## Headings Fluidos

Os headings usam `clamp()` para tamanhos fluidos:

| Elemento | Fórmula |
|---|---|
| `h1` | `clamp(var(--auy-text-3xl), calc(1.5rem + 1.5vw), var(--auy-text-4xl))` |
| `h2` | `clamp(var(--auy-text-2xl), calc(1.25rem + 1.25vw), var(--auy-text-3xl))` |
| `h3` | `clamp(var(--auy-text-xl), calc(1rem + 1vw), var(--auy-text-2xl))` |
| `h4` | `clamp(var(--auy-text-lg), calc(0.875rem + 0.75vw), var(--auy-text-xl))` |
| `h5` | `var(--auy-text-base)` |
| `h6` | `var(--auy-text-sm)` |

## Font Families

### Versão padrão (com fontes)

```css
--auy-font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
--auy-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
```

### Versão sem fontes (`nofonts`)

Use `auy-ui-nofonts.min.css` para usar system-ui nativo sem carregar Inter ou JetBrains Mono:

```html
<link rel="stylesheet" href="auy-ui-nofonts.min.css">
```

## Pesos e Tracking

```css
--auy-font-weight-regular: 400;
--auy-font-weight-medium: 500;
--auy-font-weight-semibold: 600;
--auy-font-weight-bold: 700;

--auy-line-height: 1.6;
--auy-line-height-sm: 1.3;
--auy-line-height-lg: 1.8;

--auy-tracking-tight: -0.02em;
--auy-tracking-normal: 0;
--auy-tracking-wide: 0.03em;
```

## Exemplo

```html
<h1>Título Fluido</h1>
<h2>Subtítulo</h2>
<p style="font-size: var(--auy-text-sm); color: var(--auy-color-text-muted);">
  Texto pequeno com cor secundária.
</p>
```

## Próximos Passos

- [Elementos de Texto](03a-typography.md)
- [Customização](07-customizacao.md)
