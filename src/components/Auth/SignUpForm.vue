<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch } from 'vue';

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
import AdditionalInformation from '@/components/Auth/Forms/AdditionalInformation.vue';

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

      <AdditionalInformation />
      <!--  -->
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
