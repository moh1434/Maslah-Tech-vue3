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

export { fetchSkills };
