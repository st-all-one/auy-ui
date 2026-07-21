# Tokens

Os tokens de design são a fundação do auy-ui. Todos são expostos como CSS Custom Properties no padrão `--auy-*` e definidos dentro de `@layer tokens`.

## Subpáginas

| Token | Descrição |
|---|---|
| [Cores](02a-colors.md) | Cores semânticas, paletas numéricas, OKLCH, fallback HSL |
| [Espaçamento](02b-spacing.md) | Espaçamento fluido com `clamp()` |
| [Tipografia](02c-typography.md) | Escala de texto, font families, headings fluidos |
| [Superfície](02d-surface.md) | Radius, shadow, transition, safe area |
| [Breakpoints](02e-breakpoints.md) | Breakpoints e `@custom-media` |

## Como Usar Tokens

```css
.meu-componente {
  padding: var(--auy-space-md);
  color: var(--auy-color-text);
  background: var(--auy-color-surface);
  border-radius: var(--auy-radius-md);
  font-size: var(--auy-text-sm);
}
```

## Lista Completa de Tokens

```css
:root {
  /* Cores */
  --auy-color-primary: oklch(50% 0.2 250);
  --auy-color-surface: oklch(98% 0.005 260);
  --auy-color-text: oklch(20% 0.03 260);
  --auy-color-error: oklch(55% 0.22 30);
  --auy-color-success: oklch(55% 0.2 145);
  --auy-color-warning: oklch(65% 0.2 85);
  --auy-color-info: oklch(50% 0.2 250);

  /* Espaçamento */
  --auy-space-md: clamp(8px, 1vw, 16px);

  /* Tipografia */
  --auy-text-base: calc(var(--auy-font-size-multiplier) * 1rem);
  --auy-font-sans: 'Inter', system-ui, senza-serif;
  --auy-font-mono: 'JetBrains Mono', monospace;

  /* Superfície */
  --auy-radius-md: 8px;
  --auy-shadow-md: 0 2px 8px oklch(0% 0 0 / 0.1);
  --auy-transition: 200ms ease;

  /* Breakpoints */
  --auy-breakpoint-md: 768px;
}
```

## Compatibilidade com `calc()` e `clamp()`

Os tokens tipográficos usam `calc(var(--auy-font-size-multiplier) * ...)` e os de espaçamento usam `clamp()`. Isso permite escalar globalmente tipografia e espaçamento ajustando apenas `--auy-font-size-multiplier`.

## Próximos Passos

- [Cores](02a-colors.md)
- [Customização](07-customizacao.md)
