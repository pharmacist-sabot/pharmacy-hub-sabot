<script setup lang="ts">
</script>

<template>
  <footer class="mt-auto py-6 px-6 lg:px-10 border-t border-sabot-200 text-center sm:text-left text-sm text-sabot-400">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p>&copy; {{ new Date().getFullYear() }} Pharmacy Department, Sabot Hospital.</p>
      <div class="flex gap-4">
        <!-- TODO: Add actual privacy policy page -->
        <a href="#" class="hover:text-sabot-600 transition-colors" title="Coming Soon" @click.prevent>Privacy Policy</a>
        <!-- TODO: Add actual support page or mailto link -->
        <a href="#" class="hover:text-sabot-600 transition-colors" title="Coming Soon" @click.prevent>Contact Support</a>
      </div>
    </div>
  </footer>
</template>
