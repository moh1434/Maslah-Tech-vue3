<script setup lang="ts">
// interface Props {
// 	initialValue?: number;
// }
import { useI18n } from 'vue-i18n';

import {
	verifyEmailFormI,
	verifyEmailFormID,
} from '@/helpers/Auth/dev_defaultSignupInputs';
import { createUser, loginToFireBase } from '@/helpers/Auth/firebase';
import {
	isEmailVerified,
	isPhoneNumberVerified,
	showCheckYouEmailMessage,
} from '@/helpers/Auth/isVerified';
import { startLoading, stopLoading } from '@/helpers/useLoading';

// const props = withDefaults(defineProps<Props>(), {
// 	initialValue: 0,
// });
const { t } = useI18n();

async function sendEmailVerification(event: Event) {
	const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
	const validForm = form.reportValidity();
	if (!validForm) {
		return;
	}
	startLoading(event.target as HTMLButtonElement);
	const user = await createUser(form.email.value, form.password.value);
	if (user?.emailVerified) {
		isEmailVerified.value = true;
		if (user?.phoneNumber) {
			isPhoneNumberVerified.value = true;
		}
	} else {
		alert(
			'We send a verification link to your email, open it then come back to complete the registration.'
		);
	}
	stopLoading(event.target as HTMLButtonElement);
	showCheckYouEmailMessage.value = true;
}

async function iVerifiedMyEmail(event: Event) {
	const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
	const validForm = form.reportValidity();
	if (!validForm) {
		return Promise.resolve();
	}
	startLoading(event.target as HTMLButtonElement);

	const userResponse = await loginToFireBase(
		form.email.value,
		form.password.value
	);
	stopLoading(event.target as HTMLButtonElement);
	console.log('user=', userResponse);
	if (userResponse.errors.length) {
		userResponse.errors.map((error) => {
			alert(error);
		});

		return Promise.resolve();
	}
	console.log('here');
	const user = userResponse.user;
	if (!user) {
		alert('user not found1');

		return Promise.resolve();
	}

	if (user.emailVerified) {
		isEmailVerified.value = true;
		if (user?.phoneNumber) {
			isPhoneNumberVerified.value = true;
		}
	} else {
		alert(
			'email not verified, open your email and click on "Verify your email for MaslahTech" email.'
		);
	}
}
</script>

<template>
	<section class="" v-show="!isEmailVerified">
		<form @submit.prevent="" id="verifyEmailForm">
			<div class="flex mb-2.5 direction">
				<h2 class="inline-block font-bold">{{ t('step') }}1:</h2>
				<p class="px-1">{{ t('step1_message') }}.</p>
			</div>
			<div class="mb-6">
				<input
					required
					type="email"
					name="email"
					class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
					:placeholder="t('email-address')"
				/>
			</div>
			<div class="mb-6">
				<input
					required
					type="password"
					name="password"
					class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
					:placeholder="t('password')"
				/>
			</div>

			<div class="mb-6 flex flex-wrap justify-between">
				<button
					type="submit"
					@click="sendEmailVerification($event)"
					class="
						text-sm
						bg-blue-500
						text-white
						px-3
						py-3
						rounded-lg
						mr-2
						loading-btn
					"
				>
					{{ t('send_verification') }}
				</button>

				<button
					@click="iVerifiedMyEmail($event)"
					class="
						text-sm
						bg-blue-500
						text-white
						px-3
						py-3
						rounded-lg
						ml-2
						loading-btn
					"
				>
					{{ t('i_verified_it') }}
				</button>
			</div>
		</form>
	</section>
</template>

<style></style>
