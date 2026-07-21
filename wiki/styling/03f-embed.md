# Mídia

## Figure e Figcaption

```html
<figure>
  <img src="foto.jpg" alt="Paisagem">
  <figcaption>Vista da janela</figcaption>
</figure>
```

### Figure com borda (data-captioned)

```html
<figure data-captioned>
  <img src="grafico.png" alt="Gráfico de vendas">
  <figcaption>Vendas trimestrais — 2024</figcaption>
</figure>
```

### Tipos de figura

```html
<figure data-type="pdf">
  <figcaption>Relatório Anual (PDF, 2.4MB)</figcaption>
</figure>

<figure data-type="audio">
  <figcaption>Podcast Episódio 5</figcaption>
</figure>

<figure data-type="spreadsheet">
  <figcaption>Planilha de custos</figcaption>
</figure>
```

## Imagem Responsiva (srcset)

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Descrição da imagem"
  loading="lazy"
>
```

Imagens com fundo PNG/WEBP recebem um padrão xadrez translúcido.

## Picture

```html
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Descrição">
</picture>
```

## Audio e Video

```html
<audio controls src="audio.mp3">
  Seu navegador não suporta áudio.
</audio>

<video controls poster="thumb.jpg">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="legendas.vtt" srclang="pt" label="Português">
</video>
```

### Media Player (custom)

```html
<div class="media-player">
  <div class="media-player__header">
    <div class="media-player__title">
      <span class="media-player__wave">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </span>
      Música Ambiente
    </div>
    <span class="media-player__duration">3:42</span>
  </div>
  <audio controls src="audio.mp3"></audio>
  <div class="media-player__transcript">
    <small>Transcrição do áudio...</small>
  </div>
</div>
```

## Iframe

```html
<iframe src="https://maps.google.com" title="Mapa" allowfullscreen loading="lazy"></iframe>
```

## Object e Embed

```html
<object data="documento.pdf" type="application/pdf" width="100%" height="500">
  <p>PDF não pode ser exibido. <a href="documento.pdf">Baixar</a></p>
</object>

<embed src="animacao.svg" type="image/svg+xml">
```

## Canvas

```html
<canvas id="meu-canvas" width="400" height="300">
  Canvas não suportado pelo seu navegador.
</canvas>
```

## Hover Zoom

```html
<img src="foto.jpg" alt="Zoom no hover" class="hover-zoom">
```

## Transparência Badge

```html
<span class="transparency-badge">PNG‑8 • 24 kB</span>
```

## Acessibilidade

- `alt` obrigatório semanticamente em todas as imagens
- `figure[data-captioned]` adiciona borda com separação visual entre imagem e legenda
- `loading="lazy"` para imagens abaixo da dobra
- `figure` com `data-type` adiciona indicador visual colorido na borda
- `track` para legendas em vídeos
- Media player com animação de onda sonora (`prefers-reduced-motion` desativa)

## Próximos Passos

- [Utilitários](04-utilities.md)
- [Componentes](05-components.md)
