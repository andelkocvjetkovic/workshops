import { styled } from '@mui/material';
import { css } from '@mui/material/styles';

const CoverImg = styled('img')(
  ({ theme }) => css`
    max-width: 100%;
    width: 100%;
    display: block;
    height: auto;
    object-fit: cover;
    object-position: center;
    border-radius: ${theme.shape.borderRadius}px;

    ${theme.breakpoints.up('lg')} {
      height: 382px;

    }
  }
  `
);

export default CoverImg;
