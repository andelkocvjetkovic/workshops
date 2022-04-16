import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { css } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCardMedia = styled(CardMedia)(
  () => css`
    max-width: 100%;
    height: auto;
    object-fit: cover;
  `
);
const StyledLink = styled(Link)(
  () => css`
    display: flex;
    height: 100%;
    
  `
);

function WorkshopImg({ src, alt, to }) {
  return (
    <StyledLink to={to}>
      <StyledCardMedia component='img' width={320} height={180} src={src} alt={alt} />
    </StyledLink>
  );
}

WorkshopImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
export default WorkshopImg;
