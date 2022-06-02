import firebase from 'firebase';

import { api as axios, errorAlerter } from '@/api/axios';
import {
	getPhoneCodeFormID,
	disableFormInputs,
	verifyEmailFormID,
	additionalInformationFormID,
} from '@/helpers/Auth/dev_defaultSignupInputs';
import { userI } from '@/types/UserI';

export async function createUser(email: string, password: string) {
	console.log('call createUser');

	try {
		const user = (
			await firebase.auth().createUserWithEmailAndPassword(email, password)
		).user;
		console.log('done createUser will sent email link');
		if (user) {
			sendEmailVerification(user);
		} else {
			throw Error('User not found3');
		}
		return user;
	} catch (error: any) {
		if (error.code == 'auth/email-already-in-use') {
			console.log('email used before, will try login in firebase');
			const user = (await loginToFireBase(email, password)).user;
			if (!user) {
				alert('error, User not found4');
			} else {
				if (!user?.emailVerified) {
					sendEmailVerification(user);
				}
			}
			return user;
		} else if (error.code == 'auth/weak-password') console.log('week password');
		else if (error.message == 'User not found') console.log(error.message);
		else throw error;
	}
}

async function sendEmailVerification(user: firebase.User) {
	user.sendEmailVerification();
}

export async function loginToFireBase(email: string, password: string) {
	const res: { user: firebase.User | null; errors: unknown[] } = {
		user: null,
		errors: [],
	};
	try {
		const user = (
			await firebase.auth().signInWithEmailAndPassword(email, password)
		).user;
		res.user = user;
	} catch (e) {
		res.errors.push(e);
	}
	return res;
}
async function updateProfile(name: string) {
	const user = await getUser();
	if (user) {
		await user.updateProfile({
			displayName: name,
			//  photoURL:""
		});
	}
}
export function linkPhone(phoneNumber: string) {
	console.log('linkPhonelinkPhone called linkPhonelinkPhone');
	/// the default phone is a test number will always return 123456 as  confirm code without sent sms, you can add another one from firebase
	const appVerifier = window['recaptchaVerifier' as any];
	return firebase
		.auth()
		.currentUser?.linkWithPhoneNumber(phoneNumber, appVerifier as any)
		.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			window['confirmationResult' as any] = confirmationResult as any;
			// ...
		})
		.catch((error) => {
			console.log(error);
			if (error.code == 'auth/provider-already-linked') {
				//TODO: check it
				if (!firebase?.auth()?.currentUser?.phoneNumber) {
					alert('This phone number are already used in other account');
				} else {
					disableFormInputs(additionalInformationFormID, false);
				}
				// registerInAPi();
				console.log(error.code);
			}
			/// reset  RecaptchaVerifier
		});
}

// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
export async function submitPhoneNumberAuthCode(phoneCode: string) {
	// We are using the test code we created before
	// var code = document.getElementById("code").value;
	// var code = document.getElementById('code').value; // test verify code for +9647728854985
	const res: { user: firebase.User | null; errors: Error[] } = {
		user: null,
		errors: [],
	};

	return await (window['confirmationResult' as any] as any)
		.confirm(phoneCode)
		.then((result: any) => {
			res.user = result.user;
			// registerInAPi();
			// console.log(user);
			return res;
		})
		.catch(function (error: Error) {
			res.errors.push(error);
			console.log(error);
			return res;
		});
}

// async function verifyPhoneCode(code) {
//   window["confirmationResult"]
//     .confirm(code)
//     .then((result) => {
//       const user = result.user;
//     })
//     .catch((error) => {});
// }

async function refreshToken() {
	return (await firebase.auth().currentUser?.getIdToken(true)) ?? null;
}

function getUser() {
	return firebase.auth().currentUser;
}

async function verfiyuser(user?: firebase.User | null) {
	user ??= firebase.auth().currentUser;
	let token = await user?.getIdToken(true);
	try {
		let res = await axios.get('/verfiyuser', {
			headers: {
				token: token ?? 'noToken',
			},
		});
		console.log(res.status);
		console.log(res.data);
		console.log(res.statusText);
	} catch (error) {
		console.log(error);
	}
}

export async function registerInAPi(
	body: Record<'name' | 'bio' | 'city' | 'picture', string> & {
		skills: string[];
	},
	user?: firebase.User | null
) {
	user ??= firebase.auth().currentUser;
	let token = (await user?.getIdToken(true)) ?? '';
	try {
		let res = await axios.post<{ data: userI }>('/register', body, {
			headers: {
				token: token,
			},
		});

		console.log(res.status);
		console.log(res.data);
		console.log(res.statusText);

		return { token, user: res.data.data };
		// refreshToken();
	} catch (error) {
		errorAlerter(error);
		return { token: undefined, user: undefined };
	}
}

export async function recaptchaVerifier() {
	console.log('call RecaptchaVerifier');
	(window['recaptchaVerifier' as any] as any) =
		new firebase.auth.RecaptchaVerifier('recaptchaVerifierButton', {
			size: 'invisible',
			callback: (response: any) => {
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
		});
}
