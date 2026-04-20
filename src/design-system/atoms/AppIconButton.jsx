import React from 'react';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';

export const AppIconButton = ({ children, ...props }) => <IconButton {...props}>{children}</IconButton>;

AppIconButton.propTypes = {
  children: PropTypes.node.isRequired,
};
