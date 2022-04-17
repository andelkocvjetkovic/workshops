import { CardHeader, Drawer, IconButton, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CartIcon from '@app/components/icons/CartIcon';
import { Eclipse } from '@app/components/navbar/utils/cart-button/CartButton';
import ClockIcon from '@app/components/icons/ClockIcon';
import CloseIcon from '@app/components/icons/CloseIcon';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TrashIcon from '@app/components/icons/TrashIcon';
import MenuItem from '@mui/material/MenuItem';
import WorkshopImg from '@app/components/workshop-card/utils/WorkshopImg';
import { Link } from 'react-router-dom';
import CartHeader from '@app/components/cart/utils/CartHeader';
import CartItemCard from '@app/components/cart/utils/CartItemCard';
import CartSubtotal from '@app/components/cart/utils/CartSubtotal';
import { useSelector } from 'react-redux';
import { selectCartAmount, selectCartProducts, selectIsCartEmpty } from '@app/store/reducers/cartSlice';
import Checkout from '@app/components/checkout-form/Checkout';

function Cart({ open, onClose }) {
  /**@type {boolean}*/
  const isCartEmpty = useSelector(selectIsCartEmpty);
  /**@type {number}*/
  const cartAmount = useSelector(selectCartAmount);
  /**@type {Workshop~OrderProduct[]}*/
  const cartProducts = useSelector(selectCartProducts);
  return (
    <>
      <Drawer anchor='right' open={open} onClose={onClose} elevation={4}>
        <Box width={{ xs: '100vw', sm: '380px' }} p={2}>
          <Stack spacing={5}>
            <CartHeader onClose={onClose} isCartEmpty={isCartEmpty} cartAmount={cartAmount} />
            <Stack spacing={3}>
              {cartProducts.map(product => (
                <CartItemCard key={product.id} {...product} />
              ))}
            </Stack>
            <CartSubtotal />
            <Button variant='contained' color='secondary' onClick={onClose} disabled={isCartEmpty}>
              Checkout
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Checkout />
    </>
  );
}

export default Cart;
