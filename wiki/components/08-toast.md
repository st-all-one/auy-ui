# Toast — `<auy-comp-toast>`

Notificação individual com variantes, timer e animação de entrada/saída.

## Classe

`AuyCompToast` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'error' \| 'warning'` | `'info'` | Variante visual |
| `open` | `boolean` | `false` | Controla visibilidade (refletido) |
| `duration` | `number` | `4000` | Tempo em ms antes de auto-fechar (0 = permanente) |
| `dismissible` | `boolean` | `true` | Exibe botão de fechar |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `show` | — | Disparado ao exibir |
| `hide` | — | Disparado ao ocultar |

## Uso

```html
<auy-comp-toast
  variant="success"
  open
  duration="5000"
>
  Documento salvo com sucesso!
</auy-comp-toast>

<auy-comp-toast variant="error" .dismissible=${false}>
  Erro de conexão.
</auy-comp-toast>
```

## Acessibilidade

- `role="alert"` com `aria-atomic="true"`
- Botão de dismiss com `aria-label="Fechar"`
- Slots para ícone customizado
- Tema escuro automático
- `forced-colors: active` — borda `CanvasText`, botão `ButtonText`
- `prefers-reduced-motion: reduce` — transições desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Background do toast |
| `--auy-color-text` | Cor do texto |
| `--auy-color-info` / `--auy-color-success` / `--auy-color-error` / `--auy-color-warning` | Borda lateral e background |
| `--auy-shadow-md` | Sombra |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-line-height` | Altura da linha |
| `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-transition-base` / `--auy-transition-fast` | Velocidade das transições |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Mensagem do toast |
| `icon` | Substitui o ícone padrão |
