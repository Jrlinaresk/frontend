import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import { LAYOUT_CONSTANTS } from '../../shared/constants/layout';
import { COLORS } from '../tokens/colors';
import { Sidebar } from '../organisms/Sidebar';
import { Topbar } from '../organisms/Topbar';

export const DashboardLayout = ({ username, onLogout, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setMobileOpen((current) => !current);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: COLORS.background,
        pt: { xs: `${LAYOUT_CONSTANTS.TOPBAR_HEIGHT}px`, md: `${LAYOUT_CONSTANTS.TOPBAR_HEIGHT}px` },
      }}
    >
      <Topbar username={username} isDrawerOpen={mobileOpen} onMenuClick={toggleMobileDrawer} onLogout={onLogout} />
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} username={username} variant="temporary" />
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar open username={username} onClose={() => {}} variant="permanent" />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${LAYOUT_CONSTANTS.DRAWER_WIDTH}px` },
          width: { md: `calc(100% - ${LAYOUT_CONSTANTS.DRAWER_WIDTH}px)` },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: LAYOUT_CONSTANTS.CONTENT_MAX_WIDTH, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
