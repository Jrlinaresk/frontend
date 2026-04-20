import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { AppButton } from '../atoms/AppButton';

export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmLabel = 'Aceptar', cancelLabel = 'Cancelar' }) => (
  <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <AppButton variant="outlined" onClick={onCancel}>
        {cancelLabel}
      </AppButton>
      <AppButton onClick={onConfirm}>{confirmLabel}</AppButton>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};
