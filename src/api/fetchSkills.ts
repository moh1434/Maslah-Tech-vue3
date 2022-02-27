import { api } from '@/api/axios';

async function fetchSkills() {
  let response = null;
  const errors = [];
  try {
    response = await api.get<{ data: string[] }>('/skills');
  } catch (e) {
    errors.push(e);
  }
  // console.log('categoriesResponse=', categoriesResponse);
  return { response, errors };
}

export async function getSkills() {
  const { response, errors } = await fetchSkills();
  if (errors.length) {
    errors.map((err) => alert(err));
    return Promise.resolve([]);
  }
  return response?.data.data ?? [];
}
export { fetchSkills };
