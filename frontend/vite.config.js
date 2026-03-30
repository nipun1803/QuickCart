import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
        usePolling: true,
    },
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@testing-library/jest-dom": path.resolve(__dirname, "./node_modules/@testing-library/jest-dom"),
      "@testing-library/react": path.resolve(__dirname, "./node_modules/@testing-library/react"),
      "vitest": path.resolve(__dirname, "./node_modules/vitest"),
    },
  },
})

