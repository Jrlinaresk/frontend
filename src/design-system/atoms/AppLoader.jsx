import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const AppLoader = () => (
  <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
    <CircularProgress />
  </Box>
);
