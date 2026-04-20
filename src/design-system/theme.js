import { createTheme } from '@mui/material/styles';

import { BREAKPOINTS } from './tokens/breakpoints';
import { COLORS } from './tokens/colors';
import { RADIUS } from './tokens/radius';
import { SHADOWS } from './tokens/shadows';
import { SPACING } from './tokens/spacing';
import { TYPOGRAPHY } from './tokens/typography';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary[700],
      dark: COLORS.primary[800],
      light: COLORS.primary[400],
      contrastText: COLORS.neutral[0],
    },
    secondary: {
      main: COLORS.primary[500],
    },
    success: {
      main: COLORS.success,
    },
    warning: {
      main: COLORS.warning,
    },
    error: {
      main: COLORS.error,
    },
    info: {
      main: COLORS.info,
    },
    background: {
      default: COLORS.background,
      paper: COLORS.surface,
    },
    text: {
      primary: COLORS.text,
      secondary: COLORS.neutral[600],
    },
    divider: COLORS.border,
  },
  shape: {
    borderRadius: RADIUS.md,
  },
  shadows: [
    'none',
    SHADOWS.soft,
    SHADOWS.medium,
    SHADOWS.strong,
    ...Array(21).fill('none'),
  ],
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: { fontWeight: TYPOGRAPHY.fontWeights.bold, fontSize: '3.5rem' },
    h2: { fontWeight: TYPOGRAPHY.fontWeights.bold, fontSize: '2.5rem' },
    h3: { fontWeight: TYPOGRAPHY.fontWeights.semibold, fontSize: '2rem' },
    h4: { fontWeight: TYPOGRAPHY.fontWeights.semibold, fontSize: '1.5rem' },
    h5: { fontWeight: TYPOGRAPHY.fontWeights.semibold, fontSize: '1.25rem' },
    h6: { fontWeight: TYPOGRAPHY.fontWeights.semibold, fontSize: '1.05rem' },
    button: {
      textTransform: 'none',
      fontWeight: TYPOGRAPHY.fontWeights.semibold,
    },
  },
  spacing: (factor) => SPACING[factor] ?? factor * 8,
  breakpoints: {
    values: BREAKPOINTS,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: COLORS.background,
        },
        '*::selection': {
          backgroundColor: COLORS.primary[200],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS.pill,
          paddingInline: '1.1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
