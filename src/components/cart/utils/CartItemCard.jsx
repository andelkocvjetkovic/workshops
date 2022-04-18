import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import WorkshopImg from '@app/components/workshop-card/utils/WorkshopImg';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@app/components/icons/TrashIcon';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ACTION_CART_DELETE, ACTION_CART_UPDATE_QUANTITY } from '@app/store/storeActions';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { visuallyHidden } from '@mui/utils';

function CartItemCard({ imageUrl, title, id, quantity, price }) {
  const dispatch = useDispatch();

  function handleDeleteProduct() {
    dispatch({ type: ACTION_CART_DELETE, payload: id });
  }

  function handleQuantityChange(e) {
    dispatch({ type: ACTION_CART_UPDATE_QUANTITY, payload: { id, quantity: Number(e.target.value) } });
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={4}>
          <WorkshopImg to={`${id}`} src={imageUrl} alt={title} />
        </Grid>
        <Grid item xs={8} rowSpacing={1} p={2} bgcolor='grey.lighter'>
          <Stack spacing={2}>
            <Grid container justifyContent='space-between' wrap='nowrap' alignItems='flex-start'>
              <Grid item xs>
                <Typography
                  variant='h4'
                  component={Link}
                  to={`${id}`}
                  color='secondary.main'
                  sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleDeleteProduct}>
                  <TrashIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container columnGap={2} flexWrap='nowrap' alignItems='center'>
              <Grid item xs='auto'>
                <Box>
                  <FormLabel sx={visuallyHidden} htmlFor={`ticket-amount-${id}`}>
                    Amount
                  </FormLabel>
                  <Select
                    native
                    id={`ticket-amount-${id}`}
                    color='secondary'
                    sx={{ fontWeight: 700, width: 60, height: 45 }}
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[...Array(9)].map((_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant='h3'>
                  {price.toFixed(2)}
                  <Typography variant='h6' component='span'>
                    EUR
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

CartItemCard.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  quantity: PropTypes.number,
  price: PropTypes.number,
};

export default CartItemCard;
