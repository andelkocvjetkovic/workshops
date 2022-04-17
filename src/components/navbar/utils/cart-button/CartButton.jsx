import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import CartEclipse from '@app/components/cart/utils/CartEclipse';
import Typography from '@mui/material/Typography';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  font-weight: bold;
  border: none;
  font-family: inherit;
  font-size: ${props => props.theme.typography.pxToRem(15)};
  position: relative;
  color: ${props => props.theme.palette.grey.darker};
  cursor: pointer;
`;
const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;
export const Eclipse = styled.span`
  width: 13px;
  height: 13px;
  background-color: ${props => props.theme.palette.secondary.light};
  border-radius: 9999px;
  position: absolute;
  top: 1px;
  left: 26px;
  animation: ${blink} 0.3ms linear backwards;
`;

function CartButton({ cartAmount, onClick }) {
  return (
    <Button title='Cart' onClick={onClick}>
      <CartEclipse />
      <Typography variant='h6' component='span' sx={{ display: { xs: 'none', md: 'inline-block' } }}>
        {cartAmount === 0 ? 'Cart is empty' : `${cartAmount} Workshop in Cart`}
      </Typography>
    </Button>
  );
}

CartButton.propTypes = {
  cartAmount: PropTypes.number,
  onClick: PropTypes.func,
};

export default CartButton;
