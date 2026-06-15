import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/authpage';
import Landingpage from './pages/dashboard';
import AdminPanel from './pages/adminPanel'; // 1. Import your Admin Panel component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/landingpage/*" element={<Landingpage />} />
          
          {/* 2. Add the explicit path route for your Admin Dashboard */}
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;