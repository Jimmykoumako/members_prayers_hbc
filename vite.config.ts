import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import mdx from '@mdx-js/rollup'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  base: '/', // for GitHub Pages
  build:{
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

})
