import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Apex custom domain (britt.gg) → root base.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
