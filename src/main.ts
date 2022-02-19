import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router/index.js';

import i18n from '@/i18n';

createApp(App).use(i18n).use(createPinia()).use(router).mount('#app');
