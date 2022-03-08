<script setup lang="ts">
import { useMyFetch } from '@/api/axios';

import { isPositiveInteger } from '@/helpers/numbers';
import { serviceI, packageI } from '@/types/ServiceI';

import { ref, computed } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

// @ts-ignore
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import H1 from '@/components/small/H1.vue';
import { useI18n } from 'vue-i18n';
import StarsRates from '@/components/StarsRates.vue';
import { selectTag } from '@/helpers/selectToggleTag';
import { localUser } from '@/helpers/Auth/localAuth';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

const service = ref<serviceI>();

//
const token = localUser.value.token;

const selectedPacksIds = ref<Array<number>>([]);
function selectPack(event: Event, id: number) {
  selectTag(event, id, selectedPacksIds, '');
}
async function buyTheService() {
  if (!token) {
    alert('You need to login before buy a service');
    // router.push({ name: 'login' });
    return;
  }

  const { error, data, isFinished, isFetching } = await useMyFetch<{
    data: serviceI;
  }>(`service/order/${route.params.serviceId}`, {
    headers: { token: token },
  }).post({
    packagesId: selectedPacksIds.value,
  });
  if (error.value) {
    alert(error.value);
  }
  //TODO: complete this on the future
}

//

/** */
async function reloadServices(serviceId: string) {
  service.value = undefined;
  selectedPacksIds.value = [];
  if (!isPositiveInteger(serviceId)) {
    alert('Invalid category');
    router.push({ name: 'categories' });
    return Promise.reject();
  }
  const serviceUrl = `/service/${serviceId}`;
  const { error, data } = await useMyFetch<{ data: serviceI }>(serviceUrl)
    .get()
    .json();

  if (error.value) {
    alert(error.value);
  }

  service.value = data.value?.data;

  return Promise.resolve();
}
reloadServices(route.params.serviceId as string);
onBeforeRouteUpdate((to, from, next) => {
  route.params.serviceId = to.params.serviceId as string;
  reloadServices(to.params.serviceId as string).then(() => {
    next();
  });
});
/** */
</script>

<template>
  <div class="direction max-w-3xl mx-auto my-10">
    <p v-if="!service">No service yet</p>
    <div v-else>
      <!-- <H1 class="mb-7 sm:text-4xl text-center">{{ service.title }}</H1> -->

      <Carousel class="mx-4 mb-7 ltr" :autoplay="5000" :wrap-around="true">
        <Slide v-for="(image, i) in service.images" :key="i">
          <img alt="image" :src="image" class="carousel__item" />
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <ul class="mb-7">
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <h1 class="text-xl mx-auto">{{ service.title }}</h1>
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Description</span>
          <p class="overflow-auto">{{ service.description }}</p>
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Duration:</span>
          <p>{{ service.duration }} Day</p>
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Price:</span>
          <p>{{ service.cost }}$</p>
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Number of sales:</span>
          <p>{{ service.sellerNum }}</p>
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Rate: </span>
          <StarsRates
            class="ltr"
            :totalRates="service.rateSum"
            :totalPeople="service.rateNum"
          />
        </li>
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <span>Category:</span>
          <p>
            {{
              locale == 'ar'
                ? service.category.arTitle
                : service.category.enTitle
            }}
          </p>
        </li>
        <li class="flex gap-4 shadow px-4 py-4">
          <span>Freelancer name:</span>
          <p>{{ service.user.name }}</p>
        </li>
        <li class="flex gap-4 shadow px-4 py-4">
          <span>Freelancer last seen:</span>
          <p>{{ new Date(service.user.lastSeen).toLocaleDateString() }}</p>
        </li>
      </ul>
      <ul v-if="service.packages.length" class="mb-7">
        <li class="flex flex-wrap gap-4 shadow px-4 py-4">
          <h2 class="text-lg mx-auto">Available upgrades for this service</h2>
        </li>
        <li
          class="flex flex-wrap items-center gap-6 shadow px-4 py-4"
          v-for="pack in service.packages"
          :key="pack.id"
        >
          <input
            type="checkbox"
            @change="selectPack($event, pack.id)"
            class="w-4 h-4"
          />
          <div>
            <p class="text-lg">{{ pack.description }}</p>
            <div class="text-gray-700">
              مقابل
              <span>{{ pack.moreCost }}</span
              >$ و مدة تنفيذ إضافية
              <span>{{ pack.moreDuration }}</span>
              أيام
            </div>
          </div>
        </li>
      </ul>
      <div class="shadow px-4 py-4">
        <h3 class="px-2 py-2">Do you want to buy this service?</h3>
        <div class="px-2 py-2">
          <button
            @click="buyTheService()"
            class="bg-blue-400 text-gray-50 px-2 py-1 rounded hover:bg-blue-500"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.carousel__item {
  height: 350px;
  width: 100%;

  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev {
  left: 10px;
}
.carousel__next {
  right: 10px;
}
.carousel__prev,
.carousel__next {
  @apply bg-gray-300 text-black border-solid border-2;
}
.carousel__prev:hover,
.carousel__next:hover {
  @apply bg-white shadow-lg;
}
</style>
