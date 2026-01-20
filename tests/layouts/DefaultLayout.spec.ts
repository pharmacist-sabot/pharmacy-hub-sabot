import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import DefaultLayout from '@/layouts/DefaultLayout.vue';

describe('defaultLayout', () => {
  it('renders layout components and slot content', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div class="test-content">Content</div>',
      },
      global: {
        stubs: {
          AppSidebar: { template: '<div class="sidebar-stub"></div>' },
          AppHeader: { template: '<div class="header-stub"></div>' },
          AppFooter: { template: '<div class="footer-stub"></div>' },
        },
      },
    });

    expect(wrapper.find('.sidebar-stub').exists()).toBe(true);
    expect(wrapper.find('.header-stub').exists()).toBe(true);
    expect(wrapper.find('.footer-stub').exists()).toBe(true);
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Content');
  });
});
