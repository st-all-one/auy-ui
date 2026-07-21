{{--
Componentes auy-ui integrados ao Laravel Blade.
Uso de Vite, dados server-side e layout administrativo completo.
--}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta http-equiv="Accept-CH" content="Sec-CH-Prefers-Reduced-Motion, Sec-CH-Prefers-Color-Scheme, Save-Data">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>@yield('title', 'Painel Administrativo') — {{ config('app.name') }}</title>

  @vite(['resources/js/app.js'])

  <style>
    :root {
      --auy-color-primary: oklch(50% 0.2 250);
      --auy-color-primary-hover: oklch(45% 0.2 250);
      --auy-color-surface: oklch(98% 0.005 260);
      --auy-color-text: oklch(20% 0.03 260);
      --auy-color-text-muted: oklch(45% 0.03 260);
      --auy-color-border: oklch(0% 0 0 / 0.1);
      --auy-color-success: oklch(55% 0.2 145);
      --auy-color-error: oklch(55% 0.22 30);
      --auy-color-warning: oklch(65% 0.2 85);
      --auy-color-info: oklch(50% 0.2 250);
      --auy-color-overlay: oklch(0% 0 0 / 0.4);
      --auy-radius-sm: 4px;
      --auy-radius-md: 8px;
      --auy-radius-lg: 12px;
      --auy-space-xs: 4px;
      --auy-space-sm: 8px;
      --auy-space-md: 16px;
      --auy-space-lg: 24px;
      --auy-space-xl: 40px;
      --auy-shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.06);
      --auy-shadow-md: 0 2px 8px oklch(0% 0 0 / 0.1);
      --auy-shadow-lg: 0 4px 24px oklch(0% 0 0 / 0.12);
      --auy-transition-fast: 150ms ease;
      --auy-transition-base: 200ms ease;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --auy-color-surface: oklch(15% 0.02 260);
        --auy-color-text: oklch(90% 0.01 260);
        --auy-color-text-muted: oklch(60% 0.02 260);
        --auy-color-border: oklch(100% 0 0 / 0.12);
        --auy-color-primary: oklch(60% 0.2 250);
        --auy-color-primary-hover: oklch(65% 0.2 250);
        --auy-color-overlay: oklch(0% 0 0 / 0.6);
      }
    }

    body {
      margin: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: var(--auy-color-surface);
      color: var(--auy-color-text);
      line-height: 1.6;
    }

    .page-header-actions {
      display: flex;
      gap: var(--auy-space-sm);
      align-items: center;
    }

    .content-section {
      padding: var(--auy-space-lg);
    }

    .content-section h2 {
      font-size: var(--auy-text-lg, 1.125rem);
      font-weight: 600;
      margin: 0 0 var(--auy-space-md);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--auy-space-md);
      margin-bottom: var(--auy-space-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--auy-space-xs);
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--auy-color-text);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: var(--auy-space-sm) var(--auy-space-md);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      background: var(--auy-color-surface);
      color: var(--auy-color-text);
      font-family: inherit;
      font-size: 0.875rem;
      transition: border-color var(--auy-transition-fast);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: 2px solid var(--auy-color-primary);
      outline-offset: -1px;
      border-color: transparent;
    }

    .form-group .error {
      font-size: 0.8rem;
      color: var(--auy-color-error);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--auy-space-md);
    }

    .form-actions {
      display: flex;
      gap: var(--auy-space-sm);
      justify-content: flex-end;
      padding-top: var(--auy-space-md);
      border-top: 1px solid var(--auy-color-border);
      margin-top: var(--auy-space-md);
    }

    .table-container {
      overflow-x: auto;
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
    }

    .table-container table {
      width: 100%;
      border-collapse: collapse;
    }

    .table-container th {
      padding: var(--auy-space-sm) var(--auy-space-md);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--auy-color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: left;
      background: var(--auy-color-surface);
      border-bottom: 2px solid var(--auy-color-border);
    }

    .table-container td {
      padding: var(--auy-space-sm) var(--auy-space-md);
      font-size: 0.875rem;
      border-bottom: 1px solid var(--auy-color-border);
    }

    .table-container tbody tr:hover {
      background: color-mix(in srgb, var(--auy-color-primary) 5%, transparent);
    }

    .toast-container {
      position: fixed;
      top: var(--auy-space-md);
      right: var(--auy-space-md);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: var(--auy-space-sm);
      width: 360px;
      max-width: calc(100vw - var(--auy-space-lg));
    }
  </style>

  @stack('styles')
</head>
<body>

  <auy-admin-layout theme="{{ $theme ?? 'light' }}" sidebar-width="280px" header-height="auto">

    <auy-admin-header slot="header" page-title="{{ $pageTitle ?? 'Dashboard' }}" sticky>
      <span slot="logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </span>
      <nav slot="nav" aria-label="Navegação principal">
        <auy-comp-button variant="ghost" size="sm">{{ __('Dashboard') }}</auy-comp-button>
        <auy-comp-button variant="ghost" size="sm">{{ __('Pedidos') }}</auy-comp-button>
        <auy-comp-button variant="ghost" size="sm">{{ __('Clientes') }}</auy-comp-button>
        <auy-comp-button variant="ghost" size="sm">{{ __('Relatórios') }}</auy-comp-button>
      </nav>
      <div slot="search">
        <input type="search" placeholder="{{ __('Pesquisar...') }}" aria-label="{{ __('Pesquisar no sistema') }}" style="padding:6px 12px;border:1px solid var(--auy-color-border);border-radius:var(--auy-radius-md);background:var(--auy-color-surface);color:var(--auy-color-text);font-size:0.875rem;font-family:inherit;">
      </div>
      <div slot="actions">
        <auy-comp-tooltip text="{{ __('Notificações') }}">
          <auy-comp-button variant="ghost" size="sm" aria-label="{{ __('Notificações') }}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </auy-comp-button>
        </auy-comp-tooltip>
        <auy-comp-tooltip text="{{ auth()->user()->name ?? 'Usuário' }}">
          <auy-comp-button variant="ghost" size="sm" aria-label="{{ __('Perfil') }}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </auy-comp-button>
        </auy-comp-tooltip>
      </div>
    </auy-admin-header>

    <auy-admin-sidebar slot="sidebar" app-title="{{ config('app.name') }}" aria-label="{{ __('Navegação lateral') }}" items='@json($sidebarItems ?? [])'>
    </auy-admin-sidebar>

    <auy-admin-main-section slot="main" id="main-content" header="@yield('title', 'Dashboard')" columns="@yield('columns', 'single')" role="main">

      <div slot="header-actions" class="page-header-actions">
        @hasSection('header-actions')
          @yield('header-actions')
        @else
          <auy-comp-button variant="secondary" size="sm" id="btnRefresh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right:4px"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            {{ __('Atualizar') }}
          </auy-comp-button>
          <auy-comp-button variant="primary" size="sm" id="btnNew">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right:4px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {{ __('Novo') }}
          </auy-comp-button>
        @endif
      </div>

      @yield('content')

    </auy-admin-main-section>

    <auy-admin-footer slot="footer" copyright="© {{ date('Y') }} {{ config('app.name') }}. Todos os direitos reservados." :year="(int) date('Y')" columns="3">
      <div slot="nav" style="font-size:0.875rem;">
        <strong style="display:block;margin-bottom:0.5rem;">{{ __('Links') }}</strong>
        <a href="{{ route('home') }}" style="display:block;color:var(--auy-color-text-muted);text-decoration:none;padding:2px 0;">{{ __('Início') }}</a>
        <a href="{{ route('terms') }}" style="display:block;color:var(--auy-color-text-muted);text-decoration:none;padding:2px 0;">{{ __('Termos') }}</a>
        <a href="{{ route('privacy') }}" style="display:block;color:var(--auy-color-text-muted);text-decoration:none;padding:2px 0;">{{ __('Privacidade') }}</a>
      </div>
      <div slot="contact" style="font-size:0.875rem;">
        <strong style="display:block;margin-bottom:0.5rem;">{{ __('Contato') }}</strong>
        <span style="display:block;color:var(--auy-color-text-muted);padding:2px 0;">{{ config('mail.from.address') }}</span>
        <span style="display:block;color:var(--auy-color-text-muted);padding:2px 0;">{{ config('app.url') }}</span>
      </div>
      <div slot="metadata" style="font-size:0.875rem;">
        <strong style="display:block;margin-bottom:0.5rem;">{{ __('Sistema') }}</strong>
        <span style="display:block;color:var(--auy-color-text-muted);padding:2px 0;">v{{ config('app.version', '1.0.0') }}</span>
        <span style="display:block;color:var(--auy-color-text-muted);padding:2px 0;">PHP {{ PHP_VERSION }}</span>
      </div>
    </auy-admin-footer>

  </auy-admin-layout>

  <div class="toast-container" aria-live="polite" aria-atomic="true">
    @if(session('success'))
      <auy-comp-toast variant="success" open dismissible>
        <span slot="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </span>
        {{ session('success') }}
      </auy-comp-toast>
    @endif
    @if(session('error'))
      <auy-comp-toast variant="error" open dismissible>
        <span slot="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
        </span>
        {{ session('error') }}
      </auy-comp-toast>
    @endif
  </div>

  <script>
    document.getElementById('btnRefresh')?.addEventListener('click', () => window.location.reload());
    document.getElementById('btnNew')?.addEventListener('click', () => {
      window.location.href = '{{ $createRoute ?? "#" }}';
    });
  </script>

  @stack('scripts')
</body>
</html>
