import styled from '@emotion/styled';
import CartIcon from '@app/components/icons/CartIcon';
import PropTypes from 'prop-types';

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
const Eclipse = styled.span`
  width: 13px;
  height: 13px;
  background-color: ${props => props.theme.palette.secondary.light};
  border-radius: 9999px;
  position: absolute;
  top: 1px;
  left: 26px;
`;
const Amount = styled.span`
  display: none;

  ${props => props.theme.breakpoints.up('md')} {
    display: block;
  }
`;

function CartButton({ cartAmount }) {
  return (
    <Button title='Cart'>
      <CartIcon />
      {cartAmount > 0 && <Eclipse data-testid='cart-eclipse' />}
      <Amount>{cartAmount === 0 ? 'Cart is empty' : `${cartAmount} Workshop in Cart`}</Amount>
    </Button>
  );
}

CartButton.propTypes = {
  cartAmount: PropTypes.number,
};

export default CartButton;
