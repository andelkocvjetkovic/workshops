import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CartHeader from '@app/components/cart/utils/CartHeader';
import CartItemCard from '@app/components/cart/utils/CartItemCard';
import CartSubtotal from '@app/components/cart/utils/CartSubtotal';
import { useSelector } from 'react-redux';
import { selectCart } from '@app/store/reducers/cartSlice';
import Checkout from '@app/components/checkout/Checkout';
import { useState } from 'react';
import ThankYou from '@app/components/thank-you/ThankYou';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_HOME } from '@app/pages/routesConstats';
import { FILTERS } from '@app/utils/types';

function Cart({ open, onClose }) {
  const cart = useSelector(selectCart);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

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
    setSearchParams('category', FILTERS.ALL);
  }

  return (
    <>
      <Drawer anchor='right' open={open} onClose={onClose} elevation={4}>
        <Box width={{ xs: '100vw', sm: '380px' }} p={2}>
          {cart.cata({
            Empty: () => (
              <Stack spacing={5}>
                <CartHeader onClose={onClose} cartAmount={0} />
                <CartSubtotal subTotal={0} />
                <Button size='large' variant='contained' color='secondary' disabled>
                  Checkout
                </Button>
              </Stack>
            ),
            Filled: products => (
              <Stack spacing={5}>
                <CartHeader onClose={onClose} cartAmount={products.reduce((acc, x) => acc + x.quantity, 0)} />
                <Stack spacing={3}>
                  {products.map(product => (
                    <CartItemCard key={product.id} {...product} />
                  ))}
                </Stack>
                <CartSubtotal subTotal={products.reduce((acc, x) => acc + x.quantity * x.price, 0)} />
                <Button size='large' variant='contained' color='secondary' onClick={handleOpenCheckoutModal} disabled={false}>
                  Checkout
                </Button>
              </Stack>
            ),
          })}
        </Box>
      </Drawer>
      <Checkout onClose={handleCloseCheckoutModal} open={isCheckoutModalOpen} onSuccessOrder={handleSuccessOrder} />
      <ThankYou open={isThankYouModalOpen} onClose={handleThankYouClose} />
    </>
  );
}

export default Cart;
