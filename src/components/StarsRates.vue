<script setup lang="ts">
interface rates {
	totalRates: number; //singleRateValue * total amount of people rated
	totalPeople: number;
}
const { totalRates, totalPeople } = defineProps<rates>();

const yellowStars = isNaN(totalRates / totalPeople)
	? 0
	: totalRates / totalPeople;

const blackStars = 5 - yellowStars;
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
		<symbol id="star" viewBox="0 0 576 512">
			<path
				d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
			></path>
		</symbol>
	</svg>
	<div class="flex items-center" v-bind="$attrs">
		<div class="flex gap-0.5">
			<svg
				v-for="i in yellowStars"
				:key="i"
				class="w-3.5 h-3.5 fill-current text-orange-500"
			>
				<use xlink:href="#star" />
			</svg>
			<svg
				v-for="i in blackStars"
				:key="i"
				class="w-3.5 h-3.5 fill-current text-gray-500"
			>
				<use xlink:href="#star" />
			</svg>
		</div>
		<span class="text-sm text-gray-700 ml-1 block">({{ totalPeople }})</span>
	</div>
</template>

<style></style>
