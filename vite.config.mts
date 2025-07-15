import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: {
      'components': '/app/javascript/components',
      'modules': '/app/javascript/modules',
      'hooks': '/app/javascript/hooks',
    },
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      treeshake: false,
    },
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react_ujs'],
  },
})
