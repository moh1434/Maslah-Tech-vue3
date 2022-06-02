import { computed, ComputedRef } from 'vue';
import i18n from '@/i18n';
const { locale } = i18n.global;

const cssDirection: ComputedRef<'rtl' | 'ltr'> = computed(() =>
	locale.value == 'ar' ? 'rtl' : 'ltr'
);
export default cssDirection;
