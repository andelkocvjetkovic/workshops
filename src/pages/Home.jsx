import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsPagesLimitExceeded, selectWorkshopActiveFilter, selectWorkshopList } from '@app/store/reducers/workshopSlice';
import { SAGA_WORKSHOPS_APPEND } from '@app/store/sagaActions';
import LoadMore from '@app/pages/home-partial/LoadMore';
import FilterCategory from '@app/components/filter-category/FilterCategory';
import { FILTERS } from '@app/utils/types';

function Home() {
  const dispatch = useDispatch();
  /**@type {Boolean}*/
  const isWorkshopLimitExceeded = useSelector(selectIsPagesLimitExceeded);
  /**@type {FILTERS}*/
  const activeFilter = useSelector(selectWorkshopActiveFilter);
  const workshopList = useSelector(selectWorkshopList);
  return (
    <Grid container sx={{ py: { xs: 2, lg: 3 } }} rowSpacing={{ xs: 2 }} columnSpacing={{ md: 1, lg: 2 }}>
      <Grid item xs={12} md={3}>
        <FilterCategory />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box pl={3}>
          <Typography variant='h4' fontWeight={700} component='div'>
            Workshops
          </Typography>
          <Typography variant='subtitle1' fontWeight={700} fontSize={{ xs: 14, md: 16 }} color='grey.light'>
            Displayed: {workshopList.length}
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
          {workshopList.map(w => (
            <WorkshopCard key={w.id} {...w} />
          ))}
        </Grid>
        <LoadMore
          mt={3}
          onClick={() => dispatch({ type: SAGA_WORKSHOPS_APPEND })}
          isDisabled={isWorkshopLimitExceeded}
          isFilterActive={activeFilter !== FILTERS.ALL}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
