import Page404 from './Page404';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkshopListState } from '@app/store/reducers/workshopListSlice';
import LoadMore from '@app/pages/home-partial/LoadMore';
import FilterCategory from '@app/components/filter-category/FilterCategory';
import { FILTERS } from '@app/utils/types';
import PageGridLayout from '@app/components/layouts/PageGridLayout';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { ApiActionGetWorkshops } from '@app/api/apiActions';
import { getData } from '@app/utils/prop-utils';
import Maybe from 'folktale/maybe';
import {
  ACTION_WORKSHOP_FETCHED,
  ACTION_WORKSHOP_FAILED,
  ACTION_WORKSHOP_REQUESTED,
  ACTION_WORKSHOP_NOT_FOUND,
  ACTION_WORKSHOP_REQUESTED_MORE,
  ACTION_WORKSHOP_NO_MORE,
} from '@app/store/storeActions';
import LoaderPage from '@app/components/loader/LoaderPage';
const { Just, Nothing } = Maybe;
import { useQuery, useInfiniteQuery } from 'react-query';

function Home() {
  const dispatch = useDispatch();
  //=====================

  let [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  // appliedFilter :: String -> Maybe Category
  const appliedFilter = useMemo(() => {
    const validCategories = Object.values(FILTERS);
    return validCategories.includes(category) ? Just(category) : Nothing();
  }, [category]);

  const state = useSelector(selectWorkshopListState);

  const { data, status, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
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
              {data.pages.flatMap(w => w).length}
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map(w => (
                <WorkshopCard key={w.id} {...w} />
              ))}
            </React.Fragment>
          ))}

          {isFetchingNextPage && (
            <Typography variant='h6' color='grey.light' component='p' textAlign='center'>
              Loading ...
            </Typography>
          )}
          {!hasNextPage && (
            <Typography variant='h6' color='grey.light' component='p' textAlign='center'>
              No more to load
            </Typography>
          )}
        </Grid>
        <LoadMore mt={3} pb={{ xs: 2, lg: 3 }} onClick={fetchNextPage} isDisabled={!hasNextPage || isFetchingNextPage} />
      </PageGridLayout.Right>
    </PageGridLayout>
  );

  return state.cata({
    Unloaded: () => null,
    Loading: () => <LoaderPage />,
    Loaded: (workshopList, apiPage) => (
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
            onClick={() => {
              dispatch({ type: ACTION_WORKSHOP_REQUESTED_MORE });
              ApiActionGetWorkshops({ page: apiPage, category: appliedFilter.getOrElse(FILTERS.ALL) })
                .map(getData)
                .run()
                .future()
                .listen({
                  onCancelled: () => console.log('cancelled'),
                  onRejected: () => dispatch({ type: ACTION_WORKSHOP_FAILED }),
                  onResolved: list =>
                    list.length > 0
                      ? dispatch({
                          type: ACTION_WORKSHOP_FETCHED,
                          payload: { list: [...workshopList, ...list], apiPage: apiPage + 1 },
                        })
                      : dispatch({ type: ACTION_WORKSHOP_NO_MORE, payload: workshopList }),
                });
            }}
            isDisabled={false}
          />
        </PageGridLayout.Right>
      </PageGridLayout>
    ),
    LoadingMore: workshopList => (
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
                {workshopList.length}
              </Box>
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
            {workshopList.map(w => (
              <WorkshopCard key={w.id} {...w} />
            ))}
          </Grid>
          <LoadMore mt={3} pb={{ xs: 2, lg: 3 }} isDisabled>
            <br />
            <Typography variant='h6' color='grey.light' component='p'>
              Loading ...
            </Typography>
          </LoadMore>
        </PageGridLayout.Right>
      </PageGridLayout>
    ),
    NoMore: workshopList => (
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
                {workshopList.length}
              </Box>
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, sm: 5 }} pt={{ xs: 2, sm: 4 }}>
            {workshopList.map(w => (
              <WorkshopCard key={w.id} {...w} />
            ))}
          </Grid>
          <LoadMore mt={3} pb={{ xs: 2, lg: 3 }} isDisabled>
            <Typography variant='h5' textAlign='center' color='grey.darker'>
              That&apos;s all, currently we have no more workshops to load.
            </Typography>
            <br />
            {appliedFilter.map(filter => filter !== FILTERS.ALL).getOrElse(false) && (
              <Typography variant='h6' color='grey.light' component='p' textAlign='center'>
                Try redefining your filter.
              </Typography>
            )}
          </LoadMore>
        </PageGridLayout.Right>
      </PageGridLayout>
    ),
    NotFound: () => (
      <Typography gutterBottom variant='h3' textAlign='center' mt={6} flexGrow={1}>
        Nothing found <br /> Please try redefining your filter.
      </Typography>
    ),
    Failed: () => (
      <Typography gutterBottom variant='h3' textAlign='center' mt={6} flexGrow={1}>
        Something went wrong... <br /> Please try again later.
      </Typography>
    ),
  });
}

export default Home;
