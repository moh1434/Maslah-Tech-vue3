<script setup lang="ts">
import { ref } from 'vue';

const menuLinks = ref([
  { text: 'Get Jobs', url: '/' },
  { text: 'Find Freelancers', url: '/' },
  { text: 'About Us', url: '/' },
  // { text: "Contact Us", url: "/" },
]);
const registerLinks = ref([
  { text: 'Login', url: '/login' },
  { text: 'Sign up', url: '/signup' },
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
        <router-link :to="menuLink.url">{{ menuLink.text }}</router-link>
      </li>
    </ul>
    <ul class="flex flex-wrap">
      <li v-for="(registerLink, index) in registerLinks" :key="index">
        <router-link :to="registerLink.url">
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
