import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'react', 'react-dom', 'react-router-dom'],
  },
});