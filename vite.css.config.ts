import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
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
    },
  },

  build: {
    target: 'baseline-widely-available',
    outDir: 'dist',
    cssMinify: 'lightningcss',
    minify: false,
    sourcemap: false,
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/styling/auy-ui.css'),
      name: 'AuyUICSS',
      formats: ['es'],
      fileName: 'auy-ui',
    },
  },
})
