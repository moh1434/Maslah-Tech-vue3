<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
	<div class="flex justify-between items-center mb-6">
		<div class="form-group form-check">
			<input
				type="checkbox"
				class="
					form-check-input
					h-4
					w-4
					border border-gray-300
					rounded-sm
					bg-white
					checked:bg-blue-600 checked:border-blue-600
					focus:outline-none
					transition
					duration-200
					mt-1
					align-top
					bg-no-repeat bg-center bg-contain
					float-left
					mr-1
					cursor-pointer
				"
				id="check-box"
				checked
			/>
			<label
				class="form-check-label inline-block text-gray-800"
				for="check-box"
				>{{ t('remember-me') }}</label
			>
		</div>
		<button
			@click.prevent=""
			class="
				text-blue-600
				hover:text-blue-700
				focus:text-blue-700
				active:text-blue-800
				duration-200
				transition
				ease-in-out
			"
		>
			{{ t('forgot-password?') }}
		</button>
	</div>
</template>

<style></style>
