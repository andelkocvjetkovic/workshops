import CheckoutModal from '@app/components/checkout-form/utils/CheckoutModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@app/components/icons/CloseIcon';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CheckoutForm from '@app/components/checkout-form/utils/CheckoutForm';

function Checkout({ onClose }) {
  return (
    <CheckoutModal onClose={onClose} open={false}>
      <Box p={3} bgcolor='common.white' width={{ xs: '100vw' }} height={{ xs: '100vh' }}>
        <Stack>
          <Typography
            variant='h3'
            fontSize={{ xs: 32, md: 40 }}
            fontWeight={700}
            display='flex'
            alignItems='flex-end'
            justifyContent='space-between'
            gutterBottom
          >
            Checkout
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Typography variant='subtitle2' fontWeight={600} color='grey.light' lineHeight={1.3}>
            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.
          </Typography>
        </Stack>
        <CheckoutForm />
      </Box>
    </CheckoutModal>
  );
}

export default Checkout;
