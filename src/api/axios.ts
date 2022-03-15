import { createFetch } from '@vueuse/core';
import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: `http://192.168.3.67:3001/v1/`,
});

export const useMyFetch = createFetch({
  baseUrl: 'http://192.168.3.67:3001/v1/',
  options: {},
  fetchOptions: {
    mode: 'cors',
  },
});

//new way
export async function apiWrapper<ServerData>(
  axiosMethod: () => Promise<
    AxiosResponse<
      {
        data: ServerData;
      },
      any
    >
  >
) {
  let response = null;
  let errors = null;
  try {
    response = await axiosMethod();
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

export function errorAlerter(errors: any) {
  if (errors) {
    try {
      alert(JSON.stringify(errors));
    } catch (e) {
      alert(errors);
    }
    return 'alerted';
  }
  return; //no errors
}

// Usage example
/*
  apiWrapper<userI>(
    async () =>
      await api.get<{ data: userI }>(`/user/${route.params.userId as string}`)
  ).then(({ response, errors }) => {
    console.log('res=', response?.data);
    errorAlerter(errors);
  });
 */
