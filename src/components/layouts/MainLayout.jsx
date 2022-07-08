import Navbar from '@app/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@app/components/footer/Footer';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LoaderPage from '@app/components/loader/LoaderPage';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Container
        component='main'
        sx={{
          minHeight: { xs: 'calc(100vh - 89px)', md: 'calc(100vh - 147px)' },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Suspense fallback={<LoaderPage />}>
          <Outlet />
        </Suspense>
      </Container>
      <Divider sx={{ borderColor: 'common.white', borderWidth: 1 }} />
      <Footer />
    </div>
  );
}

export default MainLayout;
