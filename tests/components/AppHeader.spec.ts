import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import AppHeader from '@/components/layout/AppHeader.vue';
import { useUIStore } from '@/stores/ui';

describe('appHeader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mountHeader = () => {
    return mount(AppHeader, {
      global: {
        plugins: [createPinia()],
        stubs: {
          'router-link': true,
          'LucideIcon': true,
        },
      },
    });
  };

  it('shows greeting based on time', () => {
    const date = new Date(2025, 0, 1, 9, 0, 0);
    vi.setSystemTime(date);
    let wrapper = mountHeader();
    expect(wrapper.text()).toContain('สวัสดีตอนเช้า');

    vi.setSystemTime(new Date(2025, 0, 1, 14, 0, 0));
    wrapper = mountHeader();
    expect(wrapper.text()).toContain('สวัสดีตอนบ่าย');

    vi.setSystemTime(new Date(2025, 0, 1, 20, 0, 0));
    wrapper = mountHeader();
    expect(wrapper.text()).toContain('สวัสดีตอนเย็น');
  });

  it('toggles mobile search', async () => {
    const wrapper = mountHeader();

    // Check initial state (search input hidden on mobile)
    // Note: visibility testing in JSDOM + Tailwind classes is tricky,
    // so we check implicit state via component (if we could access it) or DOM classes/attributes.
    // Here we rely on the button trigger.

    const searchButton = wrapper.find('button[aria-label="ค้นหา"]');
    await searchButton.trigger('click');

    // After click, the input container should have specific classes
    const container = wrapper.find('.absolute.inset-x-0.top-0');
    expect(container.exists()).toBe(true);
  });

  it('updates search query in store', async () => {
    const wrapper = mountHeader();
    const store = useUIStore();

    const searchButton = wrapper.find('button[aria-label="ค้นหา"]');
    await searchButton.trigger('click');

    const input = wrapper.find('input[type="text"]');
    await input.setValue('test search');

    expect(store.searchQuery).toBe('test search');
  });

  it('clears search query', async () => {
    const wrapper = mountHeader();
    const store = useUIStore();

    // Open search
    await wrapper.find('button[aria-label="ค้นหา"]').trigger('click');

    const input = wrapper.find('input[type="text"]');
    await input.setValue('test');
    expect(store.searchQuery).toBe('test');

    // Wait for next tick for x button to appear
    await wrapper.vm.$nextTick();

    const clearButton = wrapper.find('button[aria-label="ล้างการค้นหา"]');
    expect(clearButton.exists()).toBe(true);

    await clearButton.trigger('click');
    expect(store.searchQuery).toBe('');
  });
});
