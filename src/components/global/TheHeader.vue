<script setup lang="ts">
import { ref } from 'vue';

const menuLinks = ref([
  { text: 'Get Jobs', name: '404', params: {} },
  { text: 'Find Freelancers', name: '404', params: {} },
  { text: 'About Us', name: '404', params: {} },
  // { text: "Contact Us", url: "/" },
]);
const registerLinks = ref([
  { text: 'Login', name: '404', params: {} },
  { text: 'Sign up', name: '404', params: {} },
  // { text: "Contact Us", url: "/" },
]);
</script>

<template>
  <header
    class="
      flex flex-wrap flex-col
      items-center
      sm:flex-row sm:justify-between
      px-4
      lg:px-40
      bg-cyan-700
    "
  >
    <ul class="flex flex-wrap">
      <li v-for="(menuLink, index) in menuLinks" :key="index" class="mx-4">
        <router-link :to="{ name: menuLink.name, params: menuLink.params }">{{
          menuLink.text
        }}</router-link>
      </li>
    </ul>
    <ul class="flex flex-wrap">
      <li v-for="(registerLink, index) in registerLinks" :key="index">
        <router-link
          :to="{ name: registerLink.name, params: registerLink.params }"
        >
          {{ registerLink.text }}
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
li {
  @apply p-3;
  color: white;
  cursor: pointer;
}
li:hover {
  @apply bg-cyan-600;
  transition: background-color 200ms ease-in-out;
}
</style>
