import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

function ThankYou({ onClose, open }) {
  return (
    <Modal sx={{ display: 'flex' }} open={open} onClose={onClose}>
      <Paper sx={{ m: 'auto' }}>
        <Box
          width={{ xs: '100vw', sm: '50vw', md: 760 }}
          height={{ xs: '100vh', sm: '80vh', md: 380 }}
          px={{ xs: 5, md: 10 }}
          py={10}
          display='flex'
          flexDirection='column'
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Box mt={{ xs: 'auto', md: 0 }}>
            <Typography variant='h2' gutterBottom>
              Thank you!
            </Typography>
            <Typography variant='h6' fontWeight={600} width={{ sx: 225, md: 300 }} color='grey.light'>
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.
            </Typography>
          </Box>
          <Button variant='contained' size='large' sx={{ mt: 'auto' }} onClick={onClose}>
            Back to shop
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

ThankYou.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ThankYou;
