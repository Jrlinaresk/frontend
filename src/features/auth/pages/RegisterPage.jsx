import React, { useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../../design-system/templates/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { APP_ROUTES } from '../../../shared/enums/routes';
import { register as registerRequest } from '../services/authService';
import { useFeedback } from '../../../core/feedback/FeedbackContext';
import { normalizeApiError } from '../../../core/api/errorNormalizer';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    try {
      await registerRequest(payload);
      feedback.showSuccess('Registro completado correctamente.');
      navigate(APP_ROUTES.LOGIN, { replace: true });
    } catch (error) {
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
            COMPANIA PRUEBA
          </Typography>
        </Box>
        <RegisterForm onSubmit={handleSubmit} loading={loading} />
        <Typography variant="body2" color="text.secondary">
          ¿Ya tiene una cuenta?{' '}
          <Link component={RouterLink} to={APP_ROUTES.LOGIN} underline="hover" fontWeight={700}>
            Iniciar sesión
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
};
