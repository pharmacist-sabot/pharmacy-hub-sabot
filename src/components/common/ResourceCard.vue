<script setup lang="ts">
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  Banknote,
  BarChart3,
  Calculator,
  CalendarRange,
  ClipboardList,
  FileDown,
  FileSignature,
  PieChart,
  Pill,
  Siren,
  Users,
} from 'lucide-vue-next';
import { computed } from 'vue';

import type { ResourceItem } from '@/types/resource';

const props = defineProps<{
  item: ResourceItem;
}>();

const iconMap: Record<string, any> = {
  AlertTriangle,
  FileSignature,
  Calculator,
  Baby,
  FileDown,
  Pill,
  Siren,
  ClipboardList,
  BarChart3,
  PieChart,
  CalendarRange,
  Banknote,
  Users,
};

const currentIcon = computed(() => iconMap[props.item.iconName] || Pill);
</script>

<template>
  <a
    :href="item.isActive ? item.url : undefined"
    :target="item.isActive ? '_blank' : undefined"
    :aria-disabled="!item.isActive"
    class="bg-white rounded-2xl p-6 border border-sabot-200/60 shadow-soft relative group tool-card-hover flex flex-col h-full"
    :class="{ 'opacity-80 grayscale-[0.8] cursor-not-allowed bg-gray-50 pointer-events-none': !item.isActive }"
  >
    <!-- Status Badge -->
    <div class="absolute top-6 right-6">
      <span v-if="item.isActive" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sabot-50 text-sabot-600 border border-sabot-200">
        <span class="w-1.5 h-1.5 rounded-full bg-sabot-500 animate-pulse" />
        ONLINE
      </span>
      <span v-else class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
        MAINTENANCE
      </span>
    </div>

    <!-- Icon & Header -->
    <div class="mb-4">
      <div class="w-14 h-14 rounded-xl bg-sabot-50 border border-sabot-100 flex items-center justify-center text-sabot-500 group-hover:bg-sabot-500 group-hover:text-white group-hover:border-sabot-500 transition-all duration-300 shadow-sm">
        <component :is="currentIcon" class="w-7 h-7" :stroke-width="2" />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-sabot-700 transition-colors">
        {{ item.title }}
      </h3>
      <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
        {{ item.description }}
      </p>
    </div>

    <!-- Footer Action -->
    <div class="pt-4 border-t border-sabot-50 flex items-center justify-between mt-auto">
      <span class="text-xs font-semibold text-sabot-300 uppercase tracking-wider">
        {{ item.type === 'tool' ? 'Application' : 'Dashboard' }}
      </span>
      <span v-if="item.isActive" class="flex items-center text-sm font-bold text-sabot-600 group-hover:translate-x-1 transition-transform">
        เปิดใช้งาน <ArrowRight class="w-4 h-4 ml-1" />
      </span>
      <span v-else class="text-xs text-gray-400 font-medium">Coming Soon</span>
    </div>
  </a>
</template>
