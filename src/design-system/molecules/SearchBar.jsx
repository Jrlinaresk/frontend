import React from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

import { AppButton } from '../atoms/AppButton';
import { AppTextField } from '../atoms/AppTextField';

export const SearchBar = ({ identification, name, onChange, onSearch, errors }) => (
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} md={5}>
      <AppTextField
        label="Nombre"
        value={name}
        onChange={(event) => onChange('name', event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
    </Grid>
    <Grid item xs={12} md={5}>
      <AppTextField
        label="Identificación"
        value={identification}
        onChange={(event) => onChange('identification', event.target.value)}
        error={Boolean(errors.identification)}
        helperText={errors.identification}
      />
    </Grid>
    <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-start' } }}>
      <AppButton
        onClick={onSearch}
        startIcon={<SearchIcon />}
        sx={{ minWidth: { xs: '100%', md: 120 }, height: 56 }}
      >
        Buscar
      </AppButton>
    </Grid>
  </Grid>
);

SearchBar.propTypes = {
  identification: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
