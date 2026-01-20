import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import router from '@/router/index';
import { useUIStore } from '@/stores/ui';

// Helper to find route by path
function findRoute(path: string) {
  return router.getRoutes().find(r => r.path === path);
}

describe('router', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('route definitions', () => {
    it.each([
      { path: '/', expectedTab: 'all' },
      { path: '/tools', expectedTab: 'tool' },
      { path: '/reports', expectedTab: 'report' },
      { path: '/external', expectedTab: 'external' },
    ])('defines route $path with tab $expectedTab', ({ path, expectedTab }) => {
      const route = findRoute(path);
      expect(route).toBeDefined();
      expect(route?.meta?.tab).toBe(expectedTab);
    });
  });

  it('updates store tab on navigation', async () => {
    const store = useUIStore();
    expect(store.currentTab).toBe('all');

    await router.push('/tools');
    expect(store.currentTab).toBe('tool');

    await router.push('/reports');
    expect(store.currentTab).toBe('report');
  });

  it('does not update store tab on navigation to non-tab route', async () => {
    const store = useUIStore();
    store.currentTab = 'all';

    await router.push('/not-found-page-123');
    expect(store.currentTab).toBe('all');
  });

  it('defines scroll behavior', () => {
    const scrollBehavior = router.options.scrollBehavior;
    expect(scrollBehavior).toBeDefined();

    const savedPos = { left: 0, top: 100 };
    expect(scrollBehavior?.({} as never, {} as never, savedPos)).toEqual(savedPos);
    expect(scrollBehavior?.({} as never, {} as never, null)).toEqual({ top: 0 });
  });
});
