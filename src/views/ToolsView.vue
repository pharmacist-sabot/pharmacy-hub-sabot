<script setup lang="ts">
import type { TabType } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import ResourceCard from '@/components/common/ResourceCard.vue';
import { useResources } from '@/composables/use-resources';
import { useUIStore } from '@/stores/ui';

const route = useRoute();
const router = useRouter();
const store = useUIStore();
const { searchQuery } = storeToRefs(store);
const { resources, loading, error } = useResources();

const tabItems: Array<{ key: Exclude<TabType, 'all'>; label: string; path: string }> = [
  { key: 'tool', label: 'เครื่องมือ', path: '/tools' },
  { key: 'report', label: 'รายงาน', path: '/reports' },
  { key: 'external', label: 'ภายนอก', path: '/external' },
];

const viewMeta = {
  tool: {
    title: 'เครื่องมือปฏิบัติงาน',
    description: 'ระบบงานหลักสำหรับการปฏิบัติงานประจำวันของกลุ่มงานเภสัชกรรม',
    accent: 'tools',
  },
  report: {
    title: 'รายงานและสถิติ',
    description: 'สรุปข้อมูลเชิงวิเคราะห์และแดชบอร์ดที่ใช้ติดตามผลการดำเนินงาน',
    accent: 'reports',
  },
  external: {
    title: 'ระบบงานภายนอก',
    description: 'ลิงก์เชื่อมต่อระบบภายนอกและฐานข้อมูลที่เกี่ยวข้องกับงานเภสัชกรรม',
    accent: 'external',
  },
} as const;

const currentTab = computed<Exclude<TabType, 'all'>>(() => {
  const tab = route.meta.tab;
  return tab === 'report' || tab === 'external' ? tab : 'tool';
});

const currentMeta = computed(() => viewMeta[currentTab.value]);

const filteredResources = computed(() => {
  if (loading.value || error.value)
    return [];

  let items = resources.value.filter(resource => resource.type === currentTab.value);

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(resource =>
      resource.title.toLowerCase().includes(query)
      || resource.description.toLowerCase().includes(query),
    );
  }

  return items;
});

function navigateToTab(path: string) {
  void router.push(path);
}
</script>

<template>
  <div class="carta-container">
    <section class="cart-title-nav">
      <div class="cart-title hover-shrink" :class="`cart-title--${currentMeta.accent}`">
        <h2>{{ currentMeta.title }}</h2>
        <p>{{ currentMeta.description }}</p>
      </div>

      <div class="cart-nav" :class="`cart-nav--${currentMeta.accent}`" aria-label="เลือกประเภทข้อมูล">
        <ul>
          <li v-for="tab in tabItems" :key="tab.key">
            <button
              type="button"
              class="cart-tab"
              :class="{ active: currentTab === tab.key }"
              :aria-current="currentTab === tab.key ? 'page' : undefined"
              @click="navigateToTab(tab.path)"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="loading" class="resource-strip" aria-label="กำลังโหลดข้อมูล">
      <div v-for="n in 6" :key="n" class="combo-skeleton">
        <div class="skeleton-card animate-pulse" />
        <div class="skeleton-line animate-pulse" />
        <div class="skeleton-line skeleton-line--short animate-pulse" />
        <div class="skeleton-pill animate-pulse" />
      </div>
    </section>

    <section v-else-if="error" class="error-message">
      Error loading resources: {{ error }}
    </section>

    <section v-else-if="filteredResources.length" class="resource-strip">
      <ResourceCard
        v-for="item in filteredResources"
        :key="item.id"
        :item="item"
      />
    </section>

    <section v-else class="empty-state">
      <h3>ไม่พบข้อมูลที่ค้นหา</h3>
      <p>ลองเปลี่ยนคำค้นหรือเลือกแท็บด้านบนเพื่อดูรายการในหมวดอื่น</p>
    </section>
  </div>
</template>

<style scoped>
.carta-container {
  padding: 6.5dvh 10%;
  animation: fadeIn 0.5s ease-in-out;
  content-visibility: auto;
  contain-intrinsic-size: 1px 5000px;
}

.cart-title-nav {
  display: grid;
  grid-template-columns: minmax(320px, 1.15fr) repeat(3, minmax(0, 1fr));
  gap: 12px;
  min-height: 130px;
}

.cart-title,
.cart-nav {
  min-width: 0;
  border-radius: 20px;
}

.cart-title {
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 20px 6%;
}

.cart-title h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.cart-title p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.4;
}

.cart-title--tools {
  background: #f8dfce;
  color: #ec5228;
}

.cart-title--reports {
  background: #d7f5ff;
  color: #00616b;
}

.cart-title--external {
  background: #2b252d;
  color: #f4f6f5;
}

.cart-nav {
  grid-column: span 3 / span 3;
  padding: 28px 6%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-nav--tools {
  background-color: #f0781f;
}

.cart-nav--reports {
  background-color: #17c6d2;
}

.cart-nav--external {
  background-color: #3b3b3b;
}

.cart-nav ul {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  list-style: none;
}

.cart-tab {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 30px;
  background: transparent;
  padding: 12px 20px;
  color: #ffffff;
  font-size: clamp(0.9em, 1.5vw, 1.1em);
  cursor: pointer;
  transition:
    background-color 0.5s,
    color 0.5s,
    box-shadow 0.5s;
}

.cart-tab:hover,
.cart-tab.active {
  background-color: #ffffff;
  color: #0e081b;
  box-shadow: 0 5px 12px rgb(0 0 0 / 0.2);
}

.resource-strip {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-top: 12px;
  animation: fadeIn 0.4s ease-in-out;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.resource-strip::-webkit-scrollbar {
  display: none;
}

.combo-skeleton {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 20px;
  background: #ffffff;
}

.skeleton-card,
.skeleton-line,
.skeleton-pill {
  border-radius: 16px;
  background: linear-gradient(90deg, #ececec 25%, #f6f6f6 37%, #ececec 63%);
  background-size: 400% 100%;
}

.skeleton-card {
  height: 220px;
}

.skeleton-line {
  height: 20px;
}

.skeleton-line--short {
  width: 70%;
}

.skeleton-pill {
  width: 42%;
  height: 36px;
}

.animate-pulse {
  animation: shimmer 1.4s linear infinite;
}

.empty-state,
.error-message {
  margin-top: 12px;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
}

.empty-state {
  background: #fff6ee;
  color: #7f4a00;
}

.empty-state h3 {
  margin: 0 0 8px;
}

.error-message {
  background: #fff0f0;
  color: #d03238;
}

.hover-shrink:hover {
  transform: scale(0.97);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }

  100% {
    background-position: 400px 0;
  }
}

@media (max-width: 1440px) {
  .carta-container {
    padding: 6dvh 4%;
  }
}

@media (max-width: 1280px) {
  .carta-container {
    padding: 10dvh 2%;
  }
}

@media (max-width: 1024px) {
  .carta-container {
    padding: 6.5dvh 4%;
  }

  .cart-title-nav {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: auto;
  }

  .cart-nav {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .carta-container {
    padding: 16px;
    padding-bottom: 80px;
  }

  .cart-nav {
    padding: 20px 4%;
  }

  .cart-nav ul {
    gap: 8px;
    justify-content: center;
  }

  .cart-tab {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .carta-container {
    padding-bottom: 90px;
  }

  .cart-title h2 {
    font-size: 1.25rem;
  }

  .cart-title p {
    font-size: 0.82rem;
  }
}
</style>
