import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoaderPage() {
  return (
    <Box height='80vh' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Box>
  );
}

export default LoaderPage;
