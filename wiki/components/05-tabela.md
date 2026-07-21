# Tabela — `<auy-comp-table>`

Tabela de dados completa com ordenação, filtro, seleção de linhas e formatação de células.

## Classe

`AuyCompTable` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `columns` | `Column[]` | `[]` | Definição das colunas |
| `rows` | `Record<string, unknown>[]` | `[]` | Dados da tabela |
| `sortable` | `boolean` | `true` | Habilita ordenação por coluna |
| `filterable` | `boolean` | `false` | Habilita campo de filtro |
| `selectable` | `boolean` | `false` | Habilita seleção de linhas com checkbox |
| `pageSize` | `number` | `20` | Itens por página |
| `currentPage` | `number` | `1` | Página atual |
| `loading` | `boolean` | `false` | Exibe estado de carregamento |
| `title` | `string` | `''` | Título da tabela |
| `emptyMessage` | `string` | `'Nenhum registro encontrado'` | Mensagem quando vazia |
| `stickyHeader` | `boolean` | `true` | Cabeçalho fixo |
| `showTotalRow` | `boolean` | `false` | Exibe linha de totais |
| `showHeader` | `boolean` | `true` | Exibe cabeçalho |
| `description` | `string` | `''` | Descrição (caption) |

### Interface `Column`

| Campo | Tipo | Default | Descrição |
|---|---|---|---|
| `key` | `string` | — | Chave do campo nos dados |
| `label` | `string` | — | Texto do cabeçalho |
| `sortable` | `boolean` | opcional | Permite ordenação |
| `width` | `string` | opcional | Largura CSS |
| `align` | `'left' \| 'center' \| 'right'` | opcional | Alinhamento do texto |
| `format` | `'text' \| 'number' \| 'date' \| 'currency'` | opcional | Formato de exibição |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `sort-change` | `{ column, direction }` | Ordenação alterada |
| `row-select` | `{ rows, allSelected }` | Seleção de linhas alterada |

## Uso

```html
<auy-comp-table
  .columns=${[
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'idade', label: 'Idade', sortable: true, align: 'center', format: 'number' },
    { key: 'salario', label: 'Salário', sortable: true, format: 'currency' },
    { key: 'admissao', label: 'Admissão', format: 'date' }
  ]}
  .rows=${[
    { nome: 'João', idade: 28, salario: 4500, admissao: '2024-01-15' },
    { nome: 'Maria', idade: 34, salario: 6200, admissao: '2023-06-01' }
  ]}
  sortable
  filterable
  selectable
  title="Funcionários"
></auy-comp-table>
```

## Acessibilidade

- `role="grid"` na tabela
- `role="columnheader"` nos cabeçalhos
- `role="row"` e `role="gridcell"` nas células
- `aria-sort` nos cabeçalhos ordenáveis (`none`, `ascending`, `descending`)
- `aria-selected` nas linhas selecionáveis
- `aria-rowcount` total de linhas
- Navegação por teclado: setas (↑ ↓), Home, End, Espaço para selecionar
- `delegatesFocus: true`
- `forced-colors: active` — bordas e cores de seleção via `Highlight`/`HighlightText`
- `prefers-reduced-motion: reduce` — transições desligadas
- Display responsivo: em container < 600px, vira layout de cartão

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-primary` | Cor de destaque (sort, seleção, foco) |
| `--auy-color-primary-focus` | Sombra de foco |
| `--auy-color-border` | Bordas da tabela |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Cor do texto secundário |
| `--auy-color-surface` | Background do input |
| `--auy-text-sm` / `--auy-text-lg` | Tamanhos de fonte |
| `--auy-font-weight-semibold` | Peso do cabeçalho |
| `--auy-space-sm` / `--auy-space-md` / `--auy-space-xl` | Espaçamentos |
| `--auy-transition` / `--auy-transition-fast` | Velocidade das transições |
| `--auy-z-sticky` | Z-index do cabeçalho fixo |
| `--auy-radius-md` | Border-radius |
