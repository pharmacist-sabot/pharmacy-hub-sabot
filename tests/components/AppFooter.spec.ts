import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppFooter from '@/components/layout/AppFooter.vue';

describe('appFooter', () => {
  it('renders copyright with current year', () => {
    const wrapper = mount(AppFooter);
    const year = new Date().getFullYear();
    expect(wrapper.text()).toContain(String(year));
    expect(wrapper.text()).toContain('Pharmacy Department, Sabot Hospital');
  });
});
