# Cores

O sistema de cores do auy-ui usa **OKLCH**, um espaço de cor perceptual que garante cores consistentes em qualquer tela. Para navegadores sem suporte, um fallback automático em HSL é fornecido.

## Cores Semânticas

Definidas em `src/styling/tokens/colors.css`:

| Token | Light | Dark |
|---|---|---|
| `--auy-color-primary` | `oklch(50% 0.2 250)` | `oklch(60% 0.2 250)` |
| `--auy-color-primary-hover` | `oklch(45% 0.2 250)` | `oklch(65% 0.2 250)` |
| `--auy-color-primary-active` | `oklch(42% 0.22 250)` | `oklch(60% 0.22 250)` |
| `--auy-color-primary-focus` | `oklch(55% 0.25 250 / 0.35)` | `oklch(65% 0.25 250 / 0.3)` |
| `--auy-color-primary-inverse` | `oklch(100% 0 0)` | `oklch(100% 0 0)` |
| `--auy-color-secondary` | `oklch(45% 0.03 260)` | _(mesmo)_ |
| `--auy-color-surface` | `oklch(98% 0.005 260)` | `oklch(15% 0.02 260)` |
| `--auy-color-surface-alt` | `oklch(96% 0.005 260)` | `oklch(18% 0.02 260)` |
| `--auy-color-text` | `oklch(20% 0.03 260)` | `oklch(90% 0.01 260)` |
| `--auy-color-text-muted` | `oklch(45% 0.03 260)` | `oklch(60% 0.02 260)` |
| `--auy-color-border` | `oklch(0% 0 0 / 0.1)` | `oklch(100% 0 0 / 0.12)` |
| `--auy-color-overlay` | `oklch(0% 0 0 / 0.4)` | `oklch(0% 0 0 / 0.6)` |
| `--auy-color-error` | `oklch(55% 0.22 30)` | _(mesmo)_ |
| `--auy-color-success` | `oklch(55% 0.2 145)` | _(mesmo)_ |
| `--auy-color-warning` | `oklch(65% 0.2 85)` | _(mesmo)_ |
| `--auy-color-info` | `oklch(50% 0.2 250)` | _(mesmo)_ |

As cores adaptam-se automaticamente ao `prefers-color-scheme` (dark mode) e `prefers-contrast: more`.

## Paletas Numéricas (50–950)

Definidas em `src/styling/tokens/palette.css` via `color-mix(in oklch, ...)`:

### Primary

```css
--auy-primary-50:  color-mix(in oklch, var(--auy-color-primary) 10%, white);
--auy-primary-100: color-mix(in oklch, var(--auy-color-primary) 20%, white);
--auy-primary-500: var(--auy-color-primary);
--auy-primary-950: color-mix(in oklch, var(--auy-color-primary) 10%, black);
```

### Neutral (fixa, sem `color-mix`)

```css
--auy-neutral-50:  oklch(98% 0.005 260);
--auy-neutral-500: oklch(50% 0.02 260);
--auy-neutral-950: oklch(5% 0.02 260);
```

### Paletas semânticas

- `--auy-success-50` a `--auy-success-950`
- `--auy-warning-50` a `--auy-warning-950`
- `--auy-error-50` a `--auy-error-950`

## OKLCH — Explicação Breve

OKLCH é um espaço de cor perceptual com 3 componentes:

```
oklch(Luminosidade Croma Matiz / Alpha)
```

- **L** (Lightness): 0% (preto) a 100% (branco)
- **C** (Chroma): saturação perceptual
- **H** (Hue): ângulo de cor (0–360)

Vantagens sobre HSL:
- Perceptual: mesma luminosidade = mesmo brilho percebido
- Gama mais ampla (P3)
- Matiz consistente em todas as luminosidades

## Fallback HSL Automático

Browsers sem suporte a OKLCH recebem HSL equivalente via `@supports not (color: oklch(...))`:

```css
@supports not (color: oklch(0% 0 0)) {
  :root {
    --auy-color-primary: hsl(250, 40%, 50%);
    --auy-color-surface: hsl(260, 3%, 98%);
    --auy-color-text: hsl(260, 10%, 20%);
  }
}
```

## Exemplo de Customização

```css
:root {
  --auy-color-primary: oklch(55% 0.25 180);
  --auy-color-primary-hover: oklch(50% 0.25 180);
  --auy-color-primary-active: oklch(47% 0.27 180);
  --auy-color-primary-focus: oklch(60% 0.3 180 / 0.35);
  --auy-color-primary-inverse: oklch(100% 0 0);
}
```

## Próximos Passos

- [Customização](07-customizacao.md)
- [Superfície](02d-surface.md)
