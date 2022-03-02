import { api } from '@/api/axios';
import { serviceI } from '@/types/ServiceI';

async function fetchServices(subCategoryId: string) {
  let response = null;
  const errors = [];
  try {
    response = await api.get<{ data: serviceI[] }>(
      `/service?subcategoryids=${subCategoryId}`
    );
  } catch (e) {
    errors.push(e);
  }
  return { response: response?.data, errors };
}

export { fetchServices };
