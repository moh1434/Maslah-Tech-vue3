<script setup lang="ts">
import { fetchUser } from '@/api/fetchUser';

import { userI } from '@/types/UserI';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import H1 from '@/components/small/H1.vue';

// @ts-ignore
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import Card from '@/components/Card.vue';
import StarsRates from '@/components/StarsRates.vue';
const route = useRoute();
//start helpers

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

//end helpers
const user = ref<userI>();
async function loadThePage() {
  loadTheUser();
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

const currentTab = ref<'services' | 'portfolio'>('services');
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
            v-for="(skill, index) in user.skills"
            :key="index"
            class="bg-blue-500 px-2 py-1 rounded-lg text-xs"
          >
            {{ skill.name }}
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
      >{{ user.name.split(' ')[0] + s3En }} {{ t(currentTab) }}</H1
    >
    <section v-show="currentTab == 'portfolio'">
      <template v-if="user?.portfiloItems.length">
        <div class="flex flex-wrap justify-between">
          <div
            class="lg:w-1/2"
            v-for="profile in user.portfiloItems"
            :key="profile.id"
          >
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
                <li
                  class="flex gap-4 flex-wrap sm:flex-nowrap shadow px-4 py-4"
                >
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
      <div v-else class="text-center">{{ t('no_portfolio_data_yet') }}...</div>
    </section>
    <section v-show="currentTab == 'services'">
      <template v-if="user">
        <div class="flex flex-wrap justify-center p-2">
          <Card
            class="sm:w-64 w-1/2 card-img-h-44 direction"
            v-for="service in user.services"
            :key="service.id"
            :card="{
              description: service.description,
              title: service.title,
              image: service.images[0],
              route: { name: 'service', params: { serviceId: service.id } },
            }"
          >
            <template #extra>
              <div
                class="absolute top-2.5 left-0 rounded-r p-0.5 pr-1 bg-blue-200"
              >
                {{ service.cost }}$
              </div>
              <div>
                <StarsRates
                  class="ltr"
                  :totalRates="service.rateSum"
                  :totalPeople="service.rateNum"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
      <div v-else class="text-center">{{ t('no_services_data_yet') }}...</div>
    </section>
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
.card-img-h-44 img {
  @apply h-48;
}
</style>
