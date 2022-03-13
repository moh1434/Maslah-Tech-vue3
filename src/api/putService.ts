import { serviceI } from '../types/ServiceI';
import { api } from './axios';
async function putService(serviceId: string, payload: Object, token: string) {
  let response = null;
  let errors = [];
  try {
    response = await api.put<{ data: serviceI }>(
      `service/${serviceId}`,
      payload,
      { headers: { token: token as string } }
    );
  } catch (e: any) {
    if (e?.response?.data?.err) {
      //The backend puts the errors here :(
      errors = e.response.data.err;
    } else {
      //unknown error
      errors.push(e);
    }
  }

  return { response, errors };
}

export { putService };
