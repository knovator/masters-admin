import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupReplace from '@rollup/plugin-replace'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  }
});
