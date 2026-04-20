import React, { useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../../design-system/templates/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { useFeedback } from '../../../core/feedback/FeedbackContext';
import { useSession } from '../../../core/session/SessionContext';
import { login as loginRequest } from '../services/authService';
import { APP_TEXT } from '../../../shared/constants/messages';
import { APP_ROUTES } from '../../../shared/enums/routes';
import { normalizeApiError } from '../../../core/api/errorNormalizer';
import { clearStoredSession } from '../../../core/session/sessionStorage';

export const LoginPage = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ username, password, rememberMe }) => {
    setLoading(true);
    try {
      const response = await loginRequest({ username, password });
      session.login({
        token: response.token,
        userId: response.userId,
        username: response.username || username,
        expiration: response.expiration,
        rememberUsername: rememberMe,
      });
      feedback.showSuccess('Sesión iniciada correctamente.');
      navigate(APP_ROUTES.HOME, { replace: true });
    } catch (error) {
      clearStoredSession();
      feedback.showError(normalizeApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 1 }}>
            {APP_TEXT.COMPANY_NAME}
          </Typography>
        </Box>
        <LoginForm initialUsername={session.rememberedUsername} onSubmit={handleSubmit} loading={loading} />
        <Typography variant="body2" color="text.secondary">
          {APP_TEXT.NO_ACCOUNT}{' '}
          <Link component={RouterLink} to={APP_ROUTES.REGISTER} underline="hover" fontWeight={700}>
            Regístrese
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
};
