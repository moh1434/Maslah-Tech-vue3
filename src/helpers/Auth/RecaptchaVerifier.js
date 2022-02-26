export default async function recaptchaVerifier() {
  console.log('call RecaptchaVerifier');
  window['recaptchaVerifier'] = new firebase.auth.RecaptchaVerifier(
    'recaptchaVerifierButton',
    {
      size: 'invisible',
      callback: (response) => {
        console.log('solved');
        // linkPhone();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //   onSignInSubmit();
      },
      'expired-callback': () => {
        console.log('expired');

        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    }
  );
}

// @ts-ignore
// import recaptchaVerifier from '@/helpers/Auth/recaptchaVerifier.js';
