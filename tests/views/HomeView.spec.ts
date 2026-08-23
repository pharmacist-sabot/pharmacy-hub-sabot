import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HomeView from '@/views/HomeView.vue';

describe('homeView', () => {
  it('renders the ElPatita-inspired landing grid structure', () => {
    const wrapper = mount(HomeView);

    expect(wrapper.findAll('.inicio-container > section')).toHaveLength(9);
    expect(wrapper.text()).toContain('RX ROOM');
    expect(wrapper.text()).toContain('ศูนย์รวมระบบงาน');
    expect(wrapper.text()).toContain('กลุ่มงานเภสัชกรรม โรงพยาบาลสระโบสถ์');
  });

  it('shows placeholder surfaces for future real media replacement', () => {
    const wrapper = mount(HomeView);

    const hero = wrapper.find('img.tile-photo');
    expect(hero.exists()).toBe(true);
    expect(hero.attributes('src')).toBe('/images/home-hero.jpg');

    const pills = wrapper.findAll('img.pill-photo');
    expect(pills).toHaveLength(3);
    expect(pills[0]?.attributes('src')).toBe('/images/home-feature-calculators.jpg');
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
});
