import { createRouter, createWebHistory } from 'vue-router';

import { useUIStore } from '@/stores/ui';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'default' },
      beforeEnter: (_to, _from, next) => {
        const store = useUIStore();
        store.setTab('all');
        next();
      },
    },
    {
      path: '/tools',
      name: 'tools',
      component: HomeView,
      meta: { layout: 'default' },
      beforeEnter: (_to, _from, next) => {
        const store = useUIStore();
        store.setTab('tool');
        next();
      },
    },
    {
      path: '/reports',
      name: 'reports',
      component: HomeView,
      meta: { layout: 'default' },
      beforeEnter: (_to, _from, next) => {
        const store = useUIStore();
        store.setTab('report');
        next();
      },
    },
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

export default router;
