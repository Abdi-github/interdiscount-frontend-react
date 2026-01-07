import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d32f2f',
      dark: '#b71c1c',
      light: '#ef5350',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#212121',
      light: '#424242',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
    error: { main: '#d32f2f' },
    success: { main: '#2e7d32' },
    warning: { main: '#e65100' },
    info: { main: '#1565c0' },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.3 },
    h5: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
    body1: { fontSize: '0.95rem' },
    body2: { fontSize: '0.85rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.7rem', letterSpacing: '0.1em' },
  },
  shape: { borderRadius: 6 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 4,
          letterSpacing: 0,
        },
        containedPrimary: {
          '&:hover': { backgroundColor: '#b71c1c' },
        },
        outlinedPrimary: {
          borderColor: '#d32f2f',
          '&:hover': { borderColor: '#b71c1c', backgroundColor: 'rgba(211,47,47,0.04)' },
        },
      },
      defaultProps: { disableElevation: true },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.1)', borderColor: '#bdbdbd' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4, fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: '#d32f2f' },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: '4px !important' },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#e0e0e0' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: '0.8rem' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, backgroundColor: '#fafafa' },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: { color: '#ff9800' },
        iconEmpty: { color: '#e0e0e0' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiSkeleton: {
      defaultProps: { animation: 'wave' },
    },
  },
});
