import Typography from '@mui/material/Typography';

function WorkshopPrice({ children }) {
  return (
    <Typography variant='h3'>
      {children}
      <Typography  component='span' fontWeight={700} variant='h6'>
        &nbsp;EUR
      </Typography>
    </Typography>
  );
}

export default WorkshopPrice;
