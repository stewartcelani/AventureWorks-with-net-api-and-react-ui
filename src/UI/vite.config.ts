import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    nodePolyfills({ include: ['http','https','url','buffer','process']})
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@errors': path.resolve(__dirname, './src/errors'),
      '@customTypes': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      "@stores": path.resolve(__dirname, './src/stores'),
      "@features": path.resolve(__dirname, './src/features'),
      "@providers": path.resolve(__dirname, './src/providers'),
    },
  },
})
