# Acordeão — `<auy-comp-accordion>`

Acordeão expansível com suporte a múltiplos itens abertos e ícone customizável.

## Classe

`AuyCompAccordion` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `items` | `AccordionItem[]` | `[]` | Array de itens do acordeão |
| `multiple` | `boolean` | `false` | Permite múltiplos itens abertos simultaneamente |
| `icon` | `'chevron' \| 'plus'` | `'chevron'` | Estilo do ícone de expansão |

### Interface `AccordionItem`

| Campo | Tipo | Default | Descrição |
|---|---|---|---|
| `id` | `string` | — | Identificador único |
| `title` | `string` | — | Título do item |
| `content` | `string` | — | Conteúdo HTML (fallback do slot) |
| `open` | `boolean` | `false` | Estado inicial |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `toggle` | `{ id: string, open: boolean }` | Disparado ao expandir/recolher |

## Uso

```html
<auy-comp-accordion
  .items=${[
    { id: '1', title: 'O que é auy-ui?', content: 'Framework de componentes web.' },
    { id: '2', title: 'Como instalar?', content: 'Via npm ou CDN.' },
  ]}
  multiple
  icon="plus"
></auy-comp-accordion>
```

## Acessibilidade

- Usa `<details>` nativo para semântica
- `summary` com `cursor: pointer` e `user-select: none`
- `delegatesFocus: true`
- Navegação por teclado (Enter/Space para alternar)
- `forced-colors: active` — borda `ButtonText`, outline `Highlight`
- `prefers-reduced-motion: reduce` — transições e rotação do ícone desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-border` | Borda entre itens |
| `--auy-color-text` | Cor do título |
| `--auy-color-text-muted` | Cor do conteúdo |
| `--auy-color-primary` | Foco do summary |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-font-weight-medium` | Peso do título |
| `--auy-line-height` | Altura da linha |
| `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-transition` / `--auy-transition-fast` | Velocidade das transições |

## Slots

| Slot | Descrição |
|---|---|
| `item-{id}` | Substitui o conteúdo HTML do item |
