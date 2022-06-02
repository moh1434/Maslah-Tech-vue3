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
    path: '/profile/:userId',
    name: 'profile',
    component: () => import('@/pages/Profile.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/pages/About.vue'),
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
    path: '/service/:serviceId',
    name: 'service',
    component: () => import('@/pages/Service.vue'),
  },
  {
    path: '/make-service/:serviceId?',
    name: 'add-edit-service',
    component: () => import('@/pages/AddEditService.vue'),
  },
  {
    path: '/make-portfolio/:portfolioId?',
    name: 'add-edit-portfolio',
    component: () => import('@/pages/AddEditPortfolio.vue'),
  },
  {
    path: '/orders/',
    name: 'orders',
    component: () => import('@/pages/Orders.vue'),
  },
  {
    path: '/order-history/:orderId',
    name: 'order-history',
    component: () => import('@/pages/OrderHistory.vue'),
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
