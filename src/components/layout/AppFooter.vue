<script setup lang="ts">
</script>

<template>
  <footer class="mt-auto py-6 px-6 lg:px-10 border-t border-sabot-200 text-center sm:text-left text-sm text-sabot-400">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p>&copy; {{ new Date().getFullYear() }} Pharmacy Department, Sabot Hospital.</p>
      <div class="flex gap-4">
        <span class="hover:text-sabot-600 transition-colors cursor-pointer">Privacy Policy</span>
        <span class="hover:text-sabot-600 transition-colors cursor-pointer">Contact Support</span>
      </div>
    </div>
  </footer>
</template>
