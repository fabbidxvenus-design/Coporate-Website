import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/tests/e2e/**',
      '**/tests/audit/**',
      '**/tests/about-*.spec.ts',
      '**/tests/about-*.spec.ts',
      '**/tests/modal-overlap.spec.ts',
      '**/tests/qc-*.spec.ts',
      '**/tests/dd04-red-gate.spec.ts',
      '**/tests/footer-red-gate.spec.ts',
      '**/tests/footer-verification.spec.ts',
      '**/tests/visual-parity-*.spec.ts',
      '**/tests/i18n/**',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})