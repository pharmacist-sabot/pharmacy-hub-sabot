import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import BlankLayout from '@/layouts/BlankLayout.vue';

describe('blankLayout', () => {
  it('renders slot content', () => {
    const wrapper = mount(BlankLayout, {
      slots: {
        default: '<div class="test-content">Content</div>',
      },
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Content');
  });
});
