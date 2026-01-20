import type { Ref } from 'vue';

import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';

import type { ResourceItem } from '@/types/resource';

import { useResources } from '@/composables/use-resources';

// Create a test component that uses the composable
const TestComponent = defineComponent({
  template: '<div></div>',
  setup() {
    return useResources();
  },
});

describe('useResources', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResources: ResourceItem[] = [
    {
      id: '1',
      title: 'Test Resource',
      description: 'Test description',
      iconName: 'Pill',
      url: 'https://example.com',
      isActive: true,
      type: 'tool',
    },
  ];

  it('fetches resources successfully on mount', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResources),
    });
    vi.stubGlobal('fetch', mockFetch);

    const wrapper = mount(TestComponent);

    // Wait for async operations
    await flushPromises();

    expect(mockFetch).toHaveBeenCalledWith('/data/resources.json');

    const vm = wrapper.vm as unknown as {
      resources: Ref<ResourceItem[]>;
      loading: Ref<boolean>;
      error: Ref<string | null>;
    };

    expect(vm.resources).toEqual(mockResources);
    expect(vm.loading).toBe(false);
    expect(vm.error).toBeNull();
  });

  it('handles HTTP error response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    vi.stubGlobal('fetch', mockFetch);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = wrapper.vm as unknown as {
      resources: Ref<ResourceItem[]>;
      loading: Ref<boolean>;
      error: Ref<string | null>;
    };

    expect(vm.error).toBe('HTTP error! status: 404');
    expect(vm.loading).toBe(false);
    expect(vm.resources).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('handles network error', async () => {
    const networkError = new Error('Network error');
    const mockFetch = vi.fn().mockRejectedValue(networkError);
    vi.stubGlobal('fetch', mockFetch);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = wrapper.vm as unknown as {
      resources: Ref<ResourceItem[]>;
      loading: Ref<boolean>;
      error: Ref<string | null>;
    };

    expect(vm.error).toBe('Network error');
    expect(vm.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch resources:', networkError);
  });

  it('handles unknown error type', async () => {
    const mockFetch = vi.fn().mockRejectedValue('Unknown error');
    vi.stubGlobal('fetch', mockFetch);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = wrapper.vm as unknown as {
      resources: Ref<ResourceItem[]>;
      loading: Ref<boolean>;
      error: Ref<string | null>;
    };

    expect(vm.error).toBe('Unknown error');
    expect(vm.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('can refresh resources', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResources),
    });
    vi.stubGlobal('fetch', mockFetch);

    const wrapper = mount(TestComponent);
    await flushPromises();

    // Clear call history
    mockFetch.mockClear();

    // Call refresh
    const vm = wrapper.vm as unknown as {
      refresh: () => Promise<void>;
    };
    await vm.refresh();

    expect(mockFetch).toHaveBeenCalledWith('/data/resources.json');
  });
});
