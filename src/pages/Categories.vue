<script setup lang="ts">
import Category from '@/components/Category.vue';
import SubCategory from '@/components/SubCategory.vue';

import { fetchCategories } from '@/api/FetchCategories';

import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
import H1 from '@/components/small/H1.vue';

import { CategoryI } from '@/types/Categroy';
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
    <div class="my-12 max-w-7xl mx-auto">
      <H1 class="w-full px-7 pb-7">{{ t('categories.h1') }}</H1>
      <div
        class="flex flex-wrap justify-center p-2"
        v-for="category in categories"
        :key="category.id"
      >
        <Category :category="category" class="w-full mx-4 mb-4 text-center" />
        <SubCategory
          class="sm:w-64 w-1/2"
          v-for="subCategory in category.children"
          :key="subCategory.id"
          :category="subCategory"
        />

        <hr
          class="w-4/5 mx-auto my-10 bg-black border rounded-full border-black"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
