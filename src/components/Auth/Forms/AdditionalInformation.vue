<script setup lang="ts">
import {
	additionalInformationFormID,
	additionalInformationFormI,
} from '@/helpers/Auth/dev_defaultSignupInputs';
import { registerInAPi } from '@/helpers/Auth/firebase';
import { startLoading, stopLoading } from '@/helpers/useLoading';
import { allSkills, selectedSkills, selectSkill } from '@/helpers/useSkills';

import { useI18n } from 'vue-i18n';
// import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import { refreshLocalUserData } from '@/helpers/Auth/localAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase';
import { api, apiWrapper, errorAlerter } from '@/api/axios';
import { userI } from '@/types/UserI';
const router = useRouter();
const { t } = useI18n();

async function signUp(event: Event) {
	const additionalInformation = document.getElementById(
		additionalInformationFormID
	) as additionalInformationFormI;

	startLoading(additionalInformation.button as HTMLButtonElement);

	//Start checking if the user already have an account
	const uid = firebase.auth().currentUser?.uid;
	if (uid) {
		const { response, errors } = await apiWrapper<userI>(
			async () => await api.get<{ data: userI }>(`/user/${uid}`)
		);

		if (errors !== 'NotExist') {
			//'NotExist' means the user is not found, that is what we want!
			errorAlerter(errors);
		}
		if (response?.data?.data) {
			alert('You already have an account!, please try login');
			router.push({ name: 'login' });
			stopLoading(additionalInformation.button as HTMLButtonElement);
			return Promise.resolve();
		}
	}
	//End

	//Form validated from HTML5
	// const files = additionalInformation.picture.value;
	// const files = additionalInformation.picture.files ?? [];
	const { token, user } = await registerInAPi({
		name: additionalInformation.name.value,
		bio: additionalInformation.bio.value,
		city: additionalInformation.city.value,
		skills: selectedSkills.value,
		picture: userPicture.value,
		// picture: files ? files[0] : null,
	});
	if (token) {
		const userData = {
			name: user?.name,
			email: user?.email,
			id: user?.id,
			picture: user?.picture,
		};

		localStorage.setItem('token', token);
		localStorage.setItem('userData', JSON.stringify(userData));
		refreshLocalUserData();
		console.log(token);
	}
	stopLoading(additionalInformation.button as HTMLButtonElement);
	alert('registered successfully');
	router.push({ name: 'categories' });
}

const userPicture = ref<string>('');

function encodeImageFileAsURL(event: Event) {
	const files = (event.target as HTMLInputElement).files ?? [];
	var reader = new FileReader();
	reader.onloadend = function () {
		let result = reader.result ?? '';
		if (typeof result != 'string') {
			//it is an array
			result = JSON.stringify(result);
		}
		userPicture.value = reader.result as string;
	};
	reader.readAsDataURL(files[0]);
}
</script>

<template>
	<section>
		<form @submit.prevent="signUp($event)" id="additionalInformationForm">
			<div class="flex mb-2.5 direction">
				<h2 class="inline-block font-bold">{{ t('step') }}3:</h2>
				<p class="px-1">{{ t('step3_message') }}.</p>
			</div>
			<div class="flex gap-4 mb-6">
				<input
					type="text"
					required
					name="name"
					class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
					:placeholder="t('full-name')"
				/>

				<select
					name="city"
					class="base-input px-3 md:px-4 py-1.5 md:py-2.5 i-w-44"
				>
					<option>{{ t('baghdad') }}</option>
					<option>{{ t('basra') }}</option>
				</select>
			</div>
			<div class="flex gap-4 mb-6 direction">
				<label class="text-lg py-1.5 md:py-2.5">{{ t('avatar') }}:</label>
				<input
					@change="encodeImageFileAsURL($event)"
					required
					type="file"
					accept="image/x-png,image/jpeg"
					name="picture"
					class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
				/>
			</div>
			<div class="mb-6">
				<textarea
					required
					name="bio"
					class="base-input px-3 py-1.5 min-h-16"
					rows="3"
					:placeholder="`${t('describe-yourself')}(${t('write-your-bio')}).`"
				></textarea>
			</div>
			<div class="mb-6">
				<fieldset class="border-2 direction">
					<legend class="ml-2">{{ t('select-your-skills') }}</legend>
					<ul class="flex flex-wrap justify-center gap-3 text-white p-4">
						<button
							v-for="(skill, index) in allSkills"
							:key="index"
							@click.prevent="selectSkill($event, index)"
							class="bg-blue-500 bg-opacity-60 px-2.5 py-1 rounded-lg text-sm"
						>
							{{ skill }}
						</button>
					</ul>
				</fieldset>
			</div>
			<button
				type="submit"
				name="button"
				class="
					w-full
					px-6
					py-2.5
					md:py-3
					bg-blue-600
					text-white
					font-medium
					text-xs
					md:text-sm
					leading-tight
					uppercase
					rounded
					shadow-md
					hover:bg-blue-700 hover:shadow-lg
					focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
					active:bg-blue-800 active:shadow-lg
					transition
					duration-150
					ease-in-out
					loading-btn
				"
			>
				{{ t('sign_up') }}
			</button>

			<!-- <OrContinueWithFaceBook /> -->
		</form>
	</section>
</template>

<style></style>
