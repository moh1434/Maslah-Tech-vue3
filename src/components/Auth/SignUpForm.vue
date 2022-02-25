<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import H1 from '@/components/small/H1.vue';
const { t } = useI18n();
</script>

<template>
  <!-- email, name, password, phone_number, bio, city, picture, skills -->
  <div class="my-4 sm:my-8">
    <div class="mx-auto block p-6 max-w-xl">
      <H1 class="mt-0 mb-4">{{ t('register-a-new-account') }}</H1>
      <form>
        <div class="form-group mb-6">
          <input
            type="text"
            name="name"
            class="
              form-control
              block
              w-full
              px-3
              md:px-4
              py-1.5
              md:py-2.5
              text-base
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
            :placeholder="t('full-name')"
          />
        </div>
        <div class="form-group mb-6">
          <input
            type="email"
            name="email"
            class="
              form-control
              block
              w-full
              px-3
              md:px-4
              py-1.5
              md:py-2.5
              text-base
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
        <div class="form-group mb-6">
          <input
            type="password"
            name="password"
            class="
              form-control
              block
              w-full
              px-3
              md:px-4
              py-1.5
              md:py-2.5
              text-base
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
        <div class="sm:flex">
          <div class="form-group mb-6 flex sm:w-1/2">
            <input
              type="text"
              pattern="^\+9647[0-9]{9}$"
              name="phone_number"
              placeholder="+9647000000000"
              class="
                no-direction
                form-control
                block
                w-full
                pl-3
                md:pl-4
                py-1.5
                md:py-2.5
                text-base
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
            />
            <button
              class="text-sm bg-blue-500 text-white w-32 rounded-r-lg sm:mr-3"
            >
              {{ t('get-code') }}
            </button>
          </div>
          <div class="form-group mb-6 flex sm:w-1/2">
            <input
              type="number"
              name="check_number"
              placeholder="sms code"
              class="
                no-direction
                sm:ml-2
                form-control
                block
                w-full
                pl-3
                md:pl-4
                py-1.5
                md:py-2.5
                text-base
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
            />
            <button class="text-sm bg-blue-500 text-white w-32 rounded-r-lg">
              {{ t('check') }}
            </button>
          </div>
        </div>
        <!--  -->
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group mb-6">
            <select
              name="city"
              class="
                form-control
                block
                w-full
                px-3
                md:px-4
                py-1.5
                md:py-2.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                mr-2
                focus:text-gray-700
                focus:bg-white
                focus:border-blue-600
                focus:outline-none
              "
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
              class="
                form-control
                block
                w-full
                px-3
                md:px-4
                py-1
                md:py-2
                text-sm
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
            />
          </div>
        </div>
        <div class="form-group mb-6">
          <textarea
            name="bio"
            class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
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
              min-h-16
            "
            rows="3"
            :placeholder="`${t('describe-yourself')}(${t('write-your-bio')}).`"
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
    </div>
  </div>
</template>

<style>
.min-h-16 {
  min-height: 4rem;
}
</style>
