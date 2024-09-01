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
import AddLaporan from '../views/admin/laporan/AddLaporan.jsx';
import EditLaporan from '../views/admin/laporan/EditLaporan.jsx';

// kasir
import Kasir from '../views/kasir/pelanggan/index.jsx';
import AddPelanggan from '../views/kasir/pelanggan/addPelanggan.jsx';
import EditPelanggan from '../views/kasir/pelanggan/EditPelanggan.jsx';

import Pakaian from '../views/kasir/pakaian/index.jsx';
import AddPakaian from '../views/kasir/pakaian/addPakaian.jsx';
import EditPakaian from '../views/kasir/pakaian/EditPakaian.jsx';

import Pendaftaran from '../views/kasir/pendaftaran/index.jsx';
import AddPendaftaran from '../views/kasir/pendaftaran/AddPendaftaran.jsx';
import EditPendaftaran from '../views/kasir/pendaftaran/EditPendaftaran.jsx';

import Pembayaran from '../views/kasir/pembayaran/index.jsx';
import AddPembayaran from '../views/kasir/pembayaran/AddPembayaran.jsx';
import EditPembayaran from '../views/kasir/pembayaran/EditPembayaran.jsx';

// pengolahan
import Pengolahan from '../views/pengolahan/index.jsx';
import AddPengolahan from '../views/pengolahan/AddPengolahan.jsx';
import EditPengolahan from '../views/pengolahan/EditPengolahan.jsx';
import PengolahanPakaian from '../views/pengolahan/PengolahanPakaian.jsx';

// kurir
import Kurir from '../views/kurir/index.jsx';
import PakaianKurir from '../views/kurir/PakaianKurir.jsx';
import PengolahanKurir from '../views/kurir/PengolahanKurir.jsx';
import AddPengiriman from '../views/kurir/AddPengiriman.jsx';
import EditPengiriman from '../views/kurir/EditPengiriman.jsx';

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

            {/* laporan */}
            <Route path="/admin/laporan" element={
                isAuthenticated && userRole === 'Admin' ? <Laporan /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/add/laporan" element={
                isAuthenticated && userRole === 'Admin' ? <AddLaporan /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/edit/laporan/:id" element={
                isAuthenticated && userRole === 'Admin' ? <EditLaporan /> : <Navigate to="/login" replace />
            } />

            {/* pelanggan */}
            <Route path="/kasir/home" element={
                isAuthenticated && userRole === 'Kasir' ? <Kasir /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/add/pelanggan" element={
                isAuthenticated && userRole === 'Kasir' ? <AddPelanggan /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/edit/pelanggan/:id" element={
                isAuthenticated && userRole === 'Kasir' ? <EditPelanggan /> : <Navigate to="/login" replace />
            } />

            {/* pendaftaran */}
            <Route path="/kasir/pendaftaran" element={
                isAuthenticated && userRole === 'Kasir' ? <Pendaftaran /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/add/pendaftaran" element={
                isAuthenticated && userRole === 'Kasir' ? <AddPendaftaran /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/edit/pendaftaran/:id" element={
                isAuthenticated && userRole === 'Kasir' ? <EditPendaftaran /> : <Navigate to="/login" replace />
            } />

            {/* pakaian */}
            <Route path="/kasir/pakaian" element={
                isAuthenticated && userRole === 'Kasir' ? <Pakaian /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/add/pakaian" element={
                isAuthenticated && userRole === 'Kasir' ? <AddPakaian /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/edit/pakaian/:id" element={
                isAuthenticated && userRole === 'Kasir' ? <EditPakaian /> : <Navigate to="/login" replace />
            } />

            {/* pembayaran */}
            <Route path="/kasir/pembayaran" element={
                isAuthenticated && userRole === 'Kasir' ? <Pembayaran /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/add/pembayaran" element={
                isAuthenticated && userRole === 'Kasir' ? <AddPembayaran /> : <Navigate to="/login" replace />
            } />
            <Route path="/kasir/edit/pembayaran/:id" element={
                isAuthenticated && userRole === 'Kasir' ? <EditPembayaran /> : <Navigate to="/login" replace />
            } />

            {/* Pengolahan routes */}
            <Route path="/pengolahan/home" element={
                isAuthenticated && userRole === 'Pengolahan' ? <Pengolahan /> : <Navigate to="/login" replace />
            } />
            <Route path="/pengolahan/add" element={
                isAuthenticated && userRole === 'Pengolahan' ? <AddPengolahan /> : <Navigate to="/login" replace />
            } />
            <Route path="/pengolahan/edit/:id" element={
                isAuthenticated && userRole === 'Pengolahan' ? <EditPengolahan /> : <Navigate to="/login" replace />
            } />
            <Route path="/pengolahan/pakaian" element={
                isAuthenticated && userRole === 'Pengolahan' ? <PengolahanPakaian /> : <Navigate to="/login" replace />
            } />

            {/* Kurir routes */}
            <Route path="/kurir/home" element={
                isAuthenticated && userRole === 'Kurir' ? <Kurir /> : <Navigate to="/login" replace />
            } />
            <Route path="/kurir/pakaian" element={
                isAuthenticated && userRole === 'Kurir' ? <PakaianKurir /> : <Navigate to="/login" replace />
            } />
            <Route path="/kurir/pengolahan" element={
                isAuthenticated && userRole === 'Kurir' ? <PengolahanKurir /> : <Navigate to="/login" replace />
            } />
            <Route path="/kurir/add" element={
                isAuthenticated && userRole === 'Kurir' ? <AddPengiriman /> : <Navigate to="/login" replace />
            } />
            <Route path="/kurir/update/:id" element={
                isAuthenticated && userRole === 'Kurir' ? <EditPengiriman /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
