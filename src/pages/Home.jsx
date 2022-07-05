import Page404 from './Page404';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import LoadMore from '@app/pages/home-partial/LoadMore';
import FilterCategory from '@app/components/filter-category/FilterCategory';
import { FILTERS } from '@app/utils/types';
import PageGridLayout from '@app/components/layouts/PageGridLayout';
import { useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { ApiActionGetWorkshops } from '@app/api/apiActions';
import { getData } from '@app/utils/prop-utils';
import Maybe from 'folktale/maybe';
import LoaderPage from '@app/components/loader/LoaderPage';
const { Just, Nothing } = Maybe;
import { useInfiniteQuery } from 'react-query';

function Home() {
  let [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  // appliedFilter :: String -> Maybe Category
  const appliedFilter = useMemo(() => {
    const validCategories = Object.values(FILTERS);
    return validCategories.includes(category) ? Just(category) : Nothing();
  }, [category]);

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['workshops', appliedFilter.getOrElse(FILTERS.ALL)],
    ({ pageParam = 1 }) =>
      ApiActionGetWorkshops({ page: pageParam, category: appliedFilter.getOrElse(FILTERS.ALL) })
        .map(getData)
        .run()
        .promise(),
    { getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined) }
  );

  if (status === 'error') return <Page404 />;
  if (status === 'loading') return <LoaderPage />;

  const workshops = data.pages.flatMap(w => w);

  return (
    <PageGridLayout>
      <PageGridLayout.Left>
        <FilterCategory />
      </PageGridLayout.Left>
      <PageGridLayout.Right>
        <Box pl={3}>
          <Typography variant='h2'>Workshops</Typography>
          <Typography variant='h6' color='grey.light'>
            Displayed:&nbsp;
            <Box component='span' color='grey.darker'>
              {workshops.length}
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
          {workshops.length > 0 ? (
            workshops.map(w => (
              <React.Fragment key={w.id}>
                <WorkshopCard key={w.id} {...w} />
              </React.Fragment>
            ))
          ) : (
            <Typography gutterBottom variant='h3' textAlign='center' mt={6} flexGrow={1}>
              Nothing found <br /> Please try redefining your filter.
            </Typography>
          )}
        </Grid>
        <LoadMore mt={3} pb={{ xs: 2, lg: 3 }} onClick={fetchNextPage} isDisabled={!hasNextPage || isFetchingNextPage}>
          {
            //prettier-ignore
            isFetchingNextPage 
              ? 'Loading ...'
              : !hasNextPage ? 'No more to load' : 'Load more'
          }
        </LoadMore>
      </PageGridLayout.Right>
    </PageGridLayout>
  );
}

export default Home;
