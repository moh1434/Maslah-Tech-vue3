<script setup lang="ts">
import { useI18n } from 'vue-i18n';
// import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import { loginToFireBase } from '@/helpers/Auth/firebase';
import { defaultLogInInputs } from '@/helpers/Auth/dev_defaultSignupInputs';
import { refreshLocalUserData } from '@/helpers/Auth/localAuth';
import { startLoading, stopLoading } from '@/helpers/useLoading';
import { useRouter } from 'vue-router';
import { api, apiWrapper, errorAlerter } from '@/api/axios';
import { userI } from '@/types/UserI';
// import RemeberMeForgotPassword from '../RemeberMeForgotPassword.vue';
const { t } = useI18n();
if (import.meta.env.MODE == 'development') {
	defaultLogInInputs();
}

const router = useRouter();

async function login(event: Event) {
	const form = event.target as HTMLFormElement;
	console.log('loginnnn');
	console.log(form.email.value, form.password.value);
	startLoading(form['login-btn'] as HTMLButtonElement);
	const response = await loginToFireBase(form.email.value, form.password.value);

	let uid = response.user?.uid;

	if (response.errors.length) {
		response.errors.map((err: any) => {
			if (err instanceof Object && err?.code == 'auth/user-not-found') {
				console.log(err);
				alert('Wrong email and password.');
			} else if (err instanceof Object && err?.code) {
				console.log(err);
				alert(err?.code);
			} else {
				console.log(err);
				alert(err);
			}
		});
		stopLoading(form['login-btn'] as HTMLButtonElement);
		return Promise.resolve();
	}
	if (typeof uid !== 'string') {
		alert('Unknown error, may be slow internet');
		stopLoading(form['login-btn'] as HTMLButtonElement);
		return Promise.resolve();
	}

	const token = await response.user?.getIdToken(true);
	if (typeof token !== 'string') {
		alert('Unknown error, may be slow internet');
		stopLoading(form['login-btn'] as HTMLButtonElement);
		return Promise.resolve();
	}

	const { response: userRes, errors } = await apiWrapper<userI>(
		async () => await api.get<{ data: userI }>(`/user/${uid}`)
	);
	if (errors) {
		stopLoading(form['login-btn'] as HTMLButtonElement);
		errorAlerter(errors);
		return Promise.resolve();
	}
	if (!userRes?.data) {
		alert('Unknown error');
		stopLoading(form['login-btn'] as HTMLButtonElement);
		return Promise.resolve();
	}
	const user = userRes.data.data;

	const userData = {
		name: user?.name,
		email: user?.email,
		id: user?.id,
		picture: user?.picture,
	};
	localStorage.setItem('token', token);
	localStorage.setItem('userData', JSON.stringify(userData));
	refreshLocalUserData();
	stopLoading(form['login-btn'] as HTMLButtonElement);
	router.push({ name: 'categories' });
}
</script>

<template>
	<section class="mx-6 my-10 md:my-20">
		<div class="max-w-md mx-auto text-gray-800">
			<div class="">
				<img
					src="@/assets/imgs/loginDraw1.svg"
					class="w-full"
					alt="login-form"
				/>
			</div>
			<div class="m-3">
				<form id="login-form" @submit.prevent="login($event)">
					<div class="mb-3 sm:mb-6">
						<input
							type="email"
							name="email"
							required
							class="
								form-control
								block
								w-full
								px-2
								py-2
								text-lg
								font-normal
								text-gray-700
								bg-white bg-clip-padding
								border border-solid border-gray-300
								rounded
								transition
								ease-in-out
								m-0
								focus:text-gray-700
								focus:bg-white
								focus:border-blue-600
								focus:outline-none
							"
							:placeholder="t('email-address')"
						/>
					</div>
					<div class="mb-3 sm:mb-6">
						<input
							type="password"
							required
							name="password"
							class="
								form-control
								block
								w-full
								px-2
								py-2
								text-lg
								font-normal
								text-gray-700
								bg-white bg-clip-padding
								border border-solid border-gray-300
								rounded
								transition
								ease-in-out
								m-0
								focus:text-gray-700
								focus:bg-white
								focus:border-blue-600
								focus:outline-none
							"
							:placeholder="t('password')"
						/>
					</div>
					<!-- <RemeberMeForgotPassword /> -->

					<!-- Submit button -->
					<button
						type="submit"
						name="login-btn"
						class="
							loading-btn
							inline-block
							px-7
							py-3
							bg-blue-600
							text-white
							font-medium
							text-sm
							leading-snug
							uppercase
							rounded
							shadow-md
							hover:bg-blue-700 hover:shadow-lg
							focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
							active:bg-blue-800 active:shadow-lg
							transition
							duration-150
							ease-in-out
							w-full
						"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
					>
						{{ t('login') }}
					</button>
					<!-- <OrContinueWithFaceBook /> -->
				</form>
			</div>
		</div>
	</section>
</template>

<style>
@import url('@/assets/css/loading-btn.css');
</style>
