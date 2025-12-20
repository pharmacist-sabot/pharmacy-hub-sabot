<script setup lang="ts">
import {
  AlertTriangle,
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

// Map string definition to actual Component
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
  <div
    class="bg-white rounded-xl p-8 text-center shadow-sm border-b-4 border-sabot-light transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-sabot-dark group flex flex-col h-full"
  >
    <!-- Icon -->
    <div class="mb-4 flex justify-center">
      <component
        :is="currentIcon"
        class="w-12 h-12 text-sabot-medium transition-colors duration-300 group-hover:text-sabot-dark"
        :stroke-width="1.5"
      />
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold text-sabot-dark mb-2">
      {{ item.title }}
    </h3>
    <p class="text-gray-600 mb-6 text-sm grow">
      {{ item.description }}
    </p>

    <!-- Action -->
    <div class="mt-auto">
      <a
        v-if="item.isActive"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-6 py-2.5 rounded-lg bg-sabot-medium text-white font-medium transition-all hover:bg-sabot-dark hover:shadow-md"
      >
        {{ item.type === "tool" ? "เปิดระบบ" : "ดูรายงาน" }}
      </a>
      <span
        v-else
        class="inline-block px-6 py-2.5 rounded-lg bg-gray-100 text-gray-400 font-medium cursor-not-allowed"
      >
        อยู่ระหว่างดำเนินการ
      </span>
    </div>
  </div>
</template>
