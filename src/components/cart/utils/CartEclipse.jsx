import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import CartIcon from '@app/components/icons/CartIcon';
import { useSelector } from 'react-redux';
import { selectCartAmount, selectIsCartEmpty } from '@app/store/reducers/cartSlice';

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

function CartEclipse() {
  const isCartEmpty = useSelector(selectIsCartEmpty);
  /**@type {number}*/
  const cartAmount = useSelector(selectCartAmount);

  return (
    <Box display='flex' alignItems='center' justifyContent='center' width={42} height={32} position='relative'>
      <CartIcon />
      {!isCartEmpty && <Eclipse key={cartAmount} />}
    </Box>
  );
}

export default CartEclipse;
