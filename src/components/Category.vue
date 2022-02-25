<script setup lang="ts">
import { CategoryI } from '@/types/Categroy';
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const { category } = defineProps<{ category: CategoryI }>();
</script>

<template>
  <div class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#!">
        <img
          class="rounded-t-lg"
          :src="category.image"
          :alt="category.enTitle"
        />
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ locale == 'ar' ? category.arTitle : category.enTitle }}
        </h5>
        <p class="text-gray-700 text-base mb-4">
          {{ category.description }}
        </p>
      </div>
    </div>
  </div>
  <Category v-for="(cat, i) in category.children" :category="cat"></Category>
</template>

<style></style>
