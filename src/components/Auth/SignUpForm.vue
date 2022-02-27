<script setup lang="ts">
import firebase from 'firebase';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
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
  getSignUpForms,
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
import { getSkills } from '@/api/fetchSkills';
if (import.meta.env.MODE == 'development') {
  defaultSignUpInputs();
}
onMounted(() => {
  recaptchaVerifier();
});
const { t } = useI18n();

const skills = ref<Array<string>>([]);
getSkills().then((res) => (skills.value = res));
// console.log('skills=', skills);
const selectedSkills = ref<Array<string>>([]);

function selectSkill(event: Event, index: number) {
  // console.log('selectSkill', event, index);
  const skillToSelectByUser = skills.value[index];
  if (!skillToSelectByUser) {
    return;
  }
  if (selectedSkills.value.includes(skillToSelectByUser)) {
    // console.log('includes');
    const index = selectedSkills.value.indexOf(skillToSelectByUser);
    if (index !== -1) {
      // console.log('add bg-opacity-60');
      selectedSkills.value.splice(index, 1);
      (event?.target as any)?.classList?.add('bg-opacity-60');
    }
  } else {
    // console.log('NOT includes');
    // console.log('remove bg-opacity-60');
    selectedSkills.value.push(skillToSelectByUser);
    (event?.target as any)?.classList?.remove('bg-opacity-60');
  }
}
onMounted(() => {
  disableFormInputs(getPhoneCodeFormID, true);
  disableFormInputs(checkPhoneCodeFormID, true);
  disableFormInputs(additionalInformationFormID, true);
});

const showCheckYouEmailMessage = ref(false);
async function sendEmailVerification() {
  const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
  const validForm = form.reportValidity();
  if (!validForm) {
    return;
  }
  await createUser(form.email.value, form.password.value);
  showCheckYouEmailMessage.value = true;
}
async function iVerifiedMyEmail() {
  const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
  const validForm = form.reportValidity();
  if (!validForm) {
    return Promise.resolve();
  }
  const userResponse = await loginToFireBase(
    form.email.value,
    form.password.value
  );
  console.log('user=', userResponse);
  if (userResponse.errors.length) {
    userResponse.errors.map((error) => {
      alert(error);
    });
    return Promise.resolve();
  }
  console.log('here');
  const user = userResponse.user;
  if (!user) {
    alert('user not found1');
    return Promise.resolve();
  }
  if (user.emailVerified) {
    disableFormInputs(getPhoneCodeFormID, false);
    // disableFormInputs(verifyEmailFormID, true);
    alert('email verified successfully, got to the next step');
  }
}
async function getPhoneCode() {
  //Form validated from HTML5
  const getPhoneCodeForm = document.getElementById(
    getPhoneCodeFormID
  ) as getPhoneCodeFormI;

  linkPhone(getPhoneCodeForm.phone_number.value)?.then(() => {
    disableFormInputs(checkPhoneCodeFormID, false);
  });
}
async function checkPhoneCode() {
  console.log('checkPhoneCode');
  //Form validated from HTML5
  const checkPhoneCodeForm = document.getElementById(
    checkPhoneCodeFormID
  ) as checkPhoneCodeFormI;

  const response = await submitPhoneNumberAuthCode(
    checkPhoneCodeForm.check_number.value
  );
  if (response.errors.length) {
    response.errors.map((err: Error) => alert(err));
    return Promise.resolve();
  }
  if (!response.user) {
    alert('user not found2');
    return Promise.resolve();
  }
  if (!response.user.phoneNumber) {
    alert('Wrong confirm code, try again');
    return Promise.resolve();
  }
  disableFormInputs(verifyEmailFormID, true);
  disableFormInputs(getPhoneCodeFormID, true);
  disableFormInputs(checkPhoneCodeFormID, true);
  disableFormInputs(additionalInformationFormID, false);
}
async function signUp(event: Event) {
  const additionalInformation = document.getElementById(
    additionalInformationFormID
  ) as additionalInformationFormI;

  //Form validated from HTML5
  await registerInAPi({
    name: additionalInformation.name.value,
    bio: additionalInformation.bio.value,
    city: additionalInformation.city.value,
    skills: skills.value,
    picture: additionalInformation.picture.value,
  });

  alert('registered successfully');
}
</script>

<template>
  <!-- email, name, password, phone_number, bio, city, picture, skills -->
  <div class="sign-up-form my-4 sm:my-8">
    <div class="mx-auto block p-6 max-w-xl">
      <H1 class="mt-0 mb-4">{{ t('register-a-new-account') }}</H1>

      <section class="">
        <form @submit.prevent="" id="verifyEmailForm">
          <div>
            <h2 class="inline-block font-bold mr-1 mb-2.5">Step1:</h2>
            <span>write email and password, then verify your email.</span>
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
              type="submit"
              @click="sendEmailVerification()"
              class="text-sm bg-blue-500 text-white px-3 py-3 rounded-lg mr-2"
            >
              Send verification
            </button>

            <button
              @click="iVerifiedMyEmail()"
              class="text-sm bg-blue-500 text-white px-3 py-3 rounded-lg ml-2"
            >
              I verified it
            </button>
            <!-- <div class="flex my-auto">
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
            </div> -->
          </div>
        </form>
      </section>
      <section class="relative py-4">
        <span
          v-show="showCheckYouEmailMessage"
          class="absolute -top-5 text-xs sm:text-sm"
          >Hint: open your email to verify it, then click `I verified it` button
        </span>
        <div>
          <h2 class="inline-block font-bold mr-1 mb-2.5">Step2:</h2>
          <span>Write your Phone number then confirm it.</span>
        </div>

        <div class="sm:flex">
          <form
            @submit.prevent="getPhoneCode()"
            id="getPhoneCodeForm"
            class="form-group mb-6 flex sm:w-1/2"
            v-if="!firebase.auth().currentUser?.phoneNumber"
          >
            <input
              type="text"
              pattern="^\+9647[0-9]{9}$"
              name="phone_number"
              value="+9647"
              placeholder="+9647000000000"
              class="no-direction base-input pl-3 md:pl-4 py-1.5 md:py-2.5"
            />
            <button
              type="submit"
              id="recaptchaVerifierButton"
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
            <h2 class="inline-block font-bold mr-1 mb-2.5">Last step:</h2>
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
              <ul class="flex flex-wrap justify-center gap-3 text-white p-4">
                <button
                  v-for="(skill, index) in skills"
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

.sign-up-form input:disabled,
.sign-up-form textarea:disabled,
.sign-up-form select:disabled,
.sign-up-form button:disabled {
  @apply cursor-not-allowed opacity-70;
}
</style>
