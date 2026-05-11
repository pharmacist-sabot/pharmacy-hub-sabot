import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import HomeView from '@/views/HomeView.vue';

describe('homeView', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the ElPatita-inspired landing grid structure', () => {
    const wrapper = mount(HomeView);

    expect(wrapper.findAll('.inicio-container > section')).toHaveLength(9);
    expect(wrapper.text()).toContain('PHARMACY HUB');
    expect(wrapper.text()).toContain('ศูนย์รวมระบบงาน');
    expect(wrapper.text()).toContain('กลุ่มงานเภสัชกรรม โรงพยาบาลสระโบสถ์');
  });

  it('shows placeholder surfaces for future real media replacement', () => {
    const wrapper = mount(HomeView);

    expect(wrapper.text()).toContain('Hero Image');
    expect(wrapper.text()).toContain('Mock Image');
    expect(wrapper.text()).toContain('Dashboard Motion');
    expect(wrapper.text()).toContain('คำนวณยา');
    expect(wrapper.text()).toContain('รายงาน');
    expect(wrapper.text()).toContain('เชื่อมต่อ');
  });

  it('links the primary call to action to the tools page', () => {
    const wrapper = mount(HomeView);
    const cta = wrapper.get('.animated-link');

    expect(cta.attributes('href')).toBe('/tools');
    expect(cta.text()).toContain('ดูเครื่องมือทั้งหมด');
  });

  it('shows the loader briefly on mount', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HomeView);

    expect(wrapper.find('.loader-container').exists()).toBe(true);

    vi.advanceTimersByTime(200);
    await nextTick();

    expect(wrapper.find('.loader-container').exists()).toBe(false);
  });
});
