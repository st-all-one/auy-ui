import { t as __decorate } from "./decorate.BeMZb0KT.js";
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, query, queryAll, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import { classMap } from "lit/directives/class-map.js";
//#region src/components/audio.ts
var AuyCompAudio = class AuyCompAudio extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.src = "";
		this.title = "";
		this.showDownload = true;
		this.showTranscript = false;
		this._playing = false;
		this._currentTime = 0;
		this._duration = 0;
		this._volume = 1;
		this._muted = false;
		this._speed = 1;
		this._speedOpen = false;
		this._audio = null;
		this._waveInterval = null;
		this._seeking = false;
	}
	static {
		this.styles = css`
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
	}
	_formatTime(s) {
		if (isNaN(s) || !isFinite(s)) return "0:00";
		return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
	}
	_onLoaded() {
		if (!this._audio) return;
		this._duration = this._audio.duration;
	}
	_togglePlay() {
		if (!this._audio) return;
		if (this._audio.paused) {
			const p = this._audio.play();
			if (p) p.catch(() => {});
		} else this._audio.pause();
	}
	_onPlay() {
		this._playing = true;
		this._startWave();
	}
	_onPause() {
		this._playing = false;
		this._stopWave();
	}
	_onEnded() {
		this._playing = false;
		this._currentTime = 0;
		this._stopWave();
		this.dispatchEvent(new CustomEvent("ended", {
			bubbles: true,
			composed: true
		}));
	}
	_onTimeUpdate() {
		if (!this._seeking && this._audio) this._currentTime = this._audio.currentTime;
	}
	_onSeekStart() {
		this._seeking = true;
	}
	_onSeek(e) {
		const val = Number(e.target.value);
		this._currentTime = val;
	}
	_onSeekEnd(e) {
		this._seeking = false;
		if (this._audio) this._audio.currentTime = Number(e.target.value);
	}
	_skip(sec) {
		if (!this._audio) return;
		this._audio.currentTime = Math.max(0, Math.min(this._audio.duration, this._audio.currentTime + sec));
	}
	_toggleMute() {
		if (!this._audio) return;
		this._audio.muted = !this._audio.muted;
		this._muted = this._audio.muted;
	}
	_onVolume(e) {
		if (!this._audio) return;
		const val = Number(e.target.value);
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
	_setSpeed(speed) {
		if (this._audio) this._audio.playbackRate = speed;
		this._speed = speed;
		this._speedOpen = false;
	}
	_startWave() {
		this._stopWave();
		this._waveInterval = setInterval(() => {
			const spans = this.shadowRoot?.querySelectorAll(".wave span");
			if (!spans) return;
			spans.forEach((s) => {
				s.style.blockSize = `${Math.floor(Math.random() * 14) + 5}px`;
			});
		}, 150);
	}
	_stopWave() {
		if (this._waveInterval) {
			clearInterval(this._waveInterval);
			this._waveInterval = null;
		}
		const spans = this.shadowRoot?.querySelectorAll(".wave span");
		if (spans) spans.forEach((s) => {
			s.style.blockSize = "5px";
		});
	}
	_handleKey(e) {
		if (e.key === " " || e.key === "Space") {
			e.preventDefault();
			this._togglePlay();
		}
	}
	render() {
		return html`
      <div class="player" @keydown=${this._handleKey}>
        <div class="header">
          <span class="title">
            ${this.title || "Player de Áudio"}
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
            aria-label=${this._playing ? "Pausar áudio" : "Reproduzir áudio"}
            title=${this._playing ? "Pausar" : "Reproduzir"}
          >
            ${this._playing ? "❚❚" : "▶"}
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
              <button class="btn btn--sm" @click=${this._toggleMute} aria-label=${this._muted ? "Ativar som" : "Mutar áudio"} title=${this._muted ? "Ativar" : "Mutar"}>
                ${this._muted || this._volume === 0 ? "🔇" : this._volume < .5 ? "🔉" : "🔊"}
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
              <button class="speed-btn" @click=${() => {
			this._speedOpen = !this._speedOpen;
		}} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label="Velocidade de reprodução">
                ${this._speed}x
              </button>
              <div class="speed-menu ${this._speedOpen ? "speed-menu--open" : ""}" role="menu">
                ${[
			.5,
			.75,
			1,
			1.25,
			1.5,
			2
		].map((s) => html`
                  <button
                    class="speed-opt ${s === this._speed ? "speed-opt--active" : ""}"
                    @click=${() => this._setSpeed(s)}
                    role="menuitem"
                  >${s}x${s === 1 ? " (Normal)" : s < 1 ? " (Mais lento)" : " (Mais rápido)"}</button>
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
};
__decorate([property({ type: String })], AuyCompAudio.prototype, "src", void 0);
__decorate([property({ type: String })], AuyCompAudio.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyCompAudio.prototype, "showDownload", void 0);
__decorate([property({ type: Boolean })], AuyCompAudio.prototype, "showTranscript", void 0);
__decorate([state()], AuyCompAudio.prototype, "_playing", void 0);
__decorate([state()], AuyCompAudio.prototype, "_currentTime", void 0);
__decorate([state()], AuyCompAudio.prototype, "_duration", void 0);
__decorate([state()], AuyCompAudio.prototype, "_volume", void 0);
__decorate([state()], AuyCompAudio.prototype, "_muted", void 0);
__decorate([state()], AuyCompAudio.prototype, "_speed", void 0);
__decorate([state()], AuyCompAudio.prototype, "_speedOpen", void 0);
AuyCompAudio = __decorate([customElement("auy-comp-audio")], AuyCompAudio);
//#endregion
//#region src/components/tabs.ts
var AuyCompTabs = class AuyCompTabs extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.tabs = [];
		this.activeTab = "";
		this.orientation = "horizontal";
		this._handleTabClick = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectTab(this.tabs[idx].id);
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host([orientation='vertical']) {
        display: flex;
        flex-direction: row;
      }

      [part='tabs'] {
        display: flex;
        position: relative;
        gap: var(--auy-space-xs, 6px);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      [part='tabs']::-webkit-scrollbar { block-size: 0.25rem; }
      [part='tabs']::-webkit-scrollbar-thumb { background: var(--auy-color-border); border-radius: var(--auy-radius-full); }

      :host([orientation='vertical']) [part='tabs'] {
        flex-direction: column;
        border-block-end: none;
        border-inline-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        gap: 0;
      }

      [part='tab'] {
        all: unset;
        box-sizing: border-box;
        padding: var(--auy-space-sm, 8px) var(--auy-space-md, 16px);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted, oklch(45% 0.03 260));
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        scroll-snap-align: start;
        flex-shrink: 0;
        transition: color var(--auy-transition-fast, 150ms) ease;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part='tab']:hover {
        color: var(--auy-color-text, oklch(20% 0.03 260));
      }

      [part='tab'][aria-selected='true'] {
        color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      [part='tab']:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        [part='tab'] {
          border: 1px solid ButtonText;
        }
      }

      [part='indicator'] {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        block-size: 2px;
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        transition: transform var(--auy-transition-slow, 250ms) ease,
          inline-size var(--auy-transition-slow, 250ms) ease;
        will-change: transform, inline-size;
      }

      :host([orientation='vertical']) [part='indicator'] {
        inset-block-end: auto;
        inset-inline-end: 0;
        inset-block-start: 0;
        inset-inline-start: auto;
        inline-size: 2px;
        block-size: 0;
        transition: transform var(--auy-transition-slow, 250ms) ease,
          block-size var(--auy-transition-slow, 250ms) ease;
      }

      [part='panel'] {
        padding: var(--auy-space-md, 16px);
      }

      [part='panel'][aria-hidden='true'] {
        display: none;
      }

      :host([orientation='vertical']) [part='panel'] {
        flex: 1;
      }

      @media print {
        [part='panel'] {
          display: block !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part='indicator'] {
          transition: none;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	_selectedId() {
		if (this.activeTab && this.tabs.some((t) => t.id === this.activeTab)) return this.activeTab;
		return this.tabs[0]?.id ?? "";
	}
	_selectTab(id) {
		if (id === this.activeTab) return;
		this.activeTab = id;
		this.dispatchEvent(new CustomEvent("tab-change", {
			detail: { id },
			bubbles: true,
			composed: true
		}));
	}
	_positionIndicator() {
		if (!this._indicator || !this._tabButtons.length) return;
		const activeId = this._selectedId();
		const activeEl = Array.from(this._tabButtons).find((el) => el.dataset.tabId === activeId);
		if (!activeEl) {
			this._indicator.style.transform = "";
			this._indicator.style.width = "";
			this._indicator.style.height = "";
			return;
		}
		if (this.orientation === "horizontal") {
			this._indicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
			this._indicator.style.width = `${activeEl.offsetWidth}px`;
		} else {
			this._indicator.style.transform = `translateY(${activeEl.offsetTop}px)`;
			this._indicator.style.height = `${activeEl.offsetHeight}px`;
		}
	}
	_onKeyDown(e) {
		if (!this.tabs.length) return;
		const idx = this.tabs.findIndex((t) => t.id === this._selectedId());
		let next = idx;
		switch (e.key) {
			case "ArrowRight":
				if (this.orientation === "horizontal") next = (idx + 1) % this.tabs.length;
				break;
			case "ArrowLeft":
				if (this.orientation === "horizontal") next = (idx - 1 + this.tabs.length) % this.tabs.length;
				break;
			case "ArrowDown":
				if (this.orientation === "vertical") next = (idx + 1) % this.tabs.length;
				break;
			case "ArrowUp":
				if (this.orientation === "vertical") next = (idx - 1 + this.tabs.length) % this.tabs.length;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = this.tabs.length - 1;
				break;
			default: return;
		}
		e.preventDefault();
		const el = this._tabButtons[next];
		if (el) el.focus();
		this._selectTab(this.tabs[next].id);
	}
	willUpdate(changed) {
		if (changed.has("tabs")) {
			if (!this.tabs.some((t) => t.id === this.activeTab) && this.tabs.length > 0) this.activeTab = this.tabs[0].id;
		}
	}
	firstUpdated() {
		this._positionIndicator();
	}
	updated(changed) {
		if (changed.has("activeTab") || changed.has("tabs") || changed.has("orientation")) this.updateComplete.then(() => this._positionIndicator());
	}
	render() {
		if (this.tabs.length > 0) {
			const activeId = this._selectedId();
			return html`
        <div part="tabs" role="tablist" @keydown=${this._onKeyDown}>
          ${keyed(this.tabs, this.tabs.map((tab, i) => {
				const isActive = tab.id === activeId;
				return html`
              <button
                part="tab"
                role="tab"
                id="tab-${tab.id}"
                data-tab-id=${tab.id}
                data-index="${i}"
                aria-selected=${isActive ? "true" : "false"}
                aria-controls="panel-${tab.id}"
                tabindex=${isActive ? "0" : "-1"}
                @click=${this._handleTabClick}
              >${tab.label}</button>
            `;
			}))}
          <div part="indicator"></div>
        </div>
        ${keyed(this.tabs, this.tabs.map((tab) => {
				const isActive = tab.id === activeId;
				return html`
            <div
              part="panel"
              role="tabpanel"
              id="panel-${tab.id}"
              aria-labelledby="tab-${tab.id}"
              aria-hidden=${isActive ? "false" : "true"}
            ><slot name="panel-${tab.id}"></slot></div>
          `;
			}))}
      `;
		}
		return html`
      <div part="tabs" role="tablist">
        <slot name="tab"></slot>
        <div part="indicator"></div>
      </div>
      <slot name="panel"></slot>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompTabs.prototype, "tabs", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompTabs.prototype, "activeTab", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompTabs.prototype, "orientation", void 0);
__decorate([query("[part=\"indicator\"]")], AuyCompTabs.prototype, "_indicator", void 0);
__decorate([queryAll("[part=\"tab\"]")], AuyCompTabs.prototype, "_tabButtons", void 0);
AuyCompTabs = __decorate([customElement("auy-comp-tabs")], AuyCompTabs);
//#endregion
//#region src/components/toast.ts
var AuyCompToast = class AuyCompToast extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "info";
		this.open = false;
		this.duration = 4e3;
		this.dismissible = true;
		this._timer = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .toast {
        display: none;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        transform: translateX(100%);
        opacity: 0;
        transition: display var(--auy-transition-base) allow-discrete,
                    transform var(--auy-transition-base),
                    opacity var(--auy-transition-base);
      }

      .toast--open {
        display: flex;
        transform: translateX(0);
        opacity: 1;
      }

      @starting-style {
        .toast--open {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.5em;
        block-size: 1.5em;
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .toast--info {
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start: 3px solid var(--auy-color-success);
      }

      .toast--error {
        border-inline-start: 3px solid var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start: 3px solid var(--auy-color-warning);
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }

        .dismiss {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .toast {
          display: flex !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	_startTimer() {
		this._clearTimer();
		if (this.open && this.duration > 0 && typeof window !== "undefined") this._timer = window.setTimeout(() => {
			this.open = false;
		}, this.duration);
	}
	_clearTimer() {
		if (this._timer !== null) {
			clearTimeout(this._timer);
			this._timer = null;
		}
	}
	_dispatchShow() {
		this.dispatchEvent(new CustomEvent("show", {
			bubbles: true,
			composed: true
		}));
	}
	_dispatchHide() {
		this.dispatchEvent(new CustomEvent("hide", {
			bubbles: true,
			composed: true
		}));
	}
	_dismiss() {
		this.open = false;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.open) this._startTimer();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._clearTimer();
	}
	shouldUpdate(changed) {
		if (changed.has("variant") || changed.has("dismissible")) return this.open;
		return true;
	}
	updated(changedProperties) {
		if (changedProperties.has("open")) if (this.open) {
			this._startTimer();
			this._dispatchShow();
		} else {
			this._clearTimer();
			this._dispatchHide();
		}
		if (changedProperties.has("duration") && this.open) this._startTimer();
	}
	render() {
		return html`
      <div
        part="toast"
        class=${classMap({
			toast: true,
			"toast--open": this.open,
			[`toast--${this.variant}`]: true
		})}
        role="alert"
        aria-atomic="true"
      >
        <span part="icon" class="icon">
          <slot name="icon">
            ${this._renderIcon()}
          </slot>
        </span>
        <span part="message" class="message">
          <slot></slot>
        </span>
        ${this.dismissible ? html`<button part="dismiss" class="dismiss" aria-label="Fechar" @click=${this._dismiss}>&times;</button>` : ""}
      </div>
    `;
	}
	_renderIcon() {
		switch (this.variant) {
			case "success": return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
			case "error": return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;
			case "warning": return html`<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
			default: return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h2v2zm2-4h-2V7h2v6z"/></svg>`;
		}
	}
};
__decorate([property({ type: String })], AuyCompToast.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompToast.prototype, "open", void 0);
__decorate([property({ type: Number })], AuyCompToast.prototype, "duration", void 0);
__decorate([property({ type: Boolean })], AuyCompToast.prototype, "dismissible", void 0);
AuyCompToast = __decorate([customElement("auy-comp-toast")], AuyCompToast);
//#endregion
//#region src/components/toast-container.ts
var AuyCompToastContainer = class AuyCompToastContainer extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.position = "top-right";
		this.defaultDuration = 4e3;
		this._toasts = [];
		this._counter = 0;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        position: fixed;
        z-index: 2;
        display: grid;
        gap: var(--auy-space-sm);
        pointer-events: none;
      }

      :host([position="top-right"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="top-left"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="bottom-right"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="bottom-left"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="top-center"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: 50%;
        translate: -50% 0;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        pointer-events: auto;
        max-inline-size: 24rem;
        animation: toast-in var(--auy-transition, 200ms) ease forwards;
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start-color: var(--auy-color-success);
      }

      .toast--error {
        border-inline-start-color: var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start-color: var(--auy-color-warning);
      }

      .toast.removing {
        animation: toast-out var(--auy-transition, 200ms) ease forwards;
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      :host([position*="left"]) .toast {
        animation-name: toast-in-left;
      }

      :host([position*="left"]) .toast.removing {
        animation-name: toast-out-left;
      }

      @keyframes toast-in-left {
        from {
          opacity: 0;
          transform: translateX(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out-left {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(-100%);
        }
      }

      .dismiss {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.5em;
        block-size: 1.5em;
        flex-shrink: 0;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }
        .dismiss:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	show(message, variant = "info", duration) {
		const id = `toast-${++this._counter}`;
		const toast = {
			id,
			message,
			variant,
			duration: duration ?? this.defaultDuration
		};
		this._toasts = [...this._toasts, toast];
		if (toast.duration > 0) setTimeout(() => this.dismiss(id), toast.duration);
		return id;
	}
	dismiss(id) {
		const el = this.shadowRoot?.querySelector(`[data-id="${id}"]`);
		if (el) {
			el.classList.add("removing");
			setTimeout(() => {
				this._toasts = this._toasts.filter((t) => t.id !== id);
			}, 200);
		} else this._toasts = this._toasts.filter((t) => t.id !== id);
	}
	_dismissToast(id) {
		this.dismiss(id);
	}
	_getIcon(variant) {
		switch (variant) {
			case "success": return "✓";
			case "error": return "✕";
			case "warning": return "⚠";
			default: return "ℹ";
		}
	}
	render() {
		if (this._toasts.length === 0) return null;
		return html`
      ${this._toasts.map((t) => html`
        <div
          part="toast"
          class="toast toast--${t.variant}"
          data-id=${t.id}
          role="alert"
          aria-live="polite"
        >
          <span part="icon" aria-hidden="true">${this._getIcon(t.variant)}</span>
          <span part="message" class="message">${t.message}</span>
          <button
            part="dismiss"
            class="dismiss"
            @click=${() => this._dismissToast(t.id)}
            aria-label="Fechar"
          >&times;</button>
        </div>
      `)}
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyCompToastContainer.prototype, "position", void 0);
__decorate([property({ type: Number })], AuyCompToastContainer.prototype, "defaultDuration", void 0);
__decorate([state()], AuyCompToastContainer.prototype, "_toasts", void 0);
AuyCompToastContainer = __decorate([customElement("auy-comp-toast-container")], AuyCompToastContainer);
//#endregion
//#region src/components/pagination.ts
var AuyCompPagination = class AuyCompPagination extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.current = 1;
		this.total = 1;
		this.perPage = 10;
		this.maxVisible = 5;
		this.disabled = false;
		this._totalPages = 1;
		this._firstPage = true;
		this._lastPage = true;
		this._pages = [];
		this._handlePageClick = (e) => {
			const page = Number(e.currentTarget.dataset.page);
			this._goTo(page);
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      nav {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs);
        justify-content: center;
        flex-wrap: wrap;
      }

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-inline-size: 2.25rem;
        block-size: 2.25rem;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        cursor: pointer;
        color: var(--auy-color-text);
        background: transparent;
        transition: background var(--auy-transition, 200ms ease);
        box-sizing: border-box;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      button:hover:not(:disabled):not(.ellipsis) {
        background: var(--auy-color-border);
      }

      button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      button.active {
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        font-weight: 600;
      }

      button.ellipsis {
        letter-spacing: 2px;
        cursor: default;
      }

      @media (forced-colors: active) {
        button {
          border: 1px solid ButtonText;
        }
      }

      .visually-hidden {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media print {
        nav {
          display: none;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	willUpdate(changed) {
		if (changed.has("total") || changed.has("perPage") || changed.has("current") || changed.has("maxVisible") || changed.has("disabled")) {
			this._totalPages = Math.ceil(this.total / this.perPage);
			this._firstPage = this.current <= 1 || this.disabled;
			this._lastPage = this.current >= this._totalPages || this.disabled;
			this._pages = this._generatePages();
		}
	}
	_goTo(page) {
		if (this.disabled) return;
		if (page < 1 || page > this._totalPages) return;
		if (page === this.current) return;
		this.current = page;
		this.dispatchEvent(new CustomEvent("page-change", {
			detail: {
				page: this.current,
				perPage: this.perPage
			},
			bubbles: true,
			composed: true
		}));
	}
	_goPrev() {
		if (this.current > 1) this._goTo(this.current - 1);
	}
	_goNext() {
		if (this.current < this._totalPages) this._goTo(this.current + 1);
	}
	_generatePages() {
		const total = this._totalPages;
		const current = this.current;
		const visible = this.maxVisible;
		if (total <= visible + 2) return Array.from({ length: total }, (_, i) => i + 1);
		const pages = [1];
		let start = Math.max(2, current - Math.floor(visible / 2));
		let end = Math.min(total - 1, start + visible - 1);
		if (end - start < visible - 1) start = Math.max(2, end - visible + 1);
		if (start > 2) pages.push("...");
		for (let i = start; i <= end; i++) pages.push(i);
		if (end < total - 1) pages.push("...");
		pages.push(total);
		return pages;
	}
	render() {
		const pages = this._pages;
		return html`
      <nav part="nav" aria-label="Paginação">
        <button
          part="btn prev"
          rel="prev"
          ?disabled=${this._firstPage}
          @click=${this._goPrev}
          aria-label="Página anterior"
        >
          <slot name="prev-icon">‹</slot>
        </button>
        ${pages.map((p) => typeof p === "string" ? html`<button part="btn ellipsis" class="ellipsis" disabled aria-hidden="true"><span aria-hidden="true">${p}</span><span class="visually-hidden">Pular páginas</span></button>` : html`
                  <button
                    part="btn page"
                    class=${classMap({ active: p === this.current })}
                    ?disabled=${this.disabled}
                    data-page="${p}"
                    @click=${this._handlePageClick}
                    aria-current=${p === this.current ? "page" : nothing}
                    aria-label="Ir para página ${p}"
                  >
                    ${p}
                  </button>
                `)}
        <button
          part="btn next"
          rel="next"
          ?disabled=${this._lastPage}
          @click=${this._goNext}
          aria-label="Próxima página"
        >
          <slot name="next-icon">›</slot>
        </button>
      </nav>
    `;
	}
};
__decorate([property({
	type: Number,
	reflect: true
})], AuyCompPagination.prototype, "current", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "total", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "perPage", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "maxVisible", void 0);
__decorate([property({ type: Boolean })], AuyCompPagination.prototype, "disabled", void 0);
__decorate([state()], AuyCompPagination.prototype, "_totalPages", void 0);
__decorate([state()], AuyCompPagination.prototype, "_firstPage", void 0);
__decorate([state()], AuyCompPagination.prototype, "_lastPage", void 0);
__decorate([state()], AuyCompPagination.prototype, "_pages", void 0);
AuyCompPagination = __decorate([customElement("auy-comp-pagination")], AuyCompPagination);
//#endregion
//#region src/components/code-editor.ts
var AuyCompCodeEditor = class AuyCompCodeEditor extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.language = "html";
		this.readonly = false;
		this.theme = "default";
		this.lineNumbers = true;
		this.height = "300px";
		this.placeholder = "";
		this.cmOptions = "";
		this._lines = ["1"];
		this._cmLoaded = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .editor {
        display: flex;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        background: var(--auy-color-surface);
      }

      .gutter {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background: color-mix(in oklch, var(--auy-color-border) 30%, transparent);
        color: var(--auy-color-text-muted);
        text-align: right;
        user-select: none;
        min-inline-size: 3rem;
        flex-shrink: 0;
        overflow: hidden;
      }

      textarea {
        flex: 1;
        border: none;
        padding: 0.5rem;
        font: inherit;
        background: transparent;
        color: var(--auy-color-text);
        resize: both;
        outline: none;
        tab-size: 2;
        white-space: pre;
        overflow-wrap: normal;
        overflow: auto;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      :host([readonly]) textarea {
        cursor: default;
      }

      textarea:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      textarea::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      ::part(textarea)::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      .cm-host {
        flex: 1;
        overflow: auto;
      }

      @media (forced-colors: active) {
        .editor {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .editor {
          border-color: #000;
        }
      }

      @media (prefers-color-scheme: dark) {
        .editor {
          border-color: var(--auy-color-border, oklch(28% 0.03 260));
          background: var(--auy-color-surface, oklch(20% 0.03 260));
        }

        textarea {
          color: var(--auy-color-text, oklch(93% 0.01 260));
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	shouldUpdate(changed) {
		return changed.has("value") || changed.has("lineNumbers") || changed.has("cmOptions") || changed.has("height") || changed.has("readonly") || changed.has("placeholder") || changed.has("_cmLoaded");
	}
	willUpdate(changed) {
		if (changed.has("value") || changed.has("lineNumbers")) this._updateLineNumbers();
	}
	render() {
		if (this._cmLoaded) return html`
        <div part="editor" class="editor" style="height: ${this.height}">
          <div part="cm-host" class="cm-host"></div>
        </div>
      `;
		return html`
      <div part="editor" class="editor" style="height: ${this.height}">
        ${this.lineNumbers ? html`
              <div part="gutter" class="gutter" aria-hidden="true">
                ${this._lines.map((n) => html`<span>${n}</span>`)}
              </div>
            ` : nothing}
        <textarea
          part="textarea"
          .value=${this.value}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder || nothing}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          @scroll=${this._syncScroll}
          spellcheck="false"
          wrap="off"
        ></textarea>
      </div>
    `;
	}
	updated(changed) {
		if (changed.has("cmOptions") && this.cmOptions) this._loadCodeMirror();
	}
	_onInput(e) {
		const target = e.target;
		this.value = target.value;
		this.dispatchEvent(new CustomEvent("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	_onKeydown(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			const target = e.target;
			const start = target.selectionStart;
			const end = target.selectionEnd;
			target.value = `${target.value.substring(0, start)}  ${target.value.substring(end)}`;
			target.selectionStart = target.selectionEnd = start + 2;
			this.value = target.value;
			this.dispatchEvent(new CustomEvent("input", {
				bubbles: true,
				composed: true
			}));
			this.dispatchEvent(new Event("change", {
				bubbles: true,
				composed: true
			}));
		}
	}
	_syncScroll() {
		if (this._textarea && this._gutter) this._gutter.scrollTop = this._textarea.scrollTop;
	}
	_updateLineNumbers() {
		if (!this.lineNumbers) {
			this._lines = [];
			return;
		}
		const count = Math.max(1, (this.value || "").split("\n").length);
		this._lines = Array.from({ length: count }, (_, i) => String(i + 1));
	}
	async _loadCodeMirror() {
		try {
			const cm = await import("https://cdn.jsdelivr.net/npm/codemirror@6/+esm");
			if (this._cmHost && cm.EditorView) {
				const options = this.cmOptions ? JSON.parse(this.cmOptions) : {};
				this._cmHost.innerHTML = "";
				new cm.EditorView({
					doc: this.value,
					parent: this._cmHost,
					...options
				});
			}
			this._cmLoaded = true;
		} catch {
			this._cmLoaded = false;
		}
		this.requestUpdate();
	}
};
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "language", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompCodeEditor.prototype, "readonly", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "theme", void 0);
__decorate([property({ type: Boolean })], AuyCompCodeEditor.prototype, "lineNumbers", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "height", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "placeholder", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "cmOptions", void 0);
__decorate([state()], AuyCompCodeEditor.prototype, "_lines", void 0);
__decorate([state()], AuyCompCodeEditor.prototype, "_cmLoaded", void 0);
__decorate([query("textarea")], AuyCompCodeEditor.prototype, "_textarea", void 0);
__decorate([query(".gutter")], AuyCompCodeEditor.prototype, "_gutter", void 0);
__decorate([query(".cm-host")], AuyCompCodeEditor.prototype, "_cmHost", void 0);
AuyCompCodeEditor = __decorate([customElement("auy-comp-code-editor")], AuyCompCodeEditor);
//#endregion
//#region src/components/search.ts
function highlight(text, query) {
	if (!query) return [text];
	const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) => i % 2 === 1 ? html`<mark style="background:var(--auy-color-primary);color:var(--auy-color-on-primary);border-radius:2px;padding:0 2px">${part}</mark>` : part);
}
var AuyCompSearch = class AuyCompSearch extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.items = [];
		this.placeholder = "Buscar...";
		this.open = false;
		this.shortcut = "k";
		this.src = "";
		this.debounceMs = 300;
		this._query = "";
		this._selectedIndex = 0;
		this._filtered = [];
		this._debounceTimer = null;
		this._fetchController = null;
		this._onGlobalKeydown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === this.shortcut) {
				e.preventDefault();
				this._open();
			}
		};
		this._handleSelect = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectItem(this._filtered[idx]);
		};
		this._handleMouseEnter = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectedIndex = idx;
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host(:not([open])) {
        display: none;
      }

      [part="overlay"] {
        position: fixed;
        inset: 0;
        z-index: 1;
        background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-block-start: 15dvh;
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms ease);
      }

      @starting-style {
        [part="overlay"] {
          opacity: 0;
        }
      }

      [part="panel"] {
        background: var(--auy-color-surface);
        border-radius: var(--auy-radius-lg);
        box-shadow: var(--auy-shadow-lg);
        inline-size: min(40rem, 90dvw);
        max-block-size: 60dvh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      [part="input-wrapper"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-block-end: 1px solid var(--auy-color-border);
      }

      [part="input"] {
        flex: 1;
        border: none;
        outline: none;
        font-size: var(--auy-text-lg);
        background: transparent;
        color: var(--auy-color-text);
        font-family: inherit;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"] {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-lg);
        cursor: pointer;
        font-size: var(--auy-text-xl);
        line-height: 1;
        color: inherit;
        flex-shrink: 0;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"]:hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      [part="close-btn"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      [part="hint"] {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.375rem;
        border: 1px solid var(--auy-color-border);
        border-radius: 0.25rem;
        font-size: var(--auy-text-xs);
        font-family: inherit;
        color: var(--auy-color-text-muted);
      }

      [part="results"] {
        flex: 1;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        padding: var(--auy-space-xs);
        list-style: none;
        margin: 0;
      }

      [part="result-item"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      @media (forced-colors: active) {
        [part="overlay"] {
          background: Canvas;
        }

        [part="input"] {
          border: 1px solid ButtonText;
        }

        [part="close-btn"] {
          border: 1px solid ButtonText;
        }

        [part="result-item"] {
          border: 1px solid ButtonText;
        }
      }

      [part="result-item"].selected {
        background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
      }

      [part="result-icon"] {
        flex-shrink: 0;
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      [part="result-content"] {
        flex: 1;
        display: grid;
        gap: 0.125rem;
      }

      [part="result-label"] {
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
      }

      [part="result-desc"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
      }

      [part="result-cat"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-primary);
      }

      [part="empty"] {
        padding: var(--auy-space-xl);
        text-align: center;
        color: var(--auy-color-text-muted);
      }

      [part="footer"] {
        display: flex;
        gap: var(--auy-space-md);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-block-start: 1px solid var(--auy-color-border);
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        justify-content: center;
      }

      [part="search-wrapper"] { display: contents; }

      @media (prefers-reduced-motion: reduce) {
        [part="overlay"] {
          transition: none;
        }
      }

      @media print {
        [part="overlay"] {
          background: transparent;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	willUpdate(changed) {
		if (changed.has("items") || changed.has("_query")) this._filtered = this._filterItems();
	}
	shouldUpdate(changed) {
		if (changed.has("open")) return true;
		return this.open;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") document.addEventListener("keydown", this._onGlobalKeydown);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined") document.removeEventListener("keydown", this._onGlobalKeydown);
	}
	updated(changed) {
		if (changed.has("open") && this.open) requestAnimationFrame(() => {
			this._inputEl?.focus();
		});
	}
	_filterItems() {
		if (!this._query) return this.items.slice(0, 10);
		const q = this._query.toLowerCase();
		return this.items.filter((item) => item.label.toLowerCase().includes(q) || item.description && item.description.toLowerCase().includes(q));
	}
	async _fetchResults(query) {
		if (!this.src) return;
		this._fetchController?.abort();
		this._fetchController = new AbortController();
		try {
			const url = new URL(this.src, window.location.href);
			url.searchParams.set("q", query);
			const res = await fetch(url.toString(), { signal: this._fetchController.signal });
			if (!res.ok) throw new Error("Search failed");
			const data = await res.json();
			if (Array.isArray(data)) this.items = data;
			else if (data.results) this.items = data.results;
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			this.items = [];
		}
	}
	_onInput(e) {
		this._query = e.target.value;
		this._selectedIndex = 0;
		if (this.src) {
			clearTimeout(this._debounceTimer);
			this._debounceTimer = window.setTimeout(() => this._fetchResults(this._query), this.debounceMs);
		}
	}
	_onKeydown(e) {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				this._selectedIndex = Math.min(this._selectedIndex + 1, this._filtered.length - 1);
				break;
			case "ArrowUp":
				e.preventDefault();
				this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
				break;
			case "Enter":
				e.preventDefault();
				if (this._filtered[this._selectedIndex]) this._selectItem(this._filtered[this._selectedIndex]);
				break;
			case "Escape":
				e.preventDefault();
				this._close();
				break;
			case "Tab":
				e.preventDefault();
				break;
		}
	}
	_selectItem(item) {
		this.dispatchEvent(new CustomEvent("search-select", {
			detail: item,
			bubbles: true,
			composed: true
		}));
		if (item.href) window.location.href = item.href;
		this._close();
	}
	_close() {
		this.open = false;
		this.dispatchEvent(new CustomEvent("search-close", {
			bubbles: true,
			composed: true
		}));
	}
	_open() {
		this.open = true;
		this._query = "";
		this._selectedIndex = 0;
	}
	_closeOnOverlay(e) {
		if (e.target.getAttribute("part") === "overlay") this._close();
	}
	render() {
		if (!this.open) return nothing;
		const filtered = this._filtered;
		return html`
      <div part="overlay" @click=${this._closeOnOverlay}>
        <div part="panel" role="dialog" aria-modal="true" aria-label="Busca">
          <search part="search-wrapper">
          <div part="input-wrapper">
            <span part="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true" style="inline-size:1.25rem;block-size:1.25rem"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
            <input
              part="input"
              .value=${this._query}
              @input=${this._onInput}
              @keydown=${this._onKeydown}
              placeholder=${this.placeholder}
              aria-label="Buscar"
              autofocus
            />
            <button part="close-btn" @click=${this._close} aria-label="Fechar busca">×</button>
            <kbd part="hint">ESC</kbd>
          </div>
          ${filtered.length > 0 ? html`
            <ul part="results" role="listbox">
              ${keyed(this._filtered, filtered.map((item, idx) => html`
                <li
                  part="result-item"
                  role="option"
                  data-index="${idx}"
                  aria-selected=${this._selectedIndex === idx ? "true" : "false"}
                  class=${classMap({ selected: this._selectedIndex === idx })}
                  @click=${this._handleSelect}
                  @mouseenter=${this._handleMouseEnter}
                >
                  ${item.icon ? html`<span part="result-icon">${item.icon}</span>` : ""}
                  <div part="result-content">
                    <span part="result-label">${highlight(item.label, this._query)}</span>
                    ${item.description ? html`<span part="result-desc">${highlight(item.description, this._query)}</span>` : ""}
                  </div>
                  ${item.category ? html`<span part="result-cat">${item.category}</span>` : ""}
                </li>
              `))}
            </ul>
          ` : html`
            <div part="empty">Nenhum resultado encontrado</div>
          `}
          <div part="footer">
            <span>↑↓ Navegar</span>
            <span>↵ Selecionar</span>
            <span>ESC Fechar</span>
          </div>
          </search>
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompSearch.prototype, "items", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "placeholder", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompSearch.prototype, "open", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "shortcut", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "src", void 0);
__decorate([property({ type: Number })], AuyCompSearch.prototype, "debounceMs", void 0);
__decorate([state()], AuyCompSearch.prototype, "_query", void 0);
__decorate([state()], AuyCompSearch.prototype, "_selectedIndex", void 0);
__decorate([state()], AuyCompSearch.prototype, "_filtered", void 0);
__decorate([state()], AuyCompSearch.prototype, "_debounceTimer", void 0);
__decorate([query("[part=\"input\"]")], AuyCompSearch.prototype, "_inputEl", void 0);
AuyCompSearch = __decorate([customElement("auy-comp-search")], AuyCompSearch);
//#endregion
//#region src/components/metadata.ts
var AuyCompMetadata = class AuyCompMetadata extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.title = "";
		this.description = "";
		this.canonical = "";
		this.ogTitle = "";
		this.ogDescription = "";
		this.ogImage = "";
		this.ogUrl = "";
		this.ogType = "website";
		this.ogSiteName = "";
		this.twCard = "summary_large_image";
		this.twSite = "";
		this.twCreator = "";
		this.twTitle = "";
		this.twDescription = "";
		this.twImage = "";
		this.jsonLd = "";
		this.robots = "index, follow";
		this._elements = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: none;
      }
    }
  `;
	}
	createRenderRoot() {
		return this;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window === "undefined" || typeof document === "undefined") return;
		this._applyAll();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._elements.forEach((el) => {
			if (el.parentNode) el.parentNode.removeChild(el);
		});
		this._elements.clear();
	}
	updated(changed) {
		if (typeof window === "undefined" || typeof document === "undefined") return;
		if (changed.has("title")) this._applyTitle();
		if (changed.has("description")) this._applyDescription();
		if (changed.has("canonical")) this._applyCanonical();
		if (changed.has("ogTitle")) this._applyOgTitle();
		if (changed.has("ogDescription")) this._applyOgDescription();
		if (changed.has("ogImage")) this._applyOgImage();
		if (changed.has("ogUrl")) this._applyOgUrl();
		if (changed.has("ogType")) this._applyOgType();
		if (changed.has("ogSiteName")) this._applyOgSiteName();
		if (changed.has("twCard")) this._applyTwCard();
		if (changed.has("twSite")) this._applyTwSite();
		if (changed.has("twCreator")) this._applyTwCreator();
		if (changed.has("twTitle")) this._applyTwTitle();
		if (changed.has("twDescription")) this._applyTwDescription();
		if (changed.has("twImage")) this._applyTwImage();
		if (changed.has("jsonLd")) this._applyJsonLd();
		if (changed.has("robots")) this._applyRobots();
	}
	_applyAll() {
		this._applyTitle();
		this._applyDescription();
		this._applyCanonical();
		this._applyOgTitle();
		this._applyOgDescription();
		this._applyOgImage();
		this._applyOgUrl();
		this._applyOgType();
		this._applyOgSiteName();
		this._applyTwCard();
		this._applyTwSite();
		this._applyTwCreator();
		this._applyTwTitle();
		this._applyTwDescription();
		this._applyTwImage();
		this._applyJsonLd();
		this._applyRobots();
	}
	_applyTitle() {
		document.title = this.title;
	}
	_applyDescription() {
		if (this.description) this._ensureMeta("description", "description");
		else this._removeMeta("description");
	}
	_applyCanonical() {
		if (this.canonical) this._ensureLink("canonical", this.canonical);
		else this._removeLink("canonical");
	}
	_applyOgTitle() {
		if (this.ogTitle) this._ensureMeta("og:title", "og:title");
		else this._removeMeta("og:title");
	}
	_applyOgDescription() {
		if (this.ogDescription) this._ensureMeta("og:description", "og:description");
		else this._removeMeta("og:description");
	}
	_applyOgImage() {
		if (this.ogImage) this._ensureMeta("og:image", "og:image");
		else this._removeMeta("og:image");
	}
	_applyOgUrl() {
		if (this.ogUrl) this._ensureMeta("og:url", "og:url");
		else this._removeMeta("og:url");
	}
	_applyOgType() {
		if (this.ogType) this._ensureMeta("og:type", "og:type");
		else this._removeMeta("og:type");
	}
	_applyOgSiteName() {
		if (this.ogSiteName) this._ensureMeta("og:site_name", "og:site_name");
		else this._removeMeta("og:site_name");
	}
	_applyTwCard() {
		if (this.twCard) this._ensureMeta("twitter:card", "twitter:card");
		else this._removeMeta("twitter:card");
	}
	_applyTwSite() {
		if (this.twSite) this._ensureMeta("twitter:site", "twitter:site");
		else this._removeMeta("twitter:site");
	}
	_applyTwCreator() {
		if (this.twCreator) this._ensureMeta("twitter:creator", "twitter:creator");
		else this._removeMeta("twitter:creator");
	}
	_applyTwTitle() {
		if (this.twTitle) this._ensureMeta("twitter:title", "twitter:title");
		else this._removeMeta("twitter:title");
	}
	_applyTwDescription() {
		if (this.twDescription) this._ensureMeta("twitter:description", "twitter:description");
		else this._removeMeta("twitter:description");
	}
	_applyTwImage() {
		if (this.twImage) this._ensureMeta("twitter:image", "twitter:image");
		else this._removeMeta("twitter:image");
	}
	_applyJsonLd() {
		if (this.jsonLd) this._ensureJsonLd();
		else this._removeJsonLd();
	}
	_applyRobots() {
		if (this.robots) this._ensureMeta("robots", "robots");
		else this._removeMeta("robots");
	}
	_ensureMeta(nameAttr, key) {
		const contentValue = this._getValueForKey(key);
		let el = this._elements.get(key);
		if (!el) el = document.head.querySelector(`meta[name="${nameAttr}"]`);
		if (!el) {
			el = document.createElement("meta");
			el.setAttribute("name", nameAttr);
			el.setAttribute("content", contentValue);
			document.head.appendChild(el);
			this._elements.set(key, el);
		} else {
			el.setAttribute("content", contentValue);
			this._elements.set(key, el);
		}
	}
	_ensureLink(rel, href) {
		let el = this._elements.get(rel);
		if (!el) el = document.head.querySelector(`link[rel="${rel}"]`);
		if (!el) {
			el = document.createElement("link");
			el.setAttribute("rel", rel);
			el.setAttribute("href", href);
			document.head.appendChild(el);
			this._elements.set(rel, el);
		} else {
			el.setAttribute("href", href);
			this._elements.set(rel, el);
		}
	}
	_ensureJsonLd() {
		const key = "json-ld";
		let el = this._elements.get(key);
		if (!el) el = document.head.querySelector("script[type=\"application/ld+json\"]");
		try {
			const parsed = JSON.parse(this.jsonLd);
			const formatted = JSON.stringify(parsed, null, 2);
			if (!el) {
				el = document.createElement("script");
				el.setAttribute("type", "application/ld+json");
				el.textContent = formatted;
				document.head.appendChild(el);
				this._elements.set(key, el);
			} else {
				el.textContent = formatted;
				this._elements.set(key, el);
			}
		} catch {
			if (!el) {
				el = document.createElement("script");
				el.setAttribute("type", "application/ld+json");
				el.textContent = this.jsonLd;
				document.head.appendChild(el);
				this._elements.set(key, el);
			} else {
				el.textContent = this.jsonLd;
				this._elements.set(key, el);
			}
		}
	}
	_getValueForKey(key) {
		switch (key) {
			case "description": return this.description;
			case "og:title": return this.ogTitle;
			case "og:description": return this.ogDescription;
			case "og:image": return this.ogImage;
			case "og:url": return this.ogUrl;
			case "og:type": return this.ogType;
			case "og:site_name": return this.ogSiteName;
			case "twitter:card": return this.twCard;
			case "twitter:site": return this.twSite;
			case "twitter:creator": return this.twCreator;
			case "twitter:title": return this.twTitle;
			case "twitter:description": return this.twDescription;
			case "twitter:image": return this.twImage;
			case "robots": return this.robots;
			default: return "";
		}
	}
	_removeMeta(nameAttr) {
		const key = nameAttr;
		const el = this._elements.get(key);
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete(key);
	}
	_removeLink(rel) {
		const el = this._elements.get(rel);
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete(rel);
	}
	_removeJsonLd() {
		const el = this._elements.get("json-ld");
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete("json-ld");
	}
	render() {
		return html``;
	}
};
__decorate([property({ type: String })], AuyCompMetadata.prototype, "title", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "description", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "canonical", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogTitle", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogDescription", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogImage", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogUrl", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogType", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogSiteName", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twCard", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twSite", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twCreator", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twTitle", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twDescription", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twImage", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "jsonLd", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "robots", void 0);
AuyCompMetadata = __decorate([customElement("auy-comp-metadata")], AuyCompMetadata);
//#endregion
//#region src/components/file-input.ts
var AuyCompFileInput = class AuyCompFileInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.multiple = false;
		this.accept = "";
		this.maxSize = 5 * 1024 * 1024;
		this.action = "";
		this.headers = "";
		this.chunkSize = 0;
		this._files = [];
		this._previewUrls = [];
		this._dragover = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .dropzone {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xl);
        border: 2px dashed var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
        cursor: pointer;
        transition: border-color var(--auy-transition), background var(--auy-transition);
        touch-action: manipulation;
      }

      .dropzone:hover,
      .dropzone.dragover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 5%, transparent);
      }

      .dropzone:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .icon {
        font-size: var(--auy-text-4xl);
        line-height: 1;
        opacity: 0.4;
      }

      .text {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        text-align: center;
      }

      .hint {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        opacity: 0.7;
      }

      input[type="file"] {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
      }

      .files {
        display: grid;
        gap: var(--auy-space-xs);
        margin-block-start: var(--auy-space-sm);
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xs) var(--auy-space-sm);
        border-radius: var(--auy-radius-sm);
        background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
        font-size: var(--auy-text-sm);
      }

      .file-preview {
        inline-size: 2rem; block-size: 2rem; border-radius: var(--auy-radius-sm);
        object-fit: cover; flex-shrink: 0;
      }

      .file-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-size {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        flex-shrink: 0;
      }

      .remove {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25rem;
        block-size: 1.25rem;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: var(--auy-text-base);
        line-height: 1;
        opacity: 0.5;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
        flex-shrink: 0;
      }

      .remove:hover {
        opacity: 1;
      }

      .remove:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .dropzone {
          border: 2px solid ButtonText;
        }
        .dropzone:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
        .remove:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        .file-item {
          display: none;
        }
      }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	_handleChange(e) {
		const input = e.target;
		if (input.files) this._addFiles(Array.from(input.files));
		input.value = "";
	}
	_handleDrop(e) {
		e.preventDefault();
		this._dragover = false;
		if (e.dataTransfer?.files) this._addFiles(Array.from(e.dataTransfer.files));
	}
	_addFiles(newFiles) {
		const filtered = newFiles.filter((f) => f.size <= this.maxSize);
		this._previewUrls.forEach((u) => this._revokeUrl(u));
		this._previewUrls = [];
		if (this.multiple) this._files = [...this._files, ...filtered];
		else this._files = filtered.slice(0, 1);
		this._previewUrls = this._files.map((f) => {
			if (f.type.startsWith("image/")) return this._getFileUrl(f);
			return "";
		});
		this._dispatchChange();
	}
	_removeFile(index) {
		if (this._previewUrls[index]) this._revokeUrl(this._previewUrls[index]);
		this._previewUrls = this._previewUrls.filter((_, i) => i !== index);
		this._files = this._files.filter((_, i) => i !== index);
		this._dispatchChange();
	}
	_dispatchChange() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: { files: this._files },
			bubbles: true,
			composed: true
		}));
	}
	_formatSize(bytes) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
	_getFileUrl(file) {
		return URL.createObjectURL(file);
	}
	_revokeUrl(url) {
		URL.revokeObjectURL(url);
	}
	async upload() {
		if (this._files.length === 0 || !this.action) return null;
		const formData = new FormData();
		for (const file of this._files) formData.append("files", file);
		const headersObj = {};
		if (this.headers) try {
			Object.assign(headersObj, JSON.parse(this.headers));
		} catch {}
		try {
			const res = await fetch(this.action, {
				method: "POST",
				headers: headersObj,
				body: formData
			});
			this.dispatchEvent(new CustomEvent("upload-complete", {
				detail: {
					response: res,
					ok: res.ok
				},
				bubbles: true,
				composed: true
			}));
			return res;
		} catch (err) {
			this.dispatchEvent(new CustomEvent("upload-error", {
				detail: { error: err },
				bubbles: true,
				composed: true
			}));
			return null;
		}
	}
	get files() {
		return this._files;
	}
	clear() {
		this._previewUrls.forEach((u) => this._revokeUrl(u));
		this._previewUrls = [];
		this._files = [];
		this._dispatchChange();
	}
	render() {
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        part="dropzone"
        class="dropzone ${this._dragover ? "dragover" : ""}"
        @dragover=${(e) => {
			e.preventDefault();
			this._dragover = true;
		}}
        @dragleave=${() => {
			this._dragover = false;
		}}
        @drop=${this._handleDrop}
      >
        <div part="icon" class="icon" aria-hidden="true">📄</div>
        <div part="text" class="text">Arraste arquivos aqui ou clique para selecionar</div>
        <div part="hint" class="hint">${this.accept ? `Formatos: ${this.accept}` : ""}${this.maxSize ? `${this.accept ? " · " : ""}Max: ${this._formatSize(this.maxSize)}` : ""}</div>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${this.accept || nothing}
          @change=${this._handleChange}
          aria-label=${this.label || "Selecionar arquivo"}
        />
      </div>
      ${this._files.length > 0 ? html`
        <div part="files" class="files">
          ${this._files.map((f, i) => html`
            <div part="file-item" class="file-item">
              ${this._previewUrls[i] ? html`<img part="file-preview" class="file-preview" src=${this._previewUrls[i]} alt="">` : nothing}
              <span part="file-name" class="file-name">${f.name}</span>
              <span part="file-size" class="file-size">${this._formatSize(f.size)}</span>
              <button part="remove" class="remove" @click=${() => this._removeFile(i)} aria-label="Remover ${f.name}">&times;</button>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
	}
};
__decorate([property({ type: String })], AuyCompFileInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyCompFileInput.prototype, "multiple", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "accept", void 0);
__decorate([property({ type: Number })], AuyCompFileInput.prototype, "maxSize", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "action", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "headers", void 0);
__decorate([property({ type: Number })], AuyCompFileInput.prototype, "chunkSize", void 0);
__decorate([state()], AuyCompFileInput.prototype, "_files", void 0);
__decorate([state()], AuyCompFileInput.prototype, "_dragover", void 0);
AuyCompFileInput = __decorate([customElement("auy-comp-file-input")], AuyCompFileInput);
//#endregion
//#region src/components/color-input.ts
function hsvToSrgb(H, S, V) {
	H = (H % 360 + 360) % 360;
	S = Math.max(0, Math.min(1, S));
	V = Math.max(0, Math.min(1, V));
	const c = V * S;
	const x = c * (1 - Math.abs(H / 60 % 2 - 1));
	const m = V - c;
	let r, g, b;
	if (H < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (H < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (H < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (H < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (H < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}
	return [
		r + m,
		g + m,
		b + m
	];
}
function srgbToHsv(r, g, b) {
	const mx = Math.max(r, g, b);
	const d = mx - Math.min(r, g, b);
	let H = 0;
	if (d !== 0) {
		if (mx === r) H = ((g - b) / d + 6) % 6;
		else if (mx === g) H = (b - r) / d + 2;
		else H = (r - g) / d + 4;
		H *= 60;
	}
	const S = mx === 0 ? 0 : d / mx;
	return [
		H,
		S,
		mx
	];
}
function hexToSrgb(hex) {
	const m = hex.replace(/^#/, "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
	if (!m) return [
		.23,
		.6,
		.96
	];
	return [
		parseInt(m[1], 16) / 255,
		parseInt(m[2], 16) / 255,
		parseInt(m[3], 16) / 255
	];
}
function hexToHsv(hex) {
	return srgbToHsv(...hexToSrgb(hex));
}
function clamp(v, lo, hi) {
	return Math.max(lo, Math.min(hi, v));
}
function formatHex(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const toH = (c) => Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, "0");
	return `#${toH(r)}${toH(g)}${toH(b)}`.toUpperCase();
}
function formatRgb(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}
function formatHsl(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
	const l = (mx + mn) / 2;
	if (mx === mn) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
	const d = mx - mn;
	const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
	let h = 0;
	if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
	else if (mx === g) h = ((b - r) / d + 2) * 60;
	else h = ((r - g) / d + 4) * 60;
	return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
function formatOklch(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const [rr, gg, bb] = [
		srgbInv(r),
		srgbInv(g),
		srgbInv(b)
	];
	const l = Math.cbrt(.4122214708 * rr + .5363325363 * gg + .0514459929 * bb);
	const m = Math.cbrt(.2119034982 * rr + .6806995451 * gg + .1073969566 * bb);
	const s = Math.cbrt(.0883024619 * rr + .2817188376 * gg + .6299787005 * bb);
	const L = .2104542553 * l + .793617785 * m - .0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s;
	const cb = .0259040371 * l + .7827717662 * m - .808675766 * s;
	const C = Math.sqrt(a * a + cb * cb);
	let hue = Math.atan2(cb, a) * (180 / Math.PI);
	if (hue < 0) hue += 360;
	return `oklch(${(L * 100).toFixed(1)}% ${(C * 100).toFixed(1)} ${hue.toFixed(0)})`;
}
function srgbInv(c) {
	const a = Math.abs(c);
	return a > .04045 ? Math.sign(c) * Math.pow((a + .055) / 1.055, 2.4) : c / 12.92;
}
var AuyCompColorInput = class AuyCompColorInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "#3b82f6";
		this.label = "";
		this.showEyedropper = true;
		this._H = 210;
		this._S = .6;
		this._V = .96;
		this._updatingValue = false;
		this._dragTarget = null;
		this._drawPending = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host { display: block; contain: layout style; }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .picker {
        display: grid;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-lg);
      }

      /* ── Hue ring + SV triangle ── */
      .hsv-wrap {
        position: relative;
        inline-size: 100%;
        aspect-ratio: 1 / 1;
        max-block-size: 260px;
        margin-inline: auto;
        cursor: crosshair;
        touch-action: none;
      }

      .hsv-wrap canvas {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      .hsv-ring-indicator {
        position: absolute;
        pointer-events: none;
        inline-size: 14px; block-size: 14px;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 2;
      }

      .hsv-tri-crosshair {
        position: absolute;
        pointer-events: none;
        inline-size: 12px; block-size: 12px;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 1;
      }

      /* ── Format chips ── */
      .formats { display: flex; flex-wrap: wrap; gap: var(--auy-space-2xs); }

      .format-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: .2em .5em;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-xs);
        border-radius: var(--auy-radius-sm);
        border: 1px solid var(--auy-color-border);
        background: var(--auy-color-surface-alt);
        color: var(--auy-color-text-muted);
        cursor: pointer;
        transition: background var(--auy-transition-fast), border-color var(--auy-transition-fast);
        line-height: 1.5; user-select: none;
        touch-action: manipulation; white-space: nowrap;
      }

      .format-chip:hover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 6%, transparent);
      }

      .format-chip:focus-visible {
        outline: .125rem solid var(--auy-color-primary);
        outline-offset: 1px;
      }

      .format-chip.copied {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      /* ── Eyedropper ── */
      .eyedropper {
        display: inline-flex; align-items: center; justify-content: center;
        inline-size: 2rem; block-size: 2rem;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-sm);
        background: var(--auy-color-surface);
        cursor: pointer; touch-action: manipulation;
        font-size: var(--auy-text-base); line-height: 1;
        transition: background var(--auy-transition-fast);
        flex-shrink: 0;
      }

      .eyedropper:hover { background: var(--auy-color-surface-alt); }
      .eyedropper:focus-visible { outline: .125rem solid var(--auy-color-primary); outline-offset: 2px; }

      .toolbar { display: flex; gap: var(--auy-space-sm); align-items: center; }
      .toolbar .formats { flex: 1; }

      @media (forced-colors: active) { .picker { border: 1px solid ButtonText; } }
      @media (prefers-reduced-motion: reduce) { .hsv-ring-indicator, .hsv-tri-crosshair { transition: none; } }
    }
  `;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	willUpdate(changed) {
		if (changed.has("value") && !this._updatingValue) {
			if (/^#[0-9a-f]{6}$/i.test(this.value)) {
				const [H, S, V] = hexToHsv(this.value);
				this._H = H;
				this._S = S;
				this._V = V;
				this._scheduleRender();
			}
		}
	}
	firstUpdated() {
		this._draw();
	}
	updated(changed) {
		if (changed.has("_H") || changed.has("_S") || changed.has("_V")) {
			this._draw();
			this._syncValue();
		}
	}
	_syncValue() {
		if (this._updatingValue) return;
		this._updatingValue = true;
		const hex = formatHex(this._H, this._S, this._V);
		this.value = hex;
		this._updatingValue = false;
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				value: hex,
				hsv: {
					H: this._H,
					S: this._S,
					V: this._V
				}
			},
			bubbles: true,
			composed: true
		}));
	}
	_scheduleRender() {
		if (this._drawPending) return;
		this._drawPending = true;
		requestAnimationFrame(() => {
			this._drawPending = false;
			this._draw();
		});
	}
	_draw() {
		const cvs = this._canvas;
		if (!cvs?.parentElement) return;
		const rect = cvs.parentElement.getBoundingClientRect();
		const dpr = devicePixelRatio || 1;
		const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
		if (!w || !h) return;
		cvs.width = w;
		cvs.height = h;
		const ctx = cvs.getContext("2d");
		if (!ctx) return;
		const cx = w / 2, cy = h / 2;
		const half = Math.min(cx, cy);
		const rOuter = half * .96;
		const rInner = half * .7;
		const ri = rInner - 1;
		const triTop = [cx, cy - ri * .82];
		const triLeft = [cx - ri * .72, cy + ri * .48];
		const triRight = [cx + ri * .72, cy + ri * .48];
		const triDenom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
		const curH = this._H;
		const img = ctx.createImageData(w, h);
		const d = img.data;
		for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
			const dx = x - cx, dy = y - cy;
			const dist = Math.sqrt(dx * dx + dy * dy);
			let r = 0, g = 0, b = 0, a = 0;
			if (dist >= rInner && dist <= rOuter) {
				const H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
				[r, g, b] = hsvToSrgb(H, 1, 1);
				a = 255;
			}
			if (dist < rInner) {
				const w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / triDenom;
				const w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / triDenom;
				const w2 = 1 - w0 - w1;
				if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
					const S = w1 + w2;
					const V = w0 + w2;
					[r, g, b] = hsvToSrgb(curH, clamp(S, 0, 1), clamp(V, 0, 1));
					a = 255;
				}
			}
			const i = (y * w + x) * 4;
			d[i] = clamp(r * 255, 0, 255);
			d[i + 1] = clamp(g * 255, 0, 255);
			d[i + 2] = clamp(b * 255, 0, 255);
			d[i + 3] = a;
		}
		ctx.clearRect(0, 0, w, h);
		const off = document.createElement("canvas");
		off.width = w;
		off.height = h;
		off.getContext("2d").putImageData(img, 0, 0);
		ctx.save();
		ctx.beginPath();
		ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
		ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(off, 0, 0);
		ctx.restore();
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(triTop[0], triTop[1]);
		ctx.lineTo(triLeft[0], triLeft[1]);
		ctx.lineTo(triRight[0], triRight[1]);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(off, 0, 0);
		ctx.restore();
		cvs.style.inlineSize = `${rect.width}px`;
		cvs.style.blockSize = `${rect.height}px`;
	}
	_pt(e) {
		return "touches" in e ? e.touches[0] : e;
	}
	_onDown(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const cx = rect.width / 2, cy = rect.height / 2;
		const dx = pt.clientX - rect.left - cx, dy = pt.clientY - rect.top - cy;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const half = Math.min(cx, cy);
		const rInner = half * .7;
		const rOuter = half * .96;
		if (dist >= rInner && dist <= rOuter) {
			this._dragTarget = "ring";
			this._updateRing(e);
		} else if (dist < rInner) {
			this._dragTarget = "tri";
			this._updateTri(e);
		} else this._dragTarget = null;
	}
	_onMove(e) {
		if (this._dragTarget === "ring") this._updateRing(e);
		else if (this._dragTarget === "tri") this._updateTri(e);
	}
	_updateRing(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const cx = rect.width / 2, cy = rect.height / 2;
		const dx = pt.clientX - rect.left - cx, dy = pt.clientY - rect.top - cy;
		this._H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
	}
	_updateTri(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const x = pt.clientX - rect.left, y = pt.clientY - rect.top;
		const w = rect.width, h = rect.height;
		const cx = w / 2, cy = h / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const triTop = [cx, cy - ri * .82];
		const triLeft = [cx - ri * .72, cy + ri * .48];
		const triRight = [cx + ri * .72, cy + ri * .48];
		const denom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
		let w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / denom;
		let w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / denom;
		let w2 = 1 - w0 - w1;
		w0 = clamp(w0, 0, 1);
		w1 = clamp(w1, 0, 1);
		w2 = clamp(w2, 0, 1);
		const sum = w0 + w1 + w2;
		if (sum <= 0) return;
		w0 /= sum;
		w1 /= sum;
		w2 /= sum;
		this._S = clamp(w1 + w2, 0, 1);
		this._V = clamp(w0 + w2, 0, 1);
		if (this._S === 0) this._H = 0;
	}
	_onDragEnd() {
		this._dragTarget = null;
	}
	_ringIndicatorX() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const half = Math.min(rect.width, rect.height) / 2;
		const r = (half * .96 + half * .7) / 2;
		const cx = rect.width / 2;
		const rad = this._H * Math.PI / 180;
		return (cx + r * Math.cos(rad)) / rect.width * 100;
	}
	_ringIndicatorY() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const half = Math.min(rect.width, rect.height) / 2;
		const r = (half * .96 + half * .7) / 2;
		const cy = rect.height / 2;
		const rad = this._H * Math.PI / 180;
		return (cy + r * Math.sin(rad)) / rect.height * 100;
	}
	_triCrosshairX() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const cx = rect.width / 2, cy = rect.height / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const S = this._S, V = this._V;
		let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
		const sum = w0 + w1 + w2;
		if (sum <= 0) {
			w0 = 1 / 3;
			w1 = 1 / 3;
			w2 = 1 / 3;
		} else {
			w0 /= sum;
			w1 /= sum;
			w2 /= sum;
		}
		return (w0 * cx + w1 * (cx - ri * .72) + w2 * (cx + ri * .72)) / rect.width * 100;
	}
	_triCrosshairY() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const cx = rect.width / 2, cy = rect.height / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const S = this._S, V = this._V;
		let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
		const sum = w0 + w1 + w2;
		if (sum <= 0) {
			w0 = 1 / 3;
			w1 = 1 / 3;
			w2 = 1 / 3;
		} else {
			w0 /= sum;
			w1 /= sum;
			w2 /= sum;
		}
		return (w0 * (cy - ri * .82) + w1 * (cy + ri * .48) + w2 * (cy + ri * .48)) / rect.height * 100;
	}
	_fmt(f) {
		switch (f) {
			case "hex": return formatHex(this._H, this._S, this._V);
			case "rgb": return formatRgb(this._H, this._S, this._V);
			case "hsl": return formatHsl(this._H, this._S, this._V);
			case "oklch": return formatOklch(this._H, this._S, this._V);
		}
	}
	async _copy(f, e) {
		try {
			await navigator.clipboard.writeText(this._fmt(f));
		} catch {}
		e.currentTarget.focus();
		this.dispatchEvent(new CustomEvent("copy-" + f, {
			bubbles: true,
			composed: true
		}));
	}
	async _pickEyedropper() {
		if (!("EyeDropper" in window)) return;
		try {
			const r = await new window.EyeDropper().open();
			if (r?.sRGBHex) {
				const [H, S, V] = hexToHsv(r.sRGBHex);
				this._H = H;
				this._S = S;
				this._V = V;
				this._scheduleRender();
			}
		} catch {}
	}
	render() {
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div part="picker" class="picker">
        <div class="hsv-wrap"
          @mousedown=${this._onDown} @mousemove=${this._onMove}
          @mouseup=${this._onDragEnd} @mouseleave=${this._onDragEnd}
          @touchstart=${this._onDown} @touchmove=${this._onMove}
          @touchend=${this._onDragEnd}
        >
          <canvas></canvas>
          <div class="hsv-ring-indicator"
            style="inset-inline-start:${this._ringIndicatorX()}%;inset-block-start:${this._ringIndicatorY()}%;">
          </div>
          <div class="hsv-tri-crosshair"
            style="inset-inline-start:${this._triCrosshairX()}%;inset-block-start:${this._triCrosshairY()}%;">
          </div>
        </div>

        <div class="toolbar">
          <div class="formats">
            ${[
			"hex",
			"rgb",
			"hsl",
			"oklch"
		].map((f) => html`
              <span class="format-chip" @click=${(e) => this._copy(f, e)} role="button" tabindex="0" aria-label="Copiar ${f.toUpperCase()}" title="Clique para copiar">
                <span style="font-weight:600;color:var(--auy-color-text);">${f.toUpperCase()}</span>
                ${this._fmt(f)}
              </span>
            `)}
          </div>
          ${this.showEyedropper && "EyeDropper" in window ? html`
            <button class="eyedropper" @click=${this._pickEyedropper} aria-label="Pipeta" title="Selecionar cor da tela">💉</button>
          ` : nothing}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompColorInput.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompColorInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyCompColorInput.prototype, "showEyedropper", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_H", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_S", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_V", void 0);
__decorate([query(".hsv-wrap canvas")], AuyCompColorInput.prototype, "_canvas", void 0);
AuyCompColorInput = __decorate([customElement("auy-comp-color-input")], AuyCompColorInput);
//#endregion
//#region src/components/format.ts
/**
* Formats a date using Intl.DateTimeFormat.
*
* @example formatDate('2024-03-15') // "15/03/2024"
* @example formatDate(new Date(), 'en-US') // "3/15/2024"
*/
function formatDate(date, locale = "pt-BR") {
	if (!date) return "";
	try {
		return new Intl.DateTimeFormat(locale).format(new Date(date));
	} catch {
		return "";
	}
}
/**
* Formats a number as currency using Intl.NumberFormat.
*
* @example formatCurrency(1500.5) // "R$ 1.500,50"
* @example formatCurrency(99.99, 'USD', 'en-US') // "$99.99"
*/
function formatCurrency(value, currency = "BRL", locale = "pt-BR") {
	if (typeof value !== "number" || isNaN(value)) return "";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency
	}).format(value);
}
/**
* Formats a number with thousand separators using Intl.NumberFormat.
*
* @example formatNumber(1234567.89) // "1.234.567,89"
* @example formatNumber(1000000, 'en-US') // "1,000,000"
*/
function formatNumber(value, locale = "pt-BR") {
	if (typeof value !== "number" || isNaN(value)) return "";
	return new Intl.NumberFormat(locale).format(value);
}
var RELATIVE_UNITS = [
	{
		unit: "year",
		ms: 31536e6
	},
	{
		unit: "month",
		ms: 2592e6
	},
	{
		unit: "week",
		ms: 6048e5
	},
	{
		unit: "day",
		ms: 864e5
	},
	{
		unit: "hour",
		ms: 36e5
	},
	{
		unit: "minute",
		ms: 6e4
	},
	{
		unit: "second",
		ms: 1e3
	}
];
/**
* Formats a date as a human-readable relative time string.
*
* @example formatRelativeTime(Date.now() - 300000) // "há 5 minutos"
* @example formatRelativeTime(Date.now() + 7200000, 'en') // "in 2 hours"
*/
function formatRelativeTime(date, locale = "pt-BR") {
	if (!date) return "";
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const elapsed = new Date(date).getTime() - Date.now();
	for (const { unit, ms } of RELATIVE_UNITS) {
		const diff = Math.round(elapsed / ms);
		if (Math.abs(diff) >= 1) return rtf.format(diff, unit);
	}
	return rtf.format(0, "second");
}
/**
* Returns the singular or plural form of a word based on count.
*
* @example pluralize(1, 'item') // "item"
* @example pluralize(3, 'item') // "itens"
* @example pluralize(0, 'pessoa', 'pessoas') // "pessoas"
*/
function pluralize(count, singular, plural) {
	return count === 1 ? singular : plural ?? singular + "s";
}
/**
* Truncates a string to a maximum length without breaking words.
*
* @example truncate('Hello world', 8) // "Hello..."
* @example truncate('Hello world', 10, ' [..]') // "Hello [..]"
*/
function truncate(str, maxLength, suffix = "...") {
	if (str.length <= maxLength) return str;
	if (maxLength <= suffix.length) return str.slice(0, maxLength);
	const truncated = str.slice(0, maxLength - suffix.length);
	const lastSpace = truncated.lastIndexOf(" ");
	return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + suffix;
}
/**
* Converts a string to a URL-friendly slug.
*
* @example slugify('Olá Mundo!') // "ola-mundo"
* @example slugify('Ação & Reação') // "acao-reacao"
*/
function slugify(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "");
}
/**
* Strips all non-digit characters from a string.
*
* @example stripMask('123.456.789-00') // "12345678900"
*/
function stripMask(value) {
	return value.replace(/\D/g, "");
}
/**
* Formats a string as a Brazilian CPF (XXX.XXX.XXX-XX).
*
* @example maskCPF('12345678900') // "123.456.789-00"
* @example maskCPF('123.456.789-00') // "123.456.789-00"
*/
function maskCPF(value) {
	const digits = stripMask(value).slice(0, 11);
	if (digits.length !== 11) return value;
	return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
/**
* Formats a string as a Brazilian CNPJ (XX.XXX.XXX/XXXX-XX).
*
* @example maskCNPJ('11222333000181') // "11.222.333/0001-81"
*/
function maskCNPJ(value) {
	const digits = stripMask(value).slice(0, 14);
	if (digits.length !== 14) return value;
	return digits.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}
/**
* Formats a string as a Brazilian phone number.
*
* @example maskPhone('11987654321') // "(11) 98765-4321"
* @example maskPhone('1133334444')  // "(11) 3333-4444"
*/
function maskPhone(value) {
	const digits = stripMask(value).slice(0, 11);
	if (digits.length < 10) return value;
	if (digits.length <= 10) return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
	return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}
/**
* Capitalizes the first letter of each word in a string.
*
* @example capitalize('hello world') // "Hello World"
* @example capitalize('OLÁ MUNDO')   // "Olá Mundo"
*/
function capitalize(str) {
	return str.toLowerCase().replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}
//#endregion
//#region src/components/_internal/icons.ts
/** Collection of SVG icons for use throughout the application. */
var ICONS = {
	chevronDown: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para baixo</title><path d=\"M6 9l6 6 6-6\"/></svg>",
	chevronUp: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para cima</title><path d=\"M18 15l-6-6-6 6\"/></svg>",
	chevronLeft: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para esquerda</title><path d=\"M15 18l-6-6 6-6\"/></svg>",
	chevronRight: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para direita</title><path d=\"M9 18l6-6-6-6\"/></svg>",
	menu: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Menu</title><path d=\"M3 12h18M3 6h18M3 18h18\"/></svg>",
	close: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Fechar</title><path d=\"M18 6L6 18M6 6l12 12\"/></svg>",
	plus: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Adicionar</title><path d=\"M12 5v14M5 12h14\"/></svg>",
	minus: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Subtrair</title><path d=\"M5 12h14\"/></svg>",
	search: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Pesquisar</title><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"M21 21l-4.35-4.35\"/></svg>",
	home: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Início</title><path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>",
	settings: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Configurações</title><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z\"/></svg>",
	user: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Usuário</title><path d=\"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>",
	edit: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Editar</title><path d=\"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>",
	trash: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Excluir</title><polyline points=\"3 6 5 6 21 6\"/><path d=\"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2\"/><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"/><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"/></svg>",
	save: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Salvar</title><path d=\"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z\"/><polyline points=\"17 21 17 13 7 13 7 21\"/><polyline points=\"7 3 7 8 15 8\"/></svg>",
	download: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Baixar</title><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>",
	upload: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Enviar</title><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"/></svg>",
	refresh: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Atualizar</title><polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15\"/></svg>",
	check: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Confirmar</title><polyline points=\"20 6 9 17 4 12\"/></svg>",
	alert: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Alerta</title><path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
	info: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Informação</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/></svg>",
	error: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Erro</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"/><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"/></svg>",
	warning: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Aviso</title><path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
	success: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Sucesso</title><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>",
	externalLink: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Link externo</title><path d=\"M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6\"/><polyline points=\"15 3 21 3 21 9\"/><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"/></svg>",
	eye: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Olho</title><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>",
	eyeOff: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Olho oculto</title><path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24\"/><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/></svg>",
	filter: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Filtrar</title><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/></svg>",
	sort: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Ordenar</title><path d=\"M11 5h10M11 9h7M11 13h4\"/><polyline points=\"3 5 6 2 9 5\"/><polyline points=\"3 11 6 14 9 11\"/><path d=\"M7 2v8\"/><path d=\"M7 14v8\"/></svg>",
	moreVertical: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Mais opções</title><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></svg>",
	calendar: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Calendário</title><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>",
	clock: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Relógio</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>",
	file: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Arquivo</title><path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/><polyline points=\"10 9 9 9 8 9\"/></svg>",
	image: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Imagem</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>",
	table: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Tabela</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"3\" y1=\"15\" x2=\"21\" y2=\"15\"/><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"/><line x1=\"15\" y1=\"3\" x2=\"15\" y2=\"21\"/></svg>",
	fontSize: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Tamanho da fonte</title><polyline points=\"4 7 4 4 20 4 20 7\"/><polyline points=\"9 20 12 4 15 20\"/><line x1=\"7\" y1=\"16\" x2=\"17\" y2=\"16\"/></svg>",
	contrast: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Contraste</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a10 10 0 010 20V2z\"/></svg>"
};
ICONS.chevronDown;
ICONS.chevronUp;
ICONS.chevronLeft;
ICONS.chevronRight;
ICONS.menu;
ICONS.close;
ICONS.plus;
ICONS.minus;
ICONS.search;
ICONS.home;
ICONS.settings;
ICONS.user;
ICONS.edit;
ICONS.trash;
ICONS.save;
ICONS.download;
ICONS.upload;
ICONS.refresh;
ICONS.check;
ICONS.alert;
ICONS.info;
ICONS.error;
ICONS.warning;
ICONS.success;
ICONS.externalLink;
ICONS.eye;
ICONS.eyeOff;
ICONS.filter;
ICONS.sort;
ICONS.moreVertical;
ICONS.calendar;
ICONS.clock;
ICONS.file;
ICONS.image;
ICONS.table;
ICONS.fontSize;
ICONS.contrast;
svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Informação</title><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Sucesso</title><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Aviso</title><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Erro</title><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
//#endregion
export { AuyCompAudio as C, AuyCompTabs as S, AuyCompSearch as _, formatNumber as a, AuyCompToastContainer as b, maskCPF as c, slugify as d, stripMask as f, AuyCompMetadata as g, AuyCompFileInput as h, formatDate as i, maskPhone as l, AuyCompColorInput as m, capitalize as n, formatRelativeTime as o, truncate as p, formatCurrency as r, maskCNPJ as s, ICONS as t, pluralize as u, AuyCompCodeEditor as v, AuyCompToast as x, AuyCompPagination as y };
