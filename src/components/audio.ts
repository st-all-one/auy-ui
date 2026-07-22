import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';
import { t } from './_internal/locale.ts';

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
export class AuyCompAudio extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  static override get observedDataEvents(): string[] {
    return ['ended']
  }

  @property({ type: String }) src = '';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) showDownload = true;
  @property({ type: Boolean }) showTranscript = false;

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.src) this.src = d.src
    if (d.title) this.title = d.title
  }

  @state() private _playing = false;
  @state() private _currentTime = 0;
  @state() private _duration = 0;
  @state() private _volume = 1;
  @state() private _muted = false;
  @state() private _speed = 1;
  @state() private _speedOpen = false;

  private _audio: HTMLAudioElement | null = null;
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
  }

  private _onPause() {
    this._playing = false;
  }

  private _onEnded() {
    this._playing = false;
    this._currentTime = 0;
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
      <div data-element="audio" class="player" @keydown=${this._handleKey}>
        <div class="header">
          <span class="title">${this.title || t('audioTitle')}</span>
          <div class="wave ${this._playing ? 'playing' : ''}" aria-hidden="true">
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
                aria-label=${t('audioProgress')}
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
              aria-label=${this._playing ? t('audioPause') : t('audioPlay')}
              title=${this._playing ? t('audioPauseShort') : t('audioPlayShort')}
            >${this._playing ? ICONS.pause : ICONS.play}</button>

            <button class="icon-btn" @click=${() => this._skip(-10)} aria-label=${t('audioSkipBack')} title=${t('audioSkipBackShort')}>${ICONS.skipBack}</button>
            <button class="icon-btn" @click=${() => this._skip(10)} aria-label=${t('audioSkipForward')} title=${t('audioSkipForwardShort')}>${ICONS.skipForward}</button>

            <div class="spacer"></div>

            <div class="speed-wrap">
              <button class="speed-btn" @click=${() => { this._speedOpen = !this._speedOpen; }} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label=${t('audioSpeedLabel')}>
                ${this._speed}x ${ICONS.chevronDown}
              </button>
              <div class="speed-menu ${this._speedOpen ? 'speed-menu--open' : ''}" role="menu">
                ${speeds.map(s => html`
                  <button
                    class="speed-opt ${s === this._speed ? 'speed-opt--active' : ''}"
                    @click=${() => this._setSpeed(s)}
                    role="menuitem"
                  >${s}x${s === 1 ? t('audioSpeedNormal') : s < 1 ? t('audioSpeedSlow') : t('audioSpeedFast')}</button>
                `)}
              </div>
            </div>

            <div class="vol-wrap">
              <button class="icon-btn" @click=${this._toggleMute} aria-label=${this._muted ? t('audioUnmute') : t('audioMute')} title=${this._muted ? t('audioUnmuteShort') : t('audioMuteShort')}>${this._volumeIcon()}</button>
              <input
                type="range"
                class="vol-bar"
                min="0" max="1" step="0.05"
                .value=${this._muted ? 0 : this._volume}
                @input=${this._onVolume}
                aria-label=${t('audioVolume')}
              />
            </div>

            ${this.showDownload && this.src ? html`
              <a href=${this.src} class="dload" download aria-label=${t('audioDownloadLabel')} title=${t('audioDownload')}>${ICONS.download}</a>
            ` : nothing}
          </div>
        </div>

        ${this.showTranscript ? html`
          <div class="transcript">
            <details>
              <summary>${t('audioTranscript')}</summary>
              <p style="font-size:var(--auy-text-sm);color:var(--auy-color-text-muted);margin:var(--auy-space-sm) 0 0">
                ${t('audioTranscriptEmpty')}
              </p>
            </details>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
