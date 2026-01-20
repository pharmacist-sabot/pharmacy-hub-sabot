import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

import AppSidebar from '@/components/layout/AppSidebar.vue';
import { useUIStore } from '@/stores/ui';

// Mock component for router
const Home = { template: '<div>Home</div>' };

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: Home }],
});

describe('appSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders navigation buttons', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        plugins: [router],
        stubs: {
          // Stub Lucide icons
          BarChart3: true,
          LayoutGrid: true,
          Link: true,
          Pill: true,
          Stethoscope: true,
        },
      },
    });

    expect(wrapper.text()).toContain('ภาพรวมทั้งหมด');
    expect(wrapper.text()).toContain('เครื่องมือปฏิบัติงาน');
    expect(wrapper.text()).toContain('รายงานและสถิติ');
    expect(wrapper.text()).toContain('ระบบงานภายนอก');
  });

  it('highlights current tab', async () => {
    const store = useUIStore();
    store.currentTab = 'tool';

    const wrapper = mount(AppSidebar, {
      global: {
        plugins: [router],
        stubs: {
          BarChart3: true,
          LayoutGrid: true,
          Link: true,
          Pill: true,
          Stethoscope: true,
        },
      },
    });

    const toolBtn = wrapper.find('[data-testid="nav-tool"]');
    const allBtn = wrapper.find('[data-testid="nav-all"]');

    expect(toolBtn.classes()).toContain('bg-sabot-600');
    expect(allBtn.classes()).not.toContain('bg-sabot-600');
  });

  it('updates store based on navigation', async () => {
    // Need a real router or mock logic?
    // The component calls router.push. App's router guard updates the store.
    // Since we are mocking router in isolation here, pure unit test of component won't trigger router guard automatically
    // unless we mount the entire app or mock the router guard behavior.
    // However, the reviewer asked: "assert that currentTab updates to the expected value to validate the UI–store integration".
    // If the component ONLY calls router.push, it does NOT update store directly. The store update happens in router/index.ts guard.
    // Wait, let's look at component code: `navigateToTab` calls `router.push`.
    // So checking store definition: `router.beforeEach` updates store.
    // In this unit test, `router` is a real router instance created with `createRouter`.
    // But it doesn't have the guard attached because the guard is in `@/router/index.ts`!
    // We are creating a LOCAL router in the test file.
    // To test integration properly as requested, we might need to import the REAL router or attach a guard manually.
    // OR, maybe the reviewer implies we should check if `navigateToTab` does the right thing.
    // Ah, the user simply wants to check if clicking button triggers the expected outcome.
    // If I use the local router, store won't update unless I add a guard or if component updates it.
    // The component DOES NOT update store directly.

    // OPTION 1: Verify `router.push` is called (already done).
    // OPTION 2: Import real router (but might have side effects).
    // OPTION 3: Add a guard to the test router that mimics the real one.

    // PROCEEDING WITH OPTION 3 (Mimic real behavior) for this integration taste test.

    router.beforeEach((to) => {
      const mapping: Record<string, string> = { '/': 'all', '/tools': 'tool', '/reports': 'report', '/external': 'external' };
      const store = useUIStore();
      // Simple mock of logic
      const path = to.path;
      if (mapping[path])
        store.currentTab = mapping[path] as any;
    });

    const store = useUIStore();
    const wrapper = mount(AppSidebar, {
      global: {
        plugins: [router],
        stubs: { BarChart3: true, LayoutGrid: true, Link: true, Pill: true, Stethoscope: true },
      },
    });

    expect(store.currentTab).toBe('all');

    await wrapper.find('[data-testid="nav-tool"]').trigger('click');
    // Wait for router usage
    await router.isReady();

    // Since router.push is async
    await wrapper.vm.$nextTick();

    expect(store.currentTab).toBe('tool');
  });

  it('navigates when button clicked', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(AppSidebar, {
      global: {
        plugins: [router],
        stubs: {
          BarChart3: true,
          LayoutGrid: true,
          Link: true,
          Pill: true,
          Stethoscope: true,
        },
      },
    });

    await wrapper.find('[data-testid="nav-tool"]').trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/tools');
  });

  it('toggles mobile menu', async () => {
    const store = useUIStore();
    store.isMobileMenuOpen = true;

    const wrapper = mount(AppSidebar, {
      global: {
        plugins: [router],
        stubs: {
          BarChart3: true,
          LayoutGrid: true,
          Link: true,
          Pill: true,
          Stethoscope: true,
        },
      },
    });

    // Check if overlay is visible
    const overlay = wrapper.find('.fixed.inset-0');
    expect(overlay.exists()).toBe(true);

    // Click overlay
    await overlay.trigger('click');
    expect(store.isMobileMenuOpen).toBe(false);
  });
});
