import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CartHeader from '@app/components/cart/utils/CartHeader';
import CartItemCard from '@app/components/cart/utils/CartItemCard';
import CartSubtotal from '@app/components/cart/utils/CartSubtotal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartAmount, selectCartProducts, selectIsCartEmpty } from '@app/store/reducers/cartSlice';
import Checkout from '@app/components/checkout/Checkout';
import { useState } from 'react';
import ThankYou from '@app/components/thank-you/ThankYou';
import { useNavigate } from 'react-router-dom';
import { ROUTE_HOME } from '@app/pages/routesConstats';
import { FILTERS } from '@app/utils/types';
import { ACTION_WORKSHOP_SET_ACTIVE_FILTER } from '@app/store/storeActions';
import { SAGA_WORKSHOPS_SET } from '@app/store/sagaActions';

function Cart({ open, onClose }) {
  /**@type {boolean}*/
  const isCartEmpty = useSelector(selectIsCartEmpty);
  /**@type {number}*/
  const cartAmount = useSelector(selectCartAmount);
  /**@type {Workshop~OrderProduct[]}*/
  const cartProducts = useSelector(selectCartProducts);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleOpenCheckoutModal() {
    onClose();
    setIsCheckoutModalOpen(true);
  }

  function handleCloseCheckoutModal() {
    setIsCheckoutModalOpen(false);
  }

  function handleSuccessOrder() {
    setIsCheckoutModalOpen(false);
    setIsThankYouModalOpen(true);
  }

  function handleThankYouClose() {
    setIsThankYouModalOpen(false);
    navigate(ROUTE_HOME);
    dispatch({ type: ACTION_WORKSHOP_SET_ACTIVE_FILTER, payload: FILTERS.ALL });
    dispatch({ type: SAGA_WORKSHOPS_SET });
  }

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
            <Button size='large' variant='contained' color='secondary' onClick={handleOpenCheckoutModal} disabled={isCartEmpty}>
              Checkout
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Checkout onClose={handleCloseCheckoutModal} open={isCheckoutModalOpen} onSuccessOrder={handleSuccessOrder} />
      <ThankYou open={isThankYouModalOpen} onClose={handleThankYouClose} />
    </>
  );
}

export default Cart;
