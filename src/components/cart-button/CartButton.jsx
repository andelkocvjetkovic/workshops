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
  color: ${props => props.theme.palette.grey.darker}
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

function CartButton({ isEmpty }) {
  return (
    <Button>
      <CartIcon/>
      <Eclipse/>
      Cart is empty
    </Button>
  );
}

CartButton.propTypes = {
  isEmpty: PropTypes.bool
};

export default CartButton;