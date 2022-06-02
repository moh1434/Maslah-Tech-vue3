<script setup lang="ts">
import WhyMaslahaCard from '@/components/WhyMaslahaCard.vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const WhyMaslahaData_ICONS: Readonly<string[]> = [
	'lightbulb',
	'thumbs-up',
	'money-bill-alt',
	'handshake',
];
</script>

<template>
	<section class="background-section relative">
		<div class="absolute relative-center">
			<h1>{{ t('index_background-section_h1') }}</h1>
			<h2>{{ t('index_background-section_h2') }}</h2>
		</div>
	</section>
	<section class="bg-blue-600 text-center py-14">
		<div class="container mx-auto flex flex-wrap justify-evenly">
			<WhyMaslahaCard
				v-for="(ICON, index) in WhyMaslahaData_ICONS"
				:key="index"
				class="md:w-1/2 2xl:w-1/4"
			>
				<template #icon>
					<svg><use :xlink:href="'#' + ICON" /></svg>
				</template>
				<template #title-text>{{ t(`WhyMaslahaData.${ICON}.title`) }}</template>
				<template #p>
					<p class="xl:max-w-md xl:mx-auto">
						{{ t(`WhyMaslahaData.${ICON}.p`) }}
					</p>
				</template>
			</WhyMaslahaCard>
		</div>
	</section>
</template>

<style>
/* Start background-section */
.background-section {
	background: url('@/assets/imgs/img1.jpg') black;
	background-size: cover;
	background-repeat: no-repeat;
	height: 90vh;
	color: black;
	text-align: center;
}
.background-section h1 {
	@apply text-2xl font-bold;
}
.background-section h2 {
	@apply text-lg mt-2;
}
.background-section > div {
	@apply p-5 bg-gray-200 bg-opacity-90 rounded-3xl;
}

.relative-center {
	top: 50%;
	left: 0;
	right: 0;
	@apply mx-12;
	transform: translateY(-50%);
}
@media screen(md) {
	.background-section h1 {
		@apply text-3xl;
	}
	.background-section h2 {
		@apply text-2xl mt-6;
	}
	.background-section > div {
		@apply p-9;
	}
	.relative-center {
		top: 60%;
		width: 50%;
		max-width: 550px;
		@apply mx-auto;
	}
}
@media screen(2xl) {
	.background-section {
		background-position: 0 -130px; /* Cant make it less than -130px because of the image hight  */
	}
}
/* End background-section */
</style>
