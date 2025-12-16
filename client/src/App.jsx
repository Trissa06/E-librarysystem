import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Pages
import Login from './pages/auth/Login'; 
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBooks from './pages/admin/ManageBooks';
import UserDashboard from './pages/user/UserDashboard';
import Home from './pages/user/Home';
import ForgotPassword from './pages/auth/ForgotPassword';
import ManageUsers from './pages/admin/ManageUsers';
import Announcements from './pages/admin/Announcements';
import BookDetails from './pages/user/BookDetails';
import BookReader from './pages/user/BookReader'; 
import Profile from './pages/user/Profile';// <--- Import New Page

// Import Layouts
import DashboardLayout from './components/layouts/DashboardLayout';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH ROUTES (Login/Signup) - Wrapped in AuthLayout */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* USER ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="/dashboard/book/:id" element={<BookDetails />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          
          {/* NEW ROUTE: Book Reader */}
          <Route path="read/:id" element={<BookReader />} /> 
        </Route>

        {/* ADMIN ROUTES - Wrapped in DashboardLayout (Sidebar) */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;