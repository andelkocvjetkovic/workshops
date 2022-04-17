import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import WorkshopImg from '@app/components/workshop-card/utils/WorkshopImg';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material';
import TrashIcon from '@app/components/icons/TrashIcon';
import MenuItem from '@mui/material/MenuItem';
import { css } from '@mui/material/styles';

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => css`
    font-weight: 700;

    &.Mui-selected,
    &.Mui-selected:hover {
      background-color: ${alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity)};
    }
  `
);

function CartItemCard() {
  return (
    <Card>
      <Grid container>
        <Grid item xs={4}>
          <WorkshopImg to='/1' src='/assets/workshop-placeholder.png' alt='placeholder' />
        </Grid>
        <Grid item xs={8} rowSpacing={1} p={2} bgcolor='grey.lighter'>
          <Stack spacing={2}>
            <Grid container justifyContent='space-between' wrap='nowrap' alignItems='flex-start'>
              <Grid item xs>
                <Typography
                  variant='h4'
                  component={Link}
                  to='/1'
                  fontSize={19}
                  fontWeight={700}
                  color='secondary.main'
                  sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}
                >
                  Interaction Dsgn Workshop
                </Typography>
              </Grid>
              <Grid item>
                <IconButton>
                  <TrashIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container columnGap={2} alignItems='center'>
              <Grid item xs='auto'>
                <Select color='secondary' sx={{ fontWeight: 700, width: 60, height: 45 }}>
                  {[...Array(9)].map((_, idx) => (
                    <StyledMenuItem key={idx + 1} value={idx + 1} color='secondary.main'>
                      {idx + 1}
                    </StyledMenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs>
                <Typography fontSize={23} fontWeight={700}>
                  450.00&nbsp;
                  <Typography fontSize={13} fontWeight={700} component='span'>
                    EUR
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CartItemCard;
