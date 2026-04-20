<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<template>
  <div class="min-h-screen" style="background-color: #f7faf4;">
    <AppSidebar />

    <main class="lg:ml-72 min-h-screen flex flex-col transition-all duration-300">
      <AppHeader />

      <div class="flex-1 p-5 lg:p-8">
        <slot />
      </div>

      <AppFooter />
    </main>
  </div>
</template>
