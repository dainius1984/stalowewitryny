import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to make CSS non-render-blocking
function asyncCssPlugin() {
  return {
    name: 'async-css',
    transformIndexHtml(html: string) {
      // Convert CSS link to non-blocking load
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        (match, href) => `
    <!-- Preload CSS for faster discovery -->
    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <!-- Async CSS loading (non-render-blocking) -->
    <link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">
    <!-- Fallback for no-JS -->
    <noscript><link rel="stylesheet" href="${href}"></noscript>`
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimize CSS
    cssCodeSplit: false, // Single CSS file = fewer HTTP requests
    minify: 'esbuild', // Fast minification
    
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    
    // Performance
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, // Faster builds
  },
})
