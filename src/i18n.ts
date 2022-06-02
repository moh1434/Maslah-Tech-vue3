//Start i18n
import { createI18n } from 'vue-i18n';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const currentLocale: 'en' | 'ar' =
	localStorage.getItem('currentLocale') == 'ar' ? 'ar' : 'en';
export default createI18n({
	legacy: false, // use composition api
	locale: currentLocale, // set locale
	availableLocales: ['ar', 'en'],
	fallbackLocale: 'en', // set fallback locale
	messages: {
		en,
		ar,
	},
});
//End i18n
