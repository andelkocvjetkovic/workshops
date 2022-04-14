import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box component='footer' sx={{ py: { xs: 1, md: 3 }, backgroundColor: 'grey.lighter' }}>
      <Container component='div'>
        <Typography
          variant='subtitle1'
          component='h6'
          sx={{ color: 'grey.light', fontWeight: '600', fontSize: { xs: 13, md: 15 } }}
        >
          © TINEL Meetup 2020.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
