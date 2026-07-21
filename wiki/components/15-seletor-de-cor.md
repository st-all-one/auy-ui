# Seletor de Cor — `<auy-comp-color-input>`

Seletor de cor com anel HSV, triângulo de saturação/valor, preview, alpha e suporte a formatos hex, rgb, hsl e oklch.

## Classe

`AuyCompColorInput` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `string` | `'#3B82F6'` | Cor atual (hex ou oklch) |
| `label` | `string` | `''` | Rótulo exibido acima do seletor |
| `showEyedropper` | `boolean` | `true` | Exibe botão de pipeta |
| `showAlpha` | `boolean` | `true` | Exibe controle de alpha |
| `showRecent` | `boolean` | `true` | Exibe seção de cores recentes |
| `recentCount` | `number` | `8` | Máximo de cores recentes |

## Uso

```html
<auy-comp-color-input value="#FF5722" label="Cor primária"></auy-comp-color-input>

<auy-comp-color-input showAlpha="false" showRecent="false"></auy-comp-color-input>

<auy-comp-color-input value="oklch(60% 0.15 250)" showEyedropper="false"></auy-comp-color-input>
```

## Acessibilidade e Eventos

- `aria-label="Hex value"` no campo de input hexadecimal
- `aria-label="Alpha"` no range de alpha
- `aria-label="Pipeta"` no botão de eyedropper
- `aria-label="Copiar HEX/RGB/HSL/OKLCH"` nos chips de formato
- Botões de cores recentes com `aria-label` igual ao valor hex
- Controles de arrasto com `touch-action: none` para touch
- `forced-colors: active` — borda `ButtonText` no picker
- Dispara `change` com `{ hex, oklch, rgb, hsl, hsv, alpha }` ao alterar cor
- Clipboard: chips de formato copiam o valor ao clicar

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Fundo do picker |
| `--auy-color-surface-alt` | Fundo alternado |
| `--auy-color-border` | Bordas |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Texto secundário |
| `--auy-color-primary` | Foco e hover |
| `--auy-color-success` | Estado "copiado" |
| `--auy-font-mono` | Font monoespaçada |
| `--auy-text-sm` / `--auy-text-xs` | Tamanhos de fonte |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-space-sm` / `--auy-space-md` / `--auy-space-xs` | Espaçamentos |
| `--auy-transition-fast` | Transições rápidas |
