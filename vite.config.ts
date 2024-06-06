import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/plugin.ts',
      // name: 'MyLib',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
  }
})
