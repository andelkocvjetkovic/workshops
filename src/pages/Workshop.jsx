import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiActionGetUser, ApiActionGetWorkshop, ApiActionsGetWorkshops } from '@app/api/apiActions';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@app/components/icons/ArrowBackIcon';
import PageGridLayout from '@app/components/layouts/PageGridLayout';
import LoaderPage from '@app/components/loader/LoaderPage';
import Box from '@mui/material/Box';
import WorkshopTimeInfo from '@app/components/workshop-card/utils/WorkshopTimeInfo';
import CalendarIcon from '@app/components/icons/CalendarIcon';
import { getDate, getTime } from '@app/utils/time-utils';
import ClockIcon from '@app/components/icons/ClockIcon';
import { FILTERS_ICON } from '@app/components/filter-category/utils/Filter';
import Typography from '@mui/material/Typography';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import CoverImg from '@app/pages/workshop-partial/CoverImg';
import TimeInfo from '@app/pages/workshop-partial/TimeInfo';
import RelatedWorkshops from '@app/pages/workshop-partial/RelatedWorkshops';
import { InputLabel, Select } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CartIcon from '@app/components/icons/CartIcon';
import AddToCard from '@app/pages/workshop-partial/AddToCard';
import { useDispatch } from 'react-redux';
import { ACTION_CART_ADD } from '@app/store/storeActions';

function Workshop() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [workshop, setWorkshop] = useState(null);
  const [user, setUser] = useState(null);
  const [reletedWorkshops, setReletedWorkshops] = useState([]);
  const workshopId = params?.workshopId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWorkshop(abortController, workshopId) {
      setIsLoading(true);
      try {
        const { data } = await ApiActionGetWorkshop(workshopId);
        setWorkshop(data);
        const [{ data: userData }, { data: relatedWorkshops }] = await Promise.all([
          ApiActionGetUser(data.userId),
          ApiActionsGetWorkshops()({
            page: 1,
            limit: 3,
            category: data.category,
            id_ne: workshopId,
          }),
        ]);
        setUser(userData);
        setReletedWorkshops(relatedWorkshops);
        // console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    const abortController = new AbortController();
    if (workshopId) {
      getWorkshop(abortController, workshopId);
    }
    return () => abortController.abort();
  }, [params?.workshopId]);

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

  if (isLoading) {
    return <LoaderPage />;
  }
  return (
    <PageGridLayout>
      <PageGridLayout.Left>
        <Button variant='text' color='secondary' startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
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
        {reletedWorkshops.length > 0 && (
          <RelatedWorkshops py={{ xs: 5, xl: 9.5 }}>
            <Typography variant='h2'>Similar Workshops</Typography>
            <Grid container pt={{ xs: 2.5, xl: 4.5 }} spacing={{ xs: 2, sm: 5 }}>
              {reletedWorkshops.map(w => (
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
