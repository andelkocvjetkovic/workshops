import { Routes, Route } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { ROUTE_HOME, ROUTE_WORKSHOP } from '@app/pages/routesConstats';
import useWorkshopFilterCategoryChange from "@app/components/hooks/useWorkshopFilterCategoryChange";

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
            <Suspense fallback={<div>Loading</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_WORKSHOP}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <Workshop />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
