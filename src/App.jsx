import { Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import MainLayout from '@app/components/layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}></Route>
    </Routes>
  );
}

export default App;
