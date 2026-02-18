import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

test.describe('Sidebar Navigation', () => {
  test.describe('Desktop Viewport', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
      test.skip(
        test.info().project.name.includes('Mobile'),
        'Skipped — desktop sidebar tests only run on Desktop project',
      );

      homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();
    });

    test('should start on the home page with "all" tab active', async () => {
      await expect(homePage.page).toHaveURL('/');
      await expect(homePage.navAll).toBeVisible();

      // The "all" nav button should have the active class
      await expect(homePage.navAll).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
    });

    test('should navigate to Tools page when clicking nav-tool', async () => {
      await homePage.navigateToTools();

      await expect(homePage.page).toHaveURL('/tools');
      await expect(homePage.navTool).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);

      // Other nav buttons should NOT have the active class
      await expect(homePage.navAll).not.toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
      await expect(homePage.navReport).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
      await expect(homePage.navExternal).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
    });

    test('should navigate to Reports page when clicking nav-report', async () => {
      await homePage.navigateToReports();

      await expect(homePage.page).toHaveURL('/reports');
      await expect(homePage.navReport).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);

      await expect(homePage.navAll).not.toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
      await expect(homePage.navTool).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
      await expect(homePage.navExternal).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
    });

    test('should navigate to External page when clicking nav-external', async () => {
      await homePage.navigateToExternal();

      await expect(homePage.page).toHaveURL('/external');
      await expect(homePage.navExternal).toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );

      await expect(homePage.navAll).not.toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
      await expect(homePage.navTool).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
      await expect(homePage.navReport).not.toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );
    });

    test('should navigate back to All from Tools', async () => {
      await homePage.navigateToTools();
      await expect(homePage.page).toHaveURL('/tools');

      await homePage.navigateToAll();
      await expect(homePage.page).toHaveURL('/');
      await expect(homePage.navAll).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
    });

    test('should navigate through all tabs sequentially', async () => {
      // All → Tools
      await homePage.navigateToTools();
      await expect(homePage.page).toHaveURL('/tools');
      await expect(homePage.navTool).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);

      // Tools → Reports
      await homePage.navigateToReports();
      await expect(homePage.page).toHaveURL('/reports');
      await expect(homePage.navReport).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);

      // Reports → External
      await homePage.navigateToExternal();
      await expect(homePage.page).toHaveURL('/external');
      await expect(homePage.navExternal).toHaveClass(
        /(^|\s)bg-sabot-600(\s|$)/,
      );

      // External → All
      await homePage.navigateToAll();
      await expect(homePage.page).toHaveURL('/');
      await expect(homePage.navAll).toHaveClass(/(^|\s)bg-sabot-600(\s|$)/);
    });
  });

  test.describe('Mobile Viewport', () => {
    test('should open sidebar via hamburger menu and navigate to Tools', async ({
      page,
    }) => {
      test.skip(
        !test.info().project.name.includes('Mobile'),
        'Skipped — only runs on Mobile project',
      );

      const homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();

      // Sidebar should be off-screen initially on mobile
      await expect(homePage.sidebar).toHaveClass(/-translate-x-full/);

      // Open mobile sidebar
      await homePage.openMobileMenu();

      // Click Tools nav
      await homePage.navTool.click();
      await homePage.page.waitForURL('/tools');

      await expect(homePage.page).toHaveURL('/tools');
    });

    test('should open sidebar, navigate to Reports, and sidebar closes', async ({
      page,
    }) => {
      test.skip(
        !test.info().project.name.includes('Mobile'),
        'Skipped — only runs on Mobile project',
      );

      const homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();

      await homePage.openMobileMenu();

      await homePage.navReport.click();
      await homePage.page.waitForURL('/reports');

      await expect(homePage.page).toHaveURL('/reports');

      // Sidebar should close after navigating (mobile menu toggles off)
      await expect(homePage.sidebar).toHaveClass(/-translate-x-full/);
    });

    test('should open sidebar, navigate to External', async ({ page }) => {
      test.skip(
        !test.info().project.name.includes('Mobile'),
        'Skipped — only runs on Mobile project',
      );

      const homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();

      await homePage.openMobileMenu();

      await homePage.navExternal.click();
      await homePage.page.waitForURL('/external');

      await expect(homePage.page).toHaveURL('/external');
    });

    test('should close sidebar when tapping the overlay', async ({ page }) => {
      test.skip(
        !test.info().project.name.includes('Mobile'),
        'Skipped — only runs on Mobile project',
      );

      const homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();

      await homePage.openMobileMenu();

      // The sidebar is w-72 (288px) with z-50 and the overlay is z-40.
      // Click to the right of the sidebar area so the overlay receives the event.
      const viewport = page.viewportSize();
      const clickX = viewport ? viewport.width - 20 : 350;
      const clickY = viewport ? Math.floor(viewport.height / 2) : 400;
      await page.mouse.click(clickX, clickY);

      // Sidebar should slide back off-screen
      await expect(homePage.sidebar).toHaveClass(/-translate-x-full/);
    });
  });
});
