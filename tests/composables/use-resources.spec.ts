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

// Type for component vm
type ResourcesVM = {
  resources: Ref<ResourceItem[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  refresh: () => Promise<void>;
};

// Helper to get typed vm from wrapper
function getVM(wrapper: ReturnType<typeof mount>): ResourcesVM {
  return wrapper.vm as unknown as ResourcesVM;
}

// Helper to setup fetch mock
function mockFetchWith(response: { ok: boolean; status?: number; data?: ResourceItem[] }) {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: response.ok,
    status: response.status,
    json: () => Promise.resolve(response.data),
  });
  vi.stubGlobal('fetch', mockFetch);
  return mockFetch;
}

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
    const mockFetch = mockFetchWith({ ok: true, data: mockResources });

    const wrapper = mount(TestComponent);
    await flushPromises();

    expect(mockFetch).toHaveBeenCalledWith('/data/resources.json');

    const vm = getVM(wrapper);
    expect(vm.resources).toEqual(mockResources);
    expect(vm.loading).toBe(false);
    expect(vm.error).toBeNull();
  });

  it('handles HTTP error response', async () => {
    mockFetchWith({ ok: false, status: 404 });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = getVM(wrapper);
    expect(vm.error).toBe('HTTP error! status: 404');
    expect(vm.loading).toBe(false);
    expect(vm.resources).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('handles network error', async () => {
    const networkError = new Error('Network error');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = getVM(wrapper);
    expect(vm.error).toBe('Network error');
    expect(vm.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch resources:', networkError);
  });

  it('handles unknown error type', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue('Unknown error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(TestComponent);
    await flushPromises();

    const vm = getVM(wrapper);
    expect(vm.error).toBe('Unknown error');
    expect(vm.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('can refresh resources', async () => {
    const mockFetch = mockFetchWith({ ok: true, data: mockResources });

    const wrapper = mount(TestComponent);
    await flushPromises();

    mockFetch.mockClear();

    const vm = getVM(wrapper);
    await vm.refresh();

    expect(mockFetch).toHaveBeenCalledWith('/data/resources.json');
  });
});
