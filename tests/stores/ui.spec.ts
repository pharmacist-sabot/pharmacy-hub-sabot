import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { useUIStore } from '@/stores/ui';

describe('useUIStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have initial state', () => {
    const store = useUIStore();
    expect(store.currentTab).toBe('all');
    expect(store.isMobileMenuOpen).toBe(false);
    expect(store.searchQuery).toBe('');
  });

  it('should toggle mobile menu', () => {
    const store = useUIStore();
    expect(store.isMobileMenuOpen).toBe(false);

    store.toggleMobileMenu();

    expect(store.isMobileMenuOpen).toBe(true);

    store.toggleMobileMenu();
    expect(store.isMobileMenuOpen).toBe(false);
  });

  it('should update search query via action', () => {
    const store = useUIStore();
    store.setSearch('warfarin');
    expect(store.searchQuery).toBe('warfarin');
  });

  it('should update current tab via action', () => {
    const store = useUIStore();
    store.setTab('tool');
    expect(store.currentTab).toBe('tool');
  });

  it('should close mobile menu when setting tab if open', () => {
    const store = useUIStore();
    store.toggleMobileMenu();
    expect(store.isMobileMenuOpen).toBe(true);

    store.setTab('report');
    expect(store.currentTab).toBe('report');
    expect(store.isMobileMenuOpen).toBe(false);
  });

  it('should not change mobile menu state when setting tab if closed', () => {
    const store = useUIStore();
    expect(store.isMobileMenuOpen).toBe(false);

    store.setTab('external');
    expect(store.currentTab).toBe('external');
    expect(store.isMobileMenuOpen).toBe(false);
  });
});
