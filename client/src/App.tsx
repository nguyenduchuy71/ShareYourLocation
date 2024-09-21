import './App.css'
import "leaflet/dist/leaflet.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import HomeScreen from '@/features/home';
import MapScreen from '@/features/map';
import ProjectScreen from '@/features/project';
import LoginScreen from '@/features/auth';
import NotFoundScreen from '@/features/error';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GroupsScreen from '@/features/groups';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" index element={<HomeScreen />} />
        <Route path="/map/:projectId" element={
          <ProtectedRoute component={MapScreen} />
        } />
        <Route path="/projects" element={
          <ProtectedRoute component={ProjectScreen} />
        } />
        <Route path="/groups" element={
          <ProtectedRoute component={GroupsScreen} />
        } />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <Toaster />
      <Footer />
    </React.Fragment>
  )
}

export default App
