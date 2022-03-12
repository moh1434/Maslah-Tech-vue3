<script setup lang="ts">
import { useMyFetch } from '@/api/axios';
import { fetchUser } from '@/api/fetchUser';

import { userI } from '@/types/UserI';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { profileI } from '../types/ProfileI';
import H1 from '@/components/small/H1.vue';

// @ts-ignore
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
const route = useRoute();
const userSkills = ref<Array<string>>([]);
//start helpers
async function loadUserSkills() {
  const { error, data } = await useMyFetch<{
    data: { data: Array<{ skillName: string }> };
  }>(`skills/${route.params.userId}`).json();

  if (error.value) {
    alert(error.value);
  }

  console.log(data.value);
  if (data.value) {
    userSkills.value = data.value.data.map(
      (skill: { skillName: string }) => skill.skillName
    );
  }
}
function loadTheUser() {
  fetchUser(route.params.userId as string).then(({ response, errors }) => {
    if (errors.length) {
      errors.map((err) => alert(err));
    }
    if (response?.data.data) {
      user.value = response.data.data;
    }
  });
}
const profiles = ref<Array<profileI>>([]);
async function loadUserProfiles() {
  const { error, data } = await useMyFetch<{
    data: { data: Array<profileI> };
  }>(`user/portfilo/${route.params.userId}`).json();

  if (error.value) {
    alert(error.value);
  }

  console.log(data.value);
  if (data.value) {
    profiles.value = data.value.data;
  }
}
//end helpers
const user = ref<userI>();
async function loadThePage() {
  loadTheUser();
  loadUserSkills();
  // loadUserProfiles();// it will loaded by watch() based on currentTab value
}
loadThePage();

onBeforeRouteUpdate((to, from, next) => {
  route.params.userId = to.params.userId as string;
  loadThePage().then(() => {
    next();
  });
});

const { t, locale } = useI18n();
const s3En = ref('');
watch(
  locale,
  (newLocale) => {
    s3En.value = newLocale == 'en' ? "'s" : '';
  },
  { immediate: true }
);

const currentTab = ref<'services' | 'portfolio'>('portfolio');
watch(
  currentTab,
  (newCurrentTab) => {
    if (newCurrentTab == 'portfolio') {
      if (!profiles.value.length) {
        loadUserProfiles();
      }
      return;
    }
    if (newCurrentTab == 'services') {
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="my-8 sm:my-14 direction">
    <template v-if="user">
      <div class="flex flex-col items-center">
        <img
          class="rounded-full w-36 h-36 mb-2"
          :src="user.picture"
          alt="avatar"
        />
        <p class="capitalize text-lg sm:text-xl">{{ user.name }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
      </div>

      <div class="max-w-xl mx-auto">
        <ul class="flex flex-wrap justify-center gap-2 text-white p-2">
          <p
            v-for="(skill, index) in userSkills"
            :key="index"
            class="bg-blue-500 px-2 py-1 rounded-lg text-xs"
          >
            {{ skill }}
          </p>
        </ul>
      </div>
    </template>
    <div v-else class="text-center">{{ t('no_user_data_yet') }}...</div>
  </section>
  <ul
    class="
      rounded-b-3xl
      flex flex-wrap
      justify-center
      gap-3
      bg-blue-600
      text-white
      capitalize
    "
  >
    <li
      class="px-2 py-2.5 md:p-3 hover:bg-blue-500 cursor-pointer"
      :class="{
        'bg-[#4A8EFF]': currentTab == 'services',
      }"
      @click="currentTab = 'services'"
    >
      services
    </li>
    <li
      class="px-2 py-2.5 md:p-3 hover:bg-blue-500 cursor-pointer"
      :class="{ 'bg-[#4A8EFF]': currentTab == 'portfolio' }"
      @click="currentTab = 'portfolio'"
    >
      portfolio
    </li>
  </ul>
  <section class="m-8 mt-0 direction lg:m-16 lg:mt-0">
    <H1
      v-if="user"
      class="m-4 sm:m-6 ltr-i"
      :class="{ 'text-right': locale == 'ar' }"
      >{{ user.name.split(' ')[0] + s3En }} {{ t('portfolio') }}</H1
    >
    <template v-if="profiles.length">
      <div class="flex flex-wrap justify-between">
        <div class="lg:w-1/2" v-for="profile in profiles" :key="profile.id">
          <div class="m-2 sm:m-4 shadow rounded-md border">
            <Carousel class="m-4 ltr" :wrap-around="true">
              <Slide v-for="(image, i) in profile.images" :key="i">
                <img
                  alt="image"
                  :src="image"
                  class="carousel__item profile-img rounded-md"
                />
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>

            <ul>
              <li class="flex flex-wrap gap-4 shadow px-4 py-4">
                <a
                  class="hover:underline hover:text-blue-600"
                  :href="profile.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 class="text-xl">{{ profile.title }}</h1>
                </a>
              </li>
              <li class="flex gap-4 flex-wrap sm:flex-nowrap shadow px-4 py-4">
                <span>{{ t('description') }}:</span>
                <p>{{ profile.description }}</p>
              </li>
              <li class="flex flex-wrap gap-4 shadow px-4 py-4">
                <span>{{ t('preview') }}:</span>
                <a
                  class="hover:underline hover:text-blue-600"
                  :href="profile.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ t('preview_text') }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="text-center">{{ t('no_profile_data_yet') }}...</div>
  </section>
</template>

<style>
@import url('@/assets/css/slider.css');

.profile-img {
  max-height: 540px;

  object-fit: cover;
  object-position: 50% 0;
}
.ltr-i {
  direction: ltr !important;
}
</style>
