import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { FILTERS_ICON } from "@app/components/filter-category/utils/Filter";
import { css, alpha } from "@mui/material/styles";
import { styled } from "@mui/material";

const StyledMenuItem = styled(MenuItem)(({ theme }) => css`
  &.MuiMenuItem-root {
    font-size: ${theme.typography.pxToRem(18)};
    font-weight: 600;
    color: ${theme.palette.grey.darker};
    text-transform: capitalize;

    &:hover {
      background: transparent;
    }

    ${theme.breakpoints.up("lg")} {
      &:hover {
        background-color: ${alpha(theme.palette.secondary.light, theme.palette.action.selectedOpacity)};
      }
    }

    ${theme.breakpoints.up("xl")} {
      font-size: ${theme.typography.pxToRem(23)};
    }

  }

  &.Mui-selected {
    color: ${theme.palette.secondary.main};
    text-decoration: underline;
    background-color: transparent;
  }

  &:active {
    color: ${theme.palette.secondary.main}
  }
`);

function FilterMenuItem({ filterIcon, filterText, ...rest }) {
  return (
    <StyledMenuItem {...rest}>
      <Grid container alignItems="center">
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          {filterIcon}
        </Grid>
        <Grid item xs={8}>
          {filterText}
        </Grid>
      </Grid>
    </StyledMenuItem>
  );
}

export default FilterMenuItem;
