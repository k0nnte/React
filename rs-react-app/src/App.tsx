import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Form from './pages/Form';
import Hookform from './pages/hookform';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/hookform" element={<Hookform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
