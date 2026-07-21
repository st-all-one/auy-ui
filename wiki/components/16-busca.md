# Busca — `<auy-comp-search>`

Componente de busca com overlay, filtro local, suporte a dados remotos e navegação por teclado.

## Classe

`AuyCompSearch` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `items` | `{ label, description?, href?, icon?, category? }[]` | `[]` | Lista de itens para exibir nos resultados |
| `placeholder` | `string` | `'Buscar...'` | Placeholder do campo de busca |
| `open` | `boolean` | `false` | Controla abertura/fechamento do overlay |
| `shortcut` | `string` | `'k'` | Tecla de atalho (ex: `k` para Ctrl+K) |
| `src` | `string` | `''` | URL para busca remota via fetch |
| `debounceMs` | `number` | `300` | Tempo de debounce para busca remota |
| `variant` | `'default' \| 'elevated' \| 'bordered'` | `'default'` | Variante visual do painel |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Tamanho do painel |
| `position` | `'default' \| 'center' \| 'top'` | `'default'` | Posição vertical do overlay |

## Uso

```html
<auy-comp-search
  .items=${[
    { label: 'Dashboard', description: 'Ir para o painel', href: '/dashboard' },
    { label: 'Configurações', description: 'Preferências do sistema', href: '/settings' },
  ]}
></auy-comp-search>

<auy-comp-search
  src="/api/search"
  variant="elevated"
  size="lg"
  position="center"
></auy-comp-search>

<auy-comp-search shortcut="l" variant="bordered" size="sm"></auy-comp-search>
```

## Acessibilidade e Eventos

- `role="dialog"` e `aria-modal="true"` no painel
- `role="listbox"` na lista de resultados
- `role="option"` e `aria-selected` em cada item
- Foco automático no input ao abrir
- Atalho global Ctrl+K (ou `shortcut` configurável)
- Navegação por teclado: `↑↓`, `Enter`, `Escape`
- Destaque do termo buscado nos resultados com `<mark>`
- `forced-colors: active` — overlay `Canvas`, seleção `Highlight`
- `prefers-reduced-motion: reduce` — animação do overlay desligada
- Impressão: fundo transparente
- Dispara `search-select` com o item ao selecionar
- Dispara `search-close` ao fechar

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Fundo do painel |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Texto secundário |
| `--auy-color-border` | Bordas |
| `--auy-color-primary` | Destaque e hover |
| `--auy-color-overlay` | Fundo do overlay |
| `--auy-shadow-lg` | Sombra do painel |
| `--auy-z-overlay` | Z-index do overlay |
| `--auy-radius-lg` / `--auy-radius-md` | Border-radius |
