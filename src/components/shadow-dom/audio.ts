import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
export class AuyCompAudio extends LitElement {
  static override styles = css`
    :host {
      display: block;
      contain: layout style;
    }

    .player {
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-lg);
      background: var(--auy-color-surface);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--auy-space-sm);
      padding: var(--auy-space-md) var(--auy-space-md) 0;
    }

    .title {
      font-size: var(--auy-text-sm);
      font-weight: var(--auy-font-weight-semibold);
      color: var(--auy-color-text);
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
    }

    .wave {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      block-size: 1.25rem;
    }
    .wave span {
      display: inline-block;
      inline-size: 3px;
      background: var(--auy-color-primary);
      border-radius: 2px;
      block-size: 5px;
      transition: block-size 0.15s;
    }

    .body {
      padding: var(--auy-space-md);
      display: flex;
      flex-direction: column;
      gap: var(--auy-space-sm);
    }

    .progress-row {
      display: flex;
      align-items: center;
      gap: var(--auy-space-sm);
    }

    .progress-track {
      flex: 1;
      position: relative;
      cursor: pointer;
    }
    .progress-track input[type="range"] {
      display: block;
      inline-size: 100%;
      margin: 0;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
    }

    .time {
      display: flex;
      justify-content: space-between;
      font-size: var(--auy-text-xs);
      color: var(--auy-color-text-muted);
      font-variant-numeric: tabular-nums;
      margin-block-start: var(--auy-space-2xs);
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--auy-space-xs);
      flex-wrap: wrap;
    }

    .icon-btn {
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
    .icon-btn:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-text);
    }
    .icon-btn:active {
      transform: scale(0.92);
    }
    .icon-btn:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    .icon-btn--play {
      inline-size: 2.75rem;
      block-size: 2.75rem;
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      box-shadow: 0 0.125rem 0.375rem color-mix(in oklch, var(--auy-color-primary) 25%, transparent);
    }
    .icon-btn--play:hover {
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      transform: scale(1.06);
    }
    .icon-btn--play:active {
      transform: scale(0.94);
    }

    .vol-wrap {
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
      margin-inline-start: auto;
    }
    .vol-bar {
      inline-size: 3.75rem;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
      margin: 0;
    }

    .speed-wrap {
      position: relative;
    }

    .speed-btn {
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
    .speed-btn:hover {
      border-color: var(--auy-color-primary);
      color: var(--auy-color-primary);
    }
    .speed-btn:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }

    .speed-menu {
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
    .speed-menu--open {
      display: block;
    }

    .speed-opt {
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
    .speed-opt:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
    }
    .speed-opt:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }
    .speed-opt--active {
      color: var(--auy-color-primary);
      font-weight: var(--auy-font-weight-semibold);
    }

    .dload {
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
    .dload:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-primary);
    }
    .dload:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    .transcript {
      border-block-start: 1px solid var(--auy-color-border);
      padding: var(--auy-space-md);
      padding-block-start: var(--auy-space-sm);
    }

    .spacer { flex: 1; }

    @media (forced-colors: active) {
      .icon-btn--play { border: 1px solid ButtonText; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wave span { transition: none; }
      .icon-btn { transition: none; }
      .icon-btn:hover { transform: none; }
      .icon-btn:active { transform: none; }
    }
    @media print {
      .icon-btn--play { display: none; }
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
      const spans = this.shadowRoot?.querySelectorAll('.wave span');
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
    const spans = this.shadowRoot?.querySelectorAll('.wave span');
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
      <div class="player" @keydown=${this._handleKey}>
        <div class="header">
          <span class="title">${this.title || 'Player de Áudio'}</span>
          <div class="wave" aria-hidden="true">
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

        <div class="body">
          <div class="progress-row">
            <div class="progress-track">
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
              <div class="time">
                <span>${this._formatTime(this._currentTime)}</span>
                <span>${this._formatTime(this._duration)}</span>
              </div>
            </div>
          </div>

          <div class="controls">
            <button
              class="icon-btn icon-btn--play"
              @click=${this._togglePlay}
              aria-label=${this._playing ? 'Pausar áudio' : 'Reproduzir áudio'}
              title=${this._playing ? 'Pausar' : 'Reproduzir'}
            >${this._playing ? ICONS.pause : ICONS.play}</button>

            <button class="icon-btn" @click=${() => this._skip(-10)} aria-label="Voltar 10 segundos" title="-10s">${ICONS.skipBack}</button>
            <button class="icon-btn" @click=${() => this._skip(10)} aria-label="Avançar 10 segundos" title="+10s">${ICONS.skipForward}</button>

            <div class="spacer"></div>

            <div class="speed-wrap">
              <button class="speed-btn" @click=${() => { this._speedOpen = !this._speedOpen; }} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label="Velocidade de reprodução">
                ${this._speed}x ${ICONS.chevronDown}
              </button>
              <div class="speed-menu ${this._speedOpen ? 'speed-menu--open' : ''}" role="menu">
                ${speeds.map(s => html`
                  <button
                    class="speed-opt ${s === this._speed ? 'speed-opt--active' : ''}"
                    @click=${() => this._setSpeed(s)}
                    role="menuitem"
                  >${s}x${s === 1 ? ' (Normal)' : s < 1 ? ' (Mais lento)' : ' (Mais rápido)'}</button>
                `)}
              </div>
            </div>

            <div class="vol-wrap">
              <button class="icon-btn" @click=${this._toggleMute} aria-label=${this._muted ? 'Ativar som' : 'Mutar áudio'} title=${this._muted ? 'Ativar' : 'Mutar'}>${this._volumeIcon()}</button>
              <input
                type="range"
                class="vol-bar"
                min="0" max="1" step="0.05"
                .value=${this._muted ? 0 : this._volume}
                @input=${this._onVolume}
                aria-label="Volume"
              />
            </div>

            ${this.showDownload && this.src ? html`
              <a href=${this.src} class="dload" download aria-label="Baixar áudio" title="Download">${ICONS.download}</a>
            ` : nothing}
          </div>
        </div>

        ${this.showTranscript ? html`
          <div class="transcript">
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