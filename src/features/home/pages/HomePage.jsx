import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppButton } from '../../../design-system/atoms/AppButton';
import { DashboardLayout } from '../../../design-system/templates/DashboardLayout';
import { useSession } from '../../../core/session/SessionContext';
import { APP_TEXT, PAGE_HINTS } from '../../../shared/constants/messages';
import { APP_ROUTES } from '../../../shared/enums/routes';

export const HomePage = () => {
  const navigate = useNavigate();
  const session = useSession();

  return (
    <DashboardLayout username={session.username} onLogout={session.logout}>
      <Box
        sx={{
          minHeight: 'calc(100vh - 110px)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 780 }}>
          <CardContent sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={3}>
                {APP_TEXT.HOME_TITLE}
              </Typography>
              <Typography variant="h2" component="h1" fontWeight={800}>
                {APP_TEXT.WELCOME}, {session.username}
              </Typography>
              <Typography variant="h6" color="text.secondary" maxWidth={560}>
                {PAGE_HINTS.CLIENTS}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                <AppButton size="large" onClick={() => navigate(APP_ROUTES.CLIENTS)}>
                  Consulta de clientes
                </AppButton>
                <AppButton variant="outlined" size="large" onClick={session.logout}>
                  Cerrar sesión
                </AppButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};
