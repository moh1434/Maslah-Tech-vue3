<script setup lang="ts">
import { useMyFetch } from '@/api/axios';
import { fetchCategories } from '@/api/FetchCategories';
import { packageI, serviceI } from '@/types/ServiceI';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { CategoryI } from '../types/Categroy';
const { t, locale } = useI18n();
const route = useRoute();
//start helpers
function getCleanService() /*: Partial<serviceI>*/ {
  return {
    title: '',
    images: [] as string[],
    description: '',
    duration: 1,
    cost: 0,
    categoryId: 0,
  };
}

const serviceToEdit = ref(getCleanService());

async function loadTheService() {
  const { error, data } = await useMyFetch(
    `service/${route.params.serviceId}`
  ).json<{
    data: serviceI;
  }>();
  if (error.value) {
    alert(error.value);
  }
  if (data.value) {
    serviceToEdit.value['title'] = data.value.data['title'];
    serviceToEdit.value['description'] = data.value.data['description'];
    serviceToEdit.value['duration'] = data.value.data['duration'];
    serviceToEdit.value['cost'] = data.value.data['cost'];

    serviceToEdit.value.images = [...data.value.data.images];
    serviceToEdit.value.categoryId = data.value.data.category.id;
  }
}
//end helpers
const categories = ref<Array<CategoryI>>([]);
fetchCategories()
  .then((res) => {
    if (res.data.data) {
      categories.value = res.data.data;
    }
  })
  .catch((e) => {
    alert(e);
  });
async function loadThePage() {
  loadTheService();
}
loadThePage();

onBeforeRouteUpdate((to, from, next) => {
  route.params.serviceId = to.params.serviceId as string;
  loadThePage().then(() => {
    next();
  });
});
</script>

<template>
  <div class="my-2 flex flex-wrap items-center">
    <label class="px-2">Title:</label>
    <input
      v-model="serviceToEdit.title"
      type="text"
      class="px-2 py-1 text-gray-700 border rounded"
    />
  </div>
  <div class="my-2 flex flex-wrap items-center">
    <label class="px-2">Cost:</label>
    <input
      v-model="serviceToEdit.cost"
      type="number"
      class="px-2 py-1 text-gray-700 border rounded"
    />
  </div>
  <div class="my-2 flex flex-wrap items-center">
    <label class="px-2">Duration:</label>
    <input
      v-model="serviceToEdit.duration"
      type="number"
      class="px-2 py-1 text-gray-700 border rounded"
    />
  </div>
  <div class="my-2 flex flex-wrap items-center">
    <label class="px-2">Description:</label>
    <textarea
      class="px-2 py-1 text-gray-700 border rounded min-h-[60px]"
      v-model="serviceToEdit.description"
    ></textarea>
  </div>
  <ul class="shadow-md p-2 max-w-xl mb-6">
    <h2 class="text-xl">Images:</h2>
    <li
      class="my-2 flex flex-wrap items-center"
      v-for="(img, i) in serviceToEdit.images"
      :key="i"
    >
      <label class="text-gray-700">image {{ i + 1 }}:</label>
      <input
        type="url"
        v-model="serviceToEdit.images[i]"
        class="w-full px-2 py-1 text-gray-700 border rounded"
      />
    </li>
    <button
      class="bg-blue-500 px-2 py-1 ml-2 rounded-md text-white text-sm"
      @click="serviceToEdit.images.push('')"
    >
      Add
    </button>
    <button
      class="bg-red-500 px-2 py-1 ml-2 rounded-md text-white text-sm"
      @click="serviceToEdit.images.pop()"
    >
      remove
    </button>
  </ul>
  <div class="my-2 flex flex-wrap items-center">
    <label class="px-2" for="categories">Category:</label>
    <select
      class="px-2 py-1 text-gray-700 border rounded bg-white"
      id="categories"
      v-model="serviceToEdit.categoryId"
    >
      <optgroup
        v-for="parentCategory in categories"
        :key="parentCategory.id"
        :label="
          locale == 'ar' ? parentCategory.arTitle : parentCategory.enTitle
        "
      >
        <option
          v-for="childCategory in parentCategory.children"
          :key="childCategory.id"
          :value="childCategory.id"
          :selected="serviceToEdit.categoryId == childCategory.id"
        >
          {{ locale == 'ar' ? childCategory.arTitle : childCategory.enTitle }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style></style>
