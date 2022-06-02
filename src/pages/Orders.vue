<script setup lang="ts">
import { OrderI } from "@/types/Order";
import { localUser } from "@/helpers/Auth/localAuth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { api, apiWrapper, errorAlerter } from "@/api/axios";
import LI from "@/components/small/LI.vue";
import H1 from "@/components/small/H1.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();

if (!localUser.value.token) {
  alert("You need to login before seeing your orders.");
  router.push({ name: "login" });
}

const orders = ref<OrderI[]>([]);

apiWrapper<OrderI[]>(
  async () =>
    await api.get<{ data: OrderI[] }>(`order`, {
      headers: { token: localUser.value.token as string },
    })
).then(({ response, errors }) => {
  errorAlerter(errors);
  if (response?.data) {
    orders.value = response.data.data;
  }
});
</script>

<template>
  <H1 class="mt-4 mx-4">{{ t("your_orders") }}</H1>
  <div v-if="orders.length" class="flex justify-center gap-4 mt-7 direction">
    <ul v-for="order in orders" :key="order.id" class="shadow-sm">
      <LI>
        <p>{{ order.title }}</p>
      </LI>
      <LI>
        <span>{{ t("cost") }}:</span>
        <p>{{ order.cost }}</p>
      </LI>
      <LI>
        <span>{{ t("duration") }}:</span>
        <p>{{ order.duration }} {{ t("day") }}</p>
      </LI>
      <LI>
        <router-link
          class="hover:text-blue-500 underline"
          :to="{ name: 'order-history', params: { orderId: order.id } }"
          >{{ t("view_history") }}</router-link
        >
      </LI>
    </ul>
  </div>
  <div v-else>no data yet...</div>
</template>

<style></style>
