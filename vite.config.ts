import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  build: {
    lib: {
      entry: 'src/plugin.ts',
      // name: 'MyLib',
      // fileName: (format) => `plugin.${format}.js`,
      fileName: 'index',
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      output: {
        format: 'system',
      },
      external: [
        'react',
        'react-dom',
        '@builder.io/react',
        '@builder.io/app-context',
        '@builder.io/commerce-plugin-tools/dist/types/interfaces/resource',
      ],
    },
  },
});
