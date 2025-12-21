import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';

import type { TabType } from '@/stores/ui';

import { useUIStore } from '@/stores/ui';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

// Helper to create tab routes with consistent configuration
function createTabRoute(path: string, name: string, tab: TabType): RouteRecordRaw {
  return {
    path,
    name,
    component: HomeView,
    meta: { layout: 'default', tab },
  };
}

// Tab routes configuration
const tabRoutes: RouteRecordRaw[] = [
  createTabRoute('/', 'home', 'all'),
  createTabRoute('/tools', 'tools', 'tool'),
  createTabRoute('/reports', 'reports', 'report'),
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...tabRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { layout: 'blank' },
    },
  ],

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Global navigation guard to handle tab changes
router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const tab = to.meta.tab as TabType | undefined;
  if (tab) {
    const store = useUIStore();
    store.setTab(tab);
  }
  next();
});

export default router;
