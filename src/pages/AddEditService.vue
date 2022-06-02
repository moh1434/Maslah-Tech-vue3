<script setup lang="ts">
import { api, apiWrapper, errorAlerter } from '@/api/axios';

import { serviceI } from '@/types/ServiceI';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { CategoryI } from '../types/Categroy';
import { localUser } from '@/helpers/Auth/localAuth';
import { startLoading, stopLoading } from '@/helpers/useLoading';
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
//start helpers
function getCleanService() /*: Partial<serviceI>*/ {
	return {
		title: '',
		images: [] as string[],
		description: '',
		duration: 1,
		cost: 0,
		categoryId: 0,
	};
}

const serviceToEdit = ref(getCleanService());

async function loadTheService() {
	const { response, errors } = await apiWrapper<serviceI>(
		async () =>
			await api.get<{ data: serviceI }>(`service/${route.params.serviceId}`)
	);
	errorAlerter(errors);
	if (response?.data) {
		const data = response.data.data;
		serviceToEdit.value['title'] = data['title'];
		serviceToEdit.value['description'] = data['description'];
		serviceToEdit.value['duration'] = data['duration'];
		serviceToEdit.value['cost'] = data['cost'];

		serviceToEdit.value.images = [...data.images];
		serviceToEdit.value.categoryId = data.category.id;
	}
}
//end helpers
const categories = ref<Array<CategoryI>>([]);
apiWrapper<CategoryI[]>(
	async () => await api.get<{ data: CategoryI[] }>('/categories')
).then(({ response, errors }) => {
	errorAlerter(errors);
	if (response?.data) {
		categories.value = response.data.data;
	}
});

const TEXT = ref<'insert' | 'edit'>('insert');
const translatedTEXT = computed(() => t(TEXT.value));

async function loadThePage() {
	TEXT.value = route.params.serviceId ? 'edit' : 'insert';
	serviceToEdit.value = getCleanService();
	if (route.params.serviceId) {
		loadTheService();
	}
}

loadThePage();

onBeforeRouteUpdate((to, from, next) => {
	route.params.serviceId = to.params.serviceId as string;
	loadThePage().then(() => {
		next();
	});
});

//
watch(
	localUser,
	(newLocalUser) => {
		if (!newLocalUser.token) {
			alert('You need to login before insert or edit a service.');
			router.push({ name: 'login' });
		}
	},
	{ immediate: true }
);
function addOrEditService(event: Event) {
	const form = document.getElementById('edit-service-form') as HTMLFormElement;
	const validForm = form.reportValidity();
	if (!validForm) {
		return;
	}

	if (route.params.serviceId) {
		editService(event);
		return;
	}
	addService(event);
}
async function editService(event: Event) {
	startLoading(event.target as HTMLButtonElement);
	const serviceId = route.params.serviceId as string;
	apiWrapper<serviceI>(
		async () =>
			await api.put<{ data: serviceI }>(
				`service/${serviceId}`,
				serviceToEdit.value,
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
		alert('Service edited successfully');
		if (response?.data) {
			router.push({
				name: 'service',
				params: { serviceId: response.data.data.id },
			});
		}
	});

	//  else {
	//   router.push({ name: 'profile', params: { userId: localUser.value.id } });
	// }
}
async function addService(event: Event) {
	const url = `service/`;
	startLoading(event.target as HTMLButtonElement);

	const { response, errors } = await apiWrapper<serviceI>(
		async () =>
			await api.post<{ data: serviceI }>('service/', serviceToEdit.value, {
				headers: { token: localUser.value.token as string },
			})
	);
	if (errors) {
		errorAlerter(errors);
		stopLoading(event.target as HTMLButtonElement);
		return Promise.resolve();
	}

	stopLoading(event.target as HTMLButtonElement);
	alert('Service inserted successfully');
	if (response?.data) {
		router.push({
			name: 'service',
			params: { serviceId: response.data.data.id },
		});
	}
}
</script>

<template>
	<form id="edit-service-form" class="max-w-3xl my-4 md:mt-8 mx-auto direction">
		<fieldset class="border-2 m-1 rounded">
			<legend class="capitalize text-lg mx-2">
				{{ t('service_form', { action: translatedTEXT }) }}
			</legend>
			<div class="py-2 sm:py-4 lg:py-6 px-2">
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('title') }}:</label>
					<textarea
						class="px-2 py-1 grow text-gray-700 border rounded min-h-[60px]"
						required
						minlength="50"
						v-model="serviceToEdit.title"
					></textarea>
				</div>
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('cost') }}:</label>
					<input
						v-model="serviceToEdit.cost"
						type="number"
						min="5000"
						required
						class="px-2 py-1 grow text-gray-700 border rounded"
					/>
				</div>
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('duration') }}:</label>
					<input
						v-model="serviceToEdit.duration"
						type="number"
						required
						class="px-2 py-1 grow text-gray-700 border rounded"
					/>
				</div>
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3">{{ t('description') }}:</label>
					<textarea
						class="px-2 py-1 grow text-gray-700 border rounded min-h-[60px]"
						required
						minlength="200"
						v-model="serviceToEdit.description"
					></textarea>
				</div>
				<div class="my-2 md:my-3 flex flex-wrap items-center">
					<label class="px-2 md:px-3" for="categories"
						>{{ t('category') }}:</label
					>
					<select
						class="px-2 py-1 text-gray-700 border rounded bg-white"
						id="categories"
						v-model="serviceToEdit.categoryId"
					>
						<optgroup
							v-for="parentCategory in categories"
							:key="parentCategory.id"
							:label="
								locale == 'ar' ? parentCategory.arTitle : parentCategory.enTitle
							"
						>
							<option
								v-for="childCategory in parentCategory.children"
								:key="childCategory.id"
								:value="childCategory.id"
								:selected="serviceToEdit.categoryId == childCategory.id"
							>
								{{
									locale == 'ar' ? childCategory.arTitle : childCategory.enTitle
								}}
							</option>
						</optgroup>
					</select>
				</div>
				<ul class="m-2 md:m-3 max-w-xl">
					<label class="text-lg">{{ t('service_images') }}:</label>
					<li
						class="mb-2 flex flex-wrap items-center"
						v-for="(img, i) in serviceToEdit.images"
						:key="i"
					>
						<label class="text-gray-700 px-2 my-2"
							>{{ t('image') }} {{ i + 1 }}:</label
						>
						<input
							type="url"
							v-model="serviceToEdit.images[i]"
							class="px-2 py-1 grow text-gray-700 border rounded"
						/>
					</li>
					<button
						class="bg-green-500 px-2 py-1 mx-1.5 rounded-md text-white text-sm"
						@click.prevent="serviceToEdit.images.push('')"
					>
						{{ t('add') }}
					</button>
					<button
						class="bg-red-500 px-2 py-1 mx-1.5 rounded-md text-white text-sm"
						@click.prevent="serviceToEdit.images.pop()"
					>
						{{ t('remove') }}
					</button>
				</ul>
			</div>
			<button
				@click.prevent="addOrEditService($event)"
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
				{{ t('the_service', { action: translatedTEXT }) }}
			</button>
		</fieldset>
	</form>
</template>

<style>
@import url('@/assets/css/loading-btn.css');
</style>
