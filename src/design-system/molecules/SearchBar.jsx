import React from 'react';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { AppButton } from '../atoms/AppButton';
import { AppTextField } from '../atoms/AppTextField';

export const SearchBar = ({ identification, name, onChange, onSearch, errors }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr) auto' },
      gap: 2,
      alignItems: 'center',
    }}
  >
    <Box>
      <AppTextField
        label="Nombre"
        value={name}
        onChange={(event) => onChange('name', event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
        reserveHelperText={false}
      />
    </Box>
    <Box>
      <AppTextField
        label="Identificación"
        value={identification}
        onChange={(event) => onChange('identification', event.target.value)}
        error={Boolean(errors.identification)}
        helperText={errors.identification}
        reserveHelperText={false}
      />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AppButton
        type="button"
        onClick={onSearch}
        startIcon={<SearchIcon />}
        sx={{
          width: { xs: '100%', md: 'auto' },
          minWidth: { md: 56 },
          height: 56,
          px: { xs: 2.5, md: 0 },
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          display: { xs: 'inline-flex', md: 'none' },
        }}
      >
        Buscar
      </AppButton>
      <IconButton
        type="button"
        onClick={onSearch}
        aria-label="Buscar"
        sx={{
          width: 56,
          height: 56,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: 1,
          display: { xs: 'none', md: 'inline-flex' },
          '&:hover': {
            bgcolor: 'grey.100',
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  </Box>
);

SearchBar.propTypes = {
  identification: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
