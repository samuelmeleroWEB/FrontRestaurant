import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Aquí irán las rutas protegidas más adelante */}
        <Route path="/" element={<h1>Home (Próximamente)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;