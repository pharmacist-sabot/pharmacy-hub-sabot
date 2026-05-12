import type { ResourceItem } from '@/types/resource';
import { mount } from '@vue/test-utils';

import { describe, expect, it } from 'vitest';
import ResourceCard from '@/components/common/ResourceCard.vue';

const mockItem: ResourceItem = {
  id: 'test-tool',
  title: 'Test Tool',
  description: 'Test Description',
  iconName: 'Pill',
  url: 'https://example.com',
  isActive: true,
  type: 'tool',
};

describe('resourceCard', () => {
  it('renders tool title and description', () => {
    const wrapper = mount(ResourceCard, {
      props: { item: mockItem },
    });
    expect(wrapper.text()).toContain('Test Tool');
    expect(wrapper.text()).toContain('Test Description');
  });

  it('shows ONLINE badge when isActive is true', () => {
    const wrapper = mount(ResourceCard, {
      props: { item: { ...mockItem, isActive: true } },
    });
    expect(wrapper.text()).toContain('TOOL');
    expect(wrapper.text()).toContain('เปิดใช้งาน');
  });

  it('shows MAINTENANCE badge and disables link when isActive is false', () => {
    const wrapper = mount(ResourceCard, {
      props: { item: { ...mockItem, isActive: false } },
    });
    expect(wrapper.text()).toContain('Coming Soon');
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders correct link when isActive is true', () => {
    const wrapper = mount(ResourceCard, {
      props: { item: mockItem },
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('target')).toBe('_blank');
  });
});
