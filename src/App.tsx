// src/App.tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import PrayerRequests from './pages/PrayerRequests';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="prayers" element={<PrayerRequests />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;