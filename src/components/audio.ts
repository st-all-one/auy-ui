import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('auy-comp-audio')
export class AuyCompAudio extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .player {
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--auy-space-sm);
        flex-wrap: wrap;
        padding: var(--auy-space-md);
        padding-block-end: 0;
      }

      .title {
        font-size: var(--auy-text-sm);
        font-weight: 600;
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

      .controls {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        flex-wrap: wrap;
        padding: var(--auy-space-md);
      }

      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--auy-radius-full);
        cursor: pointer;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast), transform var(--auy-transition-fast);
        flex-shrink: 0;
      }

      .btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .btn--play {
        inline-size: 2.75rem;
        block-size: 2.75rem;
        background: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        box-shadow: 0 0.1875rem 0.375rem color-mix(in oklch, var(--auy-color-primary) 30%, transparent);
      }

      .btn--play:hover {
        transform: scale(1.05);
      }

      .btn--play:active {
        transform: scale(0.95);
      }

      .btn--sm {
        inline-size: 2rem;
        block-size: 2rem;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        border: 1px solid var(--auy-color-border);
        background: transparent;
      }

      .btn--sm:hover {
        background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
        color: var(--auy-color-text);
      }

      .progress-wrap {
        flex: 1;
        min-inline-size: 8rem;
      }

      .progress-bar {
        inline-size: 100%;
        accent-color: var(--auy-color-primary);
        cursor: pointer;
        margin: 0;
        block-size: 0.375rem;
      }

      .time {
        display: flex;
        justify-content: space-between;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        margin-block-start: var(--auy-space-2xs);
        font-variant-numeric: tabular-nums;
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs);
        flex-wrap: wrap;
      }

      .vol-wrap {
        display: flex;
        align-items: center;
        gap: var(--auy-space-2xs);
      }

      .vol-bar {
        inline-size: 3.75rem;
        accent-color: var(--auy-color-primary);
        cursor: pointer;
        block-size: 0.375rem;
      }

      .speed-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        padding: 0.25em 0.5em;
        font-size: var(--auy-text-xs);
        font-weight: 500;
        color: var(--auy-color-text-muted);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-sm);
        background: transparent;
        cursor: pointer;
        touch-action: manipulation;
        font-family: inherit;
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
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        box-shadow: var(--auy-shadow-md);
        padding: var(--auy-space-2xs);
        list-style: none;
        margin: var(--auy-space-2xs) 0 0;
        display: none;
        z-index: 1;
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
        font-weight: 600;
      }

      .speed-wrap {
        position: relative;
      }

      .dload {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-sm);
        color: var(--auy-color-text-muted);
        text-decoration: none;
        border: 1px solid var(--auy-color-border);
        transition: border-color var(--auy-transition-fast), color var(--auy-transition-fast);
        font-size: var(--auy-text-sm);
      }

      .dload:hover {
        border-color: var(--auy-color-primary);
        color: var(--auy-color-primary);
      }

      .dload:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      .transcript {
        border-block-start: 1px solid var(--auy-color-border);
        padding: var(--auy-space-md);
        padding-block-start: var(--auy-space-sm);
      }

      @media (forced-colors: active) {
        .btn--play { border: 1px solid ButtonText; }
        .btn--sm { border: 1px solid ButtonText; }
        .dload { border: 1px solid ButtonText; }
      }

      @media (prefers-reduced-motion: reduce) {
        .wave span { transition: none; }
        .btn--play { transition: none; }
        .btn--play:hover { transform: none; }
        .btn--play:active { transform: none; }
      }

      @media print {
        .player { border-color: #000; }
        .btn--play { display: none; }
      }
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) showDownload = true;
  @property({ type: Boolean }) showTranscript = false;

  @state() private _playing = false;
  @state() private _currentTime = 0;
  @state() private _duration = 0;
  @state() private _volume = 1;
  @state() private _muted = false;
  @state() private _speed = 1;
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

  override render() {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    return html`
      <div class="player" @keydown=${this._handleKey}>
        <div class="header">
          <span class="title">
            ${this.title || 'Player de Áudio'}
          </span>
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

        <div class="controls">
          <button
            class="btn btn--play"
            @click=${this._togglePlay}
            aria-label=${this._playing ? 'Pausar áudio' : 'Reproduzir áudio'}
            title=${this._playing ? 'Pausar' : 'Reproduzir'}
          >
            ${this._playing ? '❚❚' : '▶'}
          </button>

          <button class="btn btn--sm" @click=${() => this._skip(-10)} aria-label="Voltar 10 segundos" title="-10s">↺</button>
          <button class="btn btn--sm" @click=${() => this._skip(10)} aria-label="Avançar 10 segundos" title="+10s">↻</button>

          <div class="progress-wrap">
            <input
              type="range"
              class="progress-bar"
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

          <div class="meta">
            <div class="vol-wrap">
              <button class="btn btn--sm" @click=${this._toggleMute} aria-label=${this._muted ? 'Ativar som' : 'Mutar áudio'} title=${this._muted ? 'Ativar' : 'Mutar'}>
                ${this._muted || this._volume === 0 ? '🔇' : this._volume < 0.5 ? '🔉' : '🔊'}
              </button>
              <input
                type="range"
                class="vol-bar"
                min="0"
                max="1"
                step="0.05"
                .value=${this._muted ? 0 : this._volume}
                @input=${this._onVolume}
                aria-label="Volume"
              />
            </div>

            <div class="speed-wrap">
              <button class="speed-btn" @click=${() => { this._speedOpen = !this._speedOpen; }} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label="Velocidade de reprodução">
                ${this._speed}x
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

            ${this.showDownload && this.src ? html`
              <a href=${this.src} class="dload" download aria-label="Baixar áudio" title="Download">↓</a>
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
