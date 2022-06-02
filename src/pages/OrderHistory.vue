<script setup lang="ts">
import { api, apiWrapper, errorAlerter } from "@/api/axios";
import { messageI, insertedMessageI } from "@/types/messageI";

import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { localUser } from "@/helpers/Auth/localAuth";
import { startLoading, stopLoading } from "../helpers/useLoading";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const theMessage = ref("");
if (!localUser.value.token) {
  alert("You need to login before seeing your orders.");
  router.push({ name: "login" });
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
  theMessage.value = "";
}

loadThePage();

onBeforeRouteUpdate((to, from, next) => {
  route.params.orderId = to.params.orderId as string;
  loadThePage().then(() => {
    next();
  });
});

function addMessage(event: Event) {
  // Validate the form
  const form = event.target as HTMLFormElement;
  if (!form.reportValidity) {
    return;
  }
  //
  const addBtn = (event.target as HTMLButtonElement)?.querySelector(
    "[data-btn='add']"
  ) as HTMLButtonElement;
  startLoading(addBtn);
  const orderId = route.params.orderId as string;
  apiWrapper<insertedMessageI>(
    async () =>
      await api.post<{ data: insertedMessageI }>(
        `order/msg/${orderId}`,
        { msg: theMessage.value },
        {
          headers: { token: localUser.value.token as string },
        }
      )
  ).then(({ response, errors }) => {
    if (errors) {
      errorAlerter(errors);
      stopLoading(addBtn);
      return Promise.resolve();
    }
    stopLoading(addBtn);
    alert("History message added successfully");
    if (response?.data) {
      const theNewMessage = convertTheInsertedMessageToNormalMessage(response.data.data);
      console.log(theNewMessage);
      messages.value.push(theNewMessage);
      theMessage.value = "";
    }
  });

  //
}
function convertTheInsertedMessageToNormalMessage(
  historyMessage: insertedMessageI
): messageI {
  console.log(historyMessage.id);
  console.log(historyMessage.msg);
  return {
    id: historyMessage.id,
    createdAt: historyMessage.createdAt,
    active: historyMessage.active,
    msg: historyMessage.msg,
  };
}
</script>

<template>
  <div class="container max-w-4xl mx-auto">
    <div class="border text-center rounded-lg mt-6">
      <div
        v-if="messages.length"
        v-for="msg in messages"
        :key="msg.id"
        class="p-2 m-4 rounded-lg bg-gray-200 even:bg-gray-100"
      >
        {{ msg.msg }}
      </div>
      <div v-else>no messages yet...</div>
      <form
        class="flex gap-4 m-4 mt-8"
        @submit.prevent="addMessage($event)"
        id="addHistoryMessageForm"
      >
        <button
          class="p-2 rounded-lg bg-blue-50 loading-btn hover:bg-blue-100 cursor-pointer"
          data-btn="add"
        >
          {{ t("add") }}
        </button>
        <input
          class="p-2 rounded-lg bg-blue-50 w-full"
          required
          pattern=".{16,}"
          minlength="16"
          type="text"
          v-model="theMessage"
        />
      </form>
    </div>
  </div>
</template>

<style>
@import url("@/assets/css/loading-btn.css");
</style>
