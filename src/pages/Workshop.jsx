import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import {
  ApiActionGetUser,
  ApiActionGetWorkshop,
  ApiActionsGetWorkshops,
  ApiActionGetWorkshopCancelable,
} from '@app/api/apiActions';
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
import reducer, {
  Leaf,
  WORKSHOP_FETCHED,
  WORKSHOP_FAILED,
  WORKSHOP_LEFT,
  WORKSHOP_REQUESTED,
} from '@app/pages/workshop-partial/reducer';
import Page404 from '@app/pages/Page404';
import { maybe } from 'folktale';
import * as R from 'ramda';

const { Just, Nothing } = maybe;

function Workshop() {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, dispatchWorkshop] = useReducer(reducer, undefined, () => {
    return Leaf.Unloaded;
  });

  useEffect(() => {
    async function getWorkshop(workshopId) {
      dispatchWorkshop({ type: WORKSHOP_REQUESTED });
      try {
        const { data: workshop } = await ApiActionGetWorkshop(workshopId).run().promise();
        const [{ data: userData }, { data: relatedWorkshops }] = await Promise.all([
          ApiActionGetUser(workshop.userId),
          ApiActionsGetWorkshops()({
            page: 1,
            limit: 3,
            category: workshop.category,
            id_ne: workshop.id,
          }),
        ]);
        dispatchWorkshop({
          type: WORKSHOP_FETCHED,
          payload: {
            workshop: Just(workshop),
            relatedWorkshops: relatedWorkshops.length > 0 ? Just(relatedWorkshops) : Nothing(),
            user: Just(userData),
          },
        });
      } catch (e) {
        dispatchWorkshop({ type: WORKSHOP_FAILED });
      }
    }

    getWorkshop(workshopId);
    return () => dispatchWorkshop({ type: WORKSHOP_LEFT });
  }, [workshopId, dispatchWorkshop]);

  function handleGoBack() {
    navigate(-1);
  }

  const handleAddToCard = workshop => quantity =>
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

  return state.cata({
    Unloaded: () => null,
    Loading: () => <LoaderPage />,
    Failed: () => <Page404 />,
    Loaded: ({ workshop, relatedWorkshops, user }) => (
      <PageGridLayout>
        <PageGridLayout.Left>
          <Button variant='text' color='info' startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
            Back
          </Button>
        </PageGridLayout.Left>
        <PageGridLayout.Right pb={{ xs: 5, md: 0 }}>
          {workshop
            .map(w => (
              <>
                <Box>
                  <CoverImg width={1040} height={382} src={R.prop('imageUrl', w)} alt={R.prop('title', w)} key={w.id} />
                </Box>
                <Box position='relative'>
                  <TimeInfo date={R.prop('date', w)} category={R.prop('category', w)} />
                  <AddToCard price={R.prop('price', w)} onAdd={handleAddToCard(workshop.getOrElse({}))} />
                </Box>
                <Typography color='secondary' gutterBottom mt={1.5} variant='h1' width={{ lg: 490, xl: 440 }}>
                  {R.prop('title', w)}
                </Typography>
              </>
            ))
            .getOrElse(null)}
          <Box display='flex' alignItems='baseline'>
            <Typography variant='body2' textTransform='uppercase'>
              with
            </Typography>
            &nbsp;
            <Typography variant='h5'>{user.map(u => u.name).getOrElse(null)}</Typography>
          </Box>
          {workshop
            .map(w => (
              <>
                <Typography variant='body1' mt={{ xs: 2.5, xl: 4.5 }} pb={{ xs: 4.5, xl: 9.5 }} width={{ lg: 490, xl: 400 }}>
                  {R.prop('desc', w)}
                </Typography>
              </>
            ))
            .getOrElse(null)}
          {relatedWorkshops
            .map(releted => (
              <RelatedWorkshops py={{ xs: 5, xl: 9.5 }} key={releted}>
                <Typography variant='h2'>Similar Workshops</Typography>
                <Grid container pt={{ xs: 2.5, xl: 4.5 }} spacing={{ xs: 2, sm: 5 }}>
                  {releted.map(w => (
                    <WorkshopCard key={w.id} {...w} />
                  ))}
                </Grid>
              </RelatedWorkshops>
            ))
            .getOrElse(null)}
        </PageGridLayout.Right>
      </PageGridLayout>
    ),
  });
}

export default Workshop;
