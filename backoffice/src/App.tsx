import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import { PassList, PassDetails } from './pages/PassesPages'
import PackagePage from './pages/PackagePage';
import SitesPage from './pages/SitesPage';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/packages"
                    element={
                        <ProtectedRoute>
                            <PackagePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sites"
                    element={
                        <ProtectedRoute>
                            <SitesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/passes"
                    element={
                        <ProtectedRoute>
                            <PassList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/passes/:id"
                    element={
                        <ProtectedRoute>
                            <PassDetails />
                        </ProtectedRoute>
                    }
                />
                {/* Redirection par défaut vers /login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};
export default App;