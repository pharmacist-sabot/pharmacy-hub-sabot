<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next';
import { computed } from 'vue';

import ResourceCard from '@/components/common/ResourceCard.vue';
import { pharmacyResources } from '@/data/resources';

// Filter only Reports
const reports = computed(() =>
  pharmacyResources.filter(r => r.type === 'report'),
);
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-10 pb-6 border-b border-gray-200">
      <div class="bg-sabot-light/20 p-3 rounded-xl">
        <BarChart3 class="w-8 h-8 text-sabot-dark" />
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-sabot-dark">
          รายงานและสถิติ
        </h1>
        <p class="text-gray-500">
          ติดตามตัวชี้วัดและข้อมูลการดำเนินงาน
        </p>
      </div>
    </div>

    <!-- Reports Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ResourceCard v-for="report in reports" :key="report.id" :item="report" />
    </div>
  </div>
</template>
