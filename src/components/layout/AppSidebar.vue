<script setup lang="ts">
import {
  BarChart3,
  LayoutGrid,
  Link,
  Pill,
  Stethoscope,
} from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useUIStore } from '@/stores/ui';

const router = useRouter();
const store = useUIStore();
const { currentTab, isMobileMenuOpen } = storeToRefs(store);
const { toggleMobileMenu } = store;

function navigateToTab(tab: 'all' | 'tool' | 'report' | 'external') {
  const routes = { all: '/', tool: '/tools', report: '/reports', external: '/external' };
  router.push(routes[tab]);
  toggleMobileMenu();
}

const navItems = [
  { key: 'all', label: 'ภาพรวมทั้งหมด', icon: LayoutGrid, testId: 'nav-all' },
  { key: 'tool', label: 'เครื่องมือปฏิบัติงาน', icon: Stethoscope, testId: 'nav-tool' },
  { key: 'report', label: 'รายงานและสถิติ', icon: BarChart3, testId: 'nav-report' },
  { key: 'external', label: 'ระบบงานภายนอก', icon: Link, testId: 'nav-external' },
] as const;
</script>

<template>
  <div>
    <!-- Mobile Overlay -->
    <Transition name="overlay">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 lg:hidden"
        style="background: rgba(14,15,12,0.35); backdrop-filter: blur(2px);"
        @click="toggleMobileMenu"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col w-72 transform transition-transform duration-300 ease-out lg:translate-x-0"
      style="background-color: #ffffff; border-right: 1px solid rgba(14,15,12,0.08);"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Brand -->
      <div
        class="h-[68px] flex items-center px-6 shrink-0"
        style="border-bottom: 1px solid rgba(14,15,12,0.08);"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style="background-color: #9fe870;"
          >
            <Pill class="w-5 h-5" style="color: #163300;" :stroke-width="2.2" />
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-bold text-[15px]" style="color: #0e0f0c;">
              Pharmacy Hub
            </span>
            <span class="text-[10px] font-medium mt-0.5 tracking-wider uppercase" style="color: #868685;">
              Sabot Hospital
            </span>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto custom-scrollbar px-3 py-4">
        <p class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest" style="color: #868685;">
          เมนูหลัก
        </p>

        <ul class="space-y-0.5">
          <li v-for="item in navItems" :key="item.key">
            <button
              :data-testid="item.testId"
              class="nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 outline-none text-left"
              :class="currentTab === item.key ? 'nav-btn--active' : 'nav-btn--idle'"
              @click="navigateToTab(item.key)"
            >
              <span
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                :class="currentTab === item.key ? 'nav-icon--active' : 'nav-icon--idle'"
              >
                <component :is="item.icon" class="w-4 h-4" :stroke-width="2" />
              </span>
              <span class="flex-1">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Version tag -->
      <div
        class="shrink-0 px-6 py-4"
        style="border-top: 1px solid rgba(14,15,12,0.08);"
      >
        <span class="text-[11px]" style="color: #868685;">Pharmacy Hub &mdash; Sabot Hospital</span>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.nav-btn--active {
  background-color: #f0fbe8;
  color: #163300;
  font-weight: 600;
}
.nav-btn--idle {
  color: #454745;
}
.nav-btn--idle:hover {
  background-color: #f7faf4;
  color: #0e0f0c;
}

.nav-icon--active {
  background-color: #9fe870;
  color: #163300;
}
.nav-icon--idle {
  background-color: transparent;
  color: #868685;
}
.nav-btn--idle:hover .nav-icon--idle {
  background-color: #e2f6d5;
  color: #163300;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(159, 232, 112, 0.3);
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9fe870;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
