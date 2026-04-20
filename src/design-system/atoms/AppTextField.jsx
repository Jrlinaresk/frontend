import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const AppTextField = ({ helperText, reserveHelperText = true, ...props }) => {
  return <TextField helperText={reserveHelperText ? helperText || ' ' : helperText} {...props} />;
};

AppTextField.propTypes = {
  helperText: PropTypes.node,
  reserveHelperText: PropTypes.bool,
};
