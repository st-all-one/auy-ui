# Container de Toasts — `<auy-comp-toast-container>`

Gerenciador programático de toasts em pilha, com controle de posição e duração.

## Classe

`AuyCompToastContainer` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center'` | `'top-right'` | Posição fixa dos toasts |
| `defaultDuration` | `number` | `4000` | Duração padrão em ms |

## Métodos

| Método | Assinatura | Descrição |
|---|---|---|
| `show` | `(message: string, variant?: 'info' \| 'success' \| 'error' \| 'warning', duration?: number) => string` | Exibe um toast e retorna seu ID |
| `dismiss` | `(id: string) => void` | Remove um toast pelo ID |

## Uso

```html
<auy-comp-toast-container position="bottom-right"></auy-comp-toast-container>

<script>
  const container = document.querySelector('auy-comp-toast-container');
  container.show('Operação concluída!', 'success');
  container.show('Erro ao salvar', 'error', 8000);
  const id = container.show('Aguarde...', 'info', 0);
  // later: container.dismiss(id);
</script>
```

## Acessibilidade

- Cada toast com `role="alert"` e `aria-live="polite"`
- Botão de dismiss com `aria-label="Fechar"`
- Container com `pointer-events: none` (eventos apenas nos toasts)
- Animações de entrada/saída com `@keyframes`
- Posições left: animação invertida (da esquerda)
- `forced-colors: active` — borda `CanvasText`
- `prefers-reduced-motion: reduce` — animações desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-z-toast` | Z-index do container |
| `--auy-color-surface` | Background do toast |
| `--auy-color-text` | Cor do texto |
| `--auy-color-info` / `--auy-color-success` / `--auy-color-error` / `--auy-color-warning` | Borda lateral e background |
| `--auy-shadow-md` | Sombra |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-sm` / `--auy-text-lg` | Tamanhos de fonte |
| `--auy-line-height` | Altura da linha |
| `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-transition` / `--auy-transition-fast` | Velocidade das transições |
