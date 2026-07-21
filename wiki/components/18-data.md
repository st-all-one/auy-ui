# Data — `<auy-comp-date-input>`

Componente de input de data nativo com label e estilos customizados.

## Classe

`AuyCompDateInput` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `string` | `''` | Valor atual (AAAA-MM-DD) |
| `label` | `string` | `''` | Rótulo exibido acima do campo |
| `min` | `string` | `''` | Data mínima aceitável (AAAA-MM-DD) |
| `max` | `string` | `''` | Data máxima aceitável (AAAA-MM-DD) |
| `disabled` | `boolean` | `false` | Desabilita o input |
| `required` | `boolean` | `false` | Torna o campo obrigatório |
| `name` | `string` | `''` | Atributo name do input nativo |

## Uso

```html
<auy-comp-date-input label="Data de nascimento" value="1990-01-15"></auy-comp-date-input>

<auy-comp-date-input label="Período" min="2024-01-01" max="2024-12-31" required></auy-comp-date-input>

<auy-comp-date-input label="Início" name="startDate" disabled></auy-comp-date-input>
```

## Acessibilidade e Eventos

- Input nativo `type="date"` com suporte a picker do browser
- `aria-label` vinculado ao label
- `aria-required` quando obrigatório
- `:user-invalid` com borda `--auy-color-error`
- `:focus-visible` com outline de 2px
- `forced-colors: active` — borda `ButtonText`
- `prefers-reduced-motion: reduce` — transições desligadas
- Impressão: borda `CanvasText`
- Dispara `change` com `{ value }` ao alterar a data

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Fundo do input |
| `--auy-color-border` | Borda |
| `--auy-color-primary-hover` | Hover da borda |
| `--auy-color-primary` | Foco |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Separadores do datetime |
| `--auy-color-error` | Borda de erro e asterisco |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-radius-md` | Border-radius |
| `--auy-transition` / `--auy-transition-fast` | Transições |
