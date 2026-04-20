<script setup lang="ts">
import { BarChart3, LayoutGrid, Link, Search, SearchX, Stethoscope } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ResourceCard from '@/components/common/ResourceCard.vue';
import { useResources } from '@/composables/use-resources';
import { useUIStore } from '@/stores/ui';

const store = useUIStore();
const { currentTab, searchQuery } = storeToRefs(store);
const { setSearch } = store;

const { resources, loading, error } = useResources();

const filteredResources = computed(() => {
  if (loading.value || error.value)
    return [];

  let items = resources.value;

  if (currentTab.value !== 'all') {
    items = items.filter(r => r.type === currentTab.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(r =>
      r.title.toLowerCase().includes(query)
      || r.description.toLowerCase().includes(query),
    );
  }

  return items;
});

const tabConfig = {
  all: { title: 'เครื่องมือและรายงานทั้งหมด', icon: LayoutGrid },
  tool: { title: 'เครื่องมือปฏิบัติงาน', icon: Stethoscope },
  report: { title: 'รายงานและสถิติ', icon: BarChart3 },
  external: { title: 'ระบบงานภายนอก', icon: Link },
};

const sectionTitle = computed(() =>
  searchQuery.value
    ? 'ผลการค้นหา'
    : (tabConfig[currentTab.value as keyof typeof tabConfig]?.title ?? ''),
);

const sectionIcon = computed(() =>
  searchQuery.value
    ? Search
    : (tabConfig[currentTab.value as keyof typeof tabConfig]?.icon ?? LayoutGrid),
);

function clearSearch() {
  setSearch('');
}
</script>

<template>
  <div class="page-enter">
    <!-- Section header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2.5">
        <component
          :is="sectionIcon"
          class="w-5 h-5 shrink-0"
          style="color: #9fe870;"
          :stroke-width="2"
        />
        <h2 class="text-base font-semibold" style="color: #0e0f0c;">
          {{ sectionTitle }}
        </h2>
        <span
          v-if="!loading && !error"
          class="text-xs font-medium px-2 py-0.5 rounded-full"
          style="background-color: #e2f6d5; color: #163300;"
        >
          {{ filteredResources.length }}
        </span>
      </div>

      <button
        v-if="searchQuery"
        class="text-sm font-medium transition-colors"
        style="color: #868685;"
        @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = '#163300')"
        @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = '#868685')"
        @click="clearSearch"
      >
        ล้างการค้นหา
      </button>
    </div>

    <!-- Error -->
    <div
      v-if="error"
      class="p-4 rounded-2xl text-sm font-medium"
      style="background-color: #fff0f0; color: #d03238; border: 1px solid rgba(208,50,56,0.15);"
    >
      เกิดข้อผิดพลาด: {{ error }}
    </div>

    <!-- Loading skeletons -->
    <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div
        v-for="n in 6"
        :key="n"
        class="rounded-[28px] overflow-hidden"
        style="border: 1px solid rgba(14,15,12,0.07);"
      >
        <div class="skeleton h-[104px]" />
        <div class="bg-white p-5 space-y-3">
          <div class="skeleton h-2.5 w-14 rounded-full" />
          <div class="skeleton h-4 w-3/4 rounded-full" />
          <div class="skeleton h-3 w-full rounded-full" />
          <div class="skeleton h-3 w-4/5 rounded-full" />
          <div class="pt-3 mt-1" style="border-top: 1px solid rgba(14,15,12,0.06);">
            <div class="skeleton h-8 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="filteredResources.length === 0"
      class="flex flex-col items-center justify-center py-20 rounded-3xl"
      style="background-color: #ffffff; border: 1.5px dashed rgba(14,15,12,0.1);"
    >
      <div
        class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style="background-color: #f0fbe8;"
      >
        <SearchX class="w-7 h-7" style="color: #9fe870;" :stroke-width="1.8" />
      </div>
      <p class="text-base font-semibold mb-1" style="color: #0e0f0c;">
        ไม่พบข้อมูลที่ค้นหา
      </p>
      <p class="text-sm font-normal mb-6" style="color: #868685;">
        ลองใช้คำค้นหาอื่น หรือเลือกหมวดหมู่ใหม่
      </p>
      <button
        data-testid="clear-search-button"
        class="clear-btn px-5 py-2 rounded-xl text-sm font-semibold"
        style="background-color: #9fe870; color: #163300;"
        @click="clearSearch"
      >
        ล้างคำค้นหา
      </button>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ResourceCard
        v-for="item in filteredResources"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
.page-enter {
  animation: fadeInUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

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

.clear-btn {
  transition:
    transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.15s ease;
}
.clear-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px -4px rgba(159, 232, 112, 0.5);
}
.clear-btn:active {
  transform: scale(0.96);
}
</style>
```

ขออภัยครับ ไฟล์ด้านบนเป็นส่วนที่ระบบ sub-agent ตอบกลับมา ผมจะบันทึกไฟล์นี้ให้ถูกต้องเลยครับ
