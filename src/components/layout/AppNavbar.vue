<script setup lang="ts">
import { Menu, Pill, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);

const navLinks = [
  { name: 'หน้าหลัก', path: '/', hash: '#hero' }, // Handle anchor scroll logic later if needed
  { name: 'เครื่องมือ', path: '/', hash: '#tools' },
  { name: 'รายงาน', path: '/reports', hash: '' },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <header class="sticky top-0 z-50 bg-sabot-darkest shadow-md">
    <nav
      class="container mx-auto px-4 h-17.5 flex items-center justify-between"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-3 text-white no-underline"
        @click="closeMenu"
      >
        <Pill class="w-6 h-6" />
        <div class="flex flex-col leading-tight">
          <span class="font-bold text-lg">กลุ่มงานเภสัชกรรมฯ</span>
          <span
            class="text-xs text-white/80 font-light border-l border-white/30 pl-2 ml-1 hidden sm:inline-block"
          >
            โรงพยาบาลสระโบสถ์
          </span>
        </div>
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex gap-8">
        <li v-for="link in navLinks" :key="link.name">
          <RouterLink
            :to="{ path: link.path, hash: link.hash }"
            class="text-white relative py-1 hover:text-sabot-bg transition-colors"
            :class="{ 'font-bold': isActive(link.path) && !link.hash }"
          >
            {{ link.name }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-sabot-light transition-all duration-300 group-hover:w-full"
            />
          </RouterLink>
        </li>
        <li>
          <a
            href="#footer"
            class="text-white hover:text-sabot-bg transition-colors"
          >ติดต่อเรา</a>
        </li>
      </ul>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden text-white focus:outline-none"
        @click="toggleMenu"
      >
        <X v-if="isMenuOpen" class="w-8 h-8" />
        <Menu v-else class="w-8 h-8" />
      </button>
    </nav>

    <!-- Mobile Drawer Overlay -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="closeMenu"
    />

    <!-- Mobile Drawer Content -->
    <div
      class="fixed top-0 right-0 h-full w-70 bg-sabot-dark z-50 shadow-2xl transform transition-transform duration-300 md:hidden pt-20"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <ul class="flex flex-col">
        <li v-for="link in navLinks" :key="link.name">
          <RouterLink
            :to="{ path: link.path, hash: link.hash }"
            class="block px-8 py-4 text-white text-lg hover:bg-sabot-medium border-b border-white/10"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
        </li>
        <li>
          <a
            href="#footer"
            class="block px-8 py-4 text-white text-lg hover:bg-sabot-medium"
            @click="closeMenu"
          >
            ติดต่อเรา
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
