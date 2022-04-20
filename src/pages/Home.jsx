import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsPagesLimitExceeded,
  selectWorkshopActiveFilter,
  selectWorkshopFetchStatus,
  selectWorkshopList,
} from '@app/store/reducers/workshopListSlice';
import { SAGA_WORKSHOPS_APPEND } from '@app/store/sagaActions';
import LoadMore from '@app/pages/home-partial/LoadMore';
import FilterCategory from '@app/components/filter-category/FilterCategory';
import { FETCH_STATUS, FILTERS } from '@app/utils/types';
import PageGridLayout from '@app/components/layouts/PageGridLayout';

function Home() {
  const dispatch = useDispatch();
  /**@type {Boolean}*/
  const isWorkshopLimitExceeded = useSelector(selectIsPagesLimitExceeded);
  /**@type {FILTERS}*/
  const activeFilter = useSelector(selectWorkshopActiveFilter);
  const workshopList = useSelector(selectWorkshopList);
  const wListFetchStatus = useSelector(selectWorkshopFetchStatus);
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
        {wListFetchStatus === FETCH_STATUS.ERROR && (
          <Typography gutterBottom variant='h3' textAlign='center' mt={6} flexGrow={1}>
            Something went wrong... <br/> Please try again later.
          </Typography>
        )}
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
