<script setup lang="ts">
import {
  BarChart3,
  LayoutGrid,
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

function navigateToTab(tab: 'all' | 'tool' | 'report') {
  const routes = { all: '/', tool: '/tools', report: '/reports' };
  router.push(routes[tab]);
}
</script>

<template>
  <div>
    <!-- Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
      @click="toggleMobileMenu"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-72 bg-sabot-700 border-r border-sabot-600 shadow-xl transform transition-transform duration-300 lg:translate-x-0 lg:shadow-none text-white flex flex-col"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Brand -->
      <div class="h-20 flex items-center px-8 border-b border-sabot-600 shrink-0">
        <div class="flex items-center gap-3">
          <div class="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
            <Pill class="w-6 h-6 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-lg leading-tight tracking-wide">Pharmacy Hub</span>
            <span class="text-[10px] text-sabot-200 font-medium tracking-wide">SABOT HOSPITAL</span>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 mb-2 text-xs font-semibold text-sabot-300 uppercase tracking-wider">
          Main Menu
        </div>

        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all outline-none"
          :class="currentTab === 'all' ? 'bg-sabot-600 text-white shadow-lg shadow-sabot-900/20' : 'text-sabot-100 hover:bg-sabot-600/50 hover:text-white'"
          @click="navigateToTab('all')"
        >
          <LayoutGrid class="w-5 h-5" />
          ภาพรวมทั้งหมด
        </button>

        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all outline-none"
          :class="currentTab === 'tool' ? 'bg-sabot-600 text-white shadow-lg shadow-sabot-900/20' : 'text-sabot-100 hover:bg-sabot-600/50 hover:text-white'"
          @click="navigateToTab('tool')"
        >
          <Stethoscope class="w-5 h-5" />
          เครื่องมือปฏิบัติงาน
        </button>

        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all outline-none"
          :class="currentTab === 'report' ? 'bg-sabot-600 text-white shadow-lg shadow-sabot-900/20' : 'text-sabot-100 hover:bg-sabot-600/50 hover:text-white'"
          @click="navigateToTab('report')"
        >
          <BarChart3 class="w-5 h-5" />
          รายงานและสถิติ
        </button>
      </div>

      <!-- User Profile Footer -->
      <div class="p-4 border-t border-sabot-600 bg-sabot-800/30 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-sabot-500 text-white flex items-center justify-center font-bold shadow-md border-2 border-sabot-400">
            Rx
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-white">ห้องยา</span>
            <span class="text-xs text-sabot-300">ผู้ใช้งานทั่วไป</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
