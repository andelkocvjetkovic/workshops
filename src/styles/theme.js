import { createTheme } from '@mui/material';
import FIGMA_COLORS from '@app/styles/figmaColors';


export default createTheme({
  palette: {
    primary: {
      main: FIGMA_COLORS.YELLOW,
      light: FIGMA_COLORS.LIGHT_YELLOW,
      contrastText: FIGMA_COLORS.DARKER_GRAY,
    },
    secondary: {
      main: FIGMA_COLORS.BLUE,
      light: FIGMA_COLORS.LIGHT_BLUE,
      contrastText: FIGMA_COLORS.BLACK
    },
    error: {
      main: FIGMA_COLORS.RED,
    },
    common: {
      white: FIGMA_COLORS.WHITE,
      black: FIGMA_COLORS.DARKER_GRAY,
    },
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '1px 2px 8px rgba(127, 127, 127, 0.25)',
    '1px 2px 16px rgba(127, 127, 127, 0.25)',
    '1px 2px 16px rgba(127, 127, 127, 0.35)',
    '-1px -2px 16px rgba(127, 127, 127, 0.25)'
  ],
  typography: {
    fontFamily: `'Livvic', sans-serif`,
    button: {
      fontSize: 14,
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: 18,
      },
    }
  }
});