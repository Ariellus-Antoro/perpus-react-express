import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages User Biasa
import Home from './pages/Home';
import Buku from './pages/Buku';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailBuku from './pages/DetailBuku';

// Pages Admin
import AdminDashboard from "./pagesAdmin/DasboardAdmin";
import KelolaBukuAdmin from "./pagesAdmin/KelolaBuku";
import KelolaKategoriAdmin from "./pagesAdmin/KelolaKategori";
import KelolaMemberAdmin from "./pagesAdmin/KelolaMember";
import KelolaPinjamanAdmin from "./pagesAdmin/KelolaPinjaman";

// Components Pelindung & Layout
import RequireAuth from './components/RequireAuth';
import AppShellAdmin from './components/AppShellAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute User Biasa */}
        <Route path="/" element={<Home />} />
        <Route path="/buku" element={<Buku />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buku/:id" element={<DetailBuku />} />

        {/* 🔒 RUTE ADMIN */}
        {/* Semua halaman admin dibungkus keamanan (RequireAuth) dan tampilan sidebar (AppShellAdmin) */}
        <Route element={<AppShellAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/buku" element={<KelolaBukuAdmin />} />
          <Route path="/admin/kategori" element={<KelolaKategoriAdmin />} />
          <Route path="/admin/member" element={<KelolaMemberAdmin />} />
          <Route path="/admin/pinjaman" element={<KelolaPinjamanAdmin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;