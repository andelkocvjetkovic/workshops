import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { css } from '@mui/material/styles';

const RelatedWorkshops = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.grey.lighter};
    box-shadow: -20px 0 0 ${theme.palette.grey.lighter}, 20px 0 0 ${theme.palette.grey.lighter};

    ${theme.breakpoints.up('sm')} {
      box-shadow: -40px 0 0 ${theme.palette.grey.lighter}, 40px 0 0 ${theme.palette.grey.lighter};
    }

    ${theme.breakpoints.up('md')} {
      box-shadow: -500px 0 0 ${theme.palette.grey.lighter}, 200px 0 0 0 ${theme.palette.grey.lighter};
    }
  `
);

export default RelatedWorkshops;
