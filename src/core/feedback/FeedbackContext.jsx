import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { SNACKBAR_TYPES } from '../../shared/enums/snackbarTypes';

const FeedbackContext = createContext(null);

const initialState = {
  open: false,
  message: '',
  severity: SNACKBAR_TYPES.SUCCESS,
};

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case 'HIDE':
      return { ...state, open: false };
    default:
      return state;
  }
};

export const FeedbackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  const value = useMemo(
    () => ({
      showSuccess: (message) => dispatch({ type: 'SHOW', payload: { message, severity: SNACKBAR_TYPES.SUCCESS } }),
      showError: (message) => dispatch({ type: 'SHOW', payload: { message, severity: SNACKBAR_TYPES.ERROR } }),
      showInfo: (message) => dispatch({ type: 'SHOW', payload: { message, severity: SNACKBAR_TYPES.INFO } }),
    }),
    []
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={4500}
        onClose={() => dispatch({ type: 'HIDE' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={state.severity}
          onClose={() => dispatch({ type: 'HIDE' })}
          variant="filled"
          sx={{ alignItems: 'center' }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback debe usarse dentro de FeedbackProvider');
  }
  return context;
};
