<script setup lang="ts">
import { isPositiveInteger } from "@/helpers/numbers";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { serviceI } from "../types/ServiceI";
import { useI18n } from "vue-i18n";
import Card from "@/components/Card.vue";
import H1 from "@/components/small/H1.vue";
import StarsRates from "../components/StarsRates.vue";
import { api, apiWrapper, errorAlerter } from "@/api/axios";
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

const services = ref<Array<serviceI>>([]);

//
function reloadServices(categoryId: string) {
  services.value = [];
  if (!isPositiveInteger(categoryId)) {
    alert("Invalid category");
    router.push({ name: "categories" });
    return;
  }

  apiWrapper<serviceI[]>(
    async () =>
      await api.get<{ data: serviceI[] }>(`/service?subcategoryids=${categoryId}`)
  ).then(({ response, errors }) => {
    errorAlerter(errors);
    if (response?.data) {
      services.value = response.data.data;
    }
  });
}
//

reloadServices(route.params.categoryId as string);

onBeforeRouteUpdate((to, from, next) => {
  reloadServices(to.params.categoryId as string);
  next();
});
</script>

<template>
  <div v-if="!services.length">{{ t("no_services_yet") }}</div>
  <div v-else>
    <H1 class="m-7">
      {{ locale == "ar" ? services[0].category.arTitle : services[0].category.enTitle }}
      {{ t("services") }}
    </H1>
    <div class="flex flex-wrap justify-center p-2 limit-lines-p">
      <Card
        class="sm:w-64 w-1/2 service-card direction"
        v-for="service in services"
        :key="service.id"
        :card="{
          description: service.description,
          title: service.title,
          image: service.images[0],
          route: { name: 'service', params: { serviceId: service.id } },
        }"
      >
        <template #extra>
          <div class="absolute top-2.5 left-0 rounded-r p-0.5 pr-1 bg-blue-200">
            {{ service.cost }}{{ t("dinar") }}
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
  </div>
</template>

<style>
.service-card img {
  height: 182px;
}
</style>
