import { createTheme } from '@mui/material/styles';

export const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#1e40af',     // Azul corporativo
      light: '#3b82f6',
      dark: '#1e3a8a',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    secondary: {
      main: '#374151',     // Gris formal
      light: '#6b7280',
      dark: '#1f2937',
    },
    success: {
      main: '#059669',
      light: '#10b981',
      dark: '#047857',
      50: '#ecfdf5',
      100: '#d1fae5',
    },
    warning: {
      main: '#d97706',
      light: '#f59e0b',
      dark: '#b45309',
      50: '#fffbeb',
      100: '#fef3c7',
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
      50: '#fef2f2',
      100: '#fee2e2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      disabled: '#9ca3af',
    },
    divider: '#e5e7eb',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});