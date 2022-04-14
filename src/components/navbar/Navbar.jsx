import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '@app/pages/routesConstats';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import CartIcon from '@app/components/icons/CartIcon';
import CartButton from '@app/components/cart-button/CartButton';

const BgWrapper = styled.div`
  background-color: ${props => props.theme.palette.primary.light}
`;
const LogoImg = styled.img`
  width: 105px;
  height: 46px;
  display: block;
`;

function Navbar() {
  return (
    <BgWrapper>
      <Container sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={ROUTE_HOME}>
          <LogoImg src="/assets/logo.svg" alt="Logo"/>
        </Link>
        <CartButton/>
      </Container>
    </BgWrapper>
  );
}

export default Navbar;