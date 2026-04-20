import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

import { AppTextField } from '../atoms/AppTextField';

export const PasswordField = ({ ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <AppTextField
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="button"
              onClick={() => setVisible((value) => !value)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
};
