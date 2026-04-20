import axios from 'axios';

import { getStoredSession } from '../session/sessionStorage';
import { normalizeApiError } from './errorNormalizer';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://209.105.239/PruebaReactJs/Api';

export const httpClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const session = getStoredSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.dispatchEvent(new Event('app:session-expired'));
    }
    error.normalizedMessage = normalizeApiError(error);
    return Promise.reject(error);
  }
);

export const apiRequest = async (request) => {
  try {
    const response = await httpClient(request);
    return response.data;
  } catch (error) {
    throw new Error(error.normalizedMessage || normalizeApiError(error));
  }
};

export const requestWithFallback = async (buildRequests) => {
  const errors = [];
  for (const request of buildRequests) {
    try {
      return await apiRequest(request);
    } catch (error) {
      errors.push(error);
    }
  }
  throw errors[errors.length - 1] || new Error('Hubo un inconveniente con la transacción.');
};
