import React from 'react';
import PropTypes from 'prop-types';

import { ConfirmDialog } from '../../../design-system/molecules/ConfirmDialog';
import { APP_TEXT } from '../../../shared/constants/messages';

export const ClientDeleteDialog = ({ open, onCancel, onConfirm }) => (
  <ConfirmDialog
    open={open}
    title={APP_TEXT.CONFIRM_DELETE_TITLE}
    message={APP_TEXT.CONFIRM_DELETE_MESSAGE}
    confirmLabel={APP_TEXT.DELETE}
    cancelLabel={APP_TEXT.CANCEL}
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);

ClientDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
