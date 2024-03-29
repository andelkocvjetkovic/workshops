import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@app/components/icons/CloseIcon';
import PropTypes from 'prop-types';
import CartEclipse from '@app/components/cart/utils/CartEclipse';

function CartHeader({ onClose, cartAmount }) {
  return (
    <Typography display='flex' alignItems='center' variant='h5'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <CartEclipse cartAmount={cartAmount} />
        {cartAmount === 0 ? 'Cart is empty' : <Box>{cartAmount} Workshops</Box>}
      </Stack>
      <IconButton sx={{ ml: 'auto', color: theme => theme.palette.grey.darker }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Typography>
  );
}

CartHeader.propTypes = {
  onClose: PropTypes.func,
  isCartEmpty: PropTypes.bool,
};
export default CartHeader;
