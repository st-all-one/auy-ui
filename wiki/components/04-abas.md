# Abas — `<auy-comp-tabs>`

Navegação por abas com suporte a orientação horizontal e vertical, indicador animado e teclado.

## Classe

`AuyCompTabs` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `tabs` | `Tab[]` | `[]` | Array de abas |
| `activeTab` | `string` | `''` | ID da aba ativa |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientação das abas |

### Interface `Tab`

| Campo | Tipo | Descrição |
|---|---|---|
| `label` | `string` | Texto exibido na aba |
| `id` | `string` | Identificador único da aba |

## Eventos

| Evento | Detail | Descrição |
|---|---|---|
| `tab-change` | `{ id: string }` | Disparado ao selecionar uma aba |

## Uso

```html
<auy-comp-tabs
  .tabs=${[
    { id: 'info', label: 'Informações' },
    { id: 'config', label: 'Configurações' },
    { id: 'logs', label: 'Logs' }
  ]}
  activeTab="info"
>
  <div slot="panel-info">Conteúdo da aba Informações</div>
  <div slot="panel-config">Conteúdo da aba Configurações</div>
  <div slot="panel-logs">Conteúdo da aba Logs</div>
</auy-comp-tabs>

<auy-comp-tabs
  orientation="vertical"
  .tabs=${[{ id: 'a', label: 'Aba A' }, { id: 'b', label: 'Aba B' }]}
></auy-comp-tabs>
```

## Acessibilidade

- `role="tablist"` no container de abas
- `role="tab"` em cada botão de aba
- `role="tabpanel"` em cada painel
- `aria-selected="true/false"` na aba ativa
- `aria-controls` vincula aba ao painel
- `aria-labelledby` vincula painel à aba
- `aria-hidden="true/false"` nos painéis
- Navegação por teclado: setas (← → ↑ ↓), Home, End
- `tabindex="0"` apenas na aba ativa, `-1` nas demais
- `forced-colors: active` — borda `ButtonText`
- `prefers-reduced-motion: reduce` — transições do indicador desligadas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-primary` | Cor do indicador e aba ativa |
| `--auy-color-border` | Borda inferior do tablist |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Cor do texto inativo |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-space-xs` / `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-transition-fast` / `--auy-transition-slow` | Velocidade das transições |
| `--auy-z-sticky` | Z-index do header sticky |

## Slots

| Slot | Descrição |
|---|---|
| `panel-{id}` | Conteúdo do painel para cada aba (quando `tabs` é usado) |
| `tab` | Abas customizadas (modo sem propriedade `tabs`) |
| `panel` | Painéis customizados (modo sem propriedade `tabs`) |
