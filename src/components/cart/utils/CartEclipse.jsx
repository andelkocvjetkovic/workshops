import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import CartIcon from '@app/components/icons/CartIcon';
import PropTypes from 'prop-types';

const blink = props => keyframes`
  0% {
    opacity: 0;
    outline: 4px solid ${props.theme.palette.secondary.light};
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    outline: none;
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
  animation: ${blink} 300ms ease-out backwards;
`;

function CartEclipse({ cartAmount }) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' width={42} height={32} position='relative'>
      <CartIcon />
      {cartAmount > 0 && <Eclipse data-testid='cart-eclipse' key={cartAmount} />}
    </Box>
  );
}

CartEclipse.propTypes = {
  cartAmount: PropTypes.number.isRequired,
};
export default CartEclipse;
