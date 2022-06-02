import firebase from 'firebase';
import { ref } from 'vue';
import { Router } from 'vue-router';

const clearLocalUser = {
	id: undefined,
	name: undefined,
	email: undefined,
	picture: undefined,
	token: null,
};

const localUser = ref<{
	id: string | undefined;
	name: string | undefined;
	email: string | undefined;
	picture: string | undefined;
	token: string | null;
}>({
	id: undefined,
	name: undefined,
	email: undefined,
	picture: undefined,
	token: null,
});
const localUserKeys = Object.keys(localUser.value) as Array<
	keyof typeof localUser.value
>;
function refreshLocalUserData() {
	const userData = localStorage.getItem('userData');
	if (!userData) {
		localUser.value = { ...clearLocalUser };
		return;
	}
	if (userData) {
		const newLocalUser = JSON.parse(userData);
		try {
			localUserKeys.map((key) => {
				if (Object.prototype.hasOwnProperty.call(newLocalUser, key)) {
					localUser.value[key] = newLocalUser[key];
				}
			});
		} catch (e) {
			alert(e);
		}
	}
	localUser.value.token = localStorage.getItem('token');
}

refreshLocalUserData();
const defaultImagePath = '/imgs/defaultAvatar.png';

async function logOut() {
	return firebase
		.auth()
		.signOut()
		.then(() => {
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
			refreshLocalUserData();
		})
		.catch((error) => {
			alert(error);
		});
}

function confirmLogOutOrRedirect(router: Router) {
	if (
		confirm(
			'You are already logged in, do you want to log-out to continue in this page?'
		)
	) {
		logOut();
	} else {
		router.push({ name: 'categories' });
	}
}
export {
	localUser,
	defaultImagePath,
	logOut,
	refreshLocalUserData,
	confirmLogOutOrRedirect,
};
