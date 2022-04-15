import Box from '@mui/material/Box';
import BrushIcon from '@app/components/icons/BrushIcon';
import { styled } from '@mui/material';
import { css } from '@mui/material/styles';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.common.black};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.shape.borderRadius + 'px'};
    width: 2rem;
    height: 2rem;
    padding: 0.25rem;
    position: absolute;
    top: 0.75rem;
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

function WorkshopBrushIcon() {
  return (
    <StyledBox>
      <BrushIcon />
    </StyledBox>
  );
}

export default WorkshopBrushIcon;
