import { Routes, Route } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { ROUTE_HOME, ROUTE_WORKSHOP } from '@app/pages/routesConstats';
import useWorkshopFilterCategoryChange from '@app/components/hooks/useWorkshopFilterCategoryChange';
import LoaderPage from '@app/components/loader/LoaderPage';

const Home = lazy(() => import('@app/pages/Home'));
const Workshop = lazy(() => import('@app/pages/Workshop'));

function App() {
  useWorkshopFilterCategoryChange();
  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoaderPage />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_WORKSHOP}
          element={
            <Suspense fallback={<LoaderPage />}>
              <Workshop />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
