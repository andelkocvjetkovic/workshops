import { Routes, Route } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { ROUTE_HOME, ROUTE_WORKSHOP } from '@app/pages/routesConstats';
import useScrollTop from '@app/components/hooks/useScrollTop';
import Page404 from '@app/pages/Page404';

const Home = lazy(() => import('@app/pages/Home'));
const Workshop = lazy(() => import('@app/pages/Workshop'));

function App() {
  useScrollTop();

  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTE_WORKSHOP} element={<Workshop />} />
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
