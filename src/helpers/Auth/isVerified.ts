import firebase from 'firebase';
import { ref } from 'vue';

const isEmailVerified = ref(
	firebase.auth().currentUser?.emailVerified ?? false
);
const isPhoneNumberVerified = ref(
	firebase.auth().currentUser?.phoneNumber ? true : false
);

const showCheckYouEmailMessage = ref(false);

export { isEmailVerified, isPhoneNumberVerified, showCheckYouEmailMessage };
