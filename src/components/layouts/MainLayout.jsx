import Navbar from '@app/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@app/components/footer/Footer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Box component="main" sx={{ height: '200vh' }}>
        <Outlet/>
      </Box>
      <Divider sx={{ borderColor: 'common.white' }}/>
      <Footer/>
    </div>
  );
}

export default MainLayout;
