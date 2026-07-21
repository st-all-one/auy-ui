# Tabelas

auy-ui estiliza tabelas HTML com suporte a cabeçalho fixo, linhas zebradas, sort indicators e layout responsivo.

## Estrutura Básica

```html
<table>
  <caption>Lista de Usuários</caption>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Função</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Nome">João Silva</td>
      <td data-label="Email">joao@exemplo.com</td>
      <td data-label="Função">Admin</td>
    </tr>
    <tr>
      <td data-label="Nome">Maria Santos</td>
      <td data-label="Email">maria@exemplo.com</td>
      <td data-label="Função">Editor</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total: 2 usuários</td>
    </tr>
  </tfoot>
</table>
```

## Sort Indicators

Use `aria-sort` nos cabeçalhos para indicar ordenação:

```html
<thead>
  <tr>
    <th aria-sort="ascending">Nome ▲</th>
    <th aria-sort="none">Data</th>
    <th aria-sort="descending">Valor ▼</th>
  </tr>
</thead>
```

| Valor `aria-sort` | Indicador |
|---|---|
| `ascending` | `▲` (primary) |
| `descending` | `▼` (primary) |
| `none` | `⇅` (opaco) |

## Responsivo via Container Query

Em containers com largura ≤ 600px, a tabela se transforma em cartões:

- `thead` é oculto
- Cada `tr` vira um card em coluna
- Cada `td` mostra `data-label` como rótulo antes do valor

**Importante:** adicione `data-label` em cada `td` para o layout responsivo:

```html
<td data-label="Nome">João Silva</td>
```

## Empty State

```html
<div class="table-empty">
  <span class="table-empty__icon">📂</span>
  <p>Nenhum registro encontrado</p>
</div>
```

## Acessibilidade

- `caption` para título semântico
- `thead` usa `position: sticky; inset-block-start: 0` para cabeçalho fixo ao scrollar
- `aria-sort` comunica estado de ordenação para leitores de tela
- Tabelas têm `container-type: inline-size` para responsividade baseada no container
- Suporte a `forced-colors: active`

## Próximos Passos

- [Elementos Interativos](03e-interactive.md)
- [Componentes](05-components.md)
