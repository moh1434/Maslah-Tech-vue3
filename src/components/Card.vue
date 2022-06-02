<script setup lang="ts">
export type cardI = {
	title: string;
	image: string;
	description: string;
	route: { name: string; params: {} };
};

const { card } = defineProps<{ card: cardI }>();
</script>

<template>
	<div v-bind="$attrs">
		<div class="m-3 rounded-lg shadow-md relative">
			<router-link :to="card.route">
				<img class="rounded-t-lg mx-auto" :src="card.image" :alt="card.title" />
			</router-link>
			<div class="p-3">
				<router-link
					:to="card.route"
					class="text-gray-900 sm:text-xl font-medium mb-2"
				>
					{{ card.title }}
				</router-link>
				<p class="text-gray-700 text-base mb-2">
					{{ card.description }}
				</p>
				<slot name="extra"></slot>
			</div>
		</div>
		<slot name="footer"></slot>
	</div>
</template>

<style scoped>
a:hover {
	@apply text-blue-600 underline;
}
</style>
