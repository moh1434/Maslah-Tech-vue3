<script setup lang="ts">
import { useMyFetch } from '@/api/axios';
import { fetchUser } from '@/api/fetchUser';

import { userI } from '@/types/UserI';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
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
//end helpers
const user = ref<userI>();
async function loadThePage() {
  fetchUser(route.params.userId as string).then(({ response, errors }) => {
    if (errors.length) {
      errors.map((err) => alert(err));
    }
    if (response?.data.data) {
      user.value = response.data.data;
    }
  });
  loadUserSkills();
}
loadThePage();

onBeforeRouteUpdate((to, from, next) => {
  route.params.userId = to.params.userId as string;
  loadThePage().then(() => {
    next();
  });
});

const { t } = useI18n();
</script>

<template>
  <template v-if="user">
    <section class="my-8">
      <div class="flex flex-col items-center">
        <img
          class="rounded-full w-36 h-36 mb-2"
          :src="user.picture"
          alt="avatar"
        />
        <p class="capitalize text-lg sm:text-xl">{{ user.name }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
      </div>

      <div class="max-w-xl mx-auto direction">
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
    </section>
  </template>
  <div v-else>No user data yet...</div>
</template>

<style></style>
