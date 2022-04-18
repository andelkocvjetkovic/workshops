import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoaderPage() {
  return (
    <Box minHeight='100%' minWidth='100%' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Box>
  );
}

export default LoaderPage;
