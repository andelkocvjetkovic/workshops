import { css, styled } from '@mui/material/styles';
import List from '@mui/material/List';
import { FILTERS_ICON } from '@app/components/filter-category/utils/Filter';
import FilterMenuItem from '@app/components/filter-category/utils/FilterMenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { FILTERS } from '@app/utils/types';
import Typography from '@mui/material/Typography';

const DesktopWrapper = styled(Box)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('md')} {
      display: block;
    }
  `
);
const FilterTitle = styled('div')(
  ({ theme }) => css`
    color: ${theme.palette.grey.light};
    font-weight: 700;
    font-size: ${theme.typography.pxToRem(15)};
  `
);

function FilterCategoryDesktop({ activeFilter, onClick }) {
  return (
    <DesktopWrapper mt={6}>
      <FilterTitle>
        <Grid container columnSpacing={1}>
          <Grid item xs minWidth={32} />
          <Grid item xs={9}>
            <Typography variant='h6'>Filter by category:</Typography>
          </Grid>
        </Grid>
      </FilterTitle>
      <List sx={{ mt: 3 }}>
        {Object.values(FILTERS).map(f => (
          <FilterMenuItem
            key={f}
            filterText={f}
            filterIcon={FILTERS_ICON[f]}
            selected={f === activeFilter}
            onClick={() => onClick(f)}
          />
        ))}
      </List>
    </DesktopWrapper>
  );
}

FilterCategoryDesktop.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.oneOf(Object.values(FILTERS)),
};

export default FilterCategoryDesktop;
