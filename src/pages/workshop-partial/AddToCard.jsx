import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { InputLabel, Select, styled } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import CartIcon from '@app/components/icons/CartIcon';
import { css } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';
import PropTypes from 'prop-types';

const StyledWrapper = styled(Box)(
  ({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    background-color: ${theme.palette.common.white};
    box-shadow: ${theme.shadows[5]};
    width: 100%;
    display: flex;
    z-index: ${theme.zIndex.speedDial};

    ${theme.breakpoints.up('lg')} {
      width: 280px;
      height: 300px;
      position: absolute;
      left: auto;
      top: 0;
      margin-top: 1.25rem;
      right: 0;
      box-shadow: ${theme.shadows[2]};
      border-radius: ${theme.shape.borderRadius}px;
    }
    ${theme.breakpoints.up('xl')}{

      width: 320px;
      height: 360px;
    }
  `
);

function AddToCard({ price, onAdd }) {
  const [quantity, setQuantity] = useState('1');

  const subTotal = price * quantity;
  return (
    <StyledWrapper>
      <Grid
        container
        alignItems='center'
        columnSpacing={{ xs: 1, sm: 5 }}
        flexWrap={{ xs: 'nowrap', lg: 'wrap' }}
        py={{ lg: 6 }}
        px={{ xs: 1, sm: 4, lg: 4.5 }}
        sx={{ justifyContent: { sm: 'flex-end' } }}
      >
        <Grid item xs={0} lg={12} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Typography variant='h5'>Buy Your Ticket</Typography>
        </Grid>
        <Grid item xs='auto' lg={12}>
          <Typography variant='h3' color='grey.darker' fontSize={{ lg: 40 }}>
            {price.toFixed(2)}&nbsp;
            <Typography variant='h6' component='span' fontSize={{ lg: 23 }}>
              EUR
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs='auto' lg={12} container columnSpacing={1} rowSpacing={{ lg: 1 }} justifyContent={{ lg: 'space-between' }}>
          <Grid item xs='auto'>
            <InputLabel htmlFor='workshop-amount' sx={visuallyHidden}>
              Amount
            </InputLabel>
            <Select
              id='workshop-amount'
              sx={{ height: { xs: 45 ,xl: 60} }}
              native
              color='secondary'
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            >
              {Array.from(Array(10), (_, idx) => `${idx + 1}`).map(x => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs='auto'>
            <Button
              variant='contained'
              sx={{ height: { xs: 45, xl: 60 }, fontSize: { xl: 18 } }}
              endIcon={<CartIcon />}
              onClick={() => {
                onAdd(+quantity);
                setQuantity('1');
              }}
            >
              Add to
            </Button>
          </Grid>
          <Grid item xs={0} lg={12} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Typography textAlign='right' variant='h6' color='grey.light' fontWeight={600}>
              Subtotal: {subTotal.toFixed(2)} EUR
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

AddToCard.propType = {
  price: PropTypes.number,
  onAdd: PropTypes.func,
};
export default AddToCard;
