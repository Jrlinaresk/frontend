import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { AppButton } from '../../../design-system/atoms/AppButton';
import { AppTextField } from '../../../design-system/atoms/AppTextField';
import { PasswordField } from '../../../design-system/molecules/PasswordField';
import { APP_TEXT, PAGE_HINTS } from '../../../shared/constants/messages';
import { validateRegister } from '../../../shared/validators/authValidators';

export const RegisterForm = ({ onSubmit, loading }) => {
  const [values, setValues] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateRegister(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            {APP_TEXT.REGISTER_TITLE}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {PAGE_HINTS.REGISTER}
          </Typography>
        </Box>
        <AppTextField
          label="Nombre Usuario"
          value={values.username}
          onChange={(event) => setValues((current) => ({ ...current, username: event.target.value }))}
          error={Boolean(errors.username)}
          helperText={errors.username}
          autoComplete="username"
        />
        <AppTextField
          label="Dirección de correo"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          error={Boolean(errors.email)}
          helperText={errors.email}
          autoComplete="email"
        />
        <PasswordField
          label="Contraseña"
          value={values.password}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          error={Boolean(errors.password)}
          helperText={errors.password || '8 a 20 caracteres, con mayúscula, minúscula y número.'}
          autoComplete="new-password"
        />
        <AppButton type="submit" fullWidth size="large" disabled={loading}>
          {APP_TEXT.SIGN_UP}
        </AppButton>
      </Stack>
    </Box>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
