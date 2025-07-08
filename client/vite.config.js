import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change from empty string to root
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})