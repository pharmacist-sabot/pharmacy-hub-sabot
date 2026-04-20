<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="mt-auto px-6 lg:px-8 py-4 flex items-center justify-between"
    style="border-top: 1px solid rgba(14,15,12,0.08);"
  >
    <p class="text-xs" style="color: #868685;">
      &copy; {{ year }} Pharmacy Department, Sabot Hospital.
    </p>
    <span
      class="hidden sm:inline-flex items-center gap-1.5 text-xs"
      style="color: #868685;"
    >
      <span
        class="w-1.5 h-1.5 rounded-full"
        style="background-color: #9fe870;"
      />
      ระบบพร้อมใช้งาน
    </span>
  </footer>
</template>
