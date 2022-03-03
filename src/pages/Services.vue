<script setup lang="ts">
import { fetchServices } from '@/api/fetchServices';
import { isPositiveInteger } from '@/helpers/numbers';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { serviceI } from '../types/ServiceI';
import { useI18n } from 'vue-i18n';
import Card from '@/components/Card.vue';
import H1 from '@/components/small/H1.vue';
import StarsRates from '../components/StarsRates.vue';
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const categoryId = route.params.categoryId;
if (!isPositiveInteger(categoryId)) {
  alert('Invalid category');
  router.push({ name: 'categories' });
}
const services = ref<Array<serviceI>>([]);
fetchServices(categoryId as string).then(({ response, errors }) => {
  if (errors.length) {
    errors.map((err) => alert(err));
  }
  if (response) {
    services.value = response.data;
  }
});

console.log(categoryId);
</script>

<template>
  <div v-if="!services.length">{{ t('no_services_yet') }}</div>
  <div v-else>
    <H1 class="m-7">
      {{
        locale == 'ar'
          ? services[0].category.arTitle
          : services[0].category.enTitle
      }}
      {{ t('services') }}
    </H1>
    <div class="flex flex-wrap justify-center p-2">
      <Card
        class="sm:w-64 w-1/2 service-card"
        v-for="service in services"
        :key="service.id"
        :card="{
          description: service.description,
          title: service.title,
          image: service.images[0],
          route: { name: '404', params: {} },
        }"
      >
        <template #extra>
          <div class="absolute top-2.5 left-0 rounded-r p-0.5 pr-1 bg-blue-200">
            {{ service.cost }}$
          </div>
          <div>
            <!-- <p class="text-gray-700 text-base mb-2">
              sold count: {{ service.sellerNum }}
            </p> -->
            <StarsRates
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
