import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { css, alpha } from '@mui/material/styles';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => css`
    &.MuiMenuItem-root {
      font-size: ${theme.typography.pxToRem(18)};
      font-weight: 600;
      color: ${theme.palette.grey.darker};
      text-transform: capitalize;

      &:hover {
        background: transparent;
      }

      ${theme.breakpoints.up('lg')} {
        &:hover {
          background-color: ${alpha(theme.palette.secondary.light, theme.palette.action.selectedOpacity)};
        }
      }

      ${theme.breakpoints.up('xl')} {
        font-size: ${theme.typography.pxToRem(23)};
      }
    }

    &.Mui-selected {
      color: ${theme.palette.secondary.main};
      text-decoration: underline;
      background-color: transparent;
    }

    &:active {
      color: ${theme.palette.secondary.main};
    }
  `
);

function FilterMenuItem({ filterIcon, filterText, ...rest }) {
  return (
    <StyledMenuItem {...rest}>
      <Grid container alignItems='center' columnSpacing={1} justifyContent='flex-start'>
        <Grid item xs minWidth={32} container justifyContent='center' alignItems='center'>
          {filterIcon}
        </Grid>
        <Grid item xs={9}>
          <Typography variant='h5' component='span'>
            {filterText}
          </Typography>
        </Grid>
      </Grid>
    </StyledMenuItem>
  );
}

export default FilterMenuItem;
