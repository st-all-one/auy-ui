# Modal — `<auy-comp-modal>`

Diálogo modal com backdrop, variantes visuais, suporte a teclado e foco.

## Classe

`AuyCompModal` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `open` | `boolean` | `false` | Controla a abertura do modal (refletido) |
| `title` | `string` | `''` | Título do modal |
| `description` | `string` | `''` | Descrição abaixo do título |
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante com ícone semântico |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Tamanho do modal |
| `closable` | `boolean` | `true` | Exibe botão de fechar |
| `closeOnOverlay` | `boolean` | `true` | Fecha ao clicar no backdrop |
| `closeOnEscape` | `boolean` | `true` | Fecha ao pressionar Escape |
| `preventBodyScroll` | `boolean` | `true` | Usa `showModal()` para travar scroll |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `open` | — | Modal foi aberto |
| `close` | — | Modal foi fechado |

## Uso

```html
<auy-comp-modal
  open
  title="Confirmação"
  description="Deseja realmente excluir este item?"
  variant="warning"
  size="sm"
  @open=${() => console.log('aberto')}
  @close=${() => console.log('fechado')}
>
  <p>Esta ação não pode ser desfeita.</p>
  <div slot="footer">
    <button @click=${closeModal}>Cancelar</button>
    <button>Confirmar</button>
  </div>
</auy-comp-modal>
```

## Acessibilidade

- `<dialog>` nativo com `role="dialog"` e `aria-modal="true"`
- `aria-label` vinculado ao título
- Foco retorna ao elemento anterior ao fechar
- `closeOnOverlay` e `closeOnEscape` para fechamento por teclado
- Botão de fechar com `aria-label="Fechar"`
- `@starting-style` para animação de entrada
- `forced-colors: active` — borda `CanvasText`
- `prefers-reduced-motion: reduce` — transições desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-surface` | Background do modal |
| `--auy-color-text` | Cor do título |
| `--auy-color-text-muted` | Cor da descrição |
| `--auy-color-border` | Divisores |
| `--auy-color-overlay` | Cor do backdrop |
| `--auy-color-info` / `--auy-color-success` / `--auy-color-warning` / `--auy-color-error` | Cores dos ícones de variante |
| `--auy-shadow-lg` | Sombra do modal |
| `--auy-radius-lg` / `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-lg` / `--auy-text-sm` | Tamanhos de fonte |
| `--auy-font-weight-semibold` | Peso do título |
| `--auy-space-xs` / `--auy-space-sm` / `--auy-space-md` / `--auy-space-lg` | Espaçamentos |
| `--auy-transition-fast` | Velocidade das transições |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Conteúdo do corpo do modal |
| `header` | Substitui o cabeçalho inteiro (título + descrição) |
| `footer` | Conteúdo do rodapé |
