export const API_ENDPOINTS = Object.freeze({
  AUTH: Object.freeze({
    LOGIN: '/api/Authenticate/login',
    REGISTER: '/api/Authenticate/register',
    REGISTER_ALTERNATIVES: ['/api/Authenticate/Register', '/api/Authenticate/signup'],
  }),
  CLIENT: Object.freeze({
    LIST: '/api/Cliente/Listado',
    CREATE: '/api/Cliente/Crear',
    UPDATE: '/api/Cliente/Actualizar',
    DELETE: (id) => `/api/Cliente/Eliminar/${id}`,
    DETAILS_ALTERNATIVES: ['/api/Cliente/Obtener/', '/api/Cliente/Detalle/', '/api/Cliente/Consultar/'],
  }),
  INTEREST: Object.freeze({
    LIST_ALTERNATIVES: ['/api/Intereses/Listado', '/api/Interes/Listado', '/api/Intereses/Consultar'],
  }),
});
