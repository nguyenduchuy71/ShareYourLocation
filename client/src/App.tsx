import './App.css'
import "leaflet/dist/leaflet.css";
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import HomeScreen from './features/home';
import MapScreen from './features/map';
import ProjectScreen from './features/project';
import LoginScreen from './features/login';
import NotFoundScreen from './features/error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GroupsScreen from './features/groups';
import { AuthProvider } from '@/features/auth/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" index element={<HomeScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/projects" element={
              <ProtectedRoute component={ProjectScreen} />
            } />
            <Route path="/groups" element={<GroupsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </AuthProvider>
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
