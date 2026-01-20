import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import { useUIStore } from '@/stores/ui';
import HomeView from '@/views/HomeView.vue';

// Mock Lucide icons
vi.mock('lucide-vue-next', async () => {
  const actual = await vi.importActual('lucide-vue-next');
  return {
    ...actual as any,
    BarChart3: { template: '<span class="icon-mock">BarChart3</span>' },
    LayoutGrid: { template: '<span class="icon-mock">LayoutGrid</span>' },
    Link: { template: '<span class="icon-mock">Link</span>' },
    Search: { template: '<span class="icon-mock">Search</span>' },
    SearchX: { template: '<span class="icon-mock">SearchX</span>' },
    Stethoscope: { template: '<span class="icon-mock">Stethoscope</span>' },
  };
});

// Mock ResourceCard
vi.mock('@/components/common/ResourceCard.vue', () => ({
  default: {
    template: '<div class="resource-card-stub">{{ item.title }}</div>',
    props: ['item'],
  },
}));

// Mock useResources
const mockResources = ref([
  { id: '1', title: 'Tool 1', description: 'Desc 1', type: 'tool', isActive: true },
  { id: '2', title: 'Report 1', description: 'Desc 2', type: 'report', isActive: true },
  { id: '3', title: 'External 1', description: 'Desc 3', type: 'external', isActive: true },
]);
const mockLoading = ref(false);
const mockError = ref(null);

vi.mock('@/composables/use-resources', () => ({
  useResources: () => ({
    resources: mockResources,
    loading: mockLoading,
    error: mockError,
  }),
}));

describe('homeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Reset mocks
    mockResources.value = [
      { id: '1', title: 'Tool 1', description: 'Desc 1', type: 'tool', isActive: true },
      { id: '2', title: 'Report 1', description: 'Desc 2', type: 'report', isActive: true },
      { id: '3', title: 'External 1', description: 'Desc 3', type: 'external', isActive: true },
    ];
    mockLoading.value = false;
    mockError.value = null;
  });

  it('renders all resources by default', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.findAll('.resource-card-stub').length).toBe(3);
    expect(wrapper.text()).toContain('เครื่องมือและรายงานทั้งหมด');
  });

  it('filters by tab', async () => {
    const store = useUIStore();
    store.currentTab = 'tool';

    const wrapper = mount(HomeView);
    expect(wrapper.findAll('.resource-card-stub').length).toBe(1);
    expect(wrapper.text()).toContain('Tool 1');
    expect(wrapper.text()).not.toContain('Report 1');
    expect(wrapper.text()).toContain('เครื่องมือปฏิบัติงาน (Tools)');
  });

  it('filters by search query', async () => {
    const store = useUIStore();
    store.searchQuery = 'Report';

    const wrapper = mount(HomeView);
    expect(wrapper.findAll('.resource-card-stub').length).toBe(1);
    expect(wrapper.text()).toContain('Report 1');
    expect(wrapper.text()).toContain('ผลการค้นหา');
  });

  it('shows empty state when no results found', async () => {
    const store = useUIStore();
    store.searchQuery = 'NotFoundQuery';

    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain('ไม่พบข้อมูลที่ค้นหา');
    expect(wrapper.find('button').text()).toContain('ล้างคำค้นหา');
  });

  it('clears search when button clicked in empty state', async () => {
    const store = useUIStore();
    store.searchQuery = 'NotFoundQuery';

    const wrapper = mount(HomeView);
    await wrapper.find('button').trigger('click');

    expect(store.searchQuery).toBe('');
    expect(wrapper.findAll('.resource-card-stub').length).toBe(3);
  });

  it('shows loading skeleton when loading', async () => {
    mockLoading.value = true;
    // Force re-mount to pick up loading state if it depends on setup execution or reactive watchers
    const wrapper = mount(HomeView);

    expect(wrapper.findAll('.animate-pulse').length).toBe(6);
    expect(wrapper.findAll('.resource-card-stub').length).toBe(0);
  });

  it('shows error state when error occurs', async () => {
    mockError.value = 'Failed to load';
    mockLoading.value = false;
    const wrapper = mount(HomeView);

    expect(wrapper.text()).toContain('Error loading resources: Failed to load');
  });
});
