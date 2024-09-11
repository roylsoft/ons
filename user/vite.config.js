 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react'

 // https://vitejs.dev/config/
 export default defineConfig({
   plugins: [react()],
   server:{
     host:true
   },
   build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          } else if (id.includes('/src/components/')) {
            return 'components';
          }
        }
      }
    }
  }
 })