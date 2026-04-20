import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../../design-system/templates/AuthLayout';
import { DashboardLayout } from '../../../design-system/templates/DashboardLayout';
import { AppButton } from '../../../design-system/atoms/AppButton';
import { useSession } from '../../../core/session/SessionContext';
import { APP_ROUTES } from '../../../shared/enums/routes';

const Content = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, textAlign: 'center', py: { xs: 3, sm: 4.5 } }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1" fontWeight={800} color="primary">
          404
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          Oops... Page Not Found!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          La ruta solicitada no existe o ya no está disponible.
        </Typography>
        <AppButton onClick={() => navigate(APP_ROUTES.HOME)}>Volver al inicio</AppButton>
      </Stack>
    </Box>
  );
};

export const NotFoundPage = () => {
  const session = useSession();

  if (session.isAuthenticated) {
    return (
      <DashboardLayout username={session.username} onLogout={session.logout}>
        <Box sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}>
          <Content />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <AuthLayout>
      <Content />
    </AuthLayout>
  );
};
