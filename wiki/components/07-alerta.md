# Alerta — `<auy-comp-alert>`

Alerta inline com variantes semânticas, ícone, dismiss e auto-timer.

## Classe

`AuyCompAlert` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'error' \| 'warning'` | `'info'` | Variante visual do alerta |
| `open` | `boolean` | `true` | Controla visibilidade (refletido) |
| `dismissible` | `boolean` | `true` | Exibe botão de fechar |
| `title` | `string` | `''` | Título do alerta |
| `icon` | `boolean` | `true` | Exibe ícone semântico |
| `timeout` | `number` | `0` | Auto-dismiss em ms (0 = desligado) |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `show` | — | Disparado ao exibir |
| `dismiss` | — | Disparado ao fechar |

## Uso

```html
<auy-comp-alert variant="success" title="Sucesso!" timeout="5000">
  Operação concluída com sucesso.
</auy-comp-alert>

<auy-comp-alert variant="error" .icon=${false}>
  Erro ao salvar o registro.
</auy-comp-alert>

<auy-comp-alert variant="warning" dismissible>
  <span slot="title">Atenção</span>
  Este recurso será descontinuado.
  <div slot="action">
    <button>Saber mais</button>
  </div>
</auy-comp-alert>
```

## Acessibilidade

- `role="alert"` ou `role="alertdialog"` (se houver actions)
- `aria-live="polite"` ou `"assertive"` (error/warning)
- `aria-atomic="true"`
- Botão de dismiss com `aria-label="Fechar"`
- Suporte a `@starting-style` para animação de entrada
- Tema escuro automático via `prefers-color-scheme: dark`
- `forced-colors: active` — borda `CanvasText`
- `prefers-reduced-motion: reduce` — transições desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-info` | Alerta info (borda e background) |
| `--auy-color-success` | Alerta success |
| `--auy-color-warning` | Alerta warning |
| `--auy-color-error` | Alerta error |
| `--auy-color-primary` | Foco do dismiss |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-line-height` | Altura da linha |
| `--auy-font-weight-semibold` | Peso do título |
| `--auy-space-sm` / `--auy-space-md` / `--auy-space-xs` | Espaçamentos |
| `--auy-transition-base` | Velocidade da transição |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Conteúdo/mensagem do alerta |
| `title` | Substitui o título padrão |
| `action` | Botões de ação no rodapé |
