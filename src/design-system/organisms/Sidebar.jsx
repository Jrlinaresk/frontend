import React from 'react';
import { Avatar, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '../../shared/enums/routes';
import { COLORS } from '../tokens/colors';
import { LAYOUT_CONSTANTS } from '../../shared/constants/layout';

const navItems = [
  { label: 'Inicio', to: APP_ROUTES.HOME, icon: <HomeIcon fontSize="small" /> },
  { label: 'Consulta Clientes', to: APP_ROUTES.CLIENTS, icon: <PeopleIcon fontSize="small" /> },
];

export const Sidebar = ({ open, onClose, username, variant = 'permanent' }) => {
  const content = (
    <Box sx={{ height: '100%', bgcolor: COLORS.neutral[50] }}>
      <Box sx={{ py: 4, px: 3, textAlign: 'center' }}>
        <Stack alignItems="center" spacing={2}>
          <Avatar sx={{ width: 104, height: 104, bgcolor: COLORS.neutral[800], fontSize: 54 }}>U</Avatar>
          <Typography variant="h6" fontWeight={700}>
            {username}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ letterSpacing: 1 }}>
          MENÚ
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            onClick={onClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              '&.active': {
                bgcolor: COLORS.primary[50],
                color: COLORS.primary[800],
                '& .MuiListItemIcon-root': { color: COLORS.primary[700] },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: COLORS.primary[400] }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={variant === 'permanent' ? true : open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: variant === 'temporary' ? 'block' : 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: LAYOUT_CONSTANTS.DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${COLORS.border}`,
          bgcolor: COLORS.neutral[50],
        },
      }}
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['permanent', 'temporary']),
};
