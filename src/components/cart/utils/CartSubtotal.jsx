import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectCartSubtotal } from '@app/store/reducers/cartSlice';

function CartSubtotal() {
  /*** @type {string}*/
  const cartSubtotal = useSelector(selectCartSubtotal);
  return (
    <Box>
      <Typography variant='h6' color='grey.light' textTransform='uppercase'>
        Subtotal
      </Typography>
      <Typography variant='h2'>
        {cartSubtotal}
        <Typography variant='h4' component='span'>
          EUR
        </Typography>
      </Typography>
    </Box>
  );
}

export default CartSubtotal;
