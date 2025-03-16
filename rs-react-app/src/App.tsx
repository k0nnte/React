import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NForm from './pages/form';
import Hookform from './pages/hookform';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<NForm />} />
      <Route path="/hookform" element={<Hookform />} />
    </Routes>
  );
}

export default App;
