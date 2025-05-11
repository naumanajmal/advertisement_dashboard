import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import CampaignProvider from './context/CampaignProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="flex w-full bg-red-500">
    <BrowserRouter>
      <AuthProvider>
        <CampaignProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-campaign" 
              element={
                <ProtectedRoute>
                  <CreateCampaign />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CampaignProvider>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
