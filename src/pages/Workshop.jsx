import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import { ApiActionGetUser, ApiActionGetWorkshop, ApiActionsGetWorkshops } from '@app/api/apiActions';
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
import { ACTION_CART_ADD } from '@app/store/storeActions';
import reducer from '@app/pages/workshop-partial/reducer';
import { FETCH_STATUS } from '@app/utils/types';
import { WORKSHOP_FETCH_STATUS, WORKSHOP_RELATED, WORKSHOP_SET, WORKSHOP_USER } from '@app/pages/workshop-partial/reducer';
import Page404 from '@app/pages/Page404';

function Workshop() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{ fetchStatus, workshop, user, relatedWorkshops }, dispatchWorkshop] = useReducer(reducer, {
    fetchStatus: FETCH_STATUS.LOADING,
    workshop: null,
    user: null,
    relatedWorkshops: [],
  });

  const workshopId = params?.workshopId;
  useEffect(() => {
    async function getWorkshop(workshopId) {
      dispatchWorkshop({ type: WORKSHOP_FETCH_STATUS, payload: FETCH_STATUS.LOADING });
      try {
        const { data } = await ApiActionGetWorkshop(workshopId);
        dispatchWorkshop({ type: WORKSHOP_SET, payload: data });
        const [{ data: userData }, { data: relatedWorkshops }] = await Promise.all([
          ApiActionGetUser(data.userId),
          ApiActionsGetWorkshops()({
            page: 1,
            limit: 3,
            category: data.category,
            id_ne: data.id,
          }),
        ]);

        dispatchWorkshop({ type: WORKSHOP_USER, payload: userData });
        dispatchWorkshop({ type: WORKSHOP_RELATED, payload: relatedWorkshops });
        dispatchWorkshop({ type: WORKSHOP_FETCH_STATUS, payload: FETCH_STATUS.IDLE });
      } catch (e) {
        dispatchWorkshop({ type: WORKSHOP_FETCH_STATUS, payload: FETCH_STATUS.ERROR });
      }
    }

    if (workshopId) {
      getWorkshop(workshopId);
    } else dispatchWorkshop({ type: WORKSHOP_FETCH_STATUS, payload: FETCH_STATUS.ERROR });
  }, [workshopId]);

  function handleGoBack() {
    navigate(-1);
  }

  function handleAddToCard(quantity) {
    dispatch({
      type: ACTION_CART_ADD,
      payload: {
        id: workshop.id,
        category: workshop.category,
        title: workshop.title,
        date: workshop.date,
        price: workshop.price,
        desc: workshop.desc,
        userId: workshop.userId,
        quantity: quantity,
        imageUrl: workshop.imageUrl,
      },
    });
  }

  if (fetchStatus === FETCH_STATUS.LOADING) {
    return <LoaderPage />;
  }
  if (fetchStatus === FETCH_STATUS.ERROR) {
    return <Page404 />;
  }
  return (
    <PageGridLayout>
      <PageGridLayout.Left>
        <Button variant='text' color='info' startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Back
        </Button>
      </PageGridLayout.Left>
      <PageGridLayout.Right pb={{ xs: 5, md: 0 }}>
        <Box>
          <CoverImg width={1040} height={382} src={workshop.imageUrl} alt={workshop.title} />
        </Box>
        <Box position='relative'>
          <TimeInfo date={workshop.date} category={workshop.category} />
          <AddToCard price={workshop.price} onAdd={handleAddToCard} />
        </Box>
        <Typography color='secondary' gutterBottom mt={1.5} variant='h1' width={{ lg: 400 }}>
          {workshop.title}
        </Typography>
        <Box display='flex' alignItems='baseline'>
          <Typography variant='body2' textTransform='uppercase'>
            with
          </Typography>
          &nbsp;
          <Typography variant='h5'>{user.name}</Typography>
        </Box>
        <Typography variant='body1' mt={{ xs: 2.5, xl: 4.5 }} pb={{ xs: 4.5, xl: 9.5 }} width={{ lg: 400 }}>
          {workshop.desc}
        </Typography>
        {relatedWorkshops.length > 0 && (
          <RelatedWorkshops py={{ xs: 5, xl: 9.5 }}>
            <Typography variant='h2'>Similar Workshops</Typography>
            <Grid container pt={{ xs: 2.5, xl: 4.5 }} spacing={{ xs: 2, sm: 5 }}>
              {relatedWorkshops.map(w => (
                <WorkshopCard key={w.id} {...w} />
              ))}
            </Grid>
          </RelatedWorkshops>
        )}
      </PageGridLayout.Right>
    </PageGridLayout>
  );
}

export default Workshop;
