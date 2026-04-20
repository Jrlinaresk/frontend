import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const AppEmptyState = ({ title, description }) => (
  <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
    <Typography variant="h6" fontWeight={600}>
      {title}
    </Typography>
    {description ? (
      <Typography variant="body2" sx={{ mt: 1 }}>
        {description}
      </Typography>
    ) : null}
  </Box>
);

AppEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
