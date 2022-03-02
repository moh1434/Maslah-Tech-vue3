import {
  createWebHistory,
  createWebHashHistory,
  createRouter,
} from 'vue-router';
import Index from '@/pages/index.vue';

// console.log('meta.env.MODE=', import.meta.env.MODE);

const history = createWebHistory();
const routes = [
  { path: '/', name: 'index', component: Index },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/pages/SignUp.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/pages/Categories.vue'),
  },
  {
    path: '/services/:categoryId',
    name: 'services',
    component: () => import('@/pages/Services.vue'),
  },

  {
    path: '/404',
    alias: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404.vue'),
  },
];
const router = createRouter({ history, routes });
export default router;
