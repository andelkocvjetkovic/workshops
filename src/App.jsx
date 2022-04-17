import { Routes, Route, useSearchParams } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';
import { lazy, Suspense, useEffect } from 'react';
import { ROUTE_HOME, ROUTE_WORKSHOP } from '@app/pages/routesConstats';
import useWorkshopFilterCategoryChange from '@app/components/hooks/useWorkshopFilterCategoryChange';
import LoaderPage from '@app/components/loader/LoaderPage';
import { useDispatch } from 'react-redux';
import { SAGA_STARTUP_APP } from '@app/store/sagaActions';
import { FILTERS } from '@app/utils/types';

const Home = lazy(() => import('@app/pages/Home'));
const Workshop = lazy(() => import('@app/pages/Workshop'));

function App() {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch({ type: SAGA_STARTUP_APP, payload: searchParams.get('category') ?? FILTERS.ALL });
  }, [dispatch, searchParams]);
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
