import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',

  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.json'],
  },

  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 111,
        firefox: 114,
        safari: 16,
        ios: 16,
        edge: 111,
      },
      drafts: { nesting: true },
      unusedSymbols: [],
    },
    devSourcemap: false,
  },

  build: {
    target: 'baseline-widely-available',
    outDir: 'dist',
    assetsDir: 'assets',
    cssMinify: 'lightningcss',
    minify: false,
    sourcemap: false,
    reportCompressedSize: false,
    emptyOutDir: true,
    copyPublicDir: false,
    chunkSizeWarningLimit: 300,

    lib: {
      entry: resolve(__dirname, 'src/mod.ts'),
      name: 'AuyUI',
      formats: ['es'],
      fileName: 'mod',
    },

    rolldownOptions: {
      external: [/^lit/, /^@lit-labs/],
      output: {
        chunkFileNames: 'chunks/[name].[hash].js',
      },
    },
  },

  server: {
    port: 5173,
    open: false,
    warmup: {
      clientFiles: ['./src/index.html', './src/mod.ts'],
    },
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
  },

  optimizeDeps: {
    holdUntilCrawlEnd: false,
  },
})
