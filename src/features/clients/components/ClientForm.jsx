import React from 'react';
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { AppButton } from '../../../design-system/atoms/AppButton';
import { AppTextField } from '../../../design-system/atoms/AppTextField';
import { AppSelect } from '../../../design-system/atoms/AppSelect';
import { APP_TEXT } from '../../../shared/constants/messages';
import { GENDER_OPTIONS } from '../../../shared/enums/genders';

const MAX_LENGTHS = {
  identification: 20,
  firstName: 50,
  lastName: 100,
  cellphone: 20,
  otherPhone: 20,
  address: 200,
  reseña: 200,
};

export const ClientForm = ({ values, errors, interests, loadingInterests, onChange, onSubmit, onBack, saving }) => {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 3.5 } }}>
      <Stack spacing={3} component="form" onSubmit={onSubmit}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Identificación *"
              value={values.identification}
              onChange={(event) => onChange('identification', event.target.value)}
              error={Boolean(errors.identification)}
              helperText={errors.identification}
              inputProps={{ maxLength: MAX_LENGTHS.identification }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Nombre *"
              value={values.firstName}
              onChange={(event) => onChange('firstName', event.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              inputProps={{ maxLength: MAX_LENGTHS.firstName }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Apellidos *"
              value={values.lastName}
              onChange={(event) => onChange('lastName', event.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              inputProps={{ maxLength: MAX_LENGTHS.lastName }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={Boolean(errors.gender)}>
              <InputLabel id="gender-label">Género *</InputLabel>
              <Select
                labelId="gender-label"
                label="Género *"
                value={values.gender}
                onChange={(event) => onChange('gender', event.target.value)}
              >
                {GENDER_OPTIONS.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.gender || ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Fecha de nacimiento *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.birthDate}
              onChange={(event) => onChange('birthDate', event.target.value)}
              error={Boolean(errors.birthDate)}
              helperText={errors.birthDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Fecha de afiliación *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.affiliationDate}
              onChange={(event) => onChange('affiliationDate', event.target.value)}
              error={Boolean(errors.affiliationDate)}
              helperText={errors.affiliationDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Teléfono celular *"
              value={values.cellphone}
              onChange={(event) => onChange('cellphone', event.target.value)}
              error={Boolean(errors.cellphone)}
              helperText={errors.cellphone}
              inputProps={{ maxLength: MAX_LENGTHS.cellphone }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppTextField
              label="Teléfono otro *"
              value={values.otherPhone}
              onChange={(event) => onChange('otherPhone', event.target.value)}
              error={Boolean(errors.otherPhone)}
              helperText={errors.otherPhone}
              inputProps={{ maxLength: MAX_LENGTHS.otherPhone }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppSelect
              label="Interés *"
              value={values.interestId}
              onChange={(event) => onChange('interestId', event.target.value)}
              error={Boolean(errors.interestId)}
              helperText={errors.interestId}
              disabled={loadingInterests}
            >
              <MenuItem value="">Seleccione</MenuItem>
              {interests.map((interest) => (
                <MenuItem key={interest.id} value={interest.id}>
                  {interest.label}
                </MenuItem>
              ))}
            </AppSelect>
          </Grid>
          <Grid item xs={12}>
            <AppTextField
              label="Dirección *"
              value={values.address}
              onChange={(event) => onChange('address', event.target.value)}
              error={Boolean(errors.address)}
              helperText={errors.address}
              inputProps={{ maxLength: MAX_LENGTHS.address }}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextField
              label="Reseña personal *"
              value={values.reseña}
              onChange={(event) => onChange('reseña', event.target.value)}
              error={Boolean(errors.reseña)}
              helperText={errors.reseña}
              multiline
              minRows={3}
              inputProps={{ maxLength: MAX_LENGTHS.reseña }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Imagen del cliente
              </Typography>
              <input type="file" accept="image/*" onChange={(event) => onChange('imageFile', event.target.files?.[0] || null)} />
              {values.imagePreview ? (
                <Box
                  component="img"
                  src={values.imagePreview}
                  alt="Preview"
                  sx={{ display: 'block', mt: 2, width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                />
              ) : null}
            </Box>
          </Grid>
        </Grid>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
          <AppButton variant="outlined" onClick={onBack} type="button">
            {APP_TEXT.BACK}
          </AppButton>
          <AppButton type="submit" disabled={saving}>
            {APP_TEXT.SAVE}
          </AppButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

ClientForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  interests: PropTypes.array.isRequired,
  loadingInterests: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};
