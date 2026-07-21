# Superfície

Tokens de bordas, sombras, transições e área segura para componentes.

## Radius

Definidos em `src/styling/tokens/surface.css`:

| Token | Valor |
|---|---|
| `--auy-radius-sm` | `4px` |
| `--auy-radius-md` | `8px` |
| `--auy-radius-lg` | `12px` |
| `--auy-radius-full` | `9999px` |

```css
.card {
  border-radius: var(--auy-radius-md);
}

.badge {
  border-radius: var(--auy-radius-full);
}
```

## Shadow

Sombras em OKLCH para consistência perceptual:

| Token | Valor |
|---|---|
| `--auy-shadow-sm` | `0 1px 2px oklch(0% 0 0 / 0.06)` |
| `--auy-shadow-md` | `0 2px 8px oklch(0% 0 0 / 0.1), 0 2px 4px -1px oklch(0% 0 0 / 0.06)` |
| `--auy-shadow-lg` | `0 4px 24px oklch(0% 0 0 / 0.12), 0 8px 16px -4px oklch(0% 0 0 / 0.08), 0 2px 4px -2px oklch(0% 0 0 / 0.04)` |

```css
.dialog {
  box-shadow: var(--auy-shadow-lg);
}
```

## Transition

| Token | Duração |
|---|---|
| `--auy-transition` | `200ms ease` |
| `--auy-transition-fast` | `150ms ease` |
| `--auy-transition-slow` | `300ms ease` |

```css
button {
  transition: background-color var(--auy-transition),
              color var(--auy-transition);
}
```

## Safe Area Insets

Para dispositivos com notch (iPhone X+):

| Token | Fallback |
|---|---|
| `--auy-safe-area-top` | `env(safe-area-inset-top, 0px)` |
| `--auy-safe-area-bottom` | `env(safe-area-inset-bottom, 0px)` |
| `--auy-safe-area-left` | `env(safe-area-inset-left, 0px)` |
| `--auy-safe-area-right` | `env(safe-area-inset-right, 0px)` |

```css
.fixed-header {
  padding-block-start: var(--auy-safe-area-top);
}
```

## Exemplo Prático

```css
.meu-card {
  border-radius: var(--auy-radius-lg);
  box-shadow: var(--auy-shadow-md);
  transition: box-shadow var(--auy-transition);
}

.meu-card:hover {
  box-shadow: var(--auy-shadow-lg);
}
```

## Próximos Passos

- [Breakpoints](02e-breakpoints.md)
- [Customização](07-customizacao.md)
