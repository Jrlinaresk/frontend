import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

import { COLORS } from '../tokens/colors';
import { LAYOUT_CONSTANTS } from '../../shared/constants/layout';

export const Topbar = ({ username, onMenuClick, onLogout }) => (
  <AppBar
    position="fixed"
    elevation={0}
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bgcolor: COLORS.primary[900],
      borderBottom: `4px solid ${COLORS.primary[400]}`,
    }}
  >
    <Toolbar sx={{ minHeight: LAYOUT_CONSTANTS.TOPBAR_HEIGHT, px: { xs: 1.5, sm: 2.5 } }}>
      <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 1, display: { md: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: 0.4 }}>
          COMPANIA PRUEBA
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight={600} sx={{ mr: 1.5, display: { xs: 'none', sm: 'block' } }}>
        {username}
      </Typography>
      <IconButton color="inherit" onClick={onLogout} aria-label="logout">
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

Topbar.propTypes = {
  username: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
