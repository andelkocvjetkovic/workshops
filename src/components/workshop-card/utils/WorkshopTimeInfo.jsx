import Typography from '@mui/material/Typography';

function WorkshopTimeInfo({ children }) {
  return (
    <Typography variant='h6' display='flex' alignItems='center' columnGap={0.5} color='grey.darker'>
      {children}
    </Typography>
  );
}

export default WorkshopTimeInfo;
