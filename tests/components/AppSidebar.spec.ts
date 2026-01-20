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

    // Find the button for 'tool' tab (index 1 based on appearance order)
    const buttons = wrapper.findAll('button');
    // 0: all, 1: tool, 2: report, 3: external
    expect(buttons[1]?.classes()).toContain('bg-sabot-600');
    expect(buttons[0]?.classes()).not.toContain('bg-sabot-600');
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

    const buttons = wrapper.findAll('button');
    await buttons[1]?.trigger('click'); // Click 'tool'

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
