<script setup lang="ts">
import { api, apiWrapper } from "@/api/axios";

import { isPositiveInteger } from "@/helpers/numbers";
import { serviceI, packageI } from "@/types/ServiceI";

import { ref, computed } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

// @ts-ignore
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import H1 from "@/components/small/H1.vue";
import { useI18n } from "vue-i18n";
import StarsRates from "@/components/StarsRates.vue";
import { selectTag } from "@/helpers/selectToggleTag";
import { localUser } from "@/helpers/Auth/localAuth";
import { errorAlerter } from "../api/axios";
import LI from "@/components/small/LI.vue";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

const service = ref<serviceI>();

//
const token = localUser.value.token;

const selectedPacksIds = ref<Array<number>>([]);
function selectPack(event: Event, id: number) {
  selectTag(event, id, selectedPacksIds, "");
}
async function buyTheService() {
  if (!token) {
    alert("You need to login before buy a service");
    // router.push({ name: 'login' });
    return;
  }
  if (service.value?.userId == localUser.value.id) {
    alert("You can not buy your own service");
    return;
  }
  const { response, errors } = await apiWrapper<serviceI>(
    async () =>
      await api.post<{ data: serviceI }>(
        `service/order/${route.params.serviceId}`,
        {
          packagesId: selectedPacksIds.value,
        },
        { headers: { token: token } }
      )
  );
  errorAlerter(errors);
  //TODO: complete this on the future
  if (response?.data) {
    alert("Service bought successfully");
    router.push({
      name: "orders",
    });
  }
}

//

/** */
async function reloadServices(serviceId: string) {
  service.value = undefined;
  selectedPacksIds.value = [];
  if (!isPositiveInteger(serviceId)) {
    alert("Invalid category");
    router.push({ name: "categories" });
    return Promise.reject();
  }
  const serviceUrl = `/service/${serviceId}`;
  const { response, errors } = await apiWrapper<serviceI>(
    async () => await api.get<{ data: serviceI }>(serviceUrl)
  );
  errorAlerter(errors);

  service.value = response?.data.data;

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
        <LI>
          <h1 class="text-xl mx-auto">{{ service.title }}</h1>
        </LI>
        <LI>
          <span>{{ t("description") }}</span>
          <p class="overflow-auto">{{ service.description }}</p>
        </LI>
        <LI>
          <span>{{ t("duration") }}:</span>
          <p>{{ service.duration }} {{ t("day") }}</p>
        </LI>
        <LI>
          <span>{{ t("price") }}:</span>
          <p>{{ service.cost }}{{ t("dinar") }}</p>
        </LI>
        <LI>
          <span>{{ t("number_of_sales") }}:</span>
          <p>{{ service.sellerNum }}</p>
        </LI>
        <LI>
          <span>{{ t("rate") }}: </span>
          <StarsRates
            class="ltr"
            :totalRates="service.rateSum"
            :totalPeople="service.rateNum"
          />
        </LI>
        <LI>
          <span>{{ t("category") }}:</span>
          <p>
            {{ locale == "ar" ? service.category.arTitle : service.category.enTitle }}
          </p>
        </LI>
        <li class="flex gap-4 shadow px-4 py-4">
          <span>{{ t("freelancer_name") }}:</span>
          <router-link
            :to="{ name: 'profile', params: { userId: service.userId } }"
            class="hover:text-blue-500 hover:underline"
          >
            <p>{{ service.user.name }}</p>
          </router-link>
        </li>
        <li class="flex gap-4 shadow px-4 py-4">
          <span>{{ t("freelancer_last_seen") }}:</span>
          <p>{{ new Date(service.user.lastSeen).toLocaleDateString() }}</p>
        </li>
      </ul>
      <ul v-if="service.packages.length" class="mb-7">
        <LI>
          <h2 class="text-lg mx-auto">{{ t("available_upgrades_for_this_service") }}</h2>
        </LI>
        <li
          class="flex flex-wrap items-center gap-6 shadow px-4 py-4"
          v-for="pack in service.packages"
          :key="pack.id"
        >
          <input type="checkbox" @change="selectPack($event, pack.id)" class="w-4 h-4" />
          <div>
            <p class="text-lg">{{ pack.description }}</p>
            <div class="text-gray-700">
              {{ t("for_cost") }}
              <span>{{ pack.moreCost }}</span
              >{{ t("dinar") }} {{ t("and_additional_execution_time") }}
              <span>{{ pack.moreDuration }}</span>
              {{ t("days") }}
            </div>
          </div>
        </li>
      </ul>
      <div class="shadow px-4 py-4">
        <h3 class="px-2 py-2">{{ t("do you want to buy this service") }}?</h3>
        <div class="px-2 py-2">
          <button
            @click="buyTheService()"
            class="bg-blue-400 text-gray-50 px-2 py-1 rounded hover:bg-blue-500"
          >
            {{ t("buy") }} {{ t("now") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("@/assets/css/slider.css");
.carousel__item {
  height: 350px;
  width: 100%;

  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
