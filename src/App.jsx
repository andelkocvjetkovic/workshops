import { Routes, Route, useSearchParams, Link } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';
import { lazy, Suspense, useEffect } from 'react';
import { ROUTE_HOME, ROUTE_WORKSHOP } from '@app/pages/routesConstats';
import LoaderPage from '@app/components/loader/LoaderPage';
import { useDispatch } from 'react-redux';
import { SAGA_STARTUP_APP } from '@app/store/sagaActions';
import { FILTERS } from '@app/utils/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useScrollTop from '@app/components/hooks/useScrollTop';
import Page404 from '@app/pages/Page404';

const Home = lazy(() => import('@app/pages/Home'));
const Workshop = lazy(() => import('@app/pages/Workshop'));

function App() {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  useScrollTop();

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
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
