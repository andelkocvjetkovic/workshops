import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoaderPage() {
  return (
    <Box
      minHeight={{ xs: 'calc(100vh - 89px)', md: 'calc(100vh - 147px)' }}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress />
    </Box>
  );
}

export default LoaderPage;
