import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppLoader } from '../design-system/atoms/AppLoader';
import { useSession } from '../core/session/SessionContext';
import { APP_ROUTES } from '../shared/enums/routes';

export const ProtectedRoute = () => {
  const session = useSession();

  if (!session.bootstrapped) return <AppLoader />;
  if (!session.isAuthenticated) return <Navigate to={APP_ROUTES.LOGIN} replace />;
  return <Outlet />;
};
