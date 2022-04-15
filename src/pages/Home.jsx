import Grid from '@mui/material/Grid';
import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';

function Home() {
  return (
    <Grid container sx={{ mt: { xs: 2, lg: 7 } }}>
      <Grid item xs={12} md={3} xl={2}>
        <FilterCategoryMobile />
        <FilterCategoryDesktop />
      </Grid>
      <Grid item xs={12} md={9} xl={10}>
        Sec
      </Grid>
    </Grid>
  );
}

export default Home;
