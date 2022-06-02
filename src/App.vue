<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TheHeader from '@/components/global/TheHeader.vue';
import TheFooter from '@/components/global/TheFooter.vue';

import direction from '@/helpers/langDirection';
</script>

<template>
	<TheHeader />
	<main>
		<router-view />
	</main>
	<TheFooter />
</template>
<style>
*,
*::after,
*::before {
	box-sizing: border-box;
}
/*  */
#app,
html,
body {
	height: 100%;
}

/* body */
#app {
	display: flex;
	flex-direction: column;
}
/* #__nuxt, */
main {
	flex-grow: 1;
}

.rtl {
	direction: rtl;
}

.ltr {
	direction: ltr;
}
input:not(.no-direction),
textarea:not(.no-direction),
select:not(.no-direction) {
	direction: v-bind(direction);
}
.direction {
	direction: v-bind(direction);
}
</style>
<style src="@/assets/css/tailwind.css"></style>
