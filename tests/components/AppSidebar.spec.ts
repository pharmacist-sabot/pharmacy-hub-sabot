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

// Shared stubs for Lucide icons
const iconStubs = {
  BarChart3: true,
  LayoutGrid: true,
  Link: true,
  Pill: true,
  Stethoscope: true,
};

// Helper function to mount AppSidebar with common config
function mountSidebar() {
  return mount(AppSidebar, {
    global: {
      plugins: [router],
      stubs: iconStubs,
    },
  });
}

describe('appSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders navigation buttons', () => {
    const wrapper = mountSidebar();

    expect(wrapper.text()).toContain('ภาพรวมทั้งหมด');
    expect(wrapper.text()).toContain('เครื่องมือปฏิบัติงาน');
    expect(wrapper.text()).toContain('รายงานและสถิติ');
    expect(wrapper.text()).toContain('ระบบงานภายนอก');
  });

  it('highlights current tab', async () => {
    const store = useUIStore();
    store.currentTab = 'tool';

    const wrapper = mountSidebar();

    const toolBtn = wrapper.find('[data-testid="nav-tool"]');
    const allBtn = wrapper.find('[data-testid="nav-all"]');

    expect(toolBtn.classes()).toContain('bg-sabot-600');
    expect(allBtn.classes()).not.toContain('bg-sabot-600');
  });

  it('updates store based on navigation', async () => {
    router.beforeEach((to) => {
      const mapping: Record<string, string> = { '/': 'all', '/tools': 'tool', '/reports': 'report', '/external': 'external' };
      const store = useUIStore();
      const path = to.path;
      if (mapping[path])
        store.currentTab = mapping[path] as 'all' | 'tool' | 'report' | 'external';
    });

    const store = useUIStore();
    const wrapper = mountSidebar();

    expect(store.currentTab).toBe('all');

    await wrapper.find('[data-testid="nav-tool"]').trigger('click');
    await router.isReady();
    await wrapper.vm.$nextTick();

    expect(store.currentTab).toBe('tool');
  });

  describe('navigation', () => {
    it.each([
      { testId: 'nav-tool', expectedRoute: '/tools' },
      { testId: 'nav-report', expectedRoute: '/reports' },
      { testId: 'nav-external', expectedRoute: '/external' },
    ])('navigates to $expectedRoute when $testId clicked', async ({ testId, expectedRoute }) => {
      const pushSpy = vi.spyOn(router, 'push');
      const wrapper = mountSidebar();

      await wrapper.find(`[data-testid="${testId}"]`).trigger('click');

      expect(pushSpy).toHaveBeenCalledWith(expectedRoute);
    });
  });

  it('toggles mobile menu', async () => {
    const store = useUIStore();
    store.isMobileMenuOpen = true;

    const wrapper = mountSidebar();

    const overlay = wrapper.find('.fixed.inset-0');
    expect(overlay.exists()).toBe(true);

    await overlay.trigger('click');
    expect(store.isMobileMenuOpen).toBe(false);
  });
});
