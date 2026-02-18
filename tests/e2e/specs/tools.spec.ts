import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { HomePage } from '../pages/HomePage';

// ─── Single Source of Truth ──────────────────────────────────
// Load expected data directly from resources.json so E2E assertions
// stay aligned with the app data and never desync.

type Resource = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  url: string;
  isActive: boolean;
  type: string;
};

const resourcesPath = join(process.cwd(), 'public/data/resources.json');
const RESOURCES: Resource[] = JSON.parse(
  readFileSync(resourcesPath, 'utf-8'),
);
const EXPECTED_TOOLS: Record<
  string,
  { title: string; url: string; isActive: boolean; type: string }
> = Object.fromEntries(
  RESOURCES.map(r => [
    r.id,
    { title: r.title, url: r.url, isActive: r.isActive, type: r.type },
  ]),
);

test.describe('Tool Card Interactions', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto('/');
    await homePage.waitForCardsLoaded();
  });

  test.describe('Card Rendering', () => {
    test('should display all resource cards on the home page', async () => {
      const count = await homePage.getVisibleCardCount();

      // resources.json has 16 items total, but inactive ones have pointer-events-none
      // All 16 should still be rendered in the DOM
      expect(count).toBe(RESOURCES.length);
    });

    test('should render the Warfarin Calculator card with correct title', async () => {
      const card = homePage.getCardById('warfarin-calc');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('warfarin-calc');
      expect(title).toBe(EXPECTED_TOOLS['warfarin-calc']!.title);
    });

    test('should render the MedSafety Net card with correct description', async () => {
      const card = homePage.getCardById('med-safety');
      await expect(card).toBeVisible();

      const description = await homePage.getCardDescription('med-safety');
      expect(description).toContain('ความคลาดเคลื่อนทางยา');
    });

    test('should render the Pedi Dose card', async () => {
      const card = homePage.getCardById('pedi-dose');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('pedi-dose');
      expect(title).toBe(EXPECTED_TOOLS['pedi-dose']!.title);
    });

    test('should render the Hospital Drugs card', async () => {
      const card = homePage.getCardById('hospital-drugs');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('hospital-drugs');
      expect(title).toBe(EXPECTED_TOOLS['hospital-drugs']!.title);
    });

    test('should render the DrugTracker card', async () => {
      const card = homePage.getCardById('drug-tracker');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('drug-tracker');
      expect(title).toBe(EXPECTED_TOOLS['drug-tracker']!.title);
    });
  });

  test.describe('Href Verification (External Link Safety)', () => {
    test('should have the correct href for Warfarin Calculator', async () => {
      const href = await homePage.getCardHref('warfarin-calc');
      expect(href).toBe(EXPECTED_TOOLS['warfarin-calc']!.url);
    });

    test('should have the correct href for Pedi Dose', async () => {
      const href = await homePage.getCardHref('pedi-dose');
      expect(href).toBe(EXPECTED_TOOLS['pedi-dose']!.url);
    });

    test('should have the correct href for Hospital Drugs', async () => {
      const href = await homePage.getCardHref('hospital-drugs');
      expect(href).toBe(EXPECTED_TOOLS['hospital-drugs']!.url);
    });

    test('should have the correct href for High-Alert Drugs', async () => {
      const href = await homePage.getCardHref('had-list');
      expect(href).toBe(EXPECTED_TOOLS['had-list']!.url);
    });

    test('should have the correct href for DrugTracker', async () => {
      const href = await homePage.getCardHref('drug-tracker');
      expect(href).toBe(EXPECTED_TOOLS['drug-tracker']!.url);
    });

    test('should open links in a new tab (target="_blank")', async () => {
      const card = homePage.getCardById('warfarin-calc');
      const target = await card.getAttribute('target');
      expect(target).toBe('_blank');
    });

    test('should enforce rel="noopener noreferrer" for Warfarin Calculator', async () => {
      const rel = await homePage.getCardRel('warfarin-calc');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should enforce rel="noopener noreferrer" for Pedi Dose', async () => {
      const rel = await homePage.getCardRel('pedi-dose');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should enforce rel="noopener noreferrer" for Hospital Drugs', async () => {
      const rel = await homePage.getCardRel('hospital-drugs');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should enforce rel="noopener noreferrer" for High-Alert Drugs', async () => {
      const rel = await homePage.getCardRel('had-list');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should enforce rel="noopener noreferrer" for DrugTracker', async () => {
      const rel = await homePage.getCardRel('drug-tracker');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should enforce rel="noopener noreferrer" for all active cards', async () => {
      const activeIds = Object.entries(EXPECTED_TOOLS)
        .filter(([, info]) => info.isActive)
        .map(([id]) => id);

      for (const id of activeIds) {
        const rel = await homePage.getCardRel(id);
        expect(rel, `Card "${id}" should have rel="noopener noreferrer"`).toBe(
          'noopener noreferrer',
        );
      }
    });

    test('should NOT navigate the browser when clicking an external tool link', async ({
      page,
    }) => {
      // Intercept any navigation to external URLs to prevent hanging
      await page.route('https://**', (route) => {
        route.abort();
      });

      // Verify the href is correct without actually navigating
      const href = await homePage.getCardHref('warfarin-calc');
      expect(href).toBe(EXPECTED_TOOLS['warfarin-calc']!.url);

      // Ensure we're still on the same page
      await expect(page).toHaveURL('/');
    });

    test('should verify all active tool cards have valid https URLs', async () => {
      const activeToolIds = Object.entries(EXPECTED_TOOLS)
        .filter(([, info]) => info.isActive && info.url !== '#')
        .map(([id]) => id);

      for (const id of activeToolIds) {
        const href = await homePage.getCardHref(id);
        expect(href, `Card "${id}" should have an https or http URL`).toMatch(
          /^https?:\/\//,
        );
      }
    });
  });

  test.describe('Active / Inactive States', () => {
    test('should show ONLINE badge for active cards', async () => {
      const isActive = await homePage.isCardActive('warfarin-calc');
      expect(isActive).toBe(true);
    });

    test('should show ONLINE badge for MedSafety Net', async () => {
      const isActive = await homePage.isCardActive('med-safety');
      expect(isActive).toBe(true);
    });

    test('should show MAINTENANCE badge for inactive cards', async () => {
      // Navigate to reports tab to see inactive cards
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const card = homePage.getCardById('report-monthly');
      await expect(card).toBeAttached();

      const maintenanceBadge = card.getByText('MAINTENANCE');
      await expect(maintenanceBadge).toBeVisible();
    });

    test('should not have an href for inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const href = await homePage.getCardHref('report-monthly');
      expect(href).toBeNull();
    });

    test('should not have a rel attribute for inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const rel = await homePage.getCardRel('report-monthly');
      expect(rel).toBeNull();
    });

    test('should mark inactive cards with aria-disabled', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const card = homePage.getCardById('report-monthly');
      const ariaDisabled = await card.getAttribute('aria-disabled');
      expect(ariaDisabled).toBe('true');
    });

    test('should have pointer-events-none on inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const card = homePage.getCardById('report-monthly');
      await expect(card).toHaveClass(/pointer-events-none/);
    });

    test('should show "Coming Soon" text for inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const card = homePage.getCardById('report-monthly');
      const comingSoon = card.getByText('Coming Soon');
      await expect(comingSoon).toBeVisible();
    });

    test('should show "เปิดใช้งาน" text for active cards', async () => {
      const card = homePage.getCardById('warfarin-calc');
      const openText = card.getByText('เปิดใช้งาน');
      await expect(openText).toBeVisible();
    });
  });

  test.describe('Tab Filtering for Tools', () => {
    test('should show only tool-type cards on the Tools tab', async () => {
      await homePage.navigateToTools();
      await homePage.waitForCardsLoaded();

      const expectedToolCount = RESOURCES.filter(r => r.type === 'tool').length;
      const count = await homePage.getVisibleCardCount();

      expect(count).toBe(expectedToolCount);

      // A report card should NOT be visible
      await expect(homePage.getCardById('dashboard-safety')).not.toBeAttached();
    });

    test('should show only report-type cards on the Reports tab', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const expectedReportCount = RESOURCES.filter(r => r.type === 'report').length;
      const count = await homePage.getVisibleCardCount();

      expect(count).toBe(expectedReportCount);

      // A tool card should NOT be visible
      await expect(homePage.getCardById('warfarin-calc')).not.toBeAttached();
    });

    test('should show only external-type cards on the External tab', async () => {
      await homePage.navigateToExternal();
      await homePage.waitForCardsLoaded();

      const expectedExternalCount = RESOURCES.filter(r => r.type === 'external').length;
      const count = await homePage.getVisibleCardCount();

      expect(count).toBe(expectedExternalCount);

      // A tool card should NOT be visible
      await expect(homePage.getCardById('warfarin-calc')).not.toBeAttached();
    });
  });

  test.describe('Card Footer Labels', () => {
    test('should display "Application" label for tool-type cards', async () => {
      const card = homePage.getCardById('warfarin-calc');
      const label = card.getByText('Application');
      await expect(label).toBeVisible();
    });

    test('should display "Dashboard" label for report-type cards', async () => {
      await homePage.navigateToReports();
      await homePage.waitForCardsLoaded();

      const card = homePage.getCardById('dashboard-safety');
      const label = card.locator('span', { hasText: 'Dashboard' });
      await expect(label).toBeVisible();
    });
  });

  test.describe('External Link Mocking (Safety)', () => {
    test('should prevent actual navigation to script.google.com', async ({
      page,
    }) => {
      // Intercept any request to Google Scripts to prevent hanging
      await page.route('**/script.google.com/**', (route) => {
        route.abort();
      });

      // Verify the MedSafety Net card has the correct href
      const card = homePage.getCardById('med-safety');
      const href = await card.getAttribute('href');
      expect(href).toContain('script.google.com');

      // We do NOT click the link — we just verify the attribute.
      // This prevents the browser from navigating to an external auth-gated page.
      await expect(page).toHaveURL('/');
    });

    test('should verify all external links without navigating', async ({
      page,
    }) => {
      // Route intercept for safety — abort any external navigation
      await page.route('https://**', (route) => {
        route.abort();
      });

      // Build the verification list from resources.json
      const activeResources = RESOURCES.filter(r => r.isActive && r.url !== '#');

      for (const resource of activeResources) {
        const href = await homePage.getCardHref(resource.id);
        expect(
          href,
          `Card "${resource.id}" href should match resources.json`,
        ).toBe(resource.url);
      }

      // Ensure we never left the page
      await expect(page).toHaveURL('/');
    });
  });
});
