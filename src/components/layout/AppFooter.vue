<script setup lang="ts">
import { Mail, Phone } from 'lucide-vue-next';
</script>

<template>
  <footer id="footer" class="bg-sabot-dark text-white py-10 mt-auto">
    <div class="container mx-auto px-4 text-center">
      <h3 class="font-bold text-lg mb-4">
        กลุ่มงานเภสัชกรรมฯ โรงพยาบาลสระโบสถ์
      </h3>

      <div
        class="flex flex-wrap justify-center gap-6 mb-6 text-sm sm:text-base"
      >
        <a
          href="mailto:pharmacistsabot@gmail.com"
          class="flex items-center gap-2 hover:text-sabot-light transition-colors"
        >
          <Mail class="w-4 h-4 text-sabot-light" />
          pharmacistsabot@gmail.com
        </a>
        <span class="flex items-center gap-2">
          <Phone class="w-4 h-4 text-sabot-light" />
          036-776240 ต่อ 104
        </span>
      </div>

      <div class="text-white/70 text-sm">
        &copy; {{ new Date().getFullYear() }} สงวนลิขสิทธิ์
      </div>
    </div>
  </footer>
</template>
