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

//
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
//

onMounted(() => {
  disableFormInputs(getPhoneCodeFormID, true);
  disableFormInputs(checkPhoneCodeFormID, true);
  disableFormInputs(additionalInformationFormID, true);
});
//
function startLoading(button: HTMLButtonElement) {
  button.disabled = true;
  button.classList.add('loading');
}
function stopLoading(button: HTMLButtonElement) {
  button.disabled = false;
  button.classList.remove('loading');
}
//

const showCheckYouEmailMessage = ref(false);

async function sendEmailVerification(event: Event) {
  const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
  const validForm = form.reportValidity();
  if (!validForm) {
    return;
  }
  startLoading(event.target as HTMLButtonElement);
  const user = await createUser(form.email.value, form.password.value);
  if (user?.emailVerified) {
    isEmailVerified.value = true;
    disableFormInputs(getPhoneCodeFormID, false);
    // disableFormInputs(verifyEmailFormID, true);
    alert('email verified successfully, got to the next step');
  } else {
    alert(
      'We send a verification link to your email, open it then come back to complete the registration.'
    );
  }
  stopLoading(event.target as HTMLButtonElement);
  showCheckYouEmailMessage.value = true;
}

const isEmailVerified = ref(
  firebase.auth().currentUser?.emailVerified ?? false
);
const isPhoneNumberVerified = ref(
  firebase.auth().currentUser?.phoneNumber ? true : false
);

async function iVerifiedMyEmail(event: Event) {
  const form = document.getElementById(verifyEmailFormID) as verifyEmailFormI;
  const validForm = form.reportValidity();
  if (!validForm) {
    return Promise.resolve();
  }
  startLoading(event.target as HTMLButtonElement);

  const userResponse = await loginToFireBase(
    form.email.value,
    form.password.value
  );
  stopLoading(event.target as HTMLButtonElement);
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
    isEmailVerified.value = true;
    disableFormInputs(getPhoneCodeFormID, false);
    // disableFormInputs(verifyEmailFormID, true);
    alert('email verified successfully, got to the next step');
  } else {
    alert(
      'email not verified, open your email and click on "Verify your email for MaslahTech" email.'
    );
  }
}
async function getPhoneCode(event: Event) {
  //Form validated from HTML5
  const getPhoneCodeForm = document.getElementById(
    getPhoneCodeFormID
  ) as getPhoneCodeFormI;

  startLoading(getPhoneCodeForm.button as HTMLButtonElement);
  linkPhone(getPhoneCodeForm.phone_number.value)?.then(() => {
    stopLoading(getPhoneCodeForm.button as HTMLButtonElement);
    disableFormInputs(checkPhoneCodeFormID, false);
  });
}
async function checkPhoneCode(event: Event) {
  console.log('checkPhoneCode');
  //Form validated from HTML5
  const checkPhoneCodeForm = document.getElementById(
    checkPhoneCodeFormID
  ) as checkPhoneCodeFormI;

  startLoading(checkPhoneCodeForm.button as HTMLButtonElement);
  const response = await submitPhoneNumberAuthCode(
    checkPhoneCodeForm.check_number.value
  );
  stopLoading(checkPhoneCodeForm.button as HTMLButtonElement);

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
  isPhoneNumberVerified.value = true;
  disableFormInputs(verifyEmailFormID, true);
  disableFormInputs(getPhoneCodeFormID, true);
  disableFormInputs(checkPhoneCodeFormID, true);
  disableFormInputs(additionalInformationFormID, false);
}
async function signUp(event: Event) {
  const additionalInformation = document.getElementById(
    additionalInformationFormID
  ) as additionalInformationFormI;

  startLoading(additionalInformation.button as HTMLButtonElement);
  //Form validated from HTML5
  const { token } = await registerInAPi({
    name: additionalInformation.name.value,
    bio: additionalInformation.bio.value,
    city: additionalInformation.city.value,
    skills: skills.value,
    picture: additionalInformation.picture.value,
  });
  if (token) {
    localStorage.setItem('token', token);
    console.log(token);
  }

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

      <section class="" v-show="!isEmailVerified">
        <form @submit.prevent="" id="verifyEmailForm">
          <div class="flex mb-2.5 direction">
            <h2 class="inline-block font-bold">{{ t('step') }}1:</h2>
            <p class="px-1">{{ t('step1_message') }}.</p>
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
              @click="sendEmailVerification($event)"
              class="
                text-sm
                bg-blue-500
                text-white
                px-3
                py-3
                rounded-lg
                mr-2
                loading-btn
              "
            >
              {{ t('send_verification') }}
            </button>

            <button
              @click="iVerifiedMyEmail($event)"
              class="
                text-sm
                bg-blue-500
                text-white
                px-3
                py-3
                rounded-lg
                ml-2
                loading-btn
              "
            >
              {{ t('i_verified_it') }}
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
      <section class="relative py-4" v-show="!isPhoneNumberVerified">
        <span
          v-if="!isEmailVerified"
          v-show="showCheckYouEmailMessage"
          class="absolute -top-5 text-xs sm:text-sm"
          >{{ t('email_verify_hint') }}
        </span>
        <div class="flex mb-2.5 direction">
          <h2 class="inline-block font-bold">{{ t('step') }}2:</h2>
          <p class="px-1">{{ t('step2_message') }}.</p>
        </div>
        <div class="sm:flex">
          <form
            @submit.prevent="getPhoneCode($event)"
            id="getPhoneCodeForm"
            class="form-group mb-6 flex sm:w-1/2"
          >
            <input
              type="text"
              pattern="^\+9647[0-9]{9}$"
              required
              name="phone_number"
              value="+9647"
              placeholder="+9647000000000"
              class="no-direction base-input pl-3 md:pl-4 py-1.5 md:py-2.5"
            />
            <button
              type="submit"
              name="button"
              id="recaptchaVerifierButton"
              class="
                text-sm
                bg-blue-500
                text-white
                w-32
                rounded-r-lg
                sm:mr-3
                loading-btn
              "
            >
              {{ t('get-code') }}
            </button>
          </form>
          <form
            @submit.prevent="checkPhoneCode($event)"
            id="checkPhoneCodeForm"
            class="form-group mb-6 flex sm:w-1/2"
          >
            <input
              type="number"
              required
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
            <button
              class="
                text-sm
                bg-blue-500
                text-white
                w-32
                rounded-r-lg
                loading-btn
              "
              type="submit"
              name="button"
            >
              {{ t('check') }}
            </button>
          </form>
        </div>
      </section>
      <!--  -->
      <section>
        <form @submit.prevent="signUp($event)" id="additionalInformationForm">
          <div class="flex mb-2.5 direction">
            <h2 class="inline-block font-bold">{{ t('step') }}3:</h2>
            <p class="px-1">{{ t('step3_message') }}.</p>
          </div>
          <div class="form-group mb-6">
            <input
              type="text"
              required
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
                <option>{{ t('baghdad') }}</option>
                <option>{{ t('basra') }}</option>
              </select>
            </div>
            <div class="form-group mb-6">
              <input
                required
                type="file"
                accept="image/x-png,image/jpeg"
                name="picture"
                class="base-input px-3 md:px-4 py-1 md:py-2"
              />
            </div>
          </div>
          <div class="form-group mb-6">
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
          <div class="form-group mb-6">
            <fieldset class="border-2 direction">
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
