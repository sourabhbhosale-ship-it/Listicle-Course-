import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: This base path must match your GitHub repository name exactly for deployment to work
  base: '/Listicle-Course-/',
  define: {
    // Prevents "process is not defined" crashes in browser environments
    'process.env': {} 
  }
})