<script setup lang="ts">
import {
  GlobalSvgAttributes,
  GlobalPathAttributes,
} from '@/constants/iconsGlobalAttributes';
import { socialIconsWithHref as socialIcons } from '@/constants/socialIconsWithHref';
import { menuRoutesLists, menuIconsList } from '@/constants/footerLinksLists';

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

function setLocale(newLocale: 'en' | 'ar') {
  locale.value = newLocale;
  localStorage.setItem('currentLocale', newLocale);
}
</script>

<template>
  <footer class="text-center lg:text-left bg-gray-100 text-gray-600">
    <div
      class="
        flex
        justify-center
        items-center
        lg:justify-between
        p-6
        border-b border-gray-300
        lg:px-40
      "
    >
      <div class="mr-12 hidden lg:block">
        <span>Get connected with us on social networks:</span>
      </div>
      <div class="flex justify-center">
        <a
          v-for="(icon, index) in socialIcons"
          :href="icon.href"
          class="mr-6 text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            v-bind="{
              ...GlobalSvgAttributes,
              ...icon.svgAttributes,
            }"
          >
            <path
              v-bind="{
                ...GlobalPathAttributes,
                ...icon.pathAttributes,
              }"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="mx-6 py-10 text-center md:text-left">
      <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(routeList, index) in menuRoutesLists"
          :key="'div' + index"
          class="flex flex-col items-center mx-auto"
        >
          <h6 class="uppercase font-semibold mb-4">
            {{ routeList.title }}
          </h6>
          <p
            v-for="(link, i) in routeList.items"
            :key="i"
            class="mb-4 last:mb-0"
          >
            <router-link
              :to="{ name: link.routeName, params: link.params }"
              class="text-gray-600"
            >
              {{ link.text }}
            </router-link>
          </p>
        </div>
        <div class="flex flex-col items-center mx-auto">
          <h6 class="uppercase font-semibold mb-4">
            {{ menuIconsList.title }}
          </h6>
          <p
            class="flex items-center justify-center mb-4"
            v-for="(iconsList, index) in menuIconsList.items"
            :key="index"
          >
            <svg
              v-bind="{
                ...GlobalSvgAttributes,
                ...iconsList.svgAttributes,
              }"
            >
              <path
                v-bind="{
                  ...GlobalPathAttributes,
                  ...iconsList.pathAttributes,
                }"
              ></path>
            </svg>
            {{ iconsList.text }}
          </p>
        </div>
        <div class="flex flex-col items-center mx-auto">
          <h6 class="uppercase font-semibold mb-4">
            {{ t('footer.languages') }}
          </h6>
          <p class="mb-4">
            <button @click="setLocale('en')">English</button>
          </p>
          <p class="mb-4 last:mb-0">
            <button @click="setLocale('ar')">عربي</button>
          </p>
        </div>
      </div>
    </div>
    <div class="text-center p-6 bg-gray-200">
      <span>© 2022 Copyright:</span>
      <router-link class="text-gray-600 font-semibold" :to="{ name: '404' }"
        >Maslaha</router-link
      >
    </div>
  </footer>
</template>

<style></style>
