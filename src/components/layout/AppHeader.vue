<script setup lang="ts">
import { ArrowLeft, Menu, Pill, Search, X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';

import { useUIStore } from '@/stores/ui';

const store = useUIStore();
const { searchQuery } = storeToRefs(store);
const { toggleMobileMenu } = store;

const isMobileSearchOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

async function toggleMobileSearch() {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  if (isMobileSearchOpen.value) {
    await nextTick();
    searchInput.value?.focus();
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-30 h-16 flex items-center"
    style="background-color: #ffffff; border-bottom: 1px solid rgba(14,15,12,0.08);"
  >
    <!-- ── DESKTOP layout (lg+) ── -->
    <div class="hidden lg:flex w-full items-center px-8 gap-4">
      <!-- Search bar — centered, max width -->
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Search
            class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style="color: #868685;"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเครื่องมือ..."
            class="search-input w-full pl-10 pr-9 py-2.5 text-sm rounded-2xl outline-none transition-all"
            style="
              background-color: #f7faf4;
              border: 1.5px solid rgba(14,15,12,0.08);
              color: #0e0f0c;
            "
          >
          <button
            v-if="searchQuery"
            aria-label="ล้างการค้นหา"
            class="clear-btn absolute right-3 top-1/2 -translate-y-1/2"
            @click="searchQuery = ''"
          >
            <X class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── MOBILE layout (<lg) ── -->
    <div class="flex lg:hidden w-full items-center px-4 gap-3">
      <!-- Hamburger -->
      <button
        aria-label="เปิดเมนู"
        class="icon-btn shrink-0"
        @click="toggleMobileMenu"
      >
        <Menu class="w-5 h-5" />
      </button>

      <!-- Brand (hidden when search is open) -->
      <div
        v-show="!isMobileSearchOpen"
        class="flex items-center gap-2 flex-1"
      >
        <div
          class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style="background-color: #9fe870;"
        >
          <Pill class="w-4 h-4" style="color: #163300;" :stroke-width="2.2" />
        </div>
        <span class="font-semibold text-sm" style="color: #0e0f0c;">Pharmacy Hub</span>
      </div>

      <!-- Spacer when brand visible -->
      <div v-show="!isMobileSearchOpen" class="flex-1" />

      <!-- Search toggle button (when closed) -->
      <button
        v-show="!isMobileSearchOpen"
        class="icon-btn shrink-0"
        aria-label="ค้นหา"
        @click="toggleMobileSearch"
      >
        <Search class="w-5 h-5" />
      </button>

      <!-- Expanded mobile search bar -->
      <Transition name="search-expand">
        <div
          v-if="isMobileSearchOpen"
          class="absolute inset-x-0 top-0 h-full flex items-center px-4 gap-3 z-40"
          style="background-color: #ffffff;"
        >
          <button
            class="icon-btn shrink-0"
            aria-label="ปิดค้นหา"
            @click="toggleMobileSearch"
          >
            <ArrowLeft class="w-5 h-5" />
          </button>
          <div class="relative flex-1">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style="color: #868685;"
            />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาเครื่องมือ..."
              class="search-input w-full pl-9 pr-9 py-2.5 text-sm rounded-2xl outline-none"
              style="
                background-color: #f7faf4;
                border: 1.5px solid rgba(14,15,12,0.08);
                color: #0e0f0c;
              "
            >
            <button
              v-if="searchQuery"
              aria-label="ล้างการค้นหา"
              class="clear-btn absolute right-3 top-1/2 -translate-y-1/2"
              @click="searchQuery = ''"
            >
              <X class="w-3 h-3" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.icon-btn {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #454745;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  outline: none;
  flex-shrink: 0;
}
.icon-btn:hover {
  background-color: #f0fbe8;
  color: #163300;
}
.icon-btn:active {
  background-color: #e2f6d5;
}

.clear-btn {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: rgba(14, 15, 12, 0.08);
  color: #868685;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  outline: none;
}
.clear-btn:hover {
  background-color: #e2f6d5;
  color: #163300;
}

.search-input::placeholder {
  color: #adb5a8;
  font-weight: 400;
}
.search-input:focus {
  border-color: #9fe870 !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(159, 232, 112, 0.15);
}

.search-expand-enter-active,
.search-expand-leave-active {
  transition: opacity 0.15s ease;
}
.search-expand-enter-from,
.search-expand-leave-to {
  opacity: 0;
}
</style>
