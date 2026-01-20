import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import NotFoundView from '@/views/NotFoundView.vue';

describe('notFoundView', () => {
  it('renders 404 message', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    });

    expect(wrapper.text()).toContain('404');
    expect(wrapper.text()).toContain('ไม่พบหน้าที่คุณต้องการ');
    expect(wrapper.text()).toContain('กลับสู่หน้าหลัก');
  });
});
