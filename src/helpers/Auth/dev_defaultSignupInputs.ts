import { onMounted } from 'vue';

type formInputs =
  | 'name'
  | 'email'
  | 'password'
  | 'phone_number'
  | 'check_number'
  | 'city'
  | 'picture'
  | 'bio';

// 'verifyEmailForm', 'getPhoneCodeForm', 'checkPhoneCodeForm', 'additionalInformationForm',
export function defaultSignUpInputs() {
  onMounted(() => {
    const verifyEmailForm = document.getElementById(
      'verifyEmailForm'
    ) as HTMLElement & Record<formInputs, Record<'value', string>>;

    verifyEmailForm.email.value = 'moh1434.ma@gmail.com';
    verifyEmailForm.password.value = '123456';
    // form.name.value = 'moh1434';
    (document.getElementById('getPhoneCodeForm') as any).phone_number.value =
      '+9647819801344';
    (document.getElementById('checkPhoneCodeForm') as any).check_number.value =
      '123456';
    // form.picture.value = 'C:\\fakepath\\design3_girls.png';
    (document.getElementById('additionalInformationForm') as any).name.value =
      'mohmmed ammar assi';
    (document.getElementById('additionalInformationForm') as any).bio.value =
      'HTML programmer';
    // form.
  });
}
