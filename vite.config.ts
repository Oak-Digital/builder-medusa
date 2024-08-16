import { defineConfig } from 'vite'
import replace from 'rollup-plugin-replace';
import react from '@vitejs/plugin-react'
import externalize from 'vite-plugin-externalize-dependencies';

const external = [
  // 'react',
  // 'react-dom',
  // '@builder.io/react',
  '@builder.io/app-context',
  // '@builder.io/commerce-plugin-tools/dist/types/interfaces/resource',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    externalize({ externals: external }),
  ],
  build: {
    lib: {
      entry: 'src/plugin.ts',
      name: 'BuilderPluginMedusa',
      // fileName: (format) => `plugin.${format}.js`,
      fileName: 'index',
      formats: ['cjs', 'es', 'iife', 'umd'],
    },
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: {
        format: 'system',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@builder.io/app-context': 'appState',
        },
      },
      external,
      // external: {
      //   react: 'React',
      //   'react-dom': 'ReactDOM',
      //   '@builder.io/app-context': 'appState',
      // },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
      ],
    },
  },
});
