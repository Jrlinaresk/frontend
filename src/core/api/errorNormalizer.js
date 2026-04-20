import axios from 'axios';

export const normalizeApiError = (error) => {
  if (!error) return 'Hubo un inconveniente con la transacción.';

  if (axios.isAxiosError(error)) {
    const responseMessage =
      error.response?.data?.message ||
      error.response?.data?.mensaje ||
      error.response?.data?.error ||
      error.response?.data?.title;

    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage;
    }

    if (error.response?.status === 401) return 'La sesión expiró. Vuelve a iniciar sesión.';
    if (error.response?.status === 403) return 'No tienes permisos para realizar esta acción.';
    if (error.response?.status === 404) return 'El recurso solicitado no fue encontrado.';
    return 'Hubo un inconveniente con la transacción.';
  }

  if (error instanceof Error && error.message) return error.message;
  return 'Hubo un inconveniente con la transacción.';
};
