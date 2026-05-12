<script setup lang="ts">
import { Building2, House, Wrench } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

type NavItem = {
  key: 'home' | 'tools' | 'department';
  label: string;
  icon: typeof House;
  path: '/' | '/tools' | '/department';
  group?: 'home' | 'department';
};

const navItems: NavItem[] = [
  { key: 'home', label: 'หน้าแรก', icon: House, path: '/', group: 'home' },
  { key: 'tools', label: 'เครื่องมือ', icon: Wrench, path: '/tools' },
  { key: 'department', label: 'กลุ่มงาน', icon: Building2, path: '/department', group: 'department' },
] as const;

function isActive(path: string): boolean {
  if (path === '/tools') {
    return route.meta.navGroup === 'tools' || route.path === '/tools' || route.path === '/reports' || route.path === '/external';
  }

  return route.path === path || route.meta.navGroup === navItems.find(item => item.path === path)?.group;
}

function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="elpatita-layout">
    <main class="elpatita-main">
      <slot />
    </main>

    <nav class="elpatita-nav">
      <div class="elpatita-nav-inner">
        <button class="elpatita-brand" aria-label="กลับไปหน้าแรก" @click="navigateTo('/')">
          <span class="elpatita-brand-mark">
            <span />
            <span />
          </span>
        </button>

        <button
          v-for="item in navItems"
          :key="item.key"
          class="elpatita-nav-item"
          :class="{ 'elpatita-nav-item--active': isActive(item.path) }"
          :aria-current="isActive(item.path) ? 'page' : undefined"
          @click="navigateTo(item.path)"
        >
          <component :is="item.icon" class="elpatita-nav-icon" :stroke-width="2" />
          <span class="elpatita-nav-label">{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.elpatita-layout {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 90px;
}

.elpatita-main {
  min-height: 100vh;
}

.elpatita-nav {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}

.elpatita-nav-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--color-bg-card);
  border-radius: 20px;
  border: 2px solid var(--color-orange);
  box-shadow: var(--shadow-float);
}

.elpatita-brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.elpatita-brand-mark {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 14px;
  background: linear-gradient(180deg, var(--color-white) 0%, #dff9fb 100%);
  box-shadow: var(--shadow-soft);
}

.elpatita-brand-mark span {
  position: absolute;
  inset: 0;
  margin: auto;
  background: var(--color-orange);
  border-radius: var(--radius-pill);
}

.elpatita-brand-mark span:first-child {
  width: 18px;
  height: 18px;
}

.elpatita-brand-mark span:last-child {
  width: 18px;
  height: 18px;
  clip-path: polygon(
    0 43%,
    43% 43%,
    43% 0,
    57% 0,
    57% 43%,
    100% 43%,
    100% 57%,
    57% 57%,
    57% 100%,
    43% 100%,
    43% 57%,
    0 57%
  );
}

.elpatita-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-gris);
  position: relative;
}

.elpatita-nav-item:hover {
  background: var(--color-orange-claro);
  color: var(--color-orange-fuerte);
}

.elpatita-nav-item:hover .elpatita-nav-icon {
  transform: translateY(-5px) rotate(10deg) scale(1.1);
}

.elpatita-nav-icon {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.elpatita-nav-item--active {
  background: var(--color-orange);
  color: var(--color-white);
}

.elpatita-nav-item--active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  width: 18px;
  height: 3px;
  background: var(--color-white);
  border-radius: 3px;
}

.elpatita-nav-icon {
  width: 22px;
  height: 22px;
}

.elpatita-nav-label {
  font-size: 0.65rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .elpatita-nav-inner {
    padding: 5px 8px;
    gap: 3px;
  }

  .elpatita-nav-item {
    padding: 6px 8px;
  }

  .elpatita-brand {
    width: 34px;
    height: 34px;
  }

  .elpatita-brand-mark {
    width: 26px;
    height: 26px;
  }

  .elpatita-nav-icon {
    width: 18px;
    height: 18px;
  }

  .elpatita-nav-label {
    font-size: 0.5rem;
  }
}

@media (max-width: 480px) {
  .elpatita-nav-inner {
    gap: 2px;
    padding: 4px 6px;
  }

  .elpatita-brand {
    width: 30px;
    height: 30px;
  }

  .elpatita-brand-mark {
    width: 22px;
    height: 22px;
  }

  .elpatita-nav-item {
    padding: 5px 6px;
  }

  .elpatita-nav-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
