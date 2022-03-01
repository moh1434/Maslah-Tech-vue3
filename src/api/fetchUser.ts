import { api } from '@/api/axios';
import { userI } from '@/types/UserI';
async function fetchUser(uid: string) {
  let response = null;
  const errors = [];
  try {
    response = await api.get<{ data: userI }>(`/user/${uid}`);
  } catch (e) {
    errors.push(e);
  }

  return { response, errors };
}

export { fetchUser };
