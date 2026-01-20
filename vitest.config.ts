// vitest.config.ts
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: [
          'src/**/*.{js,ts,vue}',
        ],
        exclude: [
          'src/main.ts',
          'src/env.d.ts',
          'src/**/*.d.ts',
          'src/types/**',
        ],
        all: true,
        thresholds: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        },
      },
    },
  }),
);
