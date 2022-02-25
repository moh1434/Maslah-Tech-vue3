<script setup lang="ts">
import Category from '@/components/Category.vue';
import { CategoryI } from '@/types/Categroy';
import { fetchCategories } from '@/api/FetchCategories';

import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
import H1 from '@/components/small/H1.vue';
const { t } = useI18n();

const categories = ref<Array<CategoryI>>([]); //ref<Array<CategoryI>>([]);
fetchCategories()
  .then((res) => {
    if (!res.data.data) {
      console.log('empty data');
    } else {
      console.dir(res.data.data, { depth: null });
      categories.value = res.data.data;
    }
  })
  .catch((e) => {});

// console.log('categoriesResponse.status=', categoriesResponse.status);
// console.log('categoriesResponse.statusText=', categoriesResponse.statusText);
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-evenly gap-10 my-12 max-w-7xl mx-auto">
      <H1 class="w-full mx-7">{{ t('categories.h1') }}</H1>
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
      ></Category>
    </div>
  </div>
</template>

<style></style>
