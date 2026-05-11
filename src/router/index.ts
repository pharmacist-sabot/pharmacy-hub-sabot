import { createRouter, createWebHistory } from 'vue-router';
import { useUIStore } from '@/stores/ui';

import DepartmentView from '@/views/DepartmentView.vue';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ToolsView from '@/views/ToolsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { tab: 'all', navGroup: 'home' },
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsView,
      meta: { tab: 'tool', navGroup: 'tools' },
    },
    {
      path: '/reports',
      name: 'reports',
      component: ToolsView,
      meta: { tab: 'report', navGroup: 'tools' },
    },
    {
      path: '/external',
      name: 'external',
      component: ToolsView,
      meta: { tab: 'external', navGroup: 'tools' },
    },
    {
      path: '/department',
      name: 'department',
      component: DepartmentView,
      meta: { navGroup: 'department' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const store = useUIStore();
  const nextTab = to.meta.tab;

  if (nextTab === 'all' || nextTab === 'tool' || nextTab === 'report' || nextTab === 'external') {
    store.setTab(nextTab);
  }
});

export default router;
