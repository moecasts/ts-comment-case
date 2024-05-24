import { join } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
});
