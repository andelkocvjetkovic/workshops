import { createTheme } from '@mui/material';
import FIGMA_COLORS from '@app/styles/figmaColors';

const theme = createTheme({
  palette: {
    primary: {
      main: FIGMA_COLORS.YELLOW,
      light: FIGMA_COLORS.LIGHT_YELLOW,
      contrastText: FIGMA_COLORS.DARKER_GREY,
    },
    secondary: {
      main: FIGMA_COLORS.BLUE,
      light: FIGMA_COLORS.LIGHT_BLUE,
      contrastText: FIGMA_COLORS.WHITE,
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
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          elevation: 3,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
        variant: 'standard',
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          body1: 'p',
          body2: 'p',
        },
      },
    },
  },
});

theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: theme.typography.pxToRem(36),
  lineHeight: theme.typography.pxToRem(43),
  fontWeight: 700,
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(60),
    lineHeight: theme.typography.pxToRem(72),
  },
};
theme.typography.h2 = {
  ...theme.typography.h2,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(32),
  lineHeight: theme.typography.pxToRem(40),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(40),
    lineHeight: theme.typography.pxToRem(50),
  },
};
theme.typography.h3 = {
  ...theme.typography.h3,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: theme.typography.pxToRem(25),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(29),
    lineHeight: theme.typography.pxToRem(36),
  },
};
theme.typography.h4 = {
  ...theme.typography.h4,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(19),
  lineHeight: theme.typography.pxToRem(24),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(27),
    lineHeight: theme.typography.pxToRem(34),
  },
};
theme.typography.h5 = {
  ...theme.typography.h5,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(18),
  lineHeight: theme.typography.pxToRem(23),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(23),
    lineHeight: theme.typography.pxToRem(29),
  },
};
theme.typography.h6 = {
  ...theme.typography.h6,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(13),
  lineHeight: theme.typography.pxToRem(17),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(15),
    lineHeight: theme.typography.pxToRem(19),
  },
};
//p figma
theme.typography.body1 = {
  ...theme.typography.body1,
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(18),
  lineHeight: theme.typography.pxToRem(27),
};
//p bold figma
theme.typography.body2 = {
  ...theme.typography.body2,
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: theme.typography.pxToRem(18),
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(22),
  },
};
theme.typography.button = {
  ...theme.typography.button,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  textTransform: 'capitalize',
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.pxToRem(18),
  },
};
export default theme;
