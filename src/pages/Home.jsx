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
import LoaderPage from '@app/components/loader/LoaderPage';
import PageGridLayout from '@app/components/layouts/PageGridLayout';

function Home() {
  const dispatch = useDispatch();
  /**@type {Boolean}*/
  const isWorkshopLimitExceeded = useSelector(selectIsPagesLimitExceeded);
  /**@type {FILTERS}*/
  const activeFilter = useSelector(selectWorkshopActiveFilter);
  const workshopList = useSelector(selectWorkshopList);
  return (
    <PageGridLayout>
      <PageGridLayout.Left>
        <FilterCategory />
      </PageGridLayout.Left>
      <PageGridLayout.Right>
        <Box pl={3}>
          <Typography variant='h2'>Workshops</Typography>
          <Typography variant='h6' color='grey.light'>
            Displayed:{' '}
            <Box component='span' color='grey.darker'>
              {workshopList.length}
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
          {workshopList.map(w => (
            <WorkshopCard key={w.id} {...w} />
          ))}
        </Grid>
        <LoadMore
          mt={3}
          pb={{ xs: 2, lg: 3 }}
          onClick={() => dispatch({ type: SAGA_WORKSHOPS_APPEND })}
          isDisabled={isWorkshopLimitExceeded}
          isFilterActive={activeFilter !== FILTERS.ALL}
        />
      </PageGridLayout.Right>
    </PageGridLayout>
  );
}

export default Home;
