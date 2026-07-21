# Dica de Ferramenta — `<auy-comp-tooltip>`

Tooltip que aparece ao passar o mouse ou focar no elemento filho.

## Classe

`AuyCompTooltip` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `text` | `string` | `''` | Texto exibido no tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posição relativa ao trigger |
| `delay` | `number` | `300` | Delay em ms antes de mostrar |
| `disabled` | `boolean` | `false` | Desabilita o tooltip |

## Uso

```html
<auy-comp-tooltip text="Clique para salvar" position="bottom">
  <button>Salvar</button>
</auy-comp-tooltip>

<auy-comp-tooltip text="Voltar para home" position="right" delay="500">
  <a href="/">Home</a>
</auy-comp-tooltip>
```

## Acessibilidade

- `role="tooltip"` no tooltip
- `aria-describedby` no trigger aponta para o ID do tooltip
- Gatilhos: `mouseenter`/`mouseleave` e `focusin`/`focusout`
- Tooltip posicionado com `position: fixed` para evitar overflow
- Seta indicadora com `part="arrow"`
- `forced-colors: active` — borda `CanvasText`, setas com `CanvasText`
- `prefers-reduced-motion: reduce` — transições desligadas
- Impressão: oculto

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-z-tooltip` | Z-index do tooltip |
| `--auy-color-text` | Background do tooltip |
| `--auy-color-surface` | Cor do texto |
| `--auy-text-xs` | Tamanho da fonte |
| `--auy-radius-md` | Border-radius |
| `--auy-space-xs` / `--auy-space-sm` | Padding |
| `--auy-transition-fast` | Velocidade da transição |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Elemento trigger que receberá o tooltip |
