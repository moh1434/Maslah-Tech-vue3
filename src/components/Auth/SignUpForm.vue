<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch } from 'vue';
import OrContinueWithFaceBook from '@/components/Auth/OrContinueWithFaceBook.vue';
import H1 from '@/components/small/H1.vue';
import {
  createUser,
  linkPhone,
  loginToFireBase,
  submitPhoneNumberAuthCode,
  registerInAPi,
  recaptchaVerifier,
} from '@/helpers/Auth/firebase';
import {
  defaultSignUpInputs,
  verifyEmailFormI,
  verifyEmailFormID,
  getPhoneCodeFormID,
  checkPhoneCodeFormID,
  additionalInformationFormID,
  disableFormInputs,
  getPhoneCodeFormI,
  checkPhoneCodeFormI,
  additionalInformationFormI,
} from '@/helpers/Auth/dev_defaultSignupInputs';
import { allSkills, selectedSkills, selectSkill } from '@/helpers/useSkills';
import { startLoading, stopLoading } from '@/helpers/useLoading';
import {
  isEmailVerified,
  isPhoneNumberVerified,
  showCheckYouEmailMessage,
} from '@/helpers/Auth/isVerified';
import VerifyEmail from '@/components/Auth/Forms/VerifyEmail.vue';
import PhoneCode from './Forms/PhoneCode.vue';
if (import.meta.env.MODE == 'development') {
  defaultSignUpInputs();
}
onMounted(() => {
  recaptchaVerifier();
});
const { t } = useI18n();

watch(isEmailVerified, (newIsVerified, oldIsVerified) => {
  if (newIsVerified) {
    disableFormInputs(getPhoneCodeFormID, false);
    // disableFormInputs(verifyEmailFormID, true);
    alert('email verified successfully, got to the next step');
  }
});

watch(isPhoneNumberVerified, (newIsVerified, oldIsVerified) => {
  if (newIsVerified) {
    disableFormInputs(verifyEmailFormID, true);
    disableFormInputs(getPhoneCodeFormID, true);
    disableFormInputs(checkPhoneCodeFormID, true);
    disableFormInputs(additionalInformationFormID, false);
    alert('Phone number verified successfully, go to the next step');
  }
});

onMounted(() => {
  if (!isEmailVerified.value) {
    disableFormInputs(getPhoneCodeFormID, true);
    disableFormInputs(checkPhoneCodeFormID, true);
  }
  if (!isPhoneNumberVerified.value) {
    disableFormInputs(additionalInformationFormID, true);
  }
});
//

//

async function signUp(event: Event) {
  const additionalInformation = document.getElementById(
    additionalInformationFormID
  ) as additionalInformationFormI;

  startLoading(additionalInformation.button as HTMLButtonElement);
  //Form validated from HTML5
  const { token, user } = await registerInAPi({
    name: additionalInformation.name.value,
    bio: additionalInformation.bio.value,
    city: additionalInformation.city.value,
    skills: selectedSkills.value,
    picture: additionalInformation.picture.value,
  });
  if (token) {
    localStorage.setItem('token', token);

    const userData = {
      name: user?.name,
      email: user?.email,
      id: user?.id,
      picture: user?.picture,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    console.log(token);
  }
  stopLoading(additionalInformation.button as HTMLButtonElement);
  alert('registered successfully');
}

// function testLoading(event: Event) {
//   const button = event.target as HTMLButtonElement;
//   button.disabled = true;
//   button.classList.add('loading');
//   setTimeout(() => {
//     button.classList.remove('loading');
//     button.disabled = false;
//   }, 1200);
// }
</script>

<template>
  <!-- email, name, password, phone_number, bio, city, picture, skills -->
  <div class="sign-up-form my-4 sm:my-8">
    <!-- <button
      @click="testLoading($event)"
      class="text-sm bg-blue-500 text-white px-3 py-3 mx-2 loading-btn"
    >
      Click me
    </button> -->
    <div class="mx-auto block p-6 max-w-xl">
      <H1 class="mt-0 mb-4">{{ t('register-a-new-account') }}</H1>
      <VerifyEmail />

      <PhoneCode />

      <!--  -->
      <section>
        <form @submit.prevent="signUp($event)" id="additionalInformationForm">
          <div class="flex mb-2.5 direction">
            <h2 class="inline-block font-bold">{{ t('step') }}3:</h2>
            <p class="px-1">{{ t('step3_message') }}.</p>
          </div>
          <div class="flex gap-4 mb-6">
            <input
              type="text"
              required
              name="name"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
              :placeholder="t('full-name')"
            />

            <select
              name="city"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5 i-w-44"
            >
              <option>{{ t('baghdad') }}</option>
              <option>{{ t('basra') }}</option>
            </select>
          </div>
          <div class="flex gap-4 mb-6 direction">
            <label class="text-lg py-1.5 md:py-2.5">{{ t('avatar') }}:</label>
            <input
              required
              type="file"
              accept="image/x-png,image/jpeg"
              name="picture"
              class="base-input px-3 md:px-4 py-1.5 md:py-2.5"
            />
          </div>
          <div class="mb-6">
            <textarea
              required
              name="bio"
              class="base-input px-3 py-1.5 min-h-16"
              rows="3"
              :placeholder="`${t('describe-yourself')}(${t(
                'write-your-bio'
              )}).`"
            ></textarea>
          </div>
          <div class="mb-6">
            <fieldset class="border-2 direction">
              <legend class="ml-2">{{ t('select-your-skills') }}</legend>
              <ul class="flex flex-wrap justify-center gap-3 text-white p-4">
                <button
                  v-for="(skill, index) in allSkills"
                  :key="index"
                  @click.prevent="selectSkill($event, index)"
                  class="
                    bg-blue-500 bg-opacity-60
                    px-2.5
                    py-1
                    rounded-lg
                    text-sm
                  "
                >
                  {{ skill }}
                </button>
              </ul>
            </fieldset>
          </div>
          <button
            type="submit"
            name="button"
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
              loading-btn
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

.i-w-44 {
  @apply w-44 !important;
}
.sign-up-form input:disabled,
.sign-up-form textarea:disabled,
.sign-up-form select:disabled,
.sign-up-form button:disabled {
  @apply cursor-not-allowed opacity-70;
}

.loading-btn {
  position: relative;
  transition: padding-right 0.3s ease-out;
}
.loading-btn.loading {
  /* background-color: #ccc; */
  padding-right: 36px;
}
.loading-btn.loading:after {
  content: '';
  position: absolute;
  border-radius: 100%;
  right: 6px;
  top: 50%;
  width: 0px;
  height: 0px;
  margin-top: -2px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-left-color: #fff;
  border-top-color: #fff;
  animation: spin 0.6s infinite linear, grow 0.3s forwards ease-out;
}
@keyframes spin {
  to {
    transform: rotate(359deg);
  }
}
@keyframes grow {
  to {
    width: 14px;
    height: 14px;
    margin-top: -8px;
    right: 13px;
  }
}
</style>
