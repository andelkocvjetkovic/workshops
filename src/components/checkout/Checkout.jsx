import CheckoutModal from '@app/components/checkout/utils/CheckoutModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@app/components/icons/CloseIcon';
import Stack from '@mui/material/Stack';
import CheckoutForm from '@app/components/checkout/utils/CheckoutForm';

function Checkout({ onClose }) {
  return (
    <CheckoutModal onClose={onClose} open={false}>
      <Box p={3} bgcolor='common.white' width={{ xs: '100vw' }} height={{ xs: '100vh' }}>
        <Stack>
          <Typography variant='h2' display='flex' alignItems='flex-end' justifyContent='space-between' gutterBottom>
            Checkout
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Typography variant='h6' component='p' fontWeight={600} color='grey.light'>
            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.
          </Typography>
        </Stack>
        <CheckoutForm />
      </Box>
    </CheckoutModal>
  );
}

export default Checkout;
