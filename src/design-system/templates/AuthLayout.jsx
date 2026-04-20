import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import PropTypes from 'prop-types';

export const AuthLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background:
        'radial-gradient(circle at top left, rgba(47,132,255,0.16), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)',
      py: 4,
    }}
  >
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 } }}>
        {children}
      </Paper>
    </Container>
  </Box>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
