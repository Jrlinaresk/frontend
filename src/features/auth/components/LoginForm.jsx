import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { AppButton } from '../../../design-system/atoms/AppButton';
import { AppTextField } from '../../../design-system/atoms/AppTextField';
import { PasswordField } from '../../../design-system/molecules/PasswordField';
import { APP_TEXT, PAGE_HINTS } from '../../../shared/constants/messages';
import { validateAuthLogin } from '../../../shared/validators/authValidators';

export const LoginForm = ({ initialUsername, onSubmit, loading }) => {
  const [values, setValues] = useState({ username: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialUsername) {
      setValues((current) => ({ ...current, username: initialUsername, rememberMe: true }));
    }
  }, [initialUsername]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateAuthLogin(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            {APP_TEXT.LOGIN_TITLE}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {PAGE_HINTS.LOGIN}
          </Typography>
        </Box>
        <AppTextField
          label="Usuario"
          value={values.username}
          onChange={(event) => setValues((current) => ({ ...current, username: event.target.value }))}
          error={Boolean(errors.username)}
          helperText={errors.username}
          autoComplete="username"
        />
        <PasswordField
          label="Contraseña"
          value={values.password}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          error={Boolean(errors.password)}
          helperText={errors.password}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.rememberMe}
              onChange={(event) => setValues((current) => ({ ...current, rememberMe: event.target.checked }))}
            />
          }
          label={APP_TEXT.REMEMBER_ME}
        />
        <AppButton type="submit" fullWidth size="large" disabled={loading}>
          {APP_TEXT.SIGN_IN}
        </AppButton>
      </Stack>
    </Box>
  );
};

LoginForm.propTypes = {
  initialUsername: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
