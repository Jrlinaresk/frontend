import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
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
          minHeight: 'calc(100vh - 92px)',
          display: 'grid',
          placeItems: 'center',
          px: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 780, textAlign: 'center', py: { xs: 3, sm: 4.5 } }}>
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
                {APP_TEXT.CLIENTS_TITLE}
              </AppButton>
              <AppButton variant="outlined" size="large" onClick={session.logout}>
                Cerrar sesión
              </AppButton>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </DashboardLayout>
  );
};
