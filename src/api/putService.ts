import { serviceI } from '../types/ServiceI';
import { api } from './axios';

export async function serviceDelete<T>(url: string, token: string) {
  let response = null;
  let errors = null;
  try {
    response = await api.delete<{ data: T }>(url, {
      headers: { token: token as string },
    });
  } catch (e: any) {
    if (e?.response?.data?.err) {
      //The backend puts the errors here :(
      errors = e.response.data.err;
    } else {
      //unknown error
      errors = e;
    }
  }

  return { response, errors };
}
