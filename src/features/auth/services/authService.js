import { API_ENDPOINTS } from '../../../core/api/endpoints';
import { apiRequest, requestWithFallback } from '../../../core/api/httpClient';
import { normalizeLoginResponse } from '../../../shared/mappers/authMappers';

export const login = async (payload) => {
  const response = await apiRequest({
    method: 'post',
    url: API_ENDPOINTS.AUTH.LOGIN,
    data: payload,
  });
  return normalizeLoginResponse(response);
};

export const register = async (payload) =>
  requestWithFallback(
    [API_ENDPOINTS.AUTH.REGISTER, ...API_ENDPOINTS.AUTH.REGISTER_ALTERNATIVES].map((url) => ({
      method: 'post',
      url,
      data: payload,
    }))
  );
