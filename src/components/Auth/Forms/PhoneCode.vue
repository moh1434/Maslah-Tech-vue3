<script setup lang="ts">
import {
	checkPhoneCodeFormI,
	checkPhoneCodeFormID,
	disableFormInputs,
	getPhoneCodeFormI,
	getPhoneCodeFormID,
} from '@/helpers/Auth/dev_defaultSignupInputs';
import { linkPhone, submitPhoneNumberAuthCode } from '@/helpers/Auth/firebase';
import {
	isEmailVerified,
	isPhoneNumberVerified,
	showCheckYouEmailMessage,
} from '@/helpers/Auth/isVerified';
import { startLoading, stopLoading } from '@/helpers/useLoading';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

async function getPhoneCode(event: Event) {
	//Form validated from HTML5
	const getPhoneCodeForm = document.getElementById(
		getPhoneCodeFormID
	) as getPhoneCodeFormI;

	startLoading(getPhoneCodeForm.button as HTMLButtonElement);
	linkPhone(getPhoneCodeForm.phone_number.value)?.then(() => {
		alert(
			'Phone verification code has been sent to your mobile via SMS message.'
		);
		stopLoading(getPhoneCodeForm.button as HTMLButtonElement);
		disableFormInputs(checkPhoneCodeFormID, false);
	});
}

async function checkPhoneCode(event: Event) {
	console.log('checkPhoneCode');
	//Form validated from HTML5
	const checkPhoneCodeForm = document.getElementById(
		checkPhoneCodeFormID
	) as checkPhoneCodeFormI;

	startLoading(checkPhoneCodeForm.button as HTMLButtonElement);
	const response = await submitPhoneNumberAuthCode(
		checkPhoneCodeForm.check_number.value
	);
	stopLoading(checkPhoneCodeForm.button as HTMLButtonElement);

	if (response.errors.length) {
		response.errors.map((err: Error) => alert(err));
		return Promise.resolve();
	}
	if (!response.user) {
		alert('user not found2');
		return Promise.resolve();
	}
	if (!response.user.phoneNumber) {
		alert('Wrong confirm code, try again');
		return Promise.resolve();
	}
	isPhoneNumberVerified.value = true;
}
</script>

<template>
	<section class="relative py-4" v-show="!isPhoneNumberVerified">
		<span
			v-if="!isEmailVerified"
			v-show="showCheckYouEmailMessage"
			class="absolute -top-5 text-xs sm:text-sm"
			>{{ t('email_verify_hint') }}
		</span>
		<div class="flex mb-2.5 direction">
			<h2 class="inline-block font-bold">{{ t('step') }}2:</h2>
			<p class="px-1">{{ t('step2_message') }}.</p>
		</div>
		<div class="sm:flex">
			<form
				@submit.prevent="getPhoneCode($event)"
				id="getPhoneCodeForm"
				class="mb-6 flex sm:w-1/2"
			>
				<input
					type="text"
					pattern="^\+9647[0-9]{9}$"
					required
					name="phone_number"
					value="+9647"
					placeholder="+9647000000000"
					class="no-direction base-input pl-3 md:pl-4 py-1.5 md:py-2.5"
				/>
				<button
					type="submit"
					name="button"
					id="recaptchaVerifierButton"
					class="
						text-sm
						bg-blue-500
						text-white
						w-32
						rounded-r-lg
						sm:mr-3
						loading-btn
					"
				>
					{{ t('get-code') }}
				</button>
			</form>
			<form
				@submit.prevent="checkPhoneCode($event)"
				id="checkPhoneCodeForm"
				class="mb-6 flex sm:w-1/2"
			>
				<input
					type="number"
					required
					name="check_number"
					placeholder="sms code"
					class="no-direction base-input sm:ml-2 pl-3 md:pl-4 py-1.5 md:py-2.5"
				/>
				<button
					class="text-sm bg-blue-500 text-white w-32 rounded-r-lg loading-btn"
					type="submit"
					name="button"
				>
					{{ t('check') }}
				</button>
			</form>
		</div>
	</section>
</template>

<style></style>
