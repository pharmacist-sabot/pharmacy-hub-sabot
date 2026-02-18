import type { Locator, Page } from '@playwright/test';

/**
 * AppPage — Base Page Object for common layout elements.
 *
 * Encapsulates the sidebar navigation, header search bar,
 * and mobile menu interactions shared across all pages.
 */
export class AppPage {
  readonly page: Page;

  // Sidebar navigation buttons
  readonly navAll: Locator;
  readonly navTool: Locator;
  readonly navReport: Locator;
  readonly navExternal: Locator;

  // Header elements
  readonly searchInput: Locator;
  readonly mobileSearchBtn: Locator;
  readonly mobileMenuBtn: Locator;

  // Sidebar container
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar nav buttons (data-testid)
    this.navAll = page.getByTestId('nav-all');
    this.navTool = page.getByTestId('nav-tool');
    this.navReport = page.getByTestId('nav-report');
    this.navExternal = page.getByTestId('nav-external');

    // Header search
    this.searchInput = page.getByTestId('search-input');
    this.mobileSearchBtn = page.getByTestId('mobile-search-btn');

    // Mobile hamburger menu button
    this.mobileMenuBtn = page.getByRole('button', { name: 'เปิดเมนู' });

    // Sidebar aside element
    this.sidebar = page.locator('aside');
  }

  /** Navigate to the app root and wait for network idle. */
  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  // ─── Sidebar Navigation ────────────────────────────────────

  /**
   * Ensure the sidebar is accessible before clicking a nav button.
   * On mobile viewports the sidebar is off-screen (`-translate-x-full`)
   * so we need to open the hamburger menu first.
   */
  private async ensureSidebarVisible() {
    const isMobile = await this.mobileMenuBtn.isVisible();
    if (isMobile) {
      // Check whether the sidebar is currently off-screen
      const sidebarClasses = (await this.sidebar.getAttribute('class')) ?? '';
      if (sidebarClasses.includes('-translate-x-full')) {
        await this.openMobileMenu();
      }
    }
  }

  async navigateToAll() {
    await this.ensureSidebarVisible();
    await this.navAll.click();
    await this.page.waitForURL('/');
  }

  async navigateToTools() {
    await this.ensureSidebarVisible();
    await this.navTool.click();
    await this.page.waitForURL('/tools');
  }

  async navigateToReports() {
    await this.ensureSidebarVisible();
    await this.navReport.click();
    await this.page.waitForURL('/reports');
  }

  async navigateToExternal() {
    await this.ensureSidebarVisible();
    await this.navExternal.click();
    await this.page.waitForURL('/external');
  }

  // ─── Mobile helpers ────────────────────────────────────────

  /** Open the mobile sidebar (only visible on small viewports). */
  async openMobileMenu() {
    await this.mobileMenuBtn.click();
    // Wait for the sidebar to slide in (transition)
    await this.sidebar.waitFor({ state: 'visible' });
  }

  /** Open the mobile search overlay (only visible on small viewports). */
  async openMobileSearch() {
    await this.mobileSearchBtn.click();
    await this.searchInput.waitFor({ state: 'visible' });
  }

  // ─── Search helpers ────────────────────────────────────────

  /**
   * Type a search query into the search input.
   * On mobile viewports the search overlay is opened first.
   */
  async search(query: string) {
    // If the search input is not visible (mobile), open the search overlay first
    if (!(await this.searchInput.isVisible())) {
      await this.openMobileSearch();
    }

    await this.searchInput.fill(query);
  }

  /** Clear the search input so all cards reappear. */
  async clearSearch() {
    if (!(await this.searchInput.isVisible())) {
      await this.openMobileSearch();
    }

    await this.searchInput.fill('');
  }

  /** Return the current value of the search input. */
  async getSearchValue(): Promise<string> {
    return this.searchInput.inputValue();
  }
}
