import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../views/home/index.jsx';
import Login from '../views/auth/Login.jsx';

// admin
import Admin from '../views/admin/user/index.jsx';
import CreateUser from '../views/admin/user/CreateUser.jsx';
import EditUser from '../views/admin/user/EditUser.jsx';
import Laporan from '../views/admin/laporan/index.jsx';

import Kasir from '../views/kasir/pelanggan/index.jsx';
import Pembayaran from '../views/kasir/pembayaran/index.jsx';

import Pengolahan from '../views/pengolahan/index.jsx';

import Kurir from '../views/kurir/index.jsx';

export default function AppRoutes() {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    if (isAuthenticated === undefined || userRole === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Admin routes */}
            <Route path="/admin/home" element={
                isAuthenticated && userRole === 'Admin' ? <Admin /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/create/user" element={
                isAuthenticated && userRole === 'Admin' ? <CreateUser /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/edit/user/:id" element={
                isAuthenticated && userRole === 'Admin' ? <EditUser /> : <Navigate to="/login" replace />
            } />

            <Route path="/admin/laporan" element={
                isAuthenticated && userRole === 'Admin' ? <Laporan /> : <Navigate to="/login" replace />
            } />

            {/* Kasir routes */}
            <Route path="/kasir/home" element={
                isAuthenticated && userRole === 'Kasir' ? <Kasir /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/pembayaran" element={
                isAuthenticated && userRole === 'Kasir' ? <Pembayaran /> : <Navigate to="/login" replace />
            } />

            {/* Pengolahan routes */}
            <Route path="/pengolahan/home" element={
                isAuthenticated && userRole === 'Pengolahan' ? <Pengolahan /> : <Navigate to="/login" replace />
            } />

            {/* Kurir routes */}
            <Route path="/kurir/home" element={
                isAuthenticated && userRole === 'Kurir' ? <Kurir /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
