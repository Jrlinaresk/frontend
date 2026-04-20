import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const PageHeader = ({ title, subtitle, actions }) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    justifyContent="space-between"
    spacing={2}
    sx={{ mb: 3 }}
  >
    <Box>
      <Typography variant="h5" component="h1" fontWeight={700}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
    {actions}
  </Stack>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
};
