<script setup lang="ts">
import { ref, computed } from 'vue';

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const menuLinks = ref([
  { text: computed(() => t('Get_Jobs')), name: '404', params: {} },
  { text: computed(() => t('Find_Freelancers')), name: '404', params: {} },
  { text: computed(() => t('About_Us')), name: '404', params: {} },
  // { text: "Contact Us", url: "/" },
]);
const registerLinks = ref([
  { text: computed(() => t('login')), name: 'login', params: {} },
  { text: computed(() => t('sign_up')), name: 'sign-up', params: {} },
  // { text: "Contact Us", url: "/" },
]);
</script>

<template>
  <header
    class="
      flex flex-wrap flex-col
      items-center
      sm:flex-row sm:justify-between sm:px-2
      md:px-4
      lg:px-40
      bg-blue-600
    "
  >
    <ul class="flex flex-wrap">
      <li
        v-for="(menuLink, index) in menuLinks"
        :key="index"
        class="px-1 sm:px-2 md:px-4"
      >
        <router-link :to="{ name: menuLink.name, params: menuLink.params }">{{
          menuLink.text
        }}</router-link>
      </li>
    </ul>
    <ul class="flex flex-wrap">
      <li
        v-for="(registerLink, index) in registerLinks"
        :key="index"
        class="px-1 sm:px-2 md:px-4"
      >
        <router-link
          :to="{ name: registerLink.name, params: registerLink.params }"
        >
          {{ registerLink.text }}
        </router-link>
      </li>
      <li class="hidden lg:block absolute right-4 px-1 sm:px-2 md:px-4">
        <button @click="locale = locale == 'ar' ? 'en' : 'ar'">
          {{ locale == 'ar' ? 'عربي' : 'English' }}
        </button>
      </li>
    </ul>
  </header>
</template>

<style scoped>
li {
  @apply mx-1 py-4;
  color: white;
  cursor: pointer;
}
li:hover {
  @apply bg-blue-500;
  transition: background-color 200ms ease-in-out;
}
@media (max-width: 639px) {
  li {
    @apply py-2;
  }
  ul:first-of-type {
    @apply mt-2;
  }
  ul:last-of-type {
    @apply mb-2;
  }
}
</style>
