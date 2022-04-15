import { createTheme } from '@mui/material';
import FIGMA_COLORS from '@app/styles/figmaColors';

export default createTheme({
  palette: {
    primary: {
      main: FIGMA_COLORS.YELLOW,
      light: FIGMA_COLORS.LIGHT_YELLOW,
      contrastText: FIGMA_COLORS.DARKER_GREY,
    },
    secondary: {
      main: FIGMA_COLORS.BLUE,
      light: FIGMA_COLORS.LIGHT_BLUE,
      contrastText: FIGMA_COLORS.BLACK,
    },
    error: {
      main: FIGMA_COLORS.RED,
    },
    common: {
      white: FIGMA_COLORS.WHITE,
      black: FIGMA_COLORS.DARKER_GREY,
    },
    grey: {
      lighter: FIGMA_COLORS.LIGHTER_GREY,
      light: FIGMA_COLORS.LIGHT_GREY,
      darker: FIGMA_COLORS.DARKER_GREY,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '1px 2px 8px rgba(127, 127, 127, 0.25)',
    '1px 2px 16px rgba(127, 127, 127, 0.25)',
    '1px 2px 16px rgba(127, 127, 127, 0.35)',
    '-1px -2px 16px rgba(127, 127, 127, 0.25)',
  ],
  typography: {
    fontFamily: `'Livvic', sans-serif`,
    button: {
      fontSize: 18,
      fontWeight: 700,
      textTransform: 'capitalize',
      '@media (min-width:600px)': {
        fontSize: 18,
      },
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
