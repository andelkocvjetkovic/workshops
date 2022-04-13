import { Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>
        <Button variant='contained'>Hello world</Button>
      </div>}>
      </Route>
    </Routes>
  );
}

export default App;
