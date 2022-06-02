import i18n from '@/i18n';
const { locale } = i18n.global;

function setLocale(newLocale: 'en' | 'ar') {
	locale.value = newLocale;
	localStorage.setItem('currentLocale', newLocale);
}

export default setLocale;
