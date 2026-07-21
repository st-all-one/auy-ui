# Metadados — `<auy-comp-metadata>`

Componente utilitário que gerencia metadados de página no `<head>`: título, description, Open Graph, Twitter Card, JSON-LD e robots.

## Classe

`AuyCompMetadata` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | `''` | `<title>` da página |
| `description` | `string` | `''` | Meta `description` |
| `canonical` | `string` | `''` | Link `rel="canonical"` |
| `ogTitle` | `string` | `''` | Meta `og:title` |
| `ogDescription` | `string` | `''` | Meta `og:description` |
| `ogImage` | `string` | `''` | Meta `og:image` |
| `ogUrl` | `string` | `''` | Meta `og:url` |
| `ogType` | `string` | `'website'` | Meta `og:type` |
| `ogSiteName` | `string` | `''` | Meta `og:site_name` |
| `twCard` | `string` | `'summary_large_image'` | Meta `twitter:card` |
| `twSite` | `string` | `''` | Meta `twitter:site` |
| `twCreator` | `string` | `''` | Meta `twitter:creator` |
| `twTitle` | `string` | `''` | Meta `twitter:title` |
| `twDescription` | `string` | `''` | Meta `twitter:description` |
| `twImage` | `string` | `''` | Meta `twitter:image` |
| `jsonLd` | `string` | `''` | JSON-LD estruturado (`script[type="application/ld+json"]`) |
| `robots` | `string` | `'index, follow'` | Meta `robots` |

## Uso

```html
<auy-comp-metadata
  title="Dashboard — Auy UI"
  description="Sistema de gerenciamento"
  canonical="https://exemplo.com/dashboard"
  ogTitle="Dashboard"
  ogDescription="Sistema de gerenciamento"
  ogImage="https://exemplo.com/og.jpg"
  ogUrl="https://exemplo.com/dashboard"
  twitterSite="@meusite"
  jsonLd='{"@context":"https://schema.org","@type":"WebSite","name":"Auy UI"}'
></auy-comp-metadata>
```

## Acessibilidade e Notas

- Componente invisível (`display: none`) — sem renderização visual
- Opera no `document.head`, criando/atualizando elementos meta, link e script
- Remove todos os elementos do `<head>` ao desconectar (`disconnectedCallback`) ou quando a propriedade é limpa
- Aceita `jsonLd` como string JSON — tenta parsear e formatar, fallback para texto puro
- Útil para SSR/SPA: atualiza metadados dinamicamente conforme a rota
