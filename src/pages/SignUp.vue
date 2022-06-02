<script setup lang="ts">
import SignUpForm from '@/components/Auth/SignUpForm.vue';
import { confirmLogOutOrRedirect, localUser } from '@/helpers/Auth/localAuth';

import { useRouter } from 'vue-router';
const router = useRouter();
if (localUser.value.token) {
	confirmLogOutOrRedirect(router);
}
</script>

<template>
	<div>
		<SignUpForm></SignUpForm>
	</div>
</template>

<style></style>
