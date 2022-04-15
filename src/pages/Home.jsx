import Grid from '@mui/material/Grid';
import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';

function Home() {
  return (
    <Grid container sx={{ mt: { xs: 2, lg: 3 } }} rowSpacing={{ xs: 2 }} columnSpacing={{ md: 1, lg: 2 }}>
      <Grid item xs={12} md={3}>
        <FilterCategoryMobile />
        <FilterCategoryDesktop />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box pl={3}>
          <Typography variant='h4' fontWeight={700} component='div'>
            Workshops
          </Typography>
          <Typography variant='subtitle1' fontWeight={700} fontSize={{ xs: 14, md: 16 }} color='grey.light'>
            Displayed: 13
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 3, sm: 6, lg: 4 }} pt={{ xs: 2, sm: 4 }}>
          <WorkshopCard />
          <WorkshopCard />
          <WorkshopCard />
          <WorkshopCard />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
