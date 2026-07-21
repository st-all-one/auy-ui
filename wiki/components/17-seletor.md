# Seletor — `<auy-comp-select>`

Componente de seleção (combobox) com dropdown, busca interna e suporte a teclado.

## Classe

`AuyCompSelect` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `options` | `SelectOption[]` | `[]` | Lista de opções (`{ value, label, disabled? }`) |
| `value` | `string` | `''` | Valor selecionado |
| `label` | `string` | `''` | Rótulo exibido acima do campo |
| `placeholder` | `string` | `'Selecione...'` | Texto quando nenhuma opção está selecionada |
| `searchable` | `boolean` | `true` | Habilita campo de busca no dropdown |
| `disabled` | `boolean` | `false` | Desabilita o select |
| `required` | `boolean` | `false` | Torna o campo obrigatório |
| `name` | `string` | `''` | Atributo name do input oculto |
| `multiple` | `boolean` | `false` | Seleção múltipla (reservado) |

## Uso

```html
<auy-comp-select
  label="Estado"
  .options=${[
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
  ]}
></auy-comp-select>

<auy-comp-select
  placeholder="Escolha uma opção"
  searchable="false"
></auy-comp-select>

<auy-comp-select
  label="País"
  value="br"
  disabled
></auy-comp-select>
```

## Acessibilidade e Eventos

- `role="combobox"` no trigger, `aria-expanded`, `aria-controls` e `aria-haspopup`
- `role="listbox"` no dropdown
- `role="option"`, `aria-selected` e `aria-disabled` em cada opção
- Input oculto com `name` para uso em formulários
- Navegação por teclado: `Enter`/`Space`/`↓` abre, `↑↓` navega, `Enter` seleciona, `Escape`/`Tab` fecha
- Foco automático no campo de busca quando disponível
- Fechamento ao clicar fora (`mousedown` global)
- `forced-colors: active` — bordas `ButtonText`, outline `Highlight`
- `prefers-reduced-motion: reduce` — transições desligadas
- Impressão: dropdown oculto
- Dispara `change` com `{ value, label }` ao selecionar

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Fundo do trigger e dropdown |
| `--auy-color-border` | Bordas |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Placeholder |
| `--auy-color-primary` | Foco e hover |
| `--auy-color-primary-hover` | Hover do trigger |
| `--auy-shadow-md` | Sombra do dropdown |
| `--auy-z-dropdown` | Z-index do dropdown |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-space-sm` / `--auy-space-md` / `--auy-space-xs` | Espaçamentos |
