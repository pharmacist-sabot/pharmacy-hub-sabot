import type { Locator, Page } from '@playwright/test';

import { AppPage } from './AppPage';

/**
 * HomePage — Page Object for the Home / Resource Grid view.
 *
 * Encapsulates the resource card grid, section title,
 * filtered count badge, empty state, and individual card locators.
 */
export class HomePage extends AppPage {
  // Section header
  readonly sectionTitle: Locator;
  readonly filteredCount: Locator;

  // Grid container
  readonly cardGrid: Locator;

  // Empty state
  readonly emptyState: Locator;
  readonly clearSearchButton: Locator;

  // Loading skeleton
  readonly loadingSkeleton: Locator;

  // Error state
  readonly errorState: Locator;

  constructor(page: Page) {
    super(page);

    // Section title heading
    this.sectionTitle = page.locator('h2');
    this.filteredCount = page.locator('h2 span');

    // The grid of resource cards
    this.cardGrid = page.locator('.grid');

    // Empty state container (shown when no results found)
    this.emptyState = page.getByText('ไม่พบข้อมูลที่ค้นหา');

    // Clear search button in empty state
    this.clearSearchButton = page.getByTestId('clear-search-button');

    // Loading skeleton placeholders
    this.loadingSkeleton = page.locator('.animate-pulse');

    // Error state
    this.errorState = page.getByText('Error loading resources');
  }

  // ─── Card Locators ─────────────────────────────────────────

  /** Get a specific resource card by its id (e.g. 'med-safety', 'warfarin-calc'). */
  getCardById(id: string): Locator {
    return this.page.getByTestId(`tool-card-${id}`);
  }

  /** Get all visible resource cards in the grid. */
  getAllCards(): Locator {
    return this.page.locator('a[data-testid^="tool-card-"]');
  }

  /** Get the count of currently visible resource cards. */
  async getVisibleCardCount(): Promise<number> {
    return this.getAllCards().count();
  }

  // ─── Card Details ──────────────────────────────────────────

  /** Get the title text of a specific card. */
  async getCardTitle(id: string): Promise<string> {
    const card = this.getCardById(id);
    const title = card.locator('h3');
    return (await title.textContent()) ?? '';
  }

  /** Get the description text of a specific card. */
  async getCardDescription(id: string): Promise<string> {
    const card = this.getCardById(id);
    const description = card.locator('p');
    return (await description.textContent()) ?? '';
  }

  /** Get the href attribute of a specific card. */
  async getCardHref(id: string): Promise<string | null> {
    const card = this.getCardById(id);
    return card.getAttribute('href');
  }

  /** Get the rel attribute of a specific card (for external link safety). */
  async getCardRel(id: string): Promise<string | null> {
    const card = this.getCardById(id);
    return card.getAttribute('rel');
  }

  /** Check whether a specific card has an active (ONLINE) status badge. */
  async isCardActive(id: string): Promise<boolean> {
    const card = this.getCardById(id);
    const onlineBadge = card.getByText('ONLINE');
    return onlineBadge.isVisible();
  }

  // ─── Filtered Count Badge ──────────────────────────────────

  /** Parse the filtered count number from the badge text (e.g. "9 รายการ" → 9). */
  async getFilteredCount(): Promise<number> {
    const text = (await this.filteredCount.textContent()) ?? '';
    const match = text.match(/(\d+)/);
    return match ? Number.parseInt(match[1]!, 10) : 0;
  }

  // ─── Section Title ─────────────────────────────────────────

  /** Get the current section title text. */
  async getSectionTitle(): Promise<string> {
    return (await this.sectionTitle.textContent()) ?? '';
  }

  // ─── Convenience Methods ───────────────────────────────────

  /**
   * Wait for cards to be loaded (skeleton disappears and cards appear).
   * Useful after initial page load or after navigation.
   */
  async waitForCardsLoaded() {
    // Wait for loading skeleton to disappear
    await this.loadingSkeleton
      .first()
      .waitFor({ state: 'hidden', timeout: 10_000 })
      .catch(() => {
        // Skeleton might already be gone — that's fine
      });
    // Wait for at least one card to appear
    await this.getAllCards()
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 });
  }

  /**
   * Search and wait for the grid to update.
   * Returns the count of visible cards after the search.
   */
  async searchAndWait(query: string): Promise<number> {
    await this.search(query);
    // Wait for Vue's reactive filter to flush DOM updates
    await this.page.evaluate(
      () =>
        new Promise(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    return this.getVisibleCardCount();
  }

  /**
   * Clear search and wait for the grid to update.
   * Returns the count of visible cards after clearing.
   */
  async clearSearchAndWait(): Promise<number> {
    await this.clearSearch();
    // Wait for Vue's reactive filter to flush DOM updates
    await this.page.evaluate(
      () =>
        new Promise(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    return this.getVisibleCardCount();
  }
}
