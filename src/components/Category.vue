<script setup lang="ts">
import { CategoryI } from '@/types/Categroy';
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const { category } = defineProps<{ category: CategoryI }>();
</script>

<template>
	<div v-bind="$attrs">
		<div class="m-4 rounded-lg">
			<div>
				<img
					class="rounded-t-lg mx-auto max-h-80"
					:src="category.image"
					:alt="category.enTitle"
				/>
			</div>
			<div class="p-3">
				<h5 class="text-gray-900 sm:text-xl font-medium mb-2">
					{{ locale == 'ar' ? category.arTitle : category.enTitle }}
				</h5>
				<p class="text-gray-700 text-base mb-4">
					{{ category.description }}
				</p>
			</div>
		</div>
	</div>
</template>

<style></style>
