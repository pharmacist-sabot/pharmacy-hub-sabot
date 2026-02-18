import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

test.describe('Search Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto('/');
    await homePage.waitForCardsLoaded();
  });

  test.describe('Basic Search', () => {
    test('should filter cards when typing a search keyword', async () => {
      const totalBefore = await homePage.getVisibleCardCount();
      expect(totalBefore).toBeGreaterThan(0);

      const count = await homePage.searchAndWait('Warfarin');

      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(totalBefore);

      // The Warfarin Calculator card should be visible
      await expect(homePage.getCardById('warfarin-calc')).toBeVisible();
    });

    test('should show all cards again after clearing search', async () => {
      const totalBefore = await homePage.getVisibleCardCount();

      // Search to filter down
      await homePage.searchAndWait('Warfarin');
      const filteredCount = await homePage.getVisibleCardCount();
      expect(filteredCount).toBeLessThan(totalBefore);

      // Clear the search
      const countAfterClear = await homePage.clearSearchAndWait();
      expect(countAfterClear).toBe(totalBefore);
    });

    test('should update the filtered count badge', async () => {
      const totalBefore = await homePage.getFilteredCount();
      expect(totalBefore).toBeGreaterThan(0);

      await homePage.searchAndWait('Warfarin');

      const filteredCount = await homePage.getFilteredCount();
      expect(filteredCount).toBeGreaterThan(0);
      expect(filteredCount).toBeLessThan(totalBefore);
    });

    test('should display "ผลการค้นหา" as section title when searching', async () => {
      await homePage.searchAndWait('Warfarin');

      const title = await homePage.getSectionTitle();
      expect(title).toContain('ผลการค้นหา');
    });
  });

  test.describe('Search by Description', () => {
    test('should match cards by description text', async () => {
      // "ความคลาดเคลื่อน" is in MedSafety Net's description
      const count = await homePage.searchAndWait('ความคลาดเคลื่อน');

      expect(count).toBeGreaterThan(0);
      await expect(homePage.getCardById('med-safety')).toBeVisible();
    });
  });

  test.describe('Partial Matching', () => {
    test('should match partial keywords in title', async () => {
      // "คำนวณ" appears in both Warfarin Calculator and Pedi Dose titles
      const count = await homePage.searchAndWait('คำนวณ');

      expect(count).toBeGreaterThanOrEqual(2);
      await expect(homePage.getCardById('warfarin-calc')).toBeVisible();
      await expect(homePage.getCardById('pedi-dose')).toBeVisible();
    });

    test('should be case-insensitive for English keywords', async () => {
      const countLower = await homePage.searchAndWait('warfarin');
      const cardsLower = countLower;

      await homePage.clearSearchAndWait();

      const countUpper = await homePage.searchAndWait('WARFARIN');
      const cardsUpper = countUpper;

      expect(cardsLower).toBe(cardsUpper);
      expect(cardsLower).toBeGreaterThan(0);
    });
  });

  test.describe('Empty State', () => {
    test('should show empty state when no results match', async () => {
      await homePage.searchAndWait('xyznonexistent12345');

      const cardCount = await homePage.getVisibleCardCount();
      expect(cardCount).toBe(0);

      await expect(homePage.emptyState).toBeVisible();
    });

    test('should show the clear search button in empty state', async () => {
      await homePage.searchAndWait('xyznonexistent12345');

      await expect(homePage.clearSearchButton).toBeVisible();
    });

    test('should restore all cards when clicking "ล้างคำค้นหา" button', async () => {
      const totalBefore = await homePage.getVisibleCardCount();

      await homePage.searchAndWait('xyznonexistent12345');
      await expect(homePage.emptyState).toBeVisible();

      // Click the clear search button in the empty state
      await homePage.clearSearchButton.click();
      await homePage.waitForCardsLoaded();

      const countAfter = await homePage.getVisibleCardCount();
      expect(countAfter).toBe(totalBefore);

      // Search input should be empty
      const searchValue = await homePage.getSearchValue();
      expect(searchValue).toBe('');
    });
  });

  test.describe('Search with Tab Filtering', () => {
    test('should search within the Tools tab only', async () => {
      await homePage.navigateToTools();
      await homePage.waitForCardsLoaded();

      const toolsCount = await homePage.getVisibleCardCount();

      // Search for something that exists in tools
      const count = await homePage.searchAndWait('Warfarin');
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(toolsCount);

      await expect(homePage.getCardById('warfarin-calc')).toBeVisible();
    });

    test('should return no results when searching for a report title in Tools tab', async () => {
      await homePage.navigateToTools();
      await homePage.waitForCardsLoaded();

      // "Dashboard" is a report title, should not appear in Tools tab
      const count = await homePage.searchAndWait('MedSafety Net Dashboard');
      expect(count).toBe(0);

      await expect(homePage.emptyState).toBeVisible();
    });
  });

  test.describe('Mobile Search', () => {
    test('should open mobile search and filter cards', async ({ page }) => {
      test.skip(
        !test.info().project.name.includes('Mobile'),
        'Skipped — only runs on Mobile project',
      );

      const homePage = new HomePage(page);
      await homePage.goto('/');
      await homePage.waitForCardsLoaded();

      // On mobile, search input is hidden by default
      await expect(homePage.searchInput).not.toBeVisible();

      // Open mobile search via the button
      await homePage.openMobileSearch();
      await expect(homePage.searchInput).toBeVisible();

      // Type a query
      await homePage.searchInput.fill('Warfarin');
      // Wait for Vue's reactive filter to flush DOM updates
      await homePage.page.evaluate(
        () =>
          new Promise(resolve =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );

      const count = await homePage.getVisibleCardCount();
      expect(count).toBeGreaterThan(0);

      await expect(homePage.getCardById('warfarin-calc')).toBeVisible();
    });
  });

  test.describe('Search Idempotency', () => {
    test('should produce the same results when searching the same term multiple times', async () => {
      const results: number[] = [];

      for (let i = 0; i < 3; i++) {
        const count = await homePage.searchAndWait('Warfarin');
        results.push(count);
        await homePage.clearSearchAndWait();
      }

      // All iterations should yield the same count
      expect(results[0]).toBe(results[1]);
      expect(results[1]).toBe(results[2]);
      expect(results[0]).toBeGreaterThan(0);
    });
  });
});
