import Typography from '@mui/material/Typography';

function WorkshopPrice({ children }) {
  return (
    <Typography variant='h5' fontWeight={700}>
      {children}
      <Typography component='span' fontWeight={700} variant='body2'>
        &nbsp;EUR
      </Typography>
    </Typography>
  );
}

export default WorkshopPrice;
