<script setup lang="ts">
import { api, apiWrapper, errorAlerter } from '@/api/axios';
import { messageI } from '@/types/messageI';

import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { localUser } from '@/helpers/Auth/localAuth';

const route = useRoute();
const router = useRouter();

if (!localUser.value.token) {
  alert('You need to login before seeing your orders.');
  router.push({ name: 'login' });
}
const messages = ref<Array<messageI>>([]);

async function loadTheMessages(orderId: string) {
  const { response, errors } = await apiWrapper<messageI[]>(
    async () =>
      await api.get<{ data: messageI[] }>(`order/msg/${orderId}`, {
        headers: { token: localUser.value.token as string },
      })
  );
  errorAlerter(errors);
  if (response?.data) {
    messages.value = response.data.data;
  }
}
async function loadThePage() {
  if (route.params.orderId) {
    loadTheMessages(route.params.orderId as string);
  }
}

loadThePage();

onBeforeRouteUpdate((to, from, next) => {
  route.params.orderId = to.params.orderId as string;
  loadThePage().then(() => {
    next();
  });
});
</script>

<template>
  <div v-if="messages.length" class="container mx-auto">
    <div class="border text-center rounded-lg mt-6">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="p-2 m-4 rounded-lg bg-gray-200 even:bg-gray-100"
      >
        {{ msg.msg }}
      </div>
      <div class="flex gap-4 m-4 mt-8">
        <button class="p-2 rounded-lg bg-blue-50">Add</button>
        <input class="p-2 rounded-lg bg-blue-50 w-full" />
      </div>
    </div>
  </div>
  <div v-else>no data yet...</div>
</template>

<style></style>
