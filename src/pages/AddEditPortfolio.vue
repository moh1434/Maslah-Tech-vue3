<script setup lang="ts">
import { api, apiWrapper, errorAlerter } from '@/api/axios';

import { portfolioI } from '@/types/PortfolioI';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import { localUser } from '@/helpers/Auth/localAuth';
import { startLoading, stopLoading } from '@/helpers/useLoading';
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
//start helpers
function getCleanPortfolio() {
	return {
		title: '',
		description: '',
		images: [''],
		link: '',
	};
}

const portfolioToEdit = ref(getCleanPortfolio());

async function loadThePortfolio() {
	const { response, errors } = await apiWrapper<portfolioI>(
		async () =>
			await api.get<{ data: portfolioI }>(
				`portfilo/${route.params.portfolioId}`
			)
	);
	errorAlerter(errors);
	if (response?.data) {
		const data = response.data.data;
		portfolioToEdit.value.title = data.title;
		portfolioToEdit.value.description = data.description;
		portfolioToEdit.value.link = data.link;
		portfolioToEdit.value.images = [...data.images];
	}
}

const TEXT = ref<'insert' | 'edit'>('insert');
const translatedTEXT = computed(() => t(TEXT.value));

async function loadThePage() {
	TEXT.value = route.params.portfolioId ? 'edit' : 'insert';
	portfolioToEdit.value = getCleanPortfolio();
	if (route.params.portfolioId) {
		loadThePortfolio();
	}
}

loadThePage();

onBeforeRouteUpdate((to, from, next) => {
	route.params.portfolioId = to.params.portfolioId as string;
	loadThePage().then(() => {
		next();
	});
});

//
watch(
	localUser,
	(newLocalUser) => {
		if (!newLocalUser.token) {
			alert('You need to login before insert or edit a portfolio.');
			router.push({ name: 'login' });
		}
	},
	{ immediate: true }
);
function addOrEditPortfolio(event: Event) {
	const form = document.getElementById(
		'edit-portfolio-form'
	) as HTMLFormElement;
	const validForm = form.reportValidity();
	if (!validForm) {
		return;
	}

	if (route.params.portfolioId) {
		editPortfolio(event);
		return;
	}
	addPortfolio(event);
}
async function editPortfolio(event: Event) {
	startLoading(event.target as HTMLButtonElement);
	const portfolioId = route.params.portfolioId as string;
	apiWrapper<portfolioI>(
		async () =>
			await api.put<{ data: portfolioI }>(
				`portfilo/${portfolioId}`,
				portfolioToEdit.value,
				{
					headers: { token: localUser.value.token as string },
				}
			)
	).then(({ response, errors }) => {
		if (errors) {
			errorAlerter(errors);
			stopLoading(event.target as HTMLButtonElement);
			return Promise.resolve();
		}
		stopLoading(event.target as HTMLButtonElement);
		alert('Portfolio edited successfully');
		if (response?.data) {
			router.push({
				name: 'profile',
				params: { userId: response.data.data.userId },
			});
		}
	});

	//  else {
	//   router.push({ name: 'profile', params: { userId: localUser.value.id } });
	// }
}
async function addPortfolio(event: Event) {
	startLoading(event.target as HTMLButtonElement);

	const { response, errors } = await apiWrapper<portfolioI>(
		async () =>
			await api.post<{ data: portfolioI }>('portfilo/', portfolioToEdit.value, {
				headers: { token: localUser.value.token as string },
			})
	);
	if (errors) {
		errorAlerter(errors);
		stopLoading(event.target as HTMLButtonElement);
		return Promise.resolve();
	}

	stopLoading(event.target as HTMLButtonElement);
	alert('Portfolio inserted successfully');
	if (response?.data) {
		router.push({
			name: 'profile',
			params: { userId: response.data.data.userId },
		});
	}
}
</script>

<template>
	<form
		id="edit-portfolio-form"
		class="max-w-3xl my-4 md:my-8 mx-auto direction"
	>
		<fieldset class="border-2 m-1 rounded">
			<legend class="capitalize text-lg mx-2">
				{{ t('portfolio_form', { action: translatedTEXT }) }}
			</legend>
			<div class="py-2 sm:py-4 lg:py-6 px-2">
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('title') }}:</label>
					<textarea
						class="px-2 py-1 grow text-gray-700 border rounded min-h-[60px]"
						required
						minlength="50"
						v-model="portfolioToEdit.title"
					></textarea>
				</div>

				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('description') }}:</label>
					<textarea
						class="px-2 py-1 grow text-gray-700 border rounded min-h-[60px]"
						required
						minlength="200"
						v-model="portfolioToEdit.description"
					></textarea>
				</div>
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('link') }}:</label>
					<input
						v-model="portfolioToEdit.link"
						type="url"
						required
						class="px-2 py-1 grow text-gray-700 border rounded"
					/>
				</div>
				<ul class="m-2 md:m-3 max-w-xl">
					<label class="text-lg">{{ t('portfolio_images') }}:</label>
					<li
						class="mb-2 flex flex-wrap items-center"
						v-for="(img, i) in portfolioToEdit.images"
						:key="i"
					>
						<label class="text-gray-700 px-2 my-2"
							>{{ t('image') }} {{ i + 1 }}:</label
						>
						<input
							type="url"
							v-model="portfolioToEdit.images[i]"
							class="px-2 py-1 grow text-gray-700 border rounded"
						/>
					</li>
					<button
						class="bg-green-500 px-2 py-1 mx-1.5 rounded-md text-white text-sm"
						@click.prevent="portfolioToEdit.images.push('')"
					>
						{{ t('add') }}
					</button>
					<button
						class="bg-red-500 px-2 py-1 mx-1.5 rounded-md text-white text-sm"
						@click.prevent="portfolioToEdit.images.pop()"
					>
						{{ t('remove') }}
					</button>
				</ul>
			</div>
			<button
				@click.prevent="addOrEditPortfolio($event)"
				class="
					capitalize
					bg-blue-500
					hover:bg-blue-400
					text-white
					m-4
					px-4
					py-1.5
					rounded-lg
				"
			>
				{{ t('the_portfolio', { action: translatedTEXT }) }}
			</button>
		</fieldset>
	</form>
</template>

<style>
@import url('@/assets/css/loading-btn.css');
</style>
