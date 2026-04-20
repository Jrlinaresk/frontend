import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '../design-system/theme';
import { FeedbackProvider } from '../core/feedback/FeedbackContext';
import { SessionProvider } from '../core/session/SessionContext';
import { AppRouter } from '../router/AppRouter';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <FeedbackProvider>
        <SessionProvider>
          <AppRouter />
        </SessionProvider>
      </FeedbackProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
