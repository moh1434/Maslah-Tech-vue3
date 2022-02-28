import { ref } from 'vue';

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
const userData = localStorage.getItem('userData');
if (userData) {
  try {
    localUser.value = { ...JSON.parse(userData) };
  } catch (e) {
    alert(e);
  }
}
localUser.value.token = localStorage.getItem('token');

const defaultImagePath = './public/imgs/defaultAvatar.png';

function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  localUser.value = { ...clearLocalUser };
}
export { localUser, defaultImagePath, logOut };
