<script setup lang="ts">
import { computed } from 'vue';

import ResourceCard from '@/components/common/ResourceCard.vue';
import { pharmacyResources } from '@/data/resources';

// Filter only Tools
const tools = computed(() =>
  pharmacyResources.filter(r => r.type === 'tool'),
);
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      id="hero"
      class="relative h-[90vh] sm:h-150 flex items-center justify-center bg-sabot-dark text-white px-4 text-center -mt-8 mb-16"
    >
      <div class="z-10 max-w-3xl">
        <h1 class="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
          Pharmacy Hub Sabot
        </h1>
        <p
          class="text-lg sm:text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto"
        >
          ศูนย์รวมเครื่องมือและข้อมูลงานเภสัชกรรมฯ โรงพยาบาลสระโบสถ์
        </p>
        <a
          href="#tools"
          class="inline-block bg-white text-sabot-dark font-bold px-10 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          เริ่มต้นใช้งาน
        </a>
      </div>

      <!-- Decorative Background Pattern (Optional) -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"
      />
    </section>

    <!-- Tools Grid -->
    <section id="tools" class="container mx-auto px-4 pb-20 scroll-mt-22.5">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-sabot-dark mb-2">
          เครื่องมือและระบบงาน
        </h2>
        <div class="h-1 w-20 bg-sabot-light mx-auto rounded-full" />
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ResourceCard v-for="tool in tools" :key="tool.id" :item="tool" />
      </div>
    </section>
  </div>
</template>
