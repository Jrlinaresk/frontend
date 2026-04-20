import { API_ENDPOINTS } from '../../../core/api/endpoints';
import { apiRequest, requestWithFallback } from '../../../core/api/httpClient';
import {
  buildClientSearchPayload,
  buildCreateClientPayload,
  buildUpdateClientPayload,
  buildClientDetails,
  normalizeClientListResponse,
  normalizeInterestResponse,
} from '../../../shared/mappers/clientMappers';

export const searchClients = async ({ identification, name }, userId) => {
  const response = await apiRequest({
    method: 'post',
    url: API_ENDPOINTS.CLIENT.LIST,
    data: buildClientSearchPayload({ identification, name }, userId),
  });
  return normalizeClientListResponse(response);
};

export const deleteClient = async (clientId) =>
  apiRequest({
    method: 'delete',
    url: API_ENDPOINTS.CLIENT.DELETE(clientId),
  });

export const createClient = async (values, userId) =>
  apiRequest({
    method: 'post',
    url: API_ENDPOINTS.CLIENT.CREATE,
    data: buildCreateClientPayload(values, userId),
  });

export const updateClient = async (values, userId) =>
  apiRequest({
    method: 'post',
    url: API_ENDPOINTS.CLIENT.UPDATE,
    data: buildUpdateClientPayload(values, userId),
  });

export const getClientById = async (clientId) => {
  const candidates = [
    ...API_ENDPOINTS.CLIENT.DETAILS_ALTERNATIVES.map((baseUrl) => ({
      method: 'get',
      url: `${baseUrl}${clientId}`,
    })),
    {
      method: 'post',
      url: '/api/Cliente/Obtener',
      data: { id: clientId },
    },
    {
      method: 'post',
      url: '/api/Cliente/Detalle',
      data: { id: clientId },
    },
  ];

  const response = await requestWithFallback(candidates);
  return buildClientDetails(response);
};

export const getInterests = async () => {
  const candidates = API_ENDPOINTS.INTEREST.LIST_ALTERNATIVES.map((url) => ({
    method: 'get',
    url,
  }));
  const response = await requestWithFallback(candidates);
  return normalizeInterestResponse(response);
};
