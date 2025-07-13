// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/',  // Change from empty string to root
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://localhost:5000',
      '/admin': 'http://localhost:5000',
    }
  }
})
