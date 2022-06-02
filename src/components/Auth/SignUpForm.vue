<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';

import H1 from '@/components/small/H1.vue';
import { recaptchaVerifier } from '@/helpers/Auth/firebase';
import {
	defaultSignUpInputs,
	verifyEmailFormID,
	getPhoneCodeFormID,
	checkPhoneCodeFormID,
	additionalInformationFormID,
	disableFormInputs,
} from '@/helpers/Auth/dev_defaultSignupInputs';

import {
	isEmailVerified,
	isPhoneNumberVerified,
} from '@/helpers/Auth/isVerified';

import VerifyEmail from '@/components/Auth/Forms/VerifyEmail.vue';
import PhoneCode from './Forms/PhoneCode.vue';
import AdditionalInformation from '@/components/Auth/Forms/AdditionalInformation.vue';

if (import.meta.env.MODE == 'development') {
	defaultSignUpInputs();
}
onMounted(() => {
	recaptchaVerifier();
});
const { t } = useI18n();

watch(isEmailVerified, (newIsVerified, oldIsVerified) => {
	if (newIsVerified) {
		disableFormInputs(getPhoneCodeFormID, false);
		// disableFormInputs(verifyEmailFormID, true);
		alert('email verified successfully, got to the next step');
	}
});

watch(isPhoneNumberVerified, (newIsVerified, oldIsVerified) => {
	if (newIsVerified) {
		disableFormInputs(verifyEmailFormID, true);
		disableFormInputs(getPhoneCodeFormID, true);
		disableFormInputs(checkPhoneCodeFormID, true);
		disableFormInputs(additionalInformationFormID, false);
		alert('Phone number verified successfully, go to the next step');
	}
});

onMounted(() => {
	if (!isEmailVerified.value) {
		disableFormInputs(getPhoneCodeFormID, true);
		disableFormInputs(checkPhoneCodeFormID, true);
	}
	if (!isPhoneNumberVerified.value) {
		disableFormInputs(additionalInformationFormID, true);
	}
});
</script>

<template>
	<div class="sign-up-form my-4 sm:my-8">
		<div class="mx-auto block p-6 max-w-xl">
			<H1 class="mt-0 mb-4">{{ t('register-a-new-account') }}</H1>
			<VerifyEmail />

			<PhoneCode />

			<AdditionalInformation />
		</div>
	</div>
</template>

<style>
.min-h-16 {
	min-height: 4rem;
}
.base-input {
	@apply block w-full text-base font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition  ease-in-out  m-0  focus:text-gray-700  focus:bg-white  focus:border-blue-600  focus:outline-none;
}

.i-w-44 {
	@apply w-44 !important;
}
</style>

<style>
@import url('@/assets/css/loading-btn.css');
</style>
