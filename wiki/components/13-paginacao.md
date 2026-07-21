# Paginação — `<auy-comp-pagination>`

Componente de paginação com navegação por páginas, ellipsis e botões anterior/próximo.

## Classe

`AuyCompPagination` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `current` | `number` | `1` | Página atualmente selecionada |
| `total` | `number` | `1` | Total de itens |
| `perPage` | `number` | `10` | Itens por página |
| `maxVisible` | `number` | `5` | Número máximo de botões de página visíveis |
| `disabled` | `boolean` | `false` | Desabilita toda a navegação |

## Uso

```html
<auy-comp-pagination total="200" perPage="10" current="3"></auy-comp-pagination>

<auy-comp-pagination total="50" perPage="5" maxVisible="7" disabled></auy-comp-pagination>
```

## Acessibilidade e Eventos

- `aria-label="Paginação"` no `<nav>`
- `aria-current="page"` no botão da página ativa
- `aria-label="Página anterior"` / `"Próxima página"` nos botões de navegação
- `aria-label="Ir para página X"` em cada botão de página
- Itens ellipsis com `aria-hidden="true"` e `disabled`
- `:focus-visible` com outline de 2px
- `forced-colors: active` — borda `ButtonText` nos botões
- `prefers-reduced-motion: reduce` — transições desligadas
- Impressão: oculto (`display: none`)
- Dispara `page-change` com `{ page, perPage }` ao navegar

## CSS Custom Properties

| Propriedade | Tokens usados |
|---|---|
| `--auy-color-primary` | Background da página ativa |
| `--auy-color-primary-inverse` | Texto da página ativa |
| `--auy-color-text` | Cor do texto |
| `--auy-color-border` | Hover dos botões |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-font-weight-semibold` | Peso da página ativa |
| `--auy-radius-md` | Border-radius dos botões |
| `--auy-space-xs` | Gap entre botões |
| `--auy-transition` | Transição de hover |

## Slots

| Slot | Descrição |
|---|---|
| `prev-icon` | Substitui o ícone do botão anterior (`‹`) |
| `next-icon` | Substitui o ícone do botão seguinte (`›`) |
