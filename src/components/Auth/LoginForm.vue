<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import { loginToFireBase } from '@/helpers/Auth/firebase';
import { defaultLogInInputs } from '@/helpers/Auth/dev_defaultSignupInputs';
import { fetchUser } from '@/api/fetchUser';
import { refreshLocalUserData } from '@/helpers/Auth/localAuth';
import { startLoading, stopLoading } from '@/helpers/useLoading';
import { useRouter } from 'vue-router';
const { t } = useI18n();
if (import.meta.env.MODE == 'development') {
  defaultLogInInputs();
}

const router = useRouter();

async function login(event: Event) {
  const form = event.target as HTMLFormElement;
  console.log('loginnnn');
  console.log(form.email.value, form.password.value);
  startLoading(form['login-btn'] as HTMLButtonElement);
  const response = await loginToFireBase(form.email.value, form.password.value);

  let uid = response.user?.uid;

  if (response.errors.length) {
    response.errors.map((err: any) => {
      if (err instanceof Object && err?.code == 'auth/user-not-found') {
        console.log(err);
        alert('Wrong email and password.');
      } else if (err instanceof Object && err?.code) {
        console.log(err);
        alert(err?.code);
      } else {
        console.log(err);
        alert(err);
      }
    });
    stopLoading(form['login-btn'] as HTMLButtonElement);
    return Promise.resolve();
  }
  if (typeof uid !== 'string') {
    alert('Unknown error, may be slow internet');
    stopLoading(form['login-btn'] as HTMLButtonElement);
    return Promise.resolve();
  }

  const token = await response.user?.getIdToken(true);
  if (typeof token !== 'string') {
    alert('Unknown error, may be slow internet');
    stopLoading(form['login-btn'] as HTMLButtonElement);
    return Promise.resolve();
  }

  const userResponse = await fetchUser(uid);
  if (userResponse.errors.length) {
    userResponse.errors.map((err) => alert(err));
    stopLoading(form['login-btn'] as HTMLButtonElement);
    return Promise.resolve();
  }
  const user = userResponse.response?.data.data;
  if (!user) {
    alert('Unknown error, may be slow internet');
    stopLoading(form['login-btn'] as HTMLButtonElement);
    return Promise.resolve();
  }
  const userData = {
    name: user?.name,
    email: user?.email,
    id: user?.id,
    picture: user?.picture,
  };
  localStorage.setItem('token', token);
  localStorage.setItem('userData', JSON.stringify(userData));
  refreshLocalUserData();
  stopLoading(form['login-btn'] as HTMLButtonElement);
  router.push({ name: 'categories' });
}
</script>

<template>
  <section class="md:my-10 lg:my-24">
    <div class="container mx-auto px-6 py-12 h-full">
      <div
        class="
          flex
          justify-center
          items-center
          flex-wrap
          h-full
          g-6
          text-gray-800
        "
      >
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="@/assets/imgs/loginDraw1.svg"
            class="w-full"
            alt="login-form"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form id="login-form" @submit.prevent="login($event)">
            <div class="mb-6">
              <input
                type="email"
                name="email"
                required
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                :placeholder="t('email-address')"
              />
            </div>
            <div class="mb-6">
              <input
                type="password"
                required
                name="password"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                :placeholder="t('password')"
              />
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="
                    form-check-input
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-1
                    cursor-pointer
                  "
                  id="check-box"
                  checked
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="check-box"
                  >{{ t('remember-me') }}</label
                >
              </div>
              <button
                @click.prevent=""
                class="
                  text-blue-600
                  hover:text-blue-700
                  focus:text-blue-700
                  active:text-blue-800
                  duration-200
                  transition
                  ease-in-out
                "
              >
                {{ t('forgot-password?') }}
              </button>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              name="login-btn"
              class="
                inline-block
                px-7
                py-3
                bg-blue-600
                text-white
                font-medium
                text-sm
                leading-snug
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
                w-full
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {{ t('login') }}
            </button>
            <OrContinueWithFaceBook />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
