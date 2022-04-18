import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import { css } from '@mui/material/styles';
import { FILTERS_ICON } from '@app/components/filter-category/utils/Filter';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.common.black};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.shape.borderRadius}px;
    width: 2rem;
    height: 2rem;
    padding: 0.25rem;
    position: absolute;
    top: 0.65rem;
    left: 100%;
    transform: translateX(-50%);

    ${theme.breakpoints.up('sm')} {
      width: 2.5rem;
      height: 2.5rem;
      top: auto;
      left: auto;
      transform: translateY(50%);
      bottom: 0;
      right: 1rem;
    }
  `
);

function WorkshopCategoryIcon({ category, ...rest }) {
  return <StyledBox {...rest}>{FILTERS_ICON[category]}</StyledBox>;
}

export default WorkshopCategoryIcon;
