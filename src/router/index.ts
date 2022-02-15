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
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404.vue'),
  },
];
const router = createRouter({ history, routes });
export default router;
