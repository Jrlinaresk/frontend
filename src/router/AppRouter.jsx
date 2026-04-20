import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '../shared/enums/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { HomePage } from '../features/home/pages/HomePage';
import { ClientsPage } from '../features/clients/pages/ClientsPage';
import { ClientMaintenancePage } from '../features/clients/pages/ClientMaintenancePage';
import { NotFoundPage } from '../features/not-found/pages/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route element={<PublicOnlyRoute />}>
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route path={APP_ROUTES.HOME} element={<HomePage />} />
      <Route path={APP_ROUTES.CLIENTS} element={<ClientsPage />} />
      <Route path={APP_ROUTES.CLIENT_CREATE} element={<ClientMaintenancePage />} />
      <Route path={APP_ROUTES.CLIENT_EDIT} element={<ClientMaintenancePage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
