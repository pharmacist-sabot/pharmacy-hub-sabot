<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />

    <main class="grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
