# Player de Áudio — `<auy-comp-audio>`

Player de áudio com controles de reprodução, volume, velocidade, barra de progresso, download e transcrição.

## Classe

`AuyCompAudio` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `src` | `string` | `''` | URL do arquivo de áudio |
| `title` | `string` | `''` | Título exibido no player |
| `showDownload` | `boolean` | `true` | Exibe botão de download |
| `showTranscript` | `boolean` | `false` | Exibe seção de transcrição |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `ended` | — | Disparado ao final da reprodução |

## Uso

```html
<auy-comp-audio
  src="/audios/episodio-1.mp3"
  title="Episódio 1 — Introdução"
  showTranscript
>
  <div slot="transcript-text">
    Texto completo da narração...
  </div>
</auy-comp-audio>
```

## Acessibilidade

- Atalho de teclado: Espaço para play/pause
- Botões com `aria-label` descritivo
- `role="menu"` e `role="menuitem"` no seletor de velocidade
- Slider de progresso com `aria-label="Progresso da reprodução"`
- `forced-colors: active` — botão play com borda `ButtonText`
- `prefers-reduced-motion: reduce` — transições desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-primary` | Cor do ícone e botão play |
| `--auy-color-primary-inverse` | Cor do ícone do play |
| `--auy-color-surface` | Background do player |
| `--auy-color-border` | Borda e separadores |
| `--auy-color-text` | Título |
| `--auy-color-text-muted` | Labels e metadados |
| `--auy-color-surface-alt` | Background de menus |
| `--auy-shadow-lg` | Sombra |
| `--auy-radius-lg` / `--auy-radius-md` / `--auy-radius-sm` / `--auy-radius-full` | Border-radius |
| `--auy-text-xs` / `--auy-text-sm` | Tamanhos de fonte |
| `--auy-font-weight-semibold` / `--auy-font-weight-medium` | Pesos da fonte |
| `--auy-space-2xs` / `--auy-space-xs` / `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-transition-fast` | Velocidade das transições |
| `--auy-z-dropdown` | Z-index do menu de velocidade |

## Slots

| Slot | Descrição |
|---|---|
| `transcript` | Substitui a seção de transcrição inteira |
| `transcript-text` | Texto da transcrição dentro do details padrão |
