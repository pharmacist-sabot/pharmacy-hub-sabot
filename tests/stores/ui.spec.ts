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
  });

  it('should update search query', () => {
    const store = useUIStore();
    store.searchQuery = 'warfarin';
    expect(store.searchQuery).toBe('warfarin');
  });

  it('should update current tab', () => {
    const store = useUIStore();
    store.currentTab = 'tool';
    expect(store.currentTab).toBe('tool');
  });
});
