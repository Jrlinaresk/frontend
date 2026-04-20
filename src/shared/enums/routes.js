export const APP_ROUTES = Object.freeze({
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  CLIENTS: '/clients',
  CLIENT_CREATE: '/clients/new',
  CLIENT_EDIT: '/clients/:id',
  NOT_FOUND: '*',
});

export const ROUTE_PATHS = Object.freeze({
  CLIENT_EDIT: (id = ':id') => `/clients/${id}`,
});
