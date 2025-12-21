<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<template>
  <div class="min-h-screen bg-sabot-100">
    <AppSidebar />

    <main class="lg:ml-72 min-h-screen flex flex-col transition-all duration-300">
      <AppHeader />

      <div class="flex-1 p-6 lg:p-10">
        <slot />
      </div>

      <AppFooter />
    </main>
  </div>
</template>
