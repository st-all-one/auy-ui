# Espaçamento

O sistema de espaçamento do auy-ui usa valores fluidos via `clamp()` — as medidas se adaptam proporcionalmente à largura da viewport.

## Tokens de Espaçamento

Definidos em `src/styling/tokens/spacing.css`:

| Token | Valor | Exemplo de uso |
|---|---|---|
| `--auy-space-2xs` | `clamp(1px, 0.15vw, 2px)` | Bordas finas |
| `--auy-space-xs` | `clamp(2px, 0.3vw, 4px)` | Gap pequeno |
| `--auy-space-sm` | `clamp(4px, 0.5vw, 8px)` | Padding interno |
| `--auy-space-md` | `clamp(8px, 1vw, 16px)` | Padding padrão |
| `--auy-space-lg` | `clamp(16px, 2vw, 24px)` | Seções |
| `--auy-space-xl` | `clamp(24px, 4vw, 40px)` | Seções grandes |
| `--auy-space-2xl` | `clamp(40px, 6vw, 64px)` | Containers |
| `--auy-space-3xl` | `clamp(64px, 8vw, 96px)` | Hero / banners |

## O que é `clamp()`?

`clamp(MÍNIMO, PREFERIDO, MÁXIMO)` define um valor que:

- Cresce com a viewport entre o mínimo e o máximo
- Usa a unidade `vw` para escala fluida
- Nunca ultrapassa os limites definidos

```css
--auy-space-md: clamp(8px, 1vw, 16px);
/* Mínimo 8px em telas pequenas, 16px em telas grandes, 1vw no meio */
```

## Como Usar

```css
.card {
  padding: var(--auy-space-lg);
  gap: var(--auy-space-md);
}

.card + .card {
  margin-block-start: var(--auy-space-xl);
}
```

## Espaçamento em Componentes

Os componentes do auy-ui já usam os tokens de espaçamento internamente. Você pode sobrescrever:

```css
:root {
  --auy-space-md: clamp(12px, 1.5vw, 20px);
}
```

## Exemplo Prático

```html
<div style="display: grid; gap: var(--auy-space-lg);">
  <div style="padding: var(--auy-space-md); background: var(--auy-color-surface-alt);">
    Espaçamento fluido em ação
  </div>
  <div style="padding: var(--auy-space-md); background: var(--auy-color-surface-alt);">
    O gap entre seções também é fluido
  </div>
</div>
```

## Próximos Passos

- [Tipografia](02c-typography.md)
- [Superfície](02d-surface.md)
