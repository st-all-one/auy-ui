# auy-ui/components — Visão Geral

**auy-ui/components** é a biblioteca de Web Components reutilizáveis do auy-ui, construída com Lit. Os componentes são divididos em duas categorias: **Shadow DOM** (estilos encapsulados) e **Light DOM** (estilos herdados do documento).

## Componentes Shadow DOM

| # | Componente | Tag | Descrição |
|---|---|---|---|
| 01 | [Botão](01-botao.md) | `auy-comp-button` | Botão com variantes, tamanhos, loading, ícone e modo link |
| 02 | [Badge](02-badge.md) | `auy-comp-badge` | Selo/etiqueta com variantes, outline e pill |
| 03 | [Migalhas de Pão](03-migalhas-de-pao.md) | `auy-comp-breadcrumbs` | Navegação hierárquica com 4 variantes visuais |
| 04 | [Abas](04-abas.md) | `auy-comp-tabs` | Navegação por abas horizontal/vertical com indicador animado |
| 05 | [Tabela](05-tabela.md) | `auy-comp-table` | Tabela de dados com sort, filtro, seleção e paginação |
| 06 | [Modal](06-modal.md) | `auy-comp-modal` | Diálogo modal com variantes, tamanhos e backdrop |
| 07 | [Alerta](07-alerta.md) | `auy-comp-alert` | Alerta inline com variantes, ícone e auto-dismiss |
| 08 | [Toast](08-toast.md) | `auy-comp-toast` | Notificação individual com variantes e timer |
| 09 | [Container de Toasts](09-container-de-toasts.md) | `auy-comp-toast-container` | Gerenciador programático de toasts em pilha |
| 10 | [Dica de Ferramenta](10-dica-de-ferramenta.md) | `auy-comp-tooltip` | Tooltip com 4 posições e delay configurável |
| 11 | [Acordeão](11-acordeao.md) | `auy-comp-accordion` | Acordeão com suporte a múltiplos itens abertos |
| 12 | [Player de Áudio](12-player-de-audio.md) | `auy-comp-audio` | Player de áudio com controles, transcrição e download |
| 13 | [Paginação](13-paginacao.md) | `auy-comp-pagination` | Navegação paginada com elipses e páginas visíveis |
| 14 | [Editor de Código](14-editor-de-codigo.md) | `auy-comp-code-editor` | Editor de código com line numbers e CodeMirror opcional |
| 15 | [Seletor de Cor](15-seletor-de-cor.md) | `auy-comp-color-input` | Seletor de cor HSV com pipeta, alpha e recentes |

## Componentes Light DOM

| # | Componente | Tag | Descrição |
|---|---|---|---|
| 16 | [Busca](16-busca.md) | `auy-comp-search` | Busca com overlay, resultados locais/remotos e highlight |
| 17 | [Seletor](17-seletor.md) | `auy-comp-select` | Select customizado com busca e teclado |
| 18 | [Data](18-data.md) | `auy-comp-date-input` | Input de data nativo estilizado |
| 19 | [Grupo de Formulário](19-grupo-de-formulario.md) | `auy-comp-form-group` | Wrapper de formulário com label, hint, erro, máscara e validação |
| 20 | [Arquivo](20-arquivo.md) | `auy-comp-file-input` | Upload de arquivos com drag-and-drop e preview |
| 21 | [Metadados](21-metadados.md) | `auy-comp-metadata` | Gerenciamento de meta tags, OG, Twitter Card e JSON-LD |

## Utilitários

| # | Utilitário | Módulo | Descrição |
|---|---|---|---|
| 22 | [Formatação](22-formatacao.md) | `internal/format` | Funções de formatação de data, moeda, número, texto e máscaras |
| 23 | [Dados](23-dados.md) | `data-aware.mixin` | `data-input`, `data-target`, `data-on-*` para integração declarativa com APIs |

## Próximos Passos

- [Visão Geral do Styling](../styling/00-index.md)
- [Convenção de Nomes](../styling/01-convencao-nomes.md)
- [Tokens: Visão Geral](../styling/02-tokens.md)
- [Integração com Dados via API](23-dados.md)
