import { Routes, Route } from 'react-router-dom';
import MainLayout from '@app/components/layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}></Route>
    </Routes>
  );
}

export default App;
