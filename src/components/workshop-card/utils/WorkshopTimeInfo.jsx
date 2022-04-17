import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function WorkshopTimeInfo({ children }) {
  return (
    <Typography variant='h6' display='flex' alignItems='center' columnGap={1} color='grey.darker'>
      {children}
    </Typography>
  );
}

export default WorkshopTimeInfo;
