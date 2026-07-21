# Badge — `<auy-comp-badge>`

Selo/etiqueta para destacar status, categorias ou contagens.

## Classe

`AuyCompBadge` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `text` | `string` | `''` | Texto do badge (fallback do slot) |
| `variant` | `'default' \| 'info' \| 'success' \| 'error' \| 'warning'` | `'default'` | Cor semântica do badge |
| `size` | `'sm' \| 'md'` | `'md'` | Tamanho do badge (refletido como atributo) |
| `outline` | `boolean` | `false` | Estilo outline (fundo transparente com borda) |
| `pill` | `boolean` | `false` | Formato pill (border-radius total) |

## Uso

```html
<auy-comp-badge variant="success" text="Ativo"></auy-comp-badge>

<auy-comp-badge variant="error" outline pill>Urgente</auy-comp-badge>

<auy-comp-badge variant="info" size="sm">Novo</auy-comp-badge>
```

## Acessibilidade

- Display `inline-flex` para alinhamento consistente
- `user-select: none` para evitar seleção acidental
- `forced-colors: active` — borda `ButtonText`
- Impressão: oculto (`display: none`)

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-primary` | Cor padrão do badge |
| `--auy-color-primary-inverse` | Texto no badge padrão |
| `--auy-color-success` | Variante success |
| `--auy-color-error` | Variante error |
| `--auy-color-warning` | Variante warning |
| `--auy-color-info` | Variante info |
| `--auy-text-sm` / `--auy-text-xs` | Tamanho da fonte |
| `--auy-font-weight-semibold` | Peso da fonte |
| `--auy-radius-sm` / `--auy-radius-full` | Border-radius |
| `--auy-color-text` | Cor do texto no outline |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Substitui o texto padrão do badge |
