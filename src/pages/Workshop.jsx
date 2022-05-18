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
const { Just, Nothing } = maybe;
import { waitAll, rejected } from 'folktale/concurrency/task';
import Result from 'folktale/result';
import * as R from 'ramda';
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
  const [state, dispatchWorkshop] = useReducer(reducer, undefined, () => Leaf.Unloaded);

  useEffect(() => {
    function getWorkshop(workshopId) {
      dispatchWorkshop({ type: WORKSHOP_REQUESTED });

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
          ]).map(([{ data: userData }, { data: relatedWorkshops }]) => ({ workshop, userData, relatedWorkshops }))
        )
        .run()
        .future()
        .listen({
          onRejected: _ => dispatchWorkshop({ type: WORKSHOP_FAILED }),
          onResolved: ({ workshop, userData, relatedWorkshops }) =>
            dispatchWorkshop({
              type: WORKSHOP_FETCHED,
              payload: {
                workshop: Just(workshop),
                relatedWorkshops: relatedWorkshops.length > 0 ? Just(relatedWorkshops) : Nothing(),
                user: Just(userData),
              },
            }),
        });
    }

    getWorkshop(workshopId);
    return () => dispatchWorkshop({ type: WORKSHOP_LEFT });
  }, [workshopId, dispatchWorkshop]);

  function handleGoBack() {
    navigate(-1);
  }

  const handleAddToCard = R.curry((workshop, quantity) =>
    dispatch({
      type: ACTION_CART_ADD,
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
                  <CoverImg width={1040} height={382} src={getImageUrl(w)} alt={getTitle(w)} key={getId(w)} />
                </Box>
                <Box position='relative'>
                  <TimeInfo date={getDate(w)} category={getCategory(w)} />
                  <AddToCard price={getPrice(w)} onAdd={handleAddToCard(workshop.getOrElse({}))} />
                </Box>
                <Typography color='secondary' gutterBottom mt={1.5} variant='h1' width={{ lg: 490, xl: 440 }}>
                  {getTitle(w)}
                </Typography>
              </>
            ))
            .getOrElse(null)}
          <Box display='flex' alignItems='baseline'>
            <Typography variant='body2' textTransform='uppercase'>
              with
            </Typography>
            &nbsp;
            <Typography variant='h5'>{user.map(getName).getOrElse(null)}</Typography>
          </Box>
          {workshop
            .map(w => (
              <>
                <Typography variant='body1' mt={{ xs: 2.5, xl: 4.5 }} pb={{ xs: 4.5, xl: 9.5 }} width={{ lg: 490, xl: 400 }}>
                  {getDesc(w)}
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
                    <WorkshopCard key={getId(w)} {...w} />
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
