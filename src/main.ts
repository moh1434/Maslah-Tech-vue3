import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router/index.js';

import i18n from '@/i18n';

//start Auth
import firebase from 'firebase'; // 8.2.4

const firebaseConfig = {
	apiKey: 'AIzaSyAMFyvesNu6RxWStgeLFbfzKO756GIX4Xo',
	authDomain: 'maslahtech-828b0.firebaseapp.com',
	projectId: 'maslahtech-828b0',
	storageBucket: 'maslahtech-828b0.appspot.com',
	messagingSenderId: '996304144768',
	appId: '1:996304144768:web:d01550c20282a928a91965',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();
//end Auth

createApp(App).use(i18n).use(createPinia()).use(router).mount('#app');
