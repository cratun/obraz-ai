'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    neutral: Palette['primary'];
    colorText: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    colorText?: Palette['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
    neutral: true;
    colorText: true;
  }
}
// keep in sync with tailwind.config.ts
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-raleway)',
  },
  palette: {
    mode: 'light',
    error: {
      main: '#C22424',
    },
    warning: {
      main: '#f57c00',
    },
    background: {
      default: '#F3F3F3',
    },
    primary: {
      main: '#3BAE89',
      contrastText: '#F3F3F3',
    },
    accent: {
      main: '#DA2D67',
      contrastText: '#F3F3F3',
      light: 'rgb(225, 87, 133)', // generated
      dark: 'rgb(152, 31, 72)', // generated
    },
    neutral: {
      main: '#F3F3F3',
      light: 'rgb(245, 245, 245)', // generated
      dark: 'rgb(170, 170, 170)', // generated
      contrastText: '#4E4E4E',
    },
    colorText: {
      main: '#4E4E4E',
      light: 'rgb(113, 113, 113)', // generated
      dark: 'rgb(54, 54, 54)', // generated
      contrastText: '#ffffff',
    },
  },
});

export default theme;
