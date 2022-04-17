import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectCartSubtotal } from '@app/store/reducers/cartSlice';

function CartSubtotal() {
  /**
   *
   * @type {string}
   */
  const cartSubtotal = useSelector(selectCartSubtotal);
  return (
    <Box>
      <Typography variant='subtitle2' color='grey.light' fontWeight={700} textTransform='uppercase' fontSize={{ xs: 13, md: 15 }}>
        Subtotal
      </Typography>
      <Typography variant='h4' fontSize={{ xs: 32, md: 40 }} fontWeight={700}>
        {cartSubtotal}
        <Typography component='span' fontSize={{ xs: 18, md: 26 }} fontWeight={700}>
          EUR
        </Typography>
      </Typography>
    </Box>
  );
}

export default CartSubtotal;
