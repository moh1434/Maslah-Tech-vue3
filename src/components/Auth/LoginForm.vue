<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
const { t } = useI18n();
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
          <form>
            <div class="mb-6">
              <input
                type="tel"
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
                :placeholder="t('phone-number')"
              />
            </div>
            <div class="mb-6">
              <input
                type="password"
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
              <a
                href="#"
                class="
                  text-blue-600
                  hover:text-blue-700
                  focus:text-blue-700
                  active:text-blue-800
                  duration-200
                  transition
                  ease-in-out
                "
                >{{ t('forgot-password?') }}</a
              >
            </div>

            <!-- Submit button -->
            <button
              type="submit"
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
