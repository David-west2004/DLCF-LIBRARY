import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/authpage';
import Dashboard from './pages/dashboard';
import AdminPanel from './pages/adminPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Authentication Portal */}
          <Route path="/auth/*" element={<AuthPage />} />

          {/* User E-Library Shelf Panel */}
          <Route path="/library" element={<Dashboard />} />

          {/* Administrative Panel */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* Root Redirect to library */}
          <Route path="/" element={<Navigate to="/library" replace />} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;