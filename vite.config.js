import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves from /portfolio/; dev server stays at /
  // DEPLOY_BASE=/ for full-domain hosting (e.g. Tailscale funnel)
  base: process.env.DEPLOY_BASE ?? (command === 'build' ? '/portfolio/' : '/'),
  plugins: [react(), tailwindcss()],
  server: {
    // allow previews through Tailscale serve
    allowedHosts: ['desktop-avdncu6.tail624501.ts.net'],
  },
}))
