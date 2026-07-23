import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

const ICONS = {
  play: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1.25rem;block-size:1.25rem;"><path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36A1 1 0 0 0 8 5.14z"/></svg>`,
  pause: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1.25rem;block-size:1.25rem;"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
  skipBack: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1rem;block-size:1rem;"><path d="M17 5l-9 7 9 7V5z"/><path d="M11 5l-9 7 9 7V5z"/></svg>`,
  skipForward: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1rem;block-size:1rem;"><path d="M7 19l9-7-9-7v14z"/><path d="M13 19l9-7-9-7v14z"/></svg>`,
  volumeHigh: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeLow: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  volumeMute: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  download: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  chevronDown: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="inline-size:0.75rem;block-size:0.75rem;"><polyline points="6 9 12 15 18 9"/></svg>`,
};

/** Player de áudio com controles de reprodução, volume, velocidade e transcrição. */
@customElement('auy-comp-audio')
export class AuyCompAudio extends StyleCustomizableMixin(DataAwareMixin(AuyShadowElement)) {
  static override get observedDataEvents(): string[] {
    return ['ended']
  }
  static override styles = css`
    :host {
      display: block;
      contain: layout style;
    }

    [data-auy-part="player"] {
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-lg);
      background: var(--auy-color-surface);
      overflow: hidden;
    }

    [data-auy-part="header"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--auy-space-sm);
      padding: var(--auy-space-md) var(--auy-space-md) 0;
    }

    [data-auy-part="title"] {
      font-size: var(--auy-text-sm);
      font-weight: var(--auy-font-weight-semibold);
      color: var(--auy-color-text);
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
    }

    [data-auy-part="wave"] {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      block-size: 1.25rem;
    }
    [data-auy-part="wave"] span {
      display: inline-block;
      inline-size: 3px;
      background: var(--auy-color-primary);
      border-radius: 2px;
      block-size: 5px;
      transition: block-size 0.15s;
    }

    [data-auy-part="body"] {
      padding: var(--auy-space-md);
      display: flex;
      flex-direction: column;
      gap: var(--auy-space-sm);
    }

    [data-auy-part="progress-row"] {
      display: flex;
      align-items: center;
      gap: var(--auy-space-sm);
    }

    [data-auy-part="progress-track"] {
      flex: 1;
      position: relative;
      cursor: pointer;
    }
    [data-auy-part="progress-track"] input[type="range"] {
      display: block;
      inline-size: 100%;
      margin: 0;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
    }

    [data-auy-part="time"] {
      display: flex;
      justify-content: space-between;
      font-size: var(--auy-text-xs);
      color: var(--auy-color-text-muted);
      font-variant-numeric: tabular-nums;
      margin-block-start: var(--auy-space-2xs);
    }

    [data-auy-part="controls"] {
      display: flex;
      align-items: center;
      gap: var(--auy-space-xs);
      flex-wrap: wrap;
    }

    [data-auy-part="icon-btn"] {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.75rem;
      block-size: 2.75rem;
      border-radius: var(--auy-radius-full);
      cursor: pointer;
      touch-action: manipulation;
      transition: background var(--auy-transition-fast), transform var(--auy-transition-fast);
      flex-shrink: 0;
      color: var(--auy-color-text-muted);
    }
    [data-auy-part="icon-btn"]:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-text);
    }
    [data-auy-part="icon-btn"]:active {
      transform: scale(0.92);
    }
    [data-auy-part="icon-btn"]:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    [data-auy-part="icon-btn"][data-auy-variant="play"] {
      inline-size: 2.75rem;
      block-size: 2.75rem;
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      box-shadow: 0 0.125rem 0.375rem color-mix(in oklch, var(--auy-color-primary) 25%, transparent);
    }
    [data-auy-part="icon-btn"][data-auy-variant="play"]:hover {
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      transform: scale(1.06);
    }
    [data-auy-part="icon-btn"][data-auy-variant="play"]:active {
      transform: scale(0.94);
    }

    [data-auy-part="vol-wrap"] {
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
      margin-inline-start: auto;
    }
    [data-auy-part="vol-bar"] {
      inline-size: 3.75rem;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
      margin: 0;
    }

    [data-auy-part="speed-wrap"] {
      position: relative;
    }

    [data-auy-part="speed-btn"] {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      font-size: var(--auy-text-xs);
      font-weight: var(--auy-font-weight-medium);
      font-family: inherit;
      color: var(--auy-color-text-muted);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-sm);
      cursor: pointer;
      touch-action: manipulation;
      transition: border-color var(--auy-transition-fast), color var(--auy-transition-fast);
      line-height: 1;
    }
    [data-auy-part="speed-btn"]:hover {
      border-color: var(--auy-color-primary);
      color: var(--auy-color-primary);
    }
    [data-auy-part="speed-btn"]:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }

    [data-auy-part="speed-menu"] {
      position: absolute;
      inset-block-start: 100%;
      inset-inline-end: 0;
      z-index: var(--auy-z-dropdown, 100);
      background: var(--auy-color-surface);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      box-shadow: var(--auy-shadow-md);
      padding: var(--auy-space-2xs);
      list-style: none;
      margin: var(--auy-space-2xs) 0 0;
      display: none;
      min-inline-size: 8rem;
    }
    [data-auy-part="speed-menu"][data-auy-state="open"] {
      display: block;
    }

    [data-auy-part="speed-opt"] {
      all: unset;
      display: block;
      inline-size: 100%;
      padding: var(--auy-space-2xs) var(--auy-space-sm);
      font-size: var(--auy-text-xs);
      border-radius: var(--auy-radius-sm);
      cursor: pointer;
      box-sizing: border-box;
      text-align: start;
      white-space: nowrap;
      color: var(--auy-color-text);
    }
    [data-auy-part="speed-opt"]:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
    }
    [data-auy-part="speed-opt"]:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }
    [data-auy-part="speed-opt"][data-auy-state="active"] {
      color: var(--auy-color-primary);
      font-weight: var(--auy-font-weight-semibold);
    }

    [data-auy-part="dload"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.5rem;
      block-size: 2.5rem;
      border-radius: var(--auy-radius-full);
      color: var(--auy-color-text-muted);
      text-decoration: none;
      transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
    }
    [data-auy-part="dload"]:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-primary);
    }
    [data-auy-part="dload"]:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    [data-auy-part="transcript"] {
      border-block-start: 1px solid var(--auy-color-border);
      padding: var(--auy-space-md);
      padding-block-start: var(--auy-space-sm);
    }

    [data-auy-part="spacer"] { flex: 1; }

    @media (forced-colors: active) {
      [data-auy-part="icon-btn"][data-auy-variant="play"] { border: 1px solid ButtonText; }
    }
    @media (prefers-reduced-motion: reduce) {
      [data-auy-part="wave"] span { transition: none; }
      [data-auy-part="icon-btn"] { transition: none; }
      [data-auy-part="icon-btn"]:hover { transform: none; }
      [data-auy-part="icon-btn"]:active { transform: none; }
    }
    @media print {
      [data-auy-part="icon-btn"][data-auy-variant="play"] { display: none; }
    }
  `;

  /** URL do arquivo de áudio. */
  @property({ type: String }) src = '';
  /** Título exibido no player. */
  @property({ type: String }) title = '';
  /** Exibe o botão de download. */
  @property({ type: Boolean }) showDownload = true;
  /** Exibe a seção de transcrição. */
  @property({ type: Boolean }) showTranscript = false;

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.src) this.src = d.src
    if (d.title) this.title = d.title
  }

  /** Indica se o áudio está sendo reproduzido. */
  @state() private _playing = false;
  /** Tempo atual da reprodução em segundos. */
  @state() private _currentTime = 0;
  /** Duração total do áudio em segundos. */
  @state() private _duration = 0;
  /** Volume atual (0 a 1). */
  @state() private _volume = 1;
  /** Indica se o áudio está mutado. */
  @state() private _muted = false;
  /** Velocidade de reprodução atual. */
  @state() private _speed = 1;
  /** Indica se o menu de velocidade está aberto. */
  @state() private _speedOpen = false;

  private _audio: HTMLAudioElement | null = null;
  private _waveInterval: ReturnType<typeof setInterval> | null = null;
  private _seeking = false;

  private _formatTime(s: number): string {
    if (isNaN(s) || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  private _onLoaded() {
    if (!this._audio) return;
    this._duration = this._audio.duration;
  }

  private _togglePlay() {
    if (!this._audio) return;
    if (this._audio.paused) {
      const p = this._audio.play();
      if (p) p.catch(() => {});
    } else {
      this._audio.pause();
    }
  }

  private _onPlay() {
    this._playing = true;
    this._startWave();
  }

  private _onPause() {
    this._playing = false;
    this._stopWave();
  }

  private _onEnded() {
    this._playing = false;
    this._currentTime = 0;
    this._stopWave();
    this.dispatchEvent(new CustomEvent('ended', { bubbles: true, composed: true }));
  }

  private _onTimeUpdate() {
    if (!this._seeking && this._audio) {
      this._currentTime = this._audio.currentTime;
    }
  }

  private _onSeekStart() { this._seeking = true; }

  private _onSeek(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    this._currentTime = val;
  }

  private _onSeekEnd(e: Event) {
    this._seeking = false;
    if (this._audio) {
      this._audio.currentTime = Number((e.target as HTMLInputElement).value);
    }
  }

  private _skip(sec: number) {
    if (!this._audio) return;
    this._audio.currentTime = Math.max(0, Math.min(this._audio.duration, this._audio.currentTime + sec));
  }

  private _toggleMute() {
    if (!this._audio) return;
    this._audio.muted = !this._audio.muted;
    this._muted = this._audio.muted;
  }

  private _onVolume(e: Event) {
    if (!this._audio) return;
    const val = Number((e.target as HTMLInputElement).value);
    this._audio.volume = val;
    this._volume = val;
    if (val === 0) {
      this._audio.muted = true;
      this._muted = true;
    } else if (this._muted) {
      this._audio.muted = false;
      this._muted = false;
    }
  }

  private _setSpeed(speed: number) {
    if (this._audio) this._audio.playbackRate = speed;
    this._speed = speed;
    this._speedOpen = false;
  }

  private _startWave() {
    this._stopWave();
    this._waveInterval = setInterval(() => {
      const spans = this.shadowRoot?.querySelectorAll('[data-auy-part="wave"] span');
      if (!spans) return;
      spans.forEach(s => {
        (s as HTMLElement).style.blockSize = `${Math.floor(Math.random() * 14) + 5}px`;
      });
    }, 150);
  }

  private _stopWave() {
    if (this._waveInterval) {
      clearInterval(this._waveInterval);
      this._waveInterval = null;
    }
    const spans = this.shadowRoot?.querySelectorAll('[data-auy-part="wave"] span');
    if (spans) {
      spans.forEach(s => { (s as HTMLElement).style.blockSize = '5px'; });
    }
  }

  private _handleKey(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      this._togglePlay();
    }
  }

  private _volumeIcon() {
    if (this._muted || this._volume === 0) return ICONS.volumeMute;
    return this._volume < 0.5 ? ICONS.volumeLow : ICONS.volumeHigh;
  }

  override render() {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    return html`
      ${this._renderCustomStyles()}
      <div data-auy-part="player" @keydown=${this._handleKey}>
        <div data-auy-part="header">
          <span data-auy-part="title">${this.title || 'Player de Áudio'}</span>
          <div data-auy-part="wave" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <audio
          src=${this.src}
          @loadedmetadata=${this._onLoaded}
          @loadeddata=${this._onLoaded}
          @play=${this._onPlay}
          @pause=${this._onPause}
          @ended=${this._onEnded}
          @timeupdate=${this._onTimeUpdate}
          preload="metadata"
          style="display:none"
        ></audio>

        <div data-auy-part="body">
          <div data-auy-part="progress-row">
            <div data-auy-part="progress-track">
              <input
                type="range"
                min="0"
                max=${this._duration || 0}
                .value=${this._currentTime}
                @input=${this._onSeek}
                @change=${this._onSeekEnd}
                @mousedown=${this._onSeekStart}
                @touchstart=${this._onSeekStart}
                aria-label="Progresso da reprodução"
                step="0.1"
              />
              <div data-auy-part="time">
                <span>${this._formatTime(this._currentTime)}</span>
                <span>${this._formatTime(this._duration)}</span>
              </div>
            </div>
          </div>

          <div data-auy-part="controls">
            <button
              data-auy-part="icon-btn" data-auy-variant="play"
              @click=${this._togglePlay}
              aria-label=${this._playing ? 'Pausar áudio' : 'Reproduzir áudio'}
              title=${this._playing ? 'Pausar' : 'Reproduzir'}
            >${this._playing ? ICONS.pause : ICONS.play}</button>

            <button data-auy-part="icon-btn" @click=${() => this._skip(-10)} aria-label="Voltar 10 segundos" title="-10s">${ICONS.skipBack}</button>
            <button data-auy-part="icon-btn" @click=${() => this._skip(10)} aria-label="Avançar 10 segundos" title="+10s">${ICONS.skipForward}</button>

            <div data-auy-part="spacer"></div>

            <div data-auy-part="speed-wrap">
              <button data-auy-part="speed-btn" @click=${() => { this._speedOpen = !this._speedOpen; }} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label="Velocidade de reprodução">
                ${this._speed}x ${ICONS.chevronDown}
              </button>
              <div data-auy-part="speed-menu" data-auy-state=${this._speedOpen ? 'open' : nothing} role="menu">
                ${speeds.map(s => html`
                  <button
                    data-auy-part="speed-opt" data-auy-state=${s === this._speed ? 'active' : nothing}
                    @click=${() => this._setSpeed(s)}
                    role="menuitem"
                  >${s}x${s === 1 ? ' (Normal)' : s < 1 ? ' (Mais lento)' : ' (Mais rápido)'}</button>
                `)}
              </div>
            </div>

            <div data-auy-part="vol-wrap">
              <button data-auy-part="icon-btn" @click=${this._toggleMute} aria-label=${this._muted ? 'Ativar som' : 'Mutar áudio'} title=${this._muted ? 'Ativar' : 'Mutar'}>${this._volumeIcon()}</button>
              <input
                type="range"
                data-auy-part="vol-bar"
                min="0" max="1" step="0.05"
                .value=${this._muted ? 0 : this._volume}
                @input=${this._onVolume}
                aria-label="Volume"
              />
            </div>

            ${this.showDownload && this.src ? html`
              <a href=${this.src} data-auy-part="dload" download aria-label="Baixar áudio" title="Download">${ICONS.download}</a>
            ` : nothing}
          </div>
        </div>

        ${this.showTranscript ? html`
          <div data-auy-part="transcript">
            <slot name="transcript">
              <details>
                <summary>Exibir texto da narração</summary>
                <p style="font-size:var(--auy-text-sm);color:var(--auy-color-text-muted);margin:var(--auy-space-sm) 0 0">
                  <slot name="transcript-text">Transcrição não disponível.</slot>
                </p>
              </details>
            </slot>
          </div>
        ` : nothing}
      </div>
    `;
  }
}