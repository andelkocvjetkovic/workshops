import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_HOME } from '@app/pages/routesConstats';
import styled from '@emotion/styled';
import CartButton from '@app/components/navbar/utils/cart-button/CartButton';
import Cart from '@app/components/cart/Cart';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCartAmount } from '@app/store/reducers/cartSlice';

const BgWrapper = styled.div`
  background-color: ${props => props.theme.palette.primary.light};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.appBar};
`;
const LogoImg = styled.img`
  display: block;
  height: 40px;
  width: 90px;

  ${props => props.theme.breakpoints.up('md')} {
    width: 105px;
    height: 46px;
  }
`;

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartAmount = useSelector(selectCartAmount);
  const location = useLocation();
  useEffect(() => setIsCartOpen(false), [location]);
  return (
    <BgWrapper>
      <Container sx={{ py: { xs: 1, md: 2 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={ROUTE_HOME} title='Workshop - Home'>
          <LogoImg src='/assets/logo.svg' alt='Logo' />
        </Link>
        <CartButton cartAmount={cartAmount} onClick={() => setIsCartOpen(true)} />
        <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Container>
    </BgWrapper>
  );
}

export default Navbar;
