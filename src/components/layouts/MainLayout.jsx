import Navbar from '@app/components/navbar/Navbar';
import {Outlet} from 'react-router-dom';
import Footer from '@app/components/footer/Footer';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;