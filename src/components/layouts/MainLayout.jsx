import Navbar from '@app/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@app/components/footer/Footer';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Container component='main'>
        <Outlet />
      </Container>
      <Divider sx={{ borderColor: 'common.white' }} />
      <Footer />
    </div>
  );
}

export default MainLayout;
