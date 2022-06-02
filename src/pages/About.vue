<script setup lang="ts">
import H1 from '@/components//small/H1.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
	<div class="direction max-w-3xl mx-auto my-6 sm:my-10">
		<img
			class="mx-auto mb-4 sm:mb-8"
			src="/imgs/logo1_400X200.png"
			alt="maslahTech image"
		/>
		<H1 class="mx-4 mb-4">{{ t('about.h1') }}</H1>
		<p class="mx-2 sm:text-lg">{{ t('about.p') }}.</p>
	</div>
</template>

<style></style>
