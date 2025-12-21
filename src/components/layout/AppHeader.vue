<script setup lang="ts">
import { ArrowLeft, Bell, Menu, Pill, Search, X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';

import { useUIStore } from '@/stores/ui';

const store = useUIStore();
const { searchQuery } = storeToRefs(store);
const { toggleMobileMenu } = store;

const isMobileSearchOpen = ref(false);

const searchInput = ref<HTMLInputElement | null>(null);

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12)
    return 'สวัสดีตอนเช้า';
  if (hour < 18)
    return 'สวัสดีตอนบ่าย';
  return 'สวัสดีตอนเย็น';
}

async function toggleMobileSearch() {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;

  if (isMobileSearchOpen.value) {
    await nextTick();
    searchInput.value?.focus();
  }
}
</script>

<template>
  <header class="h-16 lg:h-20 px-4 lg:px-10 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-sabot-200 shadow-sm transition-all duration-300">
    <div v-show="!isMobileSearchOpen" class="flex items-center gap-3 lg:gap-4 flex-1">
      <button
        aria-label="เปิดเมนู"
        class="lg:hidden p-2 -ml-2 text-sabot-700 hover:bg-sabot-50 rounded-lg transition-colors"
        @click="toggleMobileMenu"
      >
        <Menu class="w-6 h-6" />
      </button>

      <div class="flex items-center gap-2 lg:hidden">
        <div class="bg-sabot-100 p-1.5 rounded-lg">
          <Pill class="w-5 h-5 text-sabot-600" />
        </div>
        <div class="flex flex-col leading-none">
          <span class="font-bold text-sabot-800 text-sm">Pharmacy Hub</span>
          <span class="text-[10px] text-sabot-400">Sabot Hospital</span>
        </div>
      </div>

      <div class="hidden lg:block">
        <h1 class="text-xl font-bold text-sabot-700">
          {{ getGreeting() }}, เภสัชกร
        </h1>
        <p class="text-sm text-sabot-500 font-medium">
          พร้อมสำหรับการทำงานในวันนี้
        </p>
      </div>
    </div>

    <div
      class="flex-1 max-w-md mx-4 transition-all duration-300"
      :class="isMobileSearchOpen ? 'w-full absolute inset-x-0 top-0 h-full bg-white z-40 px-4 flex items-center' : 'hidden lg:flex'"
    >
      <div class="relative group w-full flex items-center gap-2">
        <button
          v-if="isMobileSearchOpen"
          aria-label="ปิดการค้นหา"
          class="lg:hidden p-2 text-sabot-500"
          @click="toggleMobileSearch"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>

        <div class="relative w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sabot-400 group-focus-within:text-sabot-600 transition-colors" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเครื่องมือ..."
            class="w-full bg-sabot-50 border border-sabot-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-sabot-500/20 focus:border-sabot-500 block pl-9 p-2.5 transition-all outline-none placeholder:text-sabot-300"
          >
          <button
            v-if="searchQuery"
            aria-label="ล้างการค้นหา"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            @click="searchQuery = ''"
          >
            <X class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <div v-show="!isMobileSearchOpen" class="flex items-center gap-1 lg:gap-2">
      <button
        aria-label="ค้นหา"
        class="lg:hidden p-2 text-sabot-500 hover:text-sabot-700 hover:bg-sabot-50 rounded-lg transition-colors"
        @click="toggleMobileSearch"
      >
        <Search class="w-5 h-5" />
      </button>

      <button aria-label="การแจ้งเตือน" class="p-2 text-sabot-400 hover:text-sabot-600 hover:bg-sabot-50 rounded-lg transition-colors relative">
        <Bell class="w-5 h-5" />
        <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
    </div>
  </header>
</template>
