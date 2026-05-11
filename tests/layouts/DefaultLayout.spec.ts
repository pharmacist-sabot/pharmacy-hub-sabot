import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import DefaultLayout from '@/layouts/DefaultLayout.vue';

const push = vi.fn();
const route = { path: '/', meta: { navGroup: 'home' } };

vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
  useRoute: () => route,
}));

describe('defaultLayout', () => {
  beforeEach(() => {
    push.mockReset();
    route.path = '/';
    route.meta = { navGroup: 'home' };
  });

  it('renders slot content with logo and the reduced bottom navigation', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div class="test-content">Content</div>',
      },
    });

    expect(wrapper.find('.elpatita-brand').exists()).toBe(true);
    expect(wrapper.findAll('.elpatita-nav-item')).toHaveLength(3);
    expect(wrapper.text()).toContain('หน้าแรก');
    expect(wrapper.text()).toContain('เครื่องมือ');
    expect(wrapper.text()).toContain('กลุ่มงาน');
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Content');
  });

  it('marks the tools button active for tools-group routes', () => {
    route.path = '/reports';
    route.meta = { navGroup: 'tools' };

    const wrapper = mount(DefaultLayout);
    const buttons = wrapper.findAll('.elpatita-nav-item');

    expect(buttons[1]?.classes()).toContain('elpatita-nav-item--active');
  });
});
