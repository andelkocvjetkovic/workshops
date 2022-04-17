import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CalendarIcon from '@app/components/icons/CalendarIcon';
import ClockIcon from '@app/components/icons/ClockIcon';
import WorkshopTitle from '@app/components/workshop-card/utils/WorkshopTitle';
import WorkshopIconButton from '@app/components/workshop-card/utils/WorkshopIconButton';
import WorkshopTimeInfo from '@app/components/workshop-card/utils/WorkshopTimeInfo';
import WorkshopPrice from '@app/components/workshop-card/utils/WorkshopPrice';
import WorkshopCategoryIcon from '@app/components/workshop-card/utils/WorkshopBrushIcon';
import PropTypes from 'prop-types';
import { getDate, getTime } from '@app/utils/time-utils';
import WorkshopImg from '@app/components/workshop-card/utils/WorkshopImg';
import { FILTERS } from '@app/utils/types';
import { useDispatch } from 'react-redux';
import { ACTION_CART_ADD } from '@app/store/storeActions';

function WorkshopCard({ title, imageUrl, price, date, id, category, desc, userId }) {
  const dispatch = useDispatch();

  function handleAddToCard() {
    dispatch({
      type: ACTION_CART_ADD,
      payload: {
        id,
        category,
        title,
        date,
        price,
        desc,
        userId,
        quantity: 1,
        imageUrl,
      },
    });
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card
        sx={{
          border: theme => `1px solid ${theme.palette.grey.lighter}`,
          minHeight: '100%',
          display: 'flex',
        }}
      >
        <Grid container direction={{ xs: 'row', sm: 'column' }}>
          <Grid item xs={4} sm='auto' sx={{ position: 'relative', height: { sm: 180 } }}>
            <WorkshopImg src={imageUrl} alt={title} to={`/${id}`} />
            <WorkshopCategoryIcon category={category} />
          </Grid>
          <Grid item xs={8} sm>
            <CardContent
              sx={{
                paddingLeft: { xs: 3, sm: 5 },
                paddingTop: { xs: 3 },
                paddingRight: { xs: 2, sm: 5 },
                display: 'flex',
                minHeight: '100%',
              }}
            >
              <Stack spacing={2} width='100%'>
                <Stack direction='row' columnGap={{ xs: 1, sm: 2 }}>
                  <WorkshopTimeInfo>
                    <CalendarIcon />
                    {getDate(date)}
                  </WorkshopTimeInfo>
                  <WorkshopTimeInfo>
                    <ClockIcon />
                    {getTime(date)}
                  </WorkshopTimeInfo>
                </Stack>
                <WorkshopTitle to={`/${id}`}>{title}</WorkshopTitle>
                <Box display='flex' alignItems='center'>
                  <WorkshopPrice>{price.toFixed(2)}</WorkshopPrice>
                  <CardActions sx={{ ml: 'auto', display: { xs: 'flex', sm: 'none' } }}>
                    <WorkshopIconButton onClick={handleAddToCard} />
                  </CardActions>
                </Box>
                <CardActions sx={{ display: { xs: 'none', sm: 'flex', padding: 0 } }}>
                  <Button variant='contained' fullWidth onClick={handleAddToCard}>
                    Add to cart
                  </Button>
                </CardActions>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

WorkshopCard.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  date: PropTypes.string,
  id: PropTypes.number,
  category: PropTypes.oneOf(Object.values(FILTERS)),
  desc: PropTypes.string,
  userId: PropTypes.number,
};
export default WorkshopCard;
