import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import { initializeMockData } from './utils/mockData';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import JobsPage from './pages/JobsPage';
import JobDetail from './pages/JobDetail';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
