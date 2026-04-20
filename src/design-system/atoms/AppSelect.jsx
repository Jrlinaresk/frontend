import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

export const AppSelect = ({ label, helperText, error, children, ...props }) => {
  const id = `${label}-select`;

  return (
    <FormControl fullWidth error={error}>
      {label ? <InputLabel id={id}>{label}</InputLabel> : null}
      <Select labelId={id} label={label} {...props}>
        {children}
      </Select>
      <FormHelperText>{helperText || ' '}</FormHelperText>
    </FormControl>
  );
};

AppSelect.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.node,
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

AppSelect.MenuItem = MenuItem;
