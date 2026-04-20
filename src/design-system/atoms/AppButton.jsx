import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export const AppButton = ({ children, variant = 'contained', color = 'primary', size = 'medium', ...props }) => {
  return (
    <Button variant={variant} color={color} size={size} disableElevation {...props}>
      {children}
    </Button>
  );
};

AppButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
