import { onMounted } from 'vue';

type verifyEmailInputsI = 'email' | 'password';
type getPhoneCodeInputsI = 'phone_number' | 'button';
type checkPhoneCodeInputsI = 'check_number' | 'button';
type additionalInformationInputsI =
  | 'name'
  | 'city'
  | 'picture'
  | 'bio'
  | 'button';
type formI<formInputsNamesI extends string> = HTMLFormElement &
  Record<formInputsNamesI, HTMLInputElement>;
//  Record<'value', string>
export type verifyEmailFormI = formI<verifyEmailInputsI>;
export type getPhoneCodeFormI = formI<getPhoneCodeInputsI>;
export type checkPhoneCodeFormI = formI<checkPhoneCodeInputsI>;
export type additionalInformationFormI = formI<additionalInformationInputsI>;

// 'verifyEmailForm', 'getPhoneCodeForm', 'checkPhoneCodeForm', 'additionalInformationForm',

export const verifyEmailFormID = 'verifyEmailForm';
export const getPhoneCodeFormID = 'getPhoneCodeForm';
export const checkPhoneCodeFormID = 'checkPhoneCodeForm';
export const additionalInformationFormID = 'additionalInformationForm';
export function getSignUpForms() {
  // Always call it inside onMounted()
  const verifyEmail = document.getElementById(
    verifyEmailFormID
  ) as verifyEmailFormI;

  const getPhoneCode = document.getElementById(
    getPhoneCodeFormID
  ) as getPhoneCodeFormI;

  const checkPhoneCode = document.getElementById(
    checkPhoneCodeFormID
  ) as checkPhoneCodeFormI;

  const additionalInformation = document.getElementById(
    additionalInformationFormID
  ) as additionalInformationFormI;

  return {
    forms: { verifyEmail, getPhoneCode, checkPhoneCode, additionalInformation },
  };
}
export function defaultSignUpInputs() {
  onMounted(() => {
    const { forms } = getSignUpForms();

    forms.verifyEmail.email.value = 'moh1434.ma@gmail.com';
    forms.verifyEmail.password.value = '123456';

    forms.getPhoneCode.phone_number.value = '+9647819801344';
    forms.checkPhoneCode.check_number.value = '123456';

    forms.additionalInformation.name.value = 'mohmmed ammar assi';
    forms.additionalInformation.bio.value = 'HTML programmer';
    // form.
  });
}

export function disableFormInputs(formID: string, disable = true) {
  document
    .querySelectorAll(
      `#${formID} input,#${formID} button,#${formID} select,#${formID} textarea`
    )
    .forEach((element) => ((element as HTMLInputElement).disabled = disable));
}
