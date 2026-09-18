import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: ['defaults', 'iOS >= 12', 'Chrome >= 63', 'Safari >= 12'],
    }),
  ],
})
