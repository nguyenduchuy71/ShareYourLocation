import './App.css'
import "leaflet/dist/leaflet.css";
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './features/home';
import MapScreen from './features/map';
import ProjectScreen from './features/project';
import LoginScreen from './features/login';
import NotFoundScreen from './features/error';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" index element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/projects" element={<ProjectScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </div>
  )
}

export default App
