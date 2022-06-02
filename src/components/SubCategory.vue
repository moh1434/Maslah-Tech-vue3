<script setup lang="ts">
import { CategoryI } from '@/types/Categroy';
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const { category } = defineProps<{ category: CategoryI }>();
</script>

<template>
	<div v-bind="$attrs">
		<div class="m-3 rounded-lg shadow-md">
			<a href="#!">
				<img
					class="rounded-t-lg mx-auto"
					:src="category.image"
					:alt="category.enTitle"
					height="100"
				/>
			</a>
			<div class="p-3">
				<a href="#!" class="text-gray-900 sm:text-xl font-medium mb-2">
					{{ locale == 'ar' ? category.arTitle : category.enTitle }}
				</a>
				<p class="text-gray-700 text-base mb-4">
					{{ category.description }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
a:hover {
	@apply text-blue-600 underline;
}
</style>
