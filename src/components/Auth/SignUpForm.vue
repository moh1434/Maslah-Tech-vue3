<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import H1 from '@/components/small/H1.vue';

import { defaultSignUpInputs } from '@/helpers/Auth/dev_defaultSignupInputs';
if (import.meta.env.MODE == 'development') {
  defaultSignUpInputs();
}
const { t } = useI18n();
const skills = ref<Array<string>>([]);

function sendEmailVerification() {}
function getPhoneCode() {}
function checkPhoneCode() {}
function signUp(event: Event) {
  console.log(event);
}
</script>

<template>
  <!-- email, name, password, phone_number, bio, city, picture, skills -->
  <div class="my-4 sm:my-8">
    <div class="mx-auto block p-6 max-w-xl">
      <H1 class="mt-0 mb-4">{{ t('register-a-new-account') }}</H1>

      <section class="">
        <form @submit.prevent="sendEmailVerification()" id="verifyEmailForm">
          <div>
            <h2 class="inline-block font-bold mr-1 mb-2.5">Step1:</h2>
            <span>choose email and password, then verify your email.</span>
          </div>
          <div class="form-group mb-6">
            <input
              required
              type="email"
              name="email"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
              :placeholder="t('email-address')"
            />
          </div>
          <div class="form-group mb-6">
            <input
              required
              type="password"
              name="password"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
              :placeholder="t('password')"
            />
          </div>

          <div class="form-group mb-6 flex flex-wrap justify-between">
            <button
              class="
                text-sm
                bg-blue-500
                text-white
                px-3
                py-3
                rounded-lg
                sm:mr-3
              "
            >
              Send email verification
            </button>

            <div class="flex my-auto">
              <label class="block mx-1">Verified it before</label>
              <input
                type="checkbox"
                value="true"
                name="already-confirmed-email"
                class="
                  h-4
                  w-4
                  border border-gray-300
                  bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none
                  mt-1
                  cursor-pointer
                "
              />
            </div>
          </div>
        </form>
      </section>
      <section class="py-4">
        <div>
          <h2 class="inline-block font-bold mr-1 mb-2.5">Step2:</h2>
          <span>Write your Phone number then confirm it.</span>
        </div>

        <div class="sm:flex">
          <form
            @submit.prevent="getPhoneCode()"
            id="getPhoneCodeForm"
            class="form-group mb-6 flex sm:w-1/2"
          >
            <input
              type="text"
              pattern="^\+9647[0-9]{9}$"
              name="phone_number"
              placeholder="+9647000000000"
              class="no-direction base-input pl-3 md:pl-4 py-1.5 md:py-2.5"
            />
            <button
              class="text-sm bg-blue-500 text-white w-32 rounded-r-lg sm:mr-3"
            >
              {{ t('get-code') }}
            </button>
          </form>
          <form
            @submit.prevent="checkPhoneCode()"
            id="checkPhoneCodeForm"
            class="form-group mb-6 flex sm:w-1/2"
          >
            <input
              type="number"
              name="check_number"
              placeholder="sms code"
              class="
                no-direction
                base-input
                sm:ml-2
                pl-3
                md:pl-4
                py-1.5
                md:py-2.5
              "
            />
            <button class="text-sm bg-blue-500 text-white w-32 rounded-r-lg">
              {{ t('check') }}
            </button>
          </form>
        </div>
      </section>
      <!--  -->
      <section>
        <form @submit.prevent="signUp($event)" id="additionalInformationForm">
          <div>
            <h2 class="inline-block font-bold mr-1 mb-2.5">Step3:</h2>
            <span>Additional information.</span>
          </div>

          <div class="form-group mb-6">
            <input
              type="text"
              name="name"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
              :placeholder="t('full-name')"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group mb-6">
              <select
                name="city"
                class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
              >
                <option>{{ t('city') }}</option>
                <option>{{ t('baghdad') }}</option>
                <option>{{ t('basra') }}</option>
              </select>
            </div>
            <div class="form-group mb-6">
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                name="picture"
                class="base-input px-3 md:px-4 py-1 md:py-2"
              />
            </div>
          </div>
          <div class="form-group mb-6">
            <textarea
              name="bio"
              class="base-input px-3 py-1.5 min-h-16"
              rows="3"
              :placeholder="`${t('describe-yourself')}(${t(
                'write-your-bio'
              )}).`"
            ></textarea>
          </div>
          <div class="form-group mb-6">
            <fieldset class="border-2">
              <legend class="ml-2">{{ t('select-your-skills') }}</legend>
              <ul class="flex gap-3 text-white p-4">
                <li class="bg-blue-500 bg-opacity-60 px-2.5 py-1 rounded-lg">
                  c++
                </li>
                <li class="bg-blue-500 px-2.5 py-1 rounded-lg">python</li>
                <li class="bg-blue-500 bg-opacity-60 px-2.5 py-1 rounded-lg">
                  Adobe xd
                </li>
              </ul>
            </fieldset>
          </div>
          <button
            type="submit"
            id="recaptchaVerifierButton"
            class="
              w-full
              px-6
              py-2.5
              md:py-3
              bg-blue-600
              text-white
              font-medium
              text-xs
              md:text-sm
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
          >
            {{ t('sign_up') }}
          </button>

          <OrContinueWithFaceBook />
        </form>
      </section>
    </div>
  </div>
</template>

<style>
.min-h-16 {
  min-height: 4rem;
}
.base-input {
  @apply block w-full text-base font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition  ease-in-out  m-0  focus:text-gray-700  focus:bg-white  focus:border-blue-600  focus:outline-none;
}
</style>
