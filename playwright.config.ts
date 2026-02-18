/* eslint-disable node/no-process-env */
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

/**
 * Determine which projects to run based on the E2E_PROJECT env var.
 *
 *   E2E_PROJECT=desktop  → Desktop Chrome only (used on PR CI)
 *   E2E_PROJECT=mobile   → Mobile iPhone 13 only (used on main CI, non-blocking)
 *   E2E_PROJECT=all      → Both projects (used in nightly)
 *   (unset / dev)        → Both projects (local development)
 */
const projectFilter = (process.env.E2E_PROJECT ?? 'all').toLowerCase();

const desktopProject = {
  name: 'Desktop Chrome',
  use: {
    ...devices['Desktop Chrome'],
  },
};

const mobileProject = {
  name: 'Mobile iPhone 13',
  use: {
    ...devices['iPhone 13'],
    browserName: 'chromium' as const,
  },
};

function getProjects() {
  switch (projectFilter) {
    case 'desktop':
      return [desktopProject];
    case 'mobile':
      return [mobileProject];
    default:
      return [desktopProject, mobileProject];
  }
}

/**
 * In CI, serve the pre-built production bundle via `vite preview`
 * for faster, more stable E2E runs.
 *
 * Locally, use the Vite dev server for a better DX.
 */
let webServerConfig;

if (isCI) {
  webServerConfig = {
    command: 'bunx vite preview --port 4173',
    port: 4173,
    reuseExistingServer: false,
    timeout: 30_000,
  };
}
else {
  webServerConfig = {
    command: 'bunx vite --port 5173',
    port: 5173,
    reuseExistingServer: true,
    timeout: 60_000,
  };
}

const baseURL = isCI ? 'http://localhost:4173' : 'http://localhost:5173';

export default defineConfig({
  testDir: './tests/e2e/specs',

  /* ── Parallelism ─────────────────────────────────────────── */
  fullyParallel: true,
  workers: isCI ? 2 : undefined, // 2 workers in CI (GHA has 2 vCPUs), auto-detect locally

  /* ── Retries & Timeouts ──────────────────────────────────── */
  retries: isCI ? 1 : 0, // 1 retry in CI (down from 2) — reduces max flake penalty
  timeout: isCI ? 30_000 : 60_000, // 30s per test in CI (tighter, catches hangs faster)
  expect: {
    timeout: isCI ? 10_000 : 15_000, // assertion timeout
  },

  forbidOnly: isCI,

  /* ── Reporters ───────────────────────────────────────────── */
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'on-failure' }]],

  /* ── Shared Settings ─────────────────────────────────────── */
  use: {
    baseURL,

    /* Collect traces only on first retry to keep artifacts small */
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: isCI ? 'on-first-retry' : 'off',

    /* Faster navigation — don't wait for all network requests */
    actionTimeout: isCI ? 15_000 : 30_000,
    navigationTimeout: isCI ? 15_000 : 30_000,
  },

  /* ── Projects ────────────────────────────────────────────── */
  projects: getProjects(),

  /* ── Web Server ──────────────────────────────────────────── */
  webServer: webServerConfig,
});
