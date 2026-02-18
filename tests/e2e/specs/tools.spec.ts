import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

// Expected data from resources.json for verification
const EXPECTED_TOOLS = {
  'med-safety': {
    title: 'MedSafety Net',
    url: 'https://script.google.com/macros/s/AKfycbyrXXZahRLu72CtvF9UB9m6L5NNjdH7I06ARkSyJhBpc9O3fmse9SnHXR8Wi/exec',
    isActive: true,
    type: 'tool',
  },
  'warfarin-calc': {
    title: 'โปรแกรมคำนวณยา Warfarin',
    url: 'https://sabot-warfarin-calculator.web.app/',
    isActive: true,
    type: 'tool',
  },
  'pedi-dose': {
    title: 'โปรแกรมคำนวณยาน้ำเด็ก',
    url: 'https://pedi-dose-c9cec.web.app/',
    isActive: true,
    type: 'tool',
  },
  'hospital-drugs': {
    title: 'บัญชียาโรงพยาบาล',
    url: 'https://sabot-drug-lists.rxdevman.com',
    isActive: true,
    type: 'tool',
  },
  'had-list': {
    title: 'บัญชียา High-Alert Drugs',
    url: 'https://high-alert-drugs-sabot.web.app/',
    isActive: true,
    type: 'tool',
  },
  'drug-tracker': {
    title: 'ระบบ DrugTracker',
    url: 'https://drug-tracker-system.web.app/',
    isActive: true,
    type: 'tool',
  },
  'report-monthly': {
    title: 'รายงานสรุปประจำเดือน',
    url: '#',
    isActive: false,
    type: 'report',
  },
  'report-stock': {
    title: 'รายงานมูลค่ายาคงคลัง',
    url: '#',
    isActive: false,
    type: 'report',
  },
  'report-opd': {
    title: 'รายงานการใช้ยาผู้ป่วยนอก',
    url: '#',
    isActive: false,
    type: 'report',
  },
} as const;

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
      expect(count).toBe(16);
    });

    test('should render the Warfarin Calculator card with correct title', async () => {
      const card = homePage.getCardById('warfarin-calc');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('warfarin-calc');
      expect(title).toBe('โปรแกรมคำนวณยา Warfarin');
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
      expect(title).toBe('โปรแกรมคำนวณยาน้ำเด็ก');
    });

    test('should render the Hospital Drugs card', async () => {
      const card = homePage.getCardById('hospital-drugs');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('hospital-drugs');
      expect(title).toBe('บัญชียาโรงพยาบาล');
    });

    test('should render the DrugTracker card', async () => {
      const card = homePage.getCardById('drug-tracker');
      await expect(card).toBeVisible();

      const title = await homePage.getCardTitle('drug-tracker');
      expect(title).toBe('ระบบ DrugTracker');
    });
  });

  test.describe('Href Verification (External Link Safety)', () => {
    test('should have the correct href for Warfarin Calculator', async () => {
      const href = await homePage.getCardHref('warfarin-calc');
      expect(href).toBe(EXPECTED_TOOLS['warfarin-calc'].url);
    });

    test('should have the correct href for Pedi Dose', async () => {
      const href = await homePage.getCardHref('pedi-dose');
      expect(href).toBe(EXPECTED_TOOLS['pedi-dose'].url);
    });

    test('should have the correct href for Hospital Drugs', async () => {
      const href = await homePage.getCardHref('hospital-drugs');
      expect(href).toBe(EXPECTED_TOOLS['hospital-drugs'].url);
    });

    test('should have the correct href for High-Alert Drugs', async () => {
      const href = await homePage.getCardHref('had-list');
      expect(href).toBe(EXPECTED_TOOLS['had-list'].url);
    });

    test('should have the correct href for DrugTracker', async () => {
      const href = await homePage.getCardHref('drug-tracker');
      expect(href).toBe(EXPECTED_TOOLS['drug-tracker'].url);
    });

    test('should open links in a new tab (target="_blank")', async () => {
      const card = homePage.getCardById('warfarin-calc');
      const target = await card.getAttribute('target');
      expect(target).toBe('_blank');
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
      expect(href).toBe('https://sabot-warfarin-calculator.web.app/');

      // Ensure we're still on the same page
      await expect(page).toHaveURL('/');
    });

    test('should verify all active tool cards have valid https URLs', async () => {
      const activeToolIds = Object.entries(EXPECTED_TOOLS)
        .filter(([, info]) => info.isActive)
        .map(([id]) => id);

      for (const id of activeToolIds) {
        const href = await homePage.getCardHref(id);
        expect(href, `Card "${id}" should have an https URL`).toMatch(
          /^https:\/\//,
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
      await homePage.page.waitForTimeout(300);

      const card = homePage.getCardById('report-monthly');
      await expect(card).toBeAttached();

      const maintenanceBadge = card.getByText('MAINTENANCE');
      await expect(maintenanceBadge).toBeVisible();
    });

    test('should not have an href for inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.page.waitForTimeout(300);

      const href = await homePage.getCardHref('report-monthly');
      expect(href).toBeNull();
    });

    test('should mark inactive cards with aria-disabled', async () => {
      await homePage.navigateToReports();
      await homePage.page.waitForTimeout(300);

      const card = homePage.getCardById('report-monthly');
      const ariaDisabled = await card.getAttribute('aria-disabled');
      expect(ariaDisabled).toBe('true');
    });

    test('should have pointer-events-none on inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.page.waitForTimeout(300);

      const card = homePage.getCardById('report-monthly');
      await expect(card).toHaveClass(/pointer-events-none/);
    });

    test('should show "Coming Soon" text for inactive cards', async () => {
      await homePage.navigateToReports();
      await homePage.page.waitForTimeout(300);

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
      await homePage.page.waitForTimeout(300);

      const count = await homePage.getVisibleCardCount();

      // There are 9 tool-type items in resources.json
      expect(count).toBe(9);

      // A report card should NOT be visible
      await expect(homePage.getCardById('dashboard-safety')).not.toBeAttached();
    });

    test('should show only report-type cards on the Reports tab', async () => {
      await homePage.navigateToReports();
      await homePage.page.waitForTimeout(300);

      const count = await homePage.getVisibleCardCount();

      // There are 5 report-type items in resources.json
      expect(count).toBe(5);

      // A tool card should NOT be visible
      await expect(homePage.getCardById('warfarin-calc')).not.toBeAttached();
    });

    test('should show only external-type cards on the External tab', async () => {
      await homePage.navigateToExternal();
      await homePage.page.waitForTimeout(300);

      const count = await homePage.getVisibleCardCount();

      // There are 2 external-type items in resources.json
      expect(count).toBe(2);

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
      await homePage.page.waitForTimeout(300);

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
      let _intercepted = false;
      await page.route('**/script.google.com/**', (route) => {
        _intercepted = true;
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

      // Verify each active tool has a valid href
      const toolsToVerify = [
        { id: 'med-safety', urlContains: 'script.google.com' },
        {
          id: 'warfarin-calc',
          urlContains: 'sabot-warfarin-calculator.web.app',
        },
        { id: 'pedi-dose', urlContains: 'pedi-dose' },
        { id: 'hospital-drugs', urlContains: 'sabot-drug-lists.rxdevman.com' },
        { id: 'had-list', urlContains: 'high-alert-drugs-sabot.web.app' },
        { id: 'drug-tracker', urlContains: 'drug-tracker-system.web.app' },
      ];

      for (const { id, urlContains } of toolsToVerify) {
        const href = await homePage.getCardHref(id);
        expect(
          href,
          `Card "${id}" href should contain "${urlContains}"`,
        ).toContain(urlContains);
      }

      // Ensure we never left the page
      await expect(page).toHaveURL('/');
    });
  });
});
