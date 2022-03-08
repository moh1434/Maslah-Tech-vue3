import { createFetch } from '@vueuse/core';
import axios from 'axios';

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
