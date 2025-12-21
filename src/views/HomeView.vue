<script setup lang="ts">
import { BarChart3, LayoutGrid, Search, SearchX, Stethoscope } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ResourceCard from '@/components/common/ResourceCard.vue';
import { pharmacyResources } from '@/data/resources';
import { useUIStore } from '@/stores/ui';

const store = useUIStore();
const { currentTab, searchQuery } = storeToRefs(store);
const { setSearch } = store;

// Filter Logic
const filteredResources = computed(() => {
  let items = pharmacyResources;

  // Filter by Tab
  if (currentTab.value !== 'all') {
    items = items.filter(r => r.type === currentTab.value);
  }

  // Filter by Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(r =>
      r.title.toLowerCase().includes(query)
      || r.description.toLowerCase().includes(query),
    );
  }

  return items;
});

// Tab configuration for cleaner mapping
const tabConfig = {
  all: { title: 'เครื่องมือและรายงานทั้งหมด', icon: LayoutGrid },
  tool: { title: 'เครื่องมือปฏิบัติงาน (Tools)', icon: Stethoscope },
  report: { title: 'รายงานและสถิติ (Reports)', icon: BarChart3 },
};

const sectionTitle = computed(() => {
  if (searchQuery.value)
    return 'ผลการค้นหา';
  return tabConfig[currentTab.value]?.title ?? '';
});

const sectionIcon = computed(() => {
  if (searchQuery.value)
    return Search;
  return tabConfig[currentTab.value]?.icon ?? LayoutGrid;
});

function clearSearch() {
  setSearch('');
}
</script>

<template>
  <div class="animate-fade-in-up">
    <!-- Section Title -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold text-sabot-800 flex items-center gap-2">
        <component :is="sectionIcon" class="w-5 h-5 text-sabot-500" />
        {{ sectionTitle }}
        <span class="text-xs font-normal text-sabot-600 bg-sabot-200 px-2 py-1 rounded-full ml-2 border border-sabot-300">
          {{ filteredResources.length }} รายการ
        </span>
      </h2>
    </div>

    <!-- Empty State -->
    <div v-if="filteredResources.length === 0" class="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-sabot-200">
      <div class="bg-white p-4 rounded-full mb-4 shadow-sm">
        <SearchX class="w-8 h-8 text-sabot-300" />
      </div>
      <h3 class="text-lg font-medium text-sabot-700">
        ไม่พบข้อมูลที่ค้นหา
      </h3>
      <p class="text-sabot-500 text-sm mt-1">
        ลองใช้คำค้นหาอื่น หรือเลือกหมวดหมู่ใหม่
      </p>
      <button class="mt-4 text-sabot-600 hover:text-sabot-800 font-bold text-sm underline decoration-sabot-300 underline-offset-4 cursor-pointer" @click="clearSearch">
        ล้างคำค้นหา
      </button>
    </div>

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <ResourceCard
        v-for="item in filteredResources"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}
</style>
