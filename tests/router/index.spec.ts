import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import router from '@/router/index';
import { useUIStore } from '@/stores/ui';

describe('router', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('defines the home route', () => {
    const route = router.getRoutes().find(r => r.path === '/');
    expect(route).toBeDefined();
    expect(route?.meta?.tab).toBe('all');
  });

  it('defines the tools route', () => {
    const route = router.getRoutes().find(r => r.path === '/tools');
    expect(route).toBeDefined();
    expect(route?.meta?.tab).toBe('tool');
  });

  it('defines the reports route', () => {
    const route = router.getRoutes().find(r => r.path === '/reports');
    expect(route).toBeDefined();
    expect(route?.meta?.tab).toBe('report');
  });

  it('defines the external route', () => {
    const route = router.getRoutes().find(r => r.path === '/external');
    expect(route).toBeDefined();
    expect(route?.meta?.tab).toBe('external');
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
    // Should remain 'all' because the new route doesn't have meta.tab
    expect(store.currentTab).toBe('all');
  });

  it('defines scroll behavior', () => {
    const scrollBehavior = router.options.scrollBehavior;
    expect(scrollBehavior).toBeDefined();

    // Test savedPosition
    const savedPos = { left: 0, top: 100 };
    expect(scrollBehavior?.({} as any, {} as any, savedPos)).toEqual(savedPos);

    // Test no savedPosition
    expect(scrollBehavior?.({} as any, {} as any, null)).toEqual({ top: 0 });
  });
});
