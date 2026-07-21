# Elementos Interativos

## Details / Summary (Accordion)

```html
<details>
  <summary>O que é auy-ui?</summary>
  <p>auy-ui é um framework CSS com foco em acessibilidade e design system.</p>
</details>

<details>
  <summary>Como começar?</summary>
  <p>Adicione o link rel=stylesheet no head do seu HTML.</p>
</details>
```

Múltiplos `details` consecutivos ficam conectados visualmente (sem bordas duplicadas).

## Dialog (Modal)

```html
<dialog id="modal">
  <div class="dialog-header">
    <h3>Confirmação</h3>
    <button aria-label="Close" onclick="this.closest('dialog').close()">&times;</button>
  </div>
  <div class="dialog-body">
    <p>Tem certeza que deseja excluir?</p>
  </div>
  <div class="dialog-footer">
    <button onclick="this.closest('dialog').close()">Cancelar</button>
    <button variant="danger">Excluir</button>
  </div>
</dialog>

<button onclick="document.getElementById('modal').showModal()">Abrir Modal</button>
```

### Tamanhos

```html
<dialog data-size="sm">Pequeno (24rem)</dialog>
<dialog>Médio (32rem, padrão)</dialog>
<dialog data-size="lg">Grande (48rem)</dialog>
<dialog data-size="xl">Extra grande (64rem)</dialog>
```

### Alert Dialog

```html
<dialog role="alertdialog">
  <div class="dialog-body">
    <p>Tem certeza?</p>
    <small>Esta ação não pode ser desfeita.</small>
  </div>
  <div class="dialog-footer">
    <button>Cancelar</button>
    <button variant="danger">Confirmar</button>
  </div>
</dialog>
```

## Tooltip (data-tooltip)

```html
<button data-tooltip="Salvar alterações">💾</button>
<button data-tooltip="Excluir item" data-tooltip-position="bottom">🗑️</button>
<button data-tooltip="Voltar" data-tooltip-position="left">←</button>
<button data-tooltip="Avançar" data-tooltip-position="right">→</button>
```

| Posição | Valor |
|---|---|
| Topo (padrão) | `data-tooltip-position` omitido |
| Abaixo | `data-tooltip-position="bottom"` |
| Esquerda | `data-tooltip-position="left"` |
| Direita | `data-tooltip-position="right"` |

## Role="group" (Button Group)

```html
<div role="group">
  <button>Salvar</button>
  <button variant="secondary">Descartar</button>
  <button variant="danger">Excluir</button>
</div>
```

## aria-busy (Body Loading)

```html
<body aria-busy="true">
  <!-- overlay + spinner centralizado -->
</body>
```

Para botões:

```html
<button aria-busy="true">Carregando...</button>
```

## Menu (Toolbar)

```html
<menu>
  <li><button>Arquivo</button></li>
  <li><button>Editar</button></li>
  <li><button>Exibir</button></li>
</menu>
```

## Popover API

```html
<button popovertarget="popover-info">Mais informações</button>

<div id="popover-info" popover>
  <p>Conteúdo do popover.</p>
</div>
```

### Posições

```html
<div id="popover-bottom" popover data-position="bottom">...</div>
<div id="popover-start" popover data-position="start">...</div>
<div id="popover-end" popover data-position="end">...</div>
```

## Dropdown (details[data-dropdown])

```html
<details data-dropdown>
  <summary>Ações</summary>
  <ul>
    <li><a href="#">Editar</a></li>
    <li><a href="#">Duplicar</a></li>
    <li><a href="#">Excluir</a></li>
  </ul>
</details>

<!-- Alinhado à direita -->
<details data-dropdown data-align="end">
  <summary>Opções</summary>
  <ul>
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Sair</a></li>
  </ul>
</details>
```

## Acessibilidade

- `summary` tem `cursor: pointer` e `user-select: none`
- `dialog::backdrop` com `backdrop-filter: blur(4px)` e `aria-label="Close"` no botão de fechar
- Tooltips aparecem em hover e focus-visible
- `aria-busy="true"` no body bloqueia interação com overlay
- `details[data-dropdown]` mantém comportamento nativo de teclado
- Entrada/saída de dialog e popover são animadas com `@starting-style`
- `prefers-reduced-motion: reduce` desativa animações

## Próximos Passos

- [Mídia](03f-embed.md)
- [Componentes](05-components.md)
