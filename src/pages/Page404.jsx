import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '@app/pages/routesConstats';

function Page404() {
  return (
    <Box
      sx={{ width: '100vw', height: '100vh' }}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h1' gutterBottom textAlign='center'>
        Nothing found here
      </Typography>
      <Typography variant='h2' gutterBottom>
        404
      </Typography>
      <Typography varieny='h4' component={Link} to={ROUTE_HOME}>
        Back to safety
      </Typography>
    </Box>
  );
}

export default Page404;
