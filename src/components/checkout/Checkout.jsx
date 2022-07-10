import CheckoutModal from '@app/components/checkout/utils/CheckoutModal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@app/components/icons/CloseIcon';
import Stack from '@mui/material/Stack';
import CheckoutForm from '@app/components/checkout/utils/CheckoutForm';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Checkout({ onClose, open, onSuccessOrder }) {
  return (
    <CheckoutModal onClose={onClose} open={open}>
      <Paper sx={{ m: 'auto' }}>
        <Box
          p={{ xs: 3, sm: 6, lg: 9, xl: 12 }}
          width={{ xs: '100vw', sm: '90vw', md: '760px' }}
          height={{ xs: '100vh' }}
          overflow='auto'
          borderRadius={theme => theme.shape.borderRadius + 'px'}
        >
          <Stack>
            <Typography variant='h2' display='flex' alignItems='flex-end' justifyContent='space-between' gutterBottom>
              Checkout
              <IconButton onClick={onClose} sx={{ color: theme => theme.palette.grey.darker }}>
                <CloseIcon />
              </IconButton>
            </Typography>
            <Typography variant='h6' component='p' fontWeight={600} color='grey.light' width={{ xs: 225, md: 300 }}>
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.
            </Typography>
          </Stack>
          <CheckoutForm onSuccessOrder={onSuccessOrder} />
        </Box>
      </Paper>
    </CheckoutModal>
  );
}

Checkout.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSuccessOrder: PropTypes.func,
};

export default Checkout;
