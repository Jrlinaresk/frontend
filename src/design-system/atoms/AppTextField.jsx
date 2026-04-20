import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const AppTextField = ({ helperText, ...props }) => {
  return <TextField helperText={helperText || ' '} {...props} />;
};

AppTextField.propTypes = {
  helperText: PropTypes.node,
};
