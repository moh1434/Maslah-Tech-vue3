<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
	<div class="flex flex-col min-h-50vh text-center">
		<div class="m-auto">
			<p class="text-3xl font-bold mb-3">{{ t('404.Cooming_soon') }}</p>
			<router-link
				:to="{ name: 'index' }"
				class="text-2xl underline text-blue-700 hover:text-blue-500"
				>{{ t('Home') + ' ' + t('page') }}</router-link
			>
		</div>
	</div>
</template>

<style>
.min-h-50vh {
	min-height: 50vh;
}
</style>
