import { css, styled } from '@mui/material/styles';
import List from '@mui/material/List';
import { FILTERS, FILTERS_ICON } from '@app/components/filter-category/utils/Filter';
import FilterMenuItem from '@app/components/filter-category/utils/FilterMenuItem';
import { useState } from 'react';
import Grid from '@mui/material/Grid';

const DesktopWrapper = styled('div')(
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

function FilterCategoryDesktop() {
  const [activeFilter, setActiveFilter] = useState(FILTERS.ALL);
  return (
    <DesktopWrapper>
      <FilterTitle>
        <Grid container columnSpacing={1}>
          <Grid item xs minWidth={32} />
          <Grid item xs={9}>
            Filter by category:
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
            onClick={() => setActiveFilter(f)}
          />
        ))}
      </List>
    </DesktopWrapper>
  );
}

export default FilterCategoryDesktop;
