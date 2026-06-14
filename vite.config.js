import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { readFileSync } from 'fs'

// Single source of truth for the app version: package.json
const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Build-time constants — exposed to the app so the version badge always
  // reflects the current release and the moment the bundle was built.
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // El hero 3D (Three.js) ya va en su propio chunk async; subimos el umbral
    // del aviso para no marcarlo como falso positivo.
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        // Separa los vendors pesados en chunks propios: cachean de forma
        // independiente entre despliegues y aligeran el bundle de entrada.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/](three|postprocessing|@react-three)[\\/]/.test(id)) return 'three'
          if (/[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
          if (/[\\/]@stripe[\\/]/.test(id)) return 'stripe'
          if (/[\\/]@radix-ui[\\/]/.test(id)) return 'radix'
          if (/[\\/]@tanstack[\\/]/.test(id)) return 'query'
          if (/[\\/]react-router/.test(id)) return 'router'
        },
      },
    },
  },
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5174,
    strictPort: false,
    allowedHosts: 'all'
  }
})
