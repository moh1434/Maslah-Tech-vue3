<script setup lang="ts">
import { ref, computed, onMounted, ComputedRef, watch } from "vue";
import { localUser, defaultImagePath, logOut } from "@/helpers/Auth/localAuth";
import setLocale from "@/helpers/setLocale";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const router = useRouter();

const showAvatarMenu = ref(false);
onMounted(() => {
  window.addEventListener("click", function (e: Event) {
    if (!document.getElementById("avatar-menu")?.contains(e.target as any)) {
      showAvatarMenu.value = false;
    }
  });
});
const menuLinks = ref([
  { text: computed(() => t("Home")), name: "index", params: {} },
  {
    text: computed(() => t("categories.categories")),
    name: "categories",
    params: {},
  },
  { text: computed(() => t("About_Us")), name: "about-us", params: {} },
  // { text: "Contact Us", url: "/" },
]);
const isLoggedIn = ref(false);
const registerLinks = ref<
  Array<{ text: ComputedRef<string> & any; name: string; params: {} }>
>([
  {
    text: computed(() => t("login")),
    name: "login",
    params: {},
  },
  {
    text: computed(() => t("sign_up")),
    name: "sign-up",
    params: {},
  },
]);
watch(
  localUser,
  (newLocalUser) => {
    isLoggedIn.value = newLocalUser.token ? true : false;
  },
  { immediate: true, deep: true }
);

function logOutAndRedirect() {
  logOut().then(() => {
    router.push({ name: "login" });
  });
}
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-between px-2 sm:px-4 lg:px-40 bg-blue-600"
  >
    <ul class="flex items-center">
      <li v-for="(menuLink, index) in menuLinks" :key="index">
        <router-link
          :to="{ name: menuLink.name, params: menuLink.params }"
          class="px-0.5 sm:px-2 md:px-4 mx-1 py-3 sm:py-4"
          >{{ menuLink.text }}</router-link
        >
      </li>
    </ul>
    <ul class="flex items-center" v-if="!isLoggedIn">
      <li v-for="(registerLink, index) in registerLinks" :key="index">
        <router-link
          :to="{ name: registerLink.name, params: registerLink.params }"
          class="px-0.5 sm:px-2 md:px-4 mx-1 py-3 sm:py-4"
        >
          {{ registerLink.text }}
        </router-link>
      </li>
    </ul>
    <div v-else class="relative">
      <div
        id="avatar-menu"
        class="px-4 py-2 avatar cursor-pointer"
        @click="showAvatarMenu = !showAvatarMenu"
      >
        <img
          :src="localUser.picture ?? defaultImagePath"
          alt="avatar"
          class="w-9 h-9 rounded-full"
        />
      </div>
      <ul
        v-show="showAvatarMenu"
        class="flex flex-wrap flex-col bg-blue-600 absolute z-10 top-11 sm:top-13 right-0 sm:right-1/2 sm:translate-x-1/2 w-24 text-center rounded-sm overflow-hidden"
      >
        <li>
          <router-link
            :to="{ name: 'profile', params: { userId: localUser.id } }"
            class="px-1 sm:px-2 py-2.5"
          >
            {{ t("profile") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'orders' }" class="px-1 sm:px-2 py-2.5">
            {{ t("my_orders") }}
          </router-link>
        </li>
        <li>
          <button class="px-1 sm:px-2 py-2.5 w-full" @click="logOutAndRedirect()">
            {{ t("log_out") }}
          </button>
        </li>

        <!-- <li>
          <button
            class="px-1 sm:px-2 md:px-4 py-2.5 w-full"
            @click="locale == 'ar' ? setLocale('en') : setLocale('ar')"
          >
            {{ locale == 'ar' ? 'عربي' : 'English' }}
          </button>
        </li> -->
      </ul>
    </div>
  </header>
</template>

<style scoped>
a,
button {
  color: white;
  cursor: pointer;
  display: block;
}
a:hover,
button:hover,
.avatar:hover {
  @apply bg-blue-500;
  transition: background-color 200ms ease-in-out;
}
/* @media (max-width: 639px) {
  a {
    @apply py-3;
  }
  ul:first-of-type {
    @apply mt-2;
  }
  ul:last-of-type {
    @apply mb-2;
  }
} */

@media (max-width: 370px) {
  li {
    @apply text-sm;
  }
}
</style>
