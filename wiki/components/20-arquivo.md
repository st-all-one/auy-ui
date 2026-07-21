# Arquivo — `<auy-comp-file-input>`

Componente de upload de arquivos com drag-and-drop, preview, cards de arquivo e envio via fetch.

## Classe

`AuyCompFileInput` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | `''` | Rótulo exibido acima da dropzone |
| `multiple` | `boolean` | `false` | Permite múltiplos arquivos |
| `accept` | `string` | `''` | Tipos de arquivo aceitos (ex: `image/*,.pdf`) |
| `maxSize` | `number` | `5242880` | Tamanho máximo em bytes (5 MB) |
| `action` | `string` | `''` | URL de envio via POST |
| `headers` | `string` | `''` | JSON de headers customizados para upload |
| `chunkSize` | `number` | `0` | Tamanho do chunk em bytes (0 = desligado) |

## Uso

```html
<auy-comp-file-input label="Documentos" multiple accept=".pdf,.docx"></auy-comp-file-input>

<auy-comp-file-input label="Foto de perfil" accept="image/*" maxSize="2097152"></auy-comp-file-input>

<auy-comp-file-input
  label="Anexos"
  multiple
  action="/api/upload"
  headers='{"Authorization": "Bearer token"}'
></auy-comp-file-input>
```

## Métodos

| Método | Retorno | Descrição |
|---|---|---|
| `files` | `File[]` | Getter dos arquivos selecionados |
| `clear()` | `void` | Limpa todos os arquivos |
| `upload()` | `Promise<Response \| null>` | Envia arquivos via POST para `action` |

## Acessibilidade e Eventos

- Dropzone clicável com input `type="file"` nativo oculto
- `aria-label` no input e nos botões de remover
- Ícones SVG por tipo de arquivo (pdf, image, zip, code, word, sheet, audio, video)
- Preview de imagem com `URL.createObjectURL`
- Cards com nome, tamanho e botão de remover
- `:focus-visible` com outline de 2px
- `forced-colors: active` — bordas `ButtonText`, outline `Highlight`
- Impressão: cards ocultos
- Dispara `change` com `{ files }` ao adicionar/remover
- Dispara `upload-complete` com `{ response, ok }` após upload
- Dispara `upload-error` com `{ error }` em caso de falha

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-border` | Borda da dropzone |
| `--auy-color-primary` | Hover da dropzone |
| `--auy-color-surface` | Fundo |
| `--auy-color-text` | Nome do arquivo |
| `--auy-color-text-muted` | Tamanho e hint |
| `--auy-color-error` | Botão remover hover |
| `--auy-radius-md` / `--auy-radius-sm` | Border-radius |
| `--auy-text-sm` / `--auy-text-xs` | Tamanhos de fonte |
| `--auy-transition` / `--auy-transition-fast` | Transições |
