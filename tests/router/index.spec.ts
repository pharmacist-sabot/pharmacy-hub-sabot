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
});
