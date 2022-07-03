import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import { ApiActionGetUser, ApiActionGetWorkshop, ApiActionGetWorkshops } from '@app/api/apiActions';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@app/components/icons/ArrowBackIcon';
import PageGridLayout from '@app/components/layouts/PageGridLayout';
import LoaderPage from '@app/components/loader/LoaderPage';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import CoverImg from '@app/pages/workshop-partial/CoverImg';
import TimeInfo from '@app/pages/workshop-partial/TimeInfo';
import RelatedWorkshops from '@app/pages/workshop-partial/RelatedWorkshops';
import AddToCard from '@app/pages/workshop-partial/AddToCard';
import { useDispatch } from 'react-redux';
import { ACTION_CART_APPEND } from '@app/store/storeActions';
import Page404 from '@app/pages/Page404';
import { waitAll, rejected } from 'folktale/concurrency/task';
import * as R from 'ramda';
import { useQuery, useQueries } from 'react-query';

import {
  getTitle,
  getId,
  getImageUrl,
  getCategory,
  getDate,
  getName,
  getDesc,
  getPrice,
  getUserId,
  getData,
} from '@app/utils/prop-utils';

function Workshop() {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useQuery(['workshop', workshopId], () =>
    ApiActionGetWorkshop(workshopId)
      .map(getData)
      .chain(workshop =>
        waitAll([
          ApiActionGetUser(getUserId(workshop)),
          ApiActionGetWorkshops({
            page: 1,
            limit: 3,
            category: getCategory(workshop),
            id_ne: getId(workshop),
          }),
        ]).map(([{ data: userData }, { data: relatedWorkshops }]) => [workshop, userData, relatedWorkshops])
      )
      .run()
      .promise()
  );

  function handleGoBack() {
    navigate(-1);
  }

  const handleAddToCard = R.curry((workshop, quantity) =>
    dispatch({
      type: ACTION_CART_APPEND,
      payload: {
        id: getId(workshop),
        category: getCategory(workshop),
        title: getTitle(workshop),
        date: getDate(workshop),
        price: getPrice(workshop),
        desc: getDesc(workshop),
        userId: getUserId(workshop),
        quantity: quantity,
        imageUrl: getImageUrl(workshop),
      },
    })
  );
  if (status === 'error') return <Page404 />;
  if (status === 'loading') return <LoaderPage />;
  const [workshop, user, relatedWorkshops] = data;
  return (
    <PageGridLayout>
      <PageGridLayout.Left>
        <Button variant='text' color='info' startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Back
        </Button>
      </PageGridLayout.Left>
      <PageGridLayout.Right pb={{ xs: 5, md: 0 }}>
        <Box>
          <CoverImg width={1040} height={382} src={getImageUrl(workshop)} alt={getTitle(workshop)} key={getId(workshop)} />
        </Box>
        <Box position='relative'>
          <TimeInfo date={getDate(workshop)} category={getCategory(workshop)} />
          <AddToCard price={getPrice(workshop)} onAdd={handleAddToCard(workshop)} />
        </Box>
        <Typography color='secondary' gutterBottom mt={1.5} variant='h1' width={{ lg: 490, xl: 440 }}>
          {getTitle(workshop)}
        </Typography>
        <Box display='flex' alignItems='baseline'>
          <Typography variant='body2' textTransform='uppercase'>
            with
          </Typography>
          &nbsp;
          <Typography variant='h5'>{getName(user)}</Typography>
        </Box>
        <Typography variant='body1' mt={{ xs: 2.5, xl: 4.5 }} pb={{ xs: 4.5, xl: 9.5 }} width={{ lg: 490, xl: 400 }}>
          {getDesc(workshop)}
        </Typography>
        <RelatedWorkshops py={{ xs: 5, xl: 9.5 }}>
          <Typography variant='h2'>Similar Workshops</Typography>
          <Grid container pt={{ xs: 2.5, xl: 4.5 }} spacing={{ xs: 2, sm: 5 }}>
            {relatedWorkshops.map(w => (
              <WorkshopCard key={getId(w)} {...w} />
            ))}
          </Grid>
        </RelatedWorkshops>
      </PageGridLayout.Right>
    </PageGridLayout>
  );
}

export default Workshop;
