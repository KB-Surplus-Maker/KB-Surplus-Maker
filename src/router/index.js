import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import DashBoard from '@/pages/DashBoard.vue';
import TransactionHistory from '@/pages/TransactionHistory.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
    },
    {
      path: '/history',
      name: 'history',
      component: TransactionHistory,
    },
  ],
});

export default router;
