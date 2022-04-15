import Button from '@mui/material/Button';
import CartIcon from '@app/components/icons/CartIcon';
import { styled } from '@mui/material';
import { css } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)(
  () => css`
    display: inline-flex;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0;
  `
);

function WorkshopIconButton({ onClick }) {
  return (
    <StyledButton title='Add to cart' variant='contained' onClick={onClick}>
      <CartIcon />
    </StyledButton>
  );
}

WorkshopIconButton.propTypes = {
  onClick: PropTypes.func,
};
export default WorkshopIconButton;
