import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CartSubtotal({ subTotal }) {
  return (
    <Box>
      <Typography variant='h6' color='grey.light' textTransform='uppercase'>
        Subtotal
      </Typography>
      <Typography variant='h2'>
        {subTotal.toFixed(2)}
        <Typography variant='h4' component='span'>
          EUR
        </Typography>
      </Typography>
    </Box>
  );
}

export default CartSubtotal;
