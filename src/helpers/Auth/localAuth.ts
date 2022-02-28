import { ref } from 'vue';

// const clearLocalUser = {
//   id: undefined,
//   name: undefined,
//   email: undefined,
//   picture: undefined,
//   token: null,
// };

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
const defaultImagePath = './public/imgs/defaultAvatar.png';

function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  refreshLocalUserData();
}
export { localUser, defaultImagePath, logOut, refreshLocalUserData };
