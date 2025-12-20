<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-sabot-bg px-4">
    <div class="text-center">
      <h1 class="text-9xl font-black text-sabot-medium/30">
        404
      </h1>

      <div class="-mt-12 relative z-10 space-y-6">
        <h2 class="text-3xl font-bold text-sabot-dark">
          ไม่พบหน้าที่คุณต้องการ
        </h2>
        <p class="text-gray-600 max-w-md mx-auto">
          หน้าที่คุณกำลังค้นหาอาจถูกลบ ย้าย หรือไม่มีอยู่ในระบบ
        </p>

        <RouterLink
          to="/"
          class="inline-block px-8 py-3 rounded-lg bg-sabot-dark text-white font-medium shadow-md transition-all hover:bg-sabot-darkest hover:-translate-y-1"
        >
          กลับสู่หน้าหลัก
        </RouterLink>
      </div>
    </div>
  </div>
</template>
